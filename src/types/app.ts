import { APP_CATEGORY } from "@/constants/discover";
import { LABEL_TYPE, RANKING_TYPE } from "@/constants/vote";
import { ManipulateType } from "dayjs";

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

export type VoteTimeItem = {
  value: number;
  unit: ManipulateType;
  label: string;
}

export type IRankingListItem = {
  alias: string;
  title: string;
  icon: string;
  description: string;
  editorChoice: boolean;
  url: string;
  longDescription: string;
  screenshots: string[];
  voteAmount: number;
  votePercent: number;
  pointsAmount: number;
  pointsPercent: number;
}

export type IPollDetail = {
  startTime: string;
  endTime: string;
  canVoteAmount: number;
  totalVoteAmount: number;
  userTotalPoints: number;
  bannerUrl: string;
  rankingType: RANKING_TYPE;
  labelType: LABEL_TYPE;
  proposalTitle: string;
  rankingList: IRankingListItem[];
  activeStartEpochTime: number;
  activeEndEpochTime: number;
}

export enum ProposalType {
  UNSPECIFIED = 0,
  GOVERNANCE = 1,
  ADVISORY = 2,
  VETO = 3,
  ALL = 'ALL',
}

export enum SupportedELFChainId {
  MAIN_NET = 'AELF',
  TDVV_NET = 'tDVV',
  TDVW_NET = 'tDVW',
}

export type Size = {
  width: number;
  height: number;
}
