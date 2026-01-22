export type ThemeName = "light" | "dark";

export type Project = {};

declare global {
  interface Window {
    restServer: any;
  }
}
