import { APP_CATEGORY } from "@/constants/discover";

export type VoteApp = {
  alias: string;
  appType: string;
  categories: APP_CATEGORY[];
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

export type CommentItem = {
  id: string;
  chainId: string;
  daoId: string;
  proposalId: string;
  alias: string;
  commenter: string;
  commenterId: string;
  commenterName: string;
  commenterFirstName: string;
  commenterLastName: string;
  commenterPhoto: string;
  comment: string;
  parentId: string;
  commentStatus: number;
  createTime: number;
  modificationTime: number;
}

export type VoteSection = {
  creator: string;
  avatarUrl?: string;
  title: string;
  startTime: string;
  endTime: string;
  totalVotes: number;
  bannerUrl?: string;
}

export type VoteItem = {
  id: number;
  rank?: number;
  title: string;
  amount: number;
  avatar?: string;
  hatIcon?: string;
  voted: boolean;
  progress: number;
  isVoted?: boolean;
}

export type Size = {
  width: number;
  height: number;
}
