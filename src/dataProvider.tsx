import crudProvider from "ra-data-nestjsx-crud";

export const dataProvider = crudProvider(import.meta.env.VITE_JSON_SERVER_URL);
