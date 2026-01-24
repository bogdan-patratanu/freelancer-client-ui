import crudProvider from "ra-data-nestjsx-crud";

export const dataProvider = crudProvider(import.meta.env.BACKEND_URL);
