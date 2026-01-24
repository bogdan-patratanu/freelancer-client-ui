export type ThemeName = "light" | "dark";


export interface Project {
  id: number;
  submitDate: string;
  ownerCountry: string;
  type: string;
  displayType: string;
  title: string;
  seoUrl: string;
  currency: string;
  description: string;
  shortDescription?: string;
  bidPeriod: number;
}
declare global {
  interface Window {
    restServer: any;
  }
}
