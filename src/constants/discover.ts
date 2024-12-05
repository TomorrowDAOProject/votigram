export enum APP_CATEGORY {
  NEW,
  GAME,
  EARN,
  FINANCE,
  SOCIAL,
  UTILITIES,
  INFORMATION,
  ECOMMERCE,
}

export const DISCOVER_CATEGORY: {
  value: APP_CATEGORY;
  label: string;
}[] = [
  {
    value: APP_CATEGORY.NEW,
    label: "💰 New",
  },
  {
    value: APP_CATEGORY.GAME,
    label: "🎮 Game",
  },
  {
    value: APP_CATEGORY.EARN,
    label: "💰 Earn",
  },
  {
    value: APP_CATEGORY.FINANCE,
    label: "💵 Finance",
  },
  {
    value: APP_CATEGORY.SOCIAL,
    label: "💬 Social",
  },
  {
    value: APP_CATEGORY.UTILITIES,
    label: "🔩 Utility",
  },
  {
    value: APP_CATEGORY.INFORMATION,
    label: "💰 Information",
  },
  {
    value: APP_CATEGORY.ECOMMERCE,
    label: "🛒 E-commerce",
  },
];
