import * as React from "react";
import {
  Typography,
  Box,
  useMediaQuery,
  Theme,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useCallback, Fragment } from "react";
import {
  useTranslate,
  List,
  SearchInput,
  DateInput,
  NumberInput,
  NullableBooleanInput,
  useListContext,
  Count,
  DataTable,
  DateField,
  ReferenceField,
  BooleanField,
} from "react-admin";
import MobileGrid from "./mobileGrid";
import { Project } from "../../types";

// const translate = useTranslate();

const storeKeyByDisplayType = {
  proximityHourly: "projects.list1",
  proximityFixed: "projects.list2",
  remoteHourly: "projects.list3",
  remoteFixed: "projects.list4",
  others: "projects.list5",
};

const tabs = [
  { id: "proximityHourly", name: "proximity Hourly" },
  { id: "proximityFixed", name: "proximity Fixed" },
  { id: "remoteHourly", name: "remote Hourly" },
  { id: "remoteFixed", name: "remote Fixed" },
  { id: "others", name: "others" },
];

const EndingProjectsPage = () => {
  return (
    <List
      resource="projects"
      filterDefaultValues={{ displayType: "proximityHourly" }}
      sort={{ field: "submitDate", order: "ASC" }}
      perPage={10}
      filters={projectsFilters}
      // actions={<ListActions />}
      // title={<OrdersTitle />}
      // queryOptions={{ meta: { embed: "customer" } }}
    >
      <ProcessedTabbedDatagrid />
    </List>
  );
};

const projectsFilters = [
  <SearchInput source="q" alwaysOn />,
  // <ReferenceInput source="customer_id" reference="customers">
  //     <AutocompleteInput
  //         optionText={(choice?: Customer) =>
  //             choice?.id // the empty choice is { id: '' }
  //                 ? `${choice.first_name} ${choice.last_name}`
  //                 : ''
  //         }
  //         sx={{ minWidth: 200 }}
  //     />
  // </ReferenceInput>,
  // <DateInput source="endDate_gte" parse={(d) => new Date(d).toISOString()} />,
  // <DateInput source="endDate_lte" parse={(d) => new Date(d).toISOString()} />,
  // <NumberInput source="total_gte" />,
  // <NullableBooleanInput source="returned" />,
];

const useProcessTableData = (data: Project[]): Project[] => {
  return data.map(item => ({
    ...item,
    shortDescription: item.description ? item.description.substring(0, 50) : '',
    // Add your other custom transformations here
  }));
};

const ProcessedTabbedDatagrid = () => {
  const { data } = useListContext<Project>();
  const processedData = useProcessTableData(data || []);

  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm"),
  );

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
        value={filterValues.displayType ?? "proximityHourly"}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              <span>
                {choice.name} 
                
              </span>
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      {isXSmall ? (
        <MobileGrid />
      ) : (
        <>
          {(filterValues.displayType == null ||
            filterValues.displayType === "proximityHourly") && (
            <ProjectsTable storeKey={storeKeyByDisplayType.proximityHourly} data={processedData} />
          )}

          {filterValues.displayType === "delivered" && (
            <ProjectsTable storeKey={storeKeyByDisplayType.proximityFixed} data={processedData}>
              <Column
                field={BooleanField}
                source="returned"
                align="right"
                sx={{ mt: -0.5, mb: -0.5 }}
              />
            </ProjectsTable>
          )}

          {filterValues.displayType === "cancelled" && (
            <ProjectsTable storeKey={storeKeyByDisplayType.others} data={processedData} />
          )}
        </>
      )}
    </Fragment>
  );
};

const Column = DataTable.Col<Project>;
const ColumnNumber = DataTable.NumberCol<Project>;

const ProjectsTable = React.memo(
  ({
    storeKey,
    data,
    children,
  }: {
    storeKey: string;
    data: Project[];
    children?: React.ReactNode;
  }) => (
    <DataTable
      // rowClick="edit"
      hiddenColumns={[]}
      storeKey={storeKey}
      data={data}
    >
      <ColumnNumber source="id" />
      <Column source="submitDate">
        <DateField source="submitDate" showTime />
      </Column>

      <ColumnNumber source="title" />
      <ColumnNumber source="seoUrl" />
      <ColumnNumber source="currency" />
      <ColumnNumber source="shortDescription" />
      {/* <ColumnNumber
        source="total"
        options={currencyStyle}
        sx={{ fontWeight: "bold" }}
      /> */}
      {children}
    </DataTable>
  ),
);

export default EndingProjectsPage;
