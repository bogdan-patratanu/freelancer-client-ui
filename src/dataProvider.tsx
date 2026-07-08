import crudProvider from "ra-data-nestjsx-crud";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const baseDataProvider = crudProvider(backendUrl);

export const dataProvider = {
  ...baseDataProvider,
  getList: async (resource: string, params: any) => {
    if (resource === "projects") {
      // The "ending soon" projects page relies on the backend's hardcoded
      // active/ending-within-24h filter, regardless of pagination/sort params.
      const res = await fetch(`${backendUrl}/projects?endingSoon=true`);
      const json = await res.json();
      return { data: json.data, total: json.total };
    }
    if (resource === "allProjects") {
      const { page, perPage } = params.pagination;
      const search = params.filter?.q ?? "";
      const url = new URL(`${backendUrl}/projects`);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(perPage));
      if (search) url.searchParams.set("search", search);
      const res = await fetch(url.toString());
      const json = await res.json();
      return { data: json.data, total: json.total };
    }
    return baseDataProvider.getList(resource, params);
  },
  getOne: async (resource: string, params: any) => {
    if (resource === "allProjects") {
      const res = await fetch(`${backendUrl}/projects/${params.id}`);
      return { data: await res.json() };
    }
    return baseDataProvider.getOne(resource, params);
  },
};
