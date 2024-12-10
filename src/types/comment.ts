export type Comment = {
  id: string;
  chainId: string;
  daoId: string | null;
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
  commentStatus: string;
  createTime: number; // Typically a timestamp in milliseconds
  modificationTime: number; // Typically a timestamp in milliseconds
};
