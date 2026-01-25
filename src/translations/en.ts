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
};

export default customEnglishMessages;
