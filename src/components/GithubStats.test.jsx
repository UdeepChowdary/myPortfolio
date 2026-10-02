import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GithubStats from './GithubStats';

// Mock react-github-calendar
vi.mock('react-github-calendar', () => ({
  GitHubCalendar: ({ username }) => (
    <div data-testid="github-calendar">Mocked Heatmap for {username}</div>
  )
}));

describe('GithubStats Component unit tests', () => {
  it('renders section title and metadata header for GITHUB HEATMAP', () => {
    render(<GithubStats />);
    expect(screen.getByRole('heading', { name: /GITHUB HEATMAP/i })).toBeInTheDocument();
    expect(screen.getByText('07')).toBeInTheDocument();
  });

  it('renders GitHub handle and profile link', () => {
    render(<GithubStats />);
    expect(screen.getByText('UDEEPCHOWDARY')).toBeInTheDocument();
    expect(screen.getByText(/COMMIT TELEMETRY/i)).toBeInTheDocument();
    
    const profileLink = screen.getByRole('link', { name: /Visit GitHub Profile/i });
    expect(profileLink).toHaveAttribute('href', 'https://github.com/UdeepChowdary');
  });

  it('renders live status indicator and footer telemetry', () => {
    render(<GithubStats />);
    expect(screen.getByText(/LIVE FEED/i)).toBeInTheDocument();
    expect(screen.getByText(/YEAR-ROUND ENGINEERING ACTIVITY/i)).toBeInTheDocument();
  });

  it('mounts the GitHubCalendar with UdeepChowdary username', () => {
    render(<GithubStats />);
    expect(screen.getByTestId('github-calendar')).toHaveTextContent('Mocked Heatmap for UdeepChowdary');
  });
});
