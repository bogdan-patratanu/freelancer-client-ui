import { List, Datagrid, TextField, DateField, Button, useUpdate, useRecordContext, Pagination, useUpdateMany, useNotify, useRefresh, useUnselectAll, BulkDeleteButton, useListContext } from 'react-admin';
import Link from '@mui/material/Link';
import type { ReactNode } from 'react';

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

const BodyWithLinksField = (props: any) => {
    const record = useRecordContext();
    const isRead = record?.isRead;
    const isUnread = isRead === false || isRead === 0 || isRead === 'false' || isRead === '0';

    const body = record?.[props?.source] as unknown;
    const text = typeof body === 'string' ? body : body == null ? '' : String(body);

    const nodes: ReactNode[] = [];
    const anchorRegex = /<a\s+[^>]*href=("|')(.*?)(\1)[^>]*>(.*?)<\/a>/gi;
    const urlRegex = /(https?:\/\/[^\s<]+)/gi;

    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = anchorRegex.exec(text)) !== null) {
        const [fullMatch, , href, , anchorText] = match;
        const start = match.index;

        if (start > lastIndex) {
            const before = text.slice(lastIndex, start);
            let urlMatch: RegExpExecArray | null;
            let urlLastIndex = 0;
            urlRegex.lastIndex = 0;
            while ((urlMatch = urlRegex.exec(before)) !== null) {
                const urlStart = urlMatch.index;
                const url = urlMatch[1];
                if (urlStart > urlLastIndex) {
                    nodes.push(before.slice(urlLastIndex, urlStart));
                }
                nodes.push(
                    <Link key={`url-${nodes.length}`} href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                    </Link>,
                );
                urlLastIndex = urlStart + url.length;
            }
            if (urlLastIndex < before.length) {
                nodes.push(before.slice(urlLastIndex));
            }
        }

        nodes.push(
            <Link key={`a-${nodes.length}`} href={href} target="_blank" rel="noopener noreferrer">
                {anchorText || href}
            </Link>,
        );
        lastIndex = start + fullMatch.length;
    }

    if (lastIndex < text.length) {
        const after = text.slice(lastIndex);
        let urlMatch: RegExpExecArray | null;
        let urlLastIndex = 0;
        urlRegex.lastIndex = 0;
        while ((urlMatch = urlRegex.exec(after)) !== null) {
            const urlStart = urlMatch.index;
            const url = urlMatch[1];
            if (urlStart > urlLastIndex) {
                nodes.push(after.slice(urlLastIndex, urlStart));
            }
            nodes.push(
                <Link key={`url-${nodes.length}`} href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </Link>,
            );
            urlLastIndex = urlStart + url.length;
        }
        if (urlLastIndex < after.length) {
            nodes.push(after.slice(urlLastIndex));
        }
    }

    return (
        <span style={{ fontWeight: isUnread ? 'bold' : 'normal' }}>
            {nodes.length ? nodes : text}
        </span>
    );
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

const MarkAllAsReadButton = () => {
    const { selectedIds } = useListContext();
    const notify = useNotify();
    const refresh = useRefresh();
    const unselectAll = useUnselectAll('notifications');
    const [updateMany, { isLoading }] = useUpdateMany();

    return (
        <Button
            label="Mark all as read"
            onClick={() => {
                if (selectedIds && selectedIds.length > 0) {
                    updateMany(
                        'notifications',
                        { ids: selectedIds, data: { isRead: true } },
                        {
                            onSuccess: () => {
                                notify('ra.notification.notifications_marked_as_read', { type: 'success' });
                                refresh();
                                unselectAll();
                            },
                            onError: (error: any) => notify(`Error: ${error.message}`, { type: 'error' }),
                        }
                    );
                } else {
                    notify('ra.notification.no_notifications_selected', { type: 'warning' });
                }
            }}
            disabled={isLoading}
        />
    );
};

const CustomBulkActionButtons = () => (
    <div>
        <MarkAllAsReadButton />
        <BulkDeleteButton />
    </div>
);

export const NotificationsList = () => {
    return (
        <List
            resource="notifications"
            perPage={10}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50]} />}
        >
            <Datagrid bulkActionButtons={<CustomBulkActionButtons />}>
                <BoldDateField source="createdOn" label="Date" showTime />
                <BoldTextField source="subject" label="Subject" />
                <BodyWithLinksField source="body" label="Message" />
                <MarkAsReadButton />
            </Datagrid>
        </List>
    );
};

export default NotificationsList;