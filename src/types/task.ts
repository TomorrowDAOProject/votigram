export type TaskInfo = {
  points: number;
  userTaskDetail: string;
  complete: boolean;
  completeCount: number;
  taskCount: number;
};

export type TaskModule = {
  totalCount: number;
  userTask: string;
  data: TaskInfo[];
};

export type InviteDetail = {
  estimatedReward: number;
  accountCreation: number;
  votigramVote: number;
  votigramActivityVote: number;
  estimatedRewardAll: number;
  accountCreationAll: number;
  votigramVoteAll: number;
  votigramActivityVoteAll: number;
  startTime: number;
  endTime: number;
  duringCycle: boolean;
  address: string;
  caHash: string;
  totalInvitesNeeded: number;
  pointsFirstReferralVote: number;
};

export type ShortLinkRes = {
  shortLink: string;
  userGrowthInfo: {
    caHash: string;
    projectCode: string;
    inviteCode: string;
    shortLinkCode: string;
  };
};

export type IStartAppParams = {
  pid?: string;
  referralCode?: string;
  source?: string;
};

export type ReferralTimeConfig = {
  startTime: number;
  endTime: number;
};

export type InviteItem = {
  rank: number;
  inviter: string;
  inviterCaHash: string;
  inviteAndVoteCount: number;
};
