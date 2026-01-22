import { DataTable, List } from "react-admin";

const UserList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="email" />
      <DataTable.Col source="phone" />
    </DataTable>
  </List>
);

export default UserList;
