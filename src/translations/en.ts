import { TranslationMessages } from 'react-admin';
import englishMessages from 'ra-language-english';

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    resources: {
        projects: {
            name: 'Projects',
            new: 'New',
            ending: 'Ending',
            proximity_hourly: 'Proximity Hourly',
            proximity_fixed: 'Proximity Fixed',
        },
        bids: {
            name: 'Bids',
        },
        notifications: {
            name: 'Notifications',
        },
    },
    ra: {
        ...englishMessages.ra,
        notification: {
            ...englishMessages.ra?.notification,
            use_update_many_ids_required: 'Error: useUpdateMany mutation requires an array of ids',
            no_notifications_selected: 'No notifications selected',
            notifications_marked_as_read: 'Notifications marked as read',
        },
    },
};

export default customEnglishMessages;
