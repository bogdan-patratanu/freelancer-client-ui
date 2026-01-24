import crudProvider from "ra-data-nestjsx-crud";

export const dataProvider = crudProvider(import.meta.env.VITE_BACKEND_URL);
