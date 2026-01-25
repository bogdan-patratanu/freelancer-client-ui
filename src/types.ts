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

export interface Notification {
  id: number;
  createdOn: Date;
  subject: string;
  body: string;
  dataBlock: any;
  isRead: boolean;
}

declare global {
  interface Window {
    restServer: any;
  }
}
