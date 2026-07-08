export type ThemeName = "light" | "dark";


export interface ProjectBudget {
  minimum?: number;
  maximum?: number;
}

export interface ProjectBidStats {
  bid_count?: number;
  bid_avg?: number;
}

export interface Project {
  id: number;
  remoteId?: number;
  status?: string;
  submitDate: string;
  endDate?: string;
  ownerCountry: string;
  ownerCountryName?: string;
  type: string;
  displayType: string;
  title: string;
  seoUrl: string;
  currency: string;
  description: string;
  shortDescription?: string;
  bidPeriod: number;
  budget?: ProjectBudget;
  bidStats?: ProjectBidStats;
  jobs?: Array<{ id?: number; name?: string }>;
  language?: string;
  timeSubmited?: string;
  timeUpdated?: string;
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
