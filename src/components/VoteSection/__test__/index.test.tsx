// VoteSection.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import VoteSection from '../index';
import { voteSection } from "@/__mocks__/VoteApp";
import { VoteSectionType } from '../type';

const sampleData: VoteSectionType = voteSection[0];

describe('VoteSection Component', () => {
  it('renders the vote title, dates, and total votes', () => {
    render(<VoteSection data={sampleData} />);
    
    expect(screen.getByText('Annual Conference')).toBeInTheDocument();
    
    // Use a regular expression to match the date range text
    const dateRegEx = /20 Oct 2023\s*-\s*20 Oct 2023/;
    expect(screen.getByText(dateRegEx)).toBeInTheDocument();

    // Check if the total votes are formatted correctly
    expect(screen.getByText('Total votes:')).toBeInTheDocument();
    expect(screen.getByText('150,000,000')).toBeInTheDocument();
  });

  it('renders banner image when bannerUrl is provided', () => {
    render(<VoteSection data={sampleData} />);
    const bannerImage = screen.getByAltText('Banner');
    expect(bannerImage).toHaveAttribute('src', sampleData.bannerUrl);
  });

  it('renders default avatar when avatarUrl is not provided', () => {
    const dataWithoutAvatar = { ...sampleData, avatarUrl: undefined };
    render(<VoteSection data={dataWithoutAvatar} />);
    
    // Locate the <i> element inside the default avatar div
    const defaultAvatarIcon = screen.getByText('Created by John Doe').parentElement?.querySelector('i.votigram-icon-profile');
    expect(defaultAvatarIcon).toBeInTheDocument();
  });

  it('renders avatar image when avatarUrl is provided', () => {
    render(<VoteSection data={sampleData} />);
    const avatarImage = screen.getByAltText('Avatar');
    expect(avatarImage).toHaveAttribute('src', sampleData.bannerUrl);
  });

  it('applies custom className to container', () => {
    render(<VoteSection data={sampleData} className="custom-class" />);
    const container = screen.getByText('Annual Conference').closest('div');
    expect(container).toHaveClass('custom-class');
  });
});