import {
  DataTable,
  List,
  ReferenceField,
  useRecordContext,
  TextInput,
  ReferenceInput,
} from "react-admin";

const PostPanel = () => {
  const record = useRecordContext();
  return <div>{record?.body}</div>;
};
const PostList = () => {
  const postFilters = [
    <TextInput source="q" label="Cauta" alwaysOn />,
    <ReferenceInput source="userId" reference="users" label="User"/>,
  ];
  return (
    <List filters={postFilters}>
      <DataTable
        sx={{ ".RaDataTable-headerCell": { paddingTop: "50px" } }}
        expand={<PostPanel />}
      >
        <DataTable.Col source="id" />
        <DataTable.Col source="title" />
        <DataTable.Col
          source="body"
          label="Ce a zis ..."
          render={(record) => `${record.body.substring(0, 50)}...`}
        />
        <DataTable.Col source="userId">
          <ReferenceField source="userId" reference="users" />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

export default PostList;
