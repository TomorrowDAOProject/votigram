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