import * as React from "react";
import {
  List,
  DataTable,
  SearchInput,
  Pagination,
  TopToolbar,
  ExportButton,
} from "react-admin";
import { Project } from "../../types";

const projectFilters = [
  <SearchInput
    source="q"
    alwaysOn
    placeholder="Search by id, title or description"
  />,
];

const ListActions = () => (
  <TopToolbar>
    <ExportButton />
  </TopToolbar>
);

const ProjectsPagination = () => (
  <Pagination rowsPerPageOptions={[25, 50, 100]} />
);

const AllProjectsPage = () => (
  <List
    resource="allProjects"
    perPage={25}
    pagination={<ProjectsPagination />}
    filters={projectFilters}
    sort={{ field: "id", order: "DESC" }}
    actions={<ListActions />}
  >
    <DataTable rowClick={(id) => `/all-projects/${id}`}>
      <DataTable.Col<Project> source="id" disableSort />
      <DataTable.Col<Project> source="title" disableSort />
      <DataTable.Col<Project> source="status" disableSort />
      <DataTable.Col<Project>
        source="submitDate"
        label="Submit date"
        disableSort
        render={(record) =>
          record.submitDate ? new Date(record.submitDate).toLocaleString() : ""
        }
      />
      <DataTable.Col<Project>
        label="Owner Country"
        disableSort
        render={(record) => record.ownerCountryName}
      />
    </DataTable>
  </List>
);

export default AllProjectsPage;
