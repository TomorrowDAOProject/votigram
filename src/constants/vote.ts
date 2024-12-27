import { VoteType } from "@/types/app";

export enum CREATE_STATUS {
  PENDDING = -1,
  FAILED = 0,
  SUCCESS = 1,
}

export enum COMMUNITY_LABEL {
  ARCHIVED = "Archived",
  CURRENT = "Current",
}

export enum COMMUNITY_TYPE {
  ACCUMULATIVE = "Accumulative",
  CURRENT = "Current",
}

export enum VOTE_TABS {
  TMAS = "TMAs",
  COMMUNITY = "Community",
}

export enum PROFILE_TABS {
  TASK = "Task",
  ACHIEVEMENTS = "Achievements",
}

export enum PROFILE_TABS {
  TASK = 'Task',
  ACHIEVEMENTS = 'Achievements'
}

export enum RANKING_TYPE {
  All = 0,
  Verified = 1,
  Community = 2,
  Top = 3,
}

export enum LABEL_TYPE {
  None = 0,
  Gold = 1,
  Blue = 2,
}

export enum VOTE_STATUS {
  NOTVOTE = 0,
  VOTING = 1,
  VOTED = 2,
  FAILED = 9,
}

export enum VOTE_CATEGORY {
  ALL = 9,
  GAME = 0,
  EARN = 1,
  FINANCE = 2,
  SOCIAL = 3,
  UTILITY = 4,
  INFORMATION = 5,
  ECOMMERCE = 6,
}

export const VOTE_CATEGORY_MAP = {
  [VOTE_CATEGORY.ALL]: "✅ All",
  [VOTE_CATEGORY.GAME]: "🎮 Game",
  [VOTE_CATEGORY.EARN]: "💰 Earn",
  [VOTE_CATEGORY.FINANCE]: "💵 Finance",
  [VOTE_CATEGORY.SOCIAL]: "💬 Social",
  [VOTE_CATEGORY.UTILITY]: "🔩 Utility",
  [VOTE_CATEGORY.INFORMATION]: "💰 Information",
  [VOTE_CATEGORY.ECOMMERCE]: "🛒 E-commerce",
};

export const DISCOVER_CATEGORY_LIST: VoteType[] = [
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.ALL],
    value: VOTE_CATEGORY.ALL,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.GAME],
    value: VOTE_CATEGORY.GAME,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.EARN],
    value: VOTE_CATEGORY.EARN,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.FINANCE],
    value: VOTE_CATEGORY.FINANCE,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.SOCIAL],
    value: VOTE_CATEGORY.SOCIAL,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.UTILITY],
    value: VOTE_CATEGORY.UTILITY,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.INFORMATION],
    value: VOTE_CATEGORY.INFORMATION,
  },
  {
    label: VOTE_CATEGORY_MAP[VOTE_CATEGORY.ECOMMERCE],
    value: VOTE_CATEGORY.ECOMMERCE,
  },
];
