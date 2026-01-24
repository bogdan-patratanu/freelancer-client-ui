import * as React from "react";
import {
  useMediaQuery,
  Theme,
  Tabs,
  Tab,
  Divider,
  Button,
} from "@mui/material";
import { useCallback, Fragment } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  useTranslate,
  List,
  SearchInput,
  useListContext,
  DataTable,
  DateField,
  TopToolbar,
  CreateButton,
  ExportButton,
} from "react-admin";
import MobileGrid from "./mobileGrid";
import { Project } from "../../types";

const storeKeyByDisplayType = {
  romaniaHourly: "projects.list7",
  romaniaFixed: "projects.list8",
  proximityHourly: "projects.list1",
  proximityFixed: "projects.list2",
  remoteHourly: "projects.list3",
  remoteFixed: "projects.list4",
  othersHourly: "projects.list5",
  othersFixed: "projects.list6",
};

const tabs = [
  { id: "romaniaHourly", name: "romania Hourly" },
  { id: "romaniaFixed", name: "romania Fixed" },
  { id: "proximityHourly", name: "proximity Hourly" },
  { id: "proximityFixed", name: "proximity Fixed" },
  { id: "remoteHourly", name: "remote Hourly" },
  { id: "remoteFixed", name: "remote Fixed" },
  { id: "othersHourly", name: "others Hourly" },
  { id: "othersFixed", name: "others Fixed" },
];

const exchangeRates: Record<string, number> = {
  USD: 1,
  INR: 0.012,
  NZD: 0.61,
  EUR: 1.07,
  AUD: 0.67,
  GBP: 1.27,
  SGD: 0.74,
  CAD: 0.75,
  HKD: 0.13,
};

function convertToUSD(amount: number, currency: string): number {
  const rate = exchangeRates[currency];
  return rate ? amount * rate : 0;
}

const EndingProjectsPage = () => {
  const handleUpdateProjects = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/projects/update-projects",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating projects:", error);
    }
  };

  const ListActions = () => (
    <TopToolbar>
      <CreateButton />
      <ExportButton />
      <Button
        variant="text"
        color="primary"
        onClick={handleUpdateProjects}
        startIcon={<RefreshIcon />}
        size="small"
      >
        Update Projects
      </Button>
    </TopToolbar>
  );

  return (
    <List
      resource="projects"
      filterDefaultValues={{ displayType: "romaniaHourly" }}
      sort={{ field: "submitDate", order: "ASC" }}
      pagination={false}
      filters={projectsFilters}
      actions={<ListActions />}
    >
      <ProcessedTabbedDatagrid />
    </List>
  );
};

const projectsFilters = [<SearchInput source="q" alwaysOn />];

const useProcessTableData = (data: Project[]): Project[] => {
  return data.map((item) => ({
    ...item,
    // shortDescription: item.description ? item.description.substring(0, 20) : "",
  }));
};

const ProcessedTabbedDatagrid = () => {
  const listContext = useListContext<Project>();
  const { data, filterValues, setFilters, displayedFilters } = listContext;
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm"),
  );

  const currentDisplayType = filterValues.displayType ?? "romaniaHourly";
  const processedData = useProcessTableData(data || []).filter(
    (project) => project.displayType === currentDisplayType,
  );

  // Precompute counts for each tab
  const tabCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    tabs.forEach((tab) => {
      counts[tab.id] = (data || []).filter(
        (p) => p.displayType === tab.id,
      ).length;
    });
    return counts;
  }, [data]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFilters &&
        setFilters({ ...filterValues, displayType: value }, displayedFilters);
    },
    [displayedFilters, filterValues, setFilters],
  );

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.displayType ?? "romaniaHourly"}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={`${choice.name}(${tabCounts[choice.id]})`}
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      {isXSmall ? (
        <MobileGrid />
      ) : (
        <ProjectsTable
          storeKey={
            storeKeyByDisplayType[
              currentDisplayType as keyof typeof storeKeyByDisplayType
            ]
          }
          data={processedData}
        />
      )}
    </Fragment>
  );
};

const ProjectsTable = React.memo(
  ({ storeKey, data }: { storeKey: string; data: Project[] }) => (
    <DataTable storeKey={storeKey} data={data}>
      <DataTable.Col<Project> source="ownerCountry" />
      {/* <DataTable.Col<Project> source="type" /> */}
      {/* <DataTable.Col<Project> source="displayType" /> */}
      <DataTable.Col<Project>
        source="title"
        render={(record) => (
          <span
            onMouseOver={(e) => (e.currentTarget.title = record.description)}
          >
            {record.title}
          </span>
        )}
      />
      <DataTable.Col<Project>
        source="seoUrl"
        label="View on Freelancer"
        render={(record) => (
          <a
            href={`https://www.freelancer.com/projects/${record.seoUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {record.seoUrl}
          </a>
        )}
      />
      <DataTable.Col<Project> source="currency" />
      <DataTable.Col<Project>
        label="Budget (USD)"
        render={(record: any) => {
          const budget = record.budget;
          if (!budget) return null;

          const minUSD = convertToUSD(budget.minimum, record.currency);
          const maxUSD = convertToUSD(budget.maximum, record.currency);

          return (
            <div>
              {minUSD.toFixed(2)} - {maxUSD.toFixed(2)}
            </div>
          );
        }}
      />
      <DataTable.Col<Project>
        label="Average (USD)"
        render={(record: any) => {
          const bidStats = record.bidStats;
          if (!bidStats) return null;

          const averageUSD = convertToUSD(bidStats.bid_avg, record.currency);

          return (
            <div>
              {bidStats.bid_count} - {averageUSD.toFixed(2)}
            </div>
          );
        }}
      />
    </DataTable>
  ),
);

export default EndingProjectsPage;
