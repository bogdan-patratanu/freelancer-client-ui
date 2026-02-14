import { List, Datagrid, TextField, Pagination, useRecordContext } from 'react-admin';

interface JsonFieldProps {
    source: string;
    label?: string;
}

const JsonField = ({ source }: JsonFieldProps) => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>{JSON.stringify(record[source])}</span>;
};

export const AnalyticsList = () => {
    return (
        <List
            resource="analytics"
            perPage={10}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50]} />}
        >
            <Datagrid >
                <TextField source="createdOn" label="Date" />
                <TextField source="activeStartCount" label="Active Start Count" />
                <TextField source="activeEndCount" label="Active End Count" />
                <JsonField source="data" label="Data" />
            </Datagrid>
        </List>
    );
};

export default AnalyticsList;