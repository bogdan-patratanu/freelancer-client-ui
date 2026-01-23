export type ThemeName = "light" | "dark";

export type Project = {
  id: number;
  title: string;
  description: string;
  seoUrl: string;
  currency: string;
  submitDate: Date,
  endDate: Date,
  type: string,
  bidPeriod: number,
  
};

declare global {
  interface Window {
    restServer: any;
  }
}
