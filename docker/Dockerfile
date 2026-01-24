FROM nginx:latest

RUN mkdir -p /etc/nginx/ssl && openssl req -x509 -nodes -days 3650 -subj "/C=CA/ST=QC/O=Company Inc/CN=*.home.local" -newkey rsa:2048 -keyout /etc/nginx/ssl/project-selfsigned.key -out /etc/nginx/ssl/project-selfsigned.crt

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

COPY /dist /usr/share/nginx/html