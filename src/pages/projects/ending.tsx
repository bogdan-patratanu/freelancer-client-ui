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

const translate = useTranslate();

const storeKeyByStatus = {
  proximityHourly: "projects.list1",
  proximityFixed: "projects.list2",
  remoteHourly: "projects.list3",
  remoteFixed: "projects.list4",
  others: "projects.list5",
};

const tabs = [
  { id: "proximityHourly", name: "proximityHourly" },
  { id: "proximityFixed", name: "proximityFixed" },
  { id: "remoteHourly", name: "remoteHourly" },
  { id: "remoteFixed", name: "remoteFixed" },
  { id: "others", name: "others" },
];

const EndingProjectsPage = () => {
  return (
    <List
      filterDefaultValues={{ status: "ordered" }}
      sort={{ field: "submitDate", order: "ASC" }}
      perPage={25}
      filters={projectsFilters}
      // actions={<ListActions />}
      // title={<OrdersTitle />}
      queryOptions={{ meta: { embed: "customer" } }}
    >
      <TabbedDatagrid />
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
  <DateInput
    source="submitDate_gte"
    parse={(d) => new Date(d).toISOString()}
  />,
  <DateInput
    source="submitDate_lte"
    parse={(d) => new Date(d).toISOString()}
  />,
  // <NumberInput source="total_gte" />,
  // <NullableBooleanInput source="returned" />,
];

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm"),
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFilters &&
        setFilters({ ...filterValues, status: value }, displayedFilters);
    },
    [displayedFilters, filterValues, setFilters],
  );

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status ?? "ordered"}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              <span>
                {choice.name} (
                <Count
                  filter={{
                    ...filterValues,
                    status: choice.name,
                  }}
                  sx={{ lineHeight: "inherit" }}
                />
                )
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
          {(filterValues.status == null ||
            filterValues.status === "ordered") && (
            <ProjectsTable storeKey={storeKeyByStatus.proximityHourly} />
          )}
          {filterValues.status === "delivered" && (
            <ProjectsTable storeKey={storeKeyByStatus.proximityFixed}>
              <Column
                field={BooleanField}
                source="returned"
                align="right"
                sx={{ mt: -0.5, mb: -0.5 }}
              />
            </ProjectsTable>
          )}
          {filterValues.status === "cancelled" && (
            <ProjectsTable storeKey={storeKeyByStatus.others} />
          )}
        </>
      )}
    </Fragment>
  );
};

const Column = DataTable.Col<Project>;
const ColumnNumber = DataTable.NumberCol<Project>;

const currencyStyle = {
  style: "currency" as const,
  currency: "USD",
};

const ProjectsTable = React.memo(
  ({
    storeKey,
    children,
  }: {
    storeKey: string;
    children?: React.ReactNode;
  }) => (
    <DataTable
      rowClick="edit"
      hiddenColumns={["total_ex_taxes", "delivery_fees", "taxes"]}
      storeKey={storeKey}
    >
      <Column source="date">
        <DateField source="date" showTime />
      </Column>
      <Column source="reference" />
      {/* FIXME: Sort by reference field does not work with ra-data-graphql */}
      <Column
        source="customer.last_name"
        label="resources.orders.fields.customer_id"
      >
        {/* <CustomerReferenceField /> */}
      </Column>
      <Column label="resources.orders.fields.address">
        <ReferenceField source="customer_id" reference="customers" link={false}>
          {/* <AddressField /> */}
        </ReferenceField>
      </Column>
      <ColumnNumber
        source="basket.length"
        label="resources.orders.fields.nb_items"
      />
      <ColumnNumber source="total_ex_taxes" options={currencyStyle} />
      <ColumnNumber source="delivery_fees" options={currencyStyle} />
      <ColumnNumber source="taxes" options={currencyStyle} />
      <ColumnNumber
        source="total"
        options={currencyStyle}
        sx={{ fontWeight: "bold" }}
      />
      {children}
    </DataTable>
  ),
);

export default EndingProjectsPage;
