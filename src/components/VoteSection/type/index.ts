export type VoteSectionType = {
  chainId: string;
  proposalId: string;
  daoId: string;
  proposalTitle: string;
  proposalIcon: string;
  proposalDescription: string;
  totalVoteAmount: number;
  activeStartTime: string;
  activeEndTime: string;
  activeStartEpochTime: number;
  activeEndEpochTime: number;
  active: boolean;
  tag: '' | 'Trending';
  bannerUrl: string;
  proposalType: 'AD' | '';
  ProposerFirstName: string;
}
