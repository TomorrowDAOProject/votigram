export type VoteApp = {
  alias: string;
  appType: string;
  categories: string[];
  createTime: string; // or Date if you prefer to handle it as a Date object
  creator: string;
  description: string;
  editorChoice: boolean;
  icon: string;
  id: string;
  loadTime: string; // or Date if you prefer to handle it as a Date object
  longDescription: string;
  screenshots: string[];
  title: string;
  updateTime: string; // or Date if you prefer to handle it as a Date object
  url: string;
  pointsAmount?: number;
  totalLikes?: number;
  totalComments?: number;
  totalOpens?: number;
};
