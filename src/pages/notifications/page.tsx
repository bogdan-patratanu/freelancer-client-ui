import { List, Datagrid, TextField, DateField, Button, useUpdate, useRecordContext } from 'react-admin';

const BoldTextField = (props: any) => {
    const record = useRecordContext();
    const isRead = record?.isRead;
    const isUnread = isRead === false || isRead === 0 || isRead === 'false' || isRead === '0';
    
    return <TextField {...props} sx={{ fontWeight: isUnread ? 'bold' : 'normal' }} />;
};

const BoldDateField = (props: any) => {
    const record = useRecordContext();
    const isRead = record?.isRead;
    const isUnread = isRead === false || isRead === 0 || isRead === 'false' || isRead === '0';
    
    return <DateField {...props} sx={{ fontWeight: isUnread ? 'bold' : 'normal' }} />;
};

const MarkAsReadButton = () => {
    const record = useRecordContext();
    const [update, { isLoading }] = useUpdate();
    
    // Handle different data types for isRead property
    const isRead = record?.isRead;
    const isNotificationRead = isRead === true || isRead === 1 || isRead === 'true' || isRead === '1';
    
    if (!record || isNotificationRead) return null;
    
    return (
        <Button 
            label="Mark as Read"
            onClick={() => update('notifications', { id: record.id, data: { isRead: true }, previousData: record })}
            disabled={isLoading}
        />
    );
};

export const NotificationsList = () => {
    return (
        <List resource="notifications" perPage={10}>
            <Datagrid>
                <BoldDateField source="createdOn" label="Date" showTime />
                <BoldTextField source="subject" label="Subject" />
                <BoldTextField source="body" label="Message" />
                <MarkAsReadButton />
            </Datagrid>
        </List>
    );
};

export default NotificationsList;