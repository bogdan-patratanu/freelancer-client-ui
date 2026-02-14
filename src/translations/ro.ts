import { TranslationMessages } from 'react-admin';
import romanianMessages from 'ra-language-romanian';


const customRomanianMessages: TranslationMessages = {
    ...romanianMessages,
    ra: {
        ...romanianMessages.ra,
        notification: {
            ...romanianMessages.ra?.notification,
            application_update_available: 'O nouă versiune este disponibilă. Vă rugăm să reîncărcați.',
            offline: 'Offline',
            use_update_many_ids_required: 'Eroare: mutația useUpdateMany necesită un array de id-uri',
            no_notifications_selected: 'Nu ați selectat nicio notificare',
            notifications_marked_as_read: 'Notificările au fost marcate ca citite',
        },
    },
    resources: {
        projects: {
            name: 'Proiecte',
            new: 'Nou',
            ending: 'Se termină',
            proximity_hourly: 'Proximitate orară',
            proximity_fixed: 'Proximitate fixă',
        },
        bids: {
            name: 'Oferte',
        },
        notifications: {
            name: 'Notificări',
        },
        analytics: {
            name: 'Analitice',
        },
    },
};

export default customRomanianMessages;