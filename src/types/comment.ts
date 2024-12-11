export type Comment = {
  id: string;
  chainId: string;
  daoId: string | null;
  proposalId: string;
  commenter: string;
  commenterId: string;
  commenterName: string;
  commenterFirstName: string;
  commenterLastName: string;
  commenterPhoto: string;
  deleter: string | null;
  deleterId: string | null;
  deleterName: string | null;
  deleterFirstName: string | null;
  deleterLastName: string | null;
  deleterPhoto: string | null;
  comment: string;
  parentId: string;
  commentStatus: number; // Assuming it's a number (e.g., an enum status)
  createTime: number; // Timestamp in milliseconds
  modificationTime: number; // Timestamp in milliseconds
};
