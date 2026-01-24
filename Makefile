ifneq (,)
.error This Makefile requires GNU Make.
endif

# Initialize variables
DOCKER_COMPOSE_DIR=./docker
DOCKER_COMPOSE_FILE:=-f $(DOCKER_COMPOSE_DIR)/docker-compose.yml
DOCKER_COMPOSE_PROFILES:=
OS_NAME:=
OS_PROCESSOR:=

-include $(DOCKER_COMPOSE_DIR)/.env

ifeq ($(OS),Windows_NT)
	OS_NAME += WIN32

	ifeq ($(PROCESSOR_ARCHITEW6432),AMD64)
        OS_PROCESSOR += AMD64
    else
        ifeq ($(PROCESSOR_ARCHITECTURE),AMD64)
            OS_PROCESSOR += AMD64
        endif
        ifeq ($(PROCESSOR_ARCHITECTURE),x86)
            OS_PROCESSOR += IA32
        endif
    endif
else
    UNAME_S := $(shell uname -s)

    ifeq ($(UNAME_S),Linux)
        OS_NAME += LINUX
    endif

    ifeq ($(UNAME_S),Darwin)
        OS_NAME += OSX
    endif

    UNAME_P := $(shell uname -p)

    ifeq ($(UNAME_P),x86_64)
        OS_PROCESSOR += AMD64
    endif

    ifneq ($(filter %86,$(UNAME_P)),)
        OS_PROCESSOR += IA32
    endif

    ifneq ($(filter arm%,$(UNAME_P)),)
        OS_PROCESSOR += ARM
    endif
endif

# Overwrite compose file based on OS/Variables
ifeq ($(OS_NAME),OSX)
	ifeq ($(OS_PROCESSOR),ARM)
		DOCKER_COMPOSE_FILE += -f $(DOCKER_COMPOSE_DIR)/docker-compose.osx.arm.yml
	endif
endif

DOCKER_COMPOSE:=docker-compose $(DOCKER_COMPOSE_PROFILES) $(DOCKER_COMPOSE_FILE) --project-directory $(DOCKER_COMPOSE_DIR)
DOCKER_COMPOSE_2:=docker compose

DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [Docker] Build infrastructure
docker/.env:
	cp -n $(DOCKER_COMPOSE_DIR)/.env.dist $(DOCKER_COMPOSE_DIR)/.env

.PHONY: docker-init
docker-init: docker/.env ## Make sure the .env file exists for docker

.PHONY: docker-clean
docker-clean: ## Remove the .env file for docker
	rm -f $(DOCKER_COMPOSE_DIR)/.env

.PHONY: docker-build
docker-build: docker-init ## Build Project docker image for development.
	bash $(DOCKER_COMPOSE_DIR)/bin/docker-build.sh && \
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 $(DOCKER_COMPOSE) build && \
	$(DOCKER_COMPOSE) up -d --force-recreate --remove-orphans

.PHONY: docker-clean-prod
docker-clean-prod: ## Safely remove PROD containers (preserves volumes)
	docker-compose -f docker/docker-compose.prod.yml down --remove-orphans || true

.PHONY: docker-build-prod
docker-build-prod: docker-init docker-clean-prod ## Build Project docker image for PROD environment.
	bash $(DOCKER_COMPOSE_DIR)/bin/docker-build.sh && \
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 $(DOCKER_COMPOSE_2) -f docker/docker-compose.prod.yml build --no-cache && \
	$(DOCKER_COMPOSE_2) -f docker/docker-compose.prod.yml up -d --force-recreate --remove-orphans

.PHONY: docker-start
docker-start: docker-init ## Starts Project docker container.
	$(DOCKER_COMPOSE) start

.PHONY: docker-start-prod
docker-start-prod: docker-init ## Start containers on PROD.
	$(DOCKER_COMPOSE_2) -f docker/docker-compose.prod.yml start

.PHONY: docker-stop
docker-stop: docker-init ## Stop Project docker container, but it won’t remove it.
	$(DOCKER_COMPOSE) stop

.PHONY: docker-stop-prod
docker-stop-prod: docker-init ## Stop UAT containers.
	$(DOCKER_COMPOSE_2) -f docker/docker-compose.prod.yml stop

.PHONY: docker-restart
docker-restart: docker-init ## Restarts all docker containers for a service. To only start one container, use CONTAINER=<service>
	$(DOCKER_COMPOSE) stop $(CONTAINER) && \
	$(DOCKER_COMPOSE) start $(CONTAINER)

.PHONY: docker-up
docker-up: docker-init ## Builds, (re)creates, starts, and attaches to docker container.
	$(DOCKER_COMPOSE) up -d

.PHONY: docker-down
docker-down: docker-init ## Stop & removes Project docker container, and any associated networks.
	$(DOCKER_COMPOSE) down --volumes

.PHONY: docker-logs
docker-logs: docker-init ## Displays the output of each container
	$(DOCKER_COMPOSE) logs -f

.PHONY: docker-logs-prod
docker-logs-prod: docker-init ## Displays the output of each container in PROD
	$(DOCKER_COMPOSE_2) -f docker/docker-compose.prod.yml logs -f

.PHONY: docker-test
docker-test: docker-init docker-up ## Run the infrastructure tests for the docker setup
	bash $(DOCKER_COMPOSE_DIR)/bin/docker-test.sh

.PHONY: docker-config
docker-config: docker-init ## Show the docker-compose config with resolved .env values, see the mappings
	$(DOCKER_COMPOSE) config

.PHONY: docker-ip
docker-ip: docker-init ## Show the docker ips of each container
	docker ps -q | xargs -n 1 docker inspect --format '{{ .Name }} {{range .NetworkSettings.Networks}} {{.IPAddress}}{{end}}' | sed 's#^/##';

.PHONY: bash
bash: docker-init ## Connect to app container
	docker exec -it $(COMPOSE_PROJECT_NAME)_app /bin/bash -l

.PHONY: bash-root
bash-root: docker-init ## Connect to app container as root
	docker exec -it --user root $(COMPOSE_PROJECT_NAME)_app /bin/bash -l

.PHONY: docker-clear-logs-prod
docker-clear-logs-prod: docker-init ## Clear container logs for PROD
	@ids=$$( docker-compose -f docker/docker-compose.prod.yml ps -aq | sort -u ); \
	if [ -z "$$ids" ]; then exit 0; fi; \
	for id in $$ids; do \
		log=$$( docker inspect --format='{{.LogPath}}' $$id 2>/dev/null || true ); \
		[ -n "$$log" ] && [ -f "$$log" ] && truncate -s 0 "$$log" || true; \
	done