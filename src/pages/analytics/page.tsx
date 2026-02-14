import { List, Datagrid, TextField, Pagination, useRecordContext } from 'react-admin';

interface JsonFieldProps {
    source: string;
    label?: string;
}

const JsonField = ({ source }: JsonFieldProps) => {
    const record = useRecordContext();
    if (!record) return null;
    
    const data = record[source];
    if (!data) return <span>No data</span>;
    
    // If it's an array, loop through it
    if (Array.isArray(data)) {
        return (
            <div>
                {data.map((item, index) => (
                    <div key={index}>
                        {item.status && item.total ? `${item.status} -> ${item.total}` : JSON.stringify(item)}
                    </div>
                ))}
            </div>
        );
    }
    
    // If it's an object, loop through its keys
    if (typeof data === 'object' && data !== null) {
        return (
            <div>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </div>
                ))}
            </div>
        );
    }
    
    // For primitive values
    return <span>{String(data)}</span>;
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