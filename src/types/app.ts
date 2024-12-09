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
