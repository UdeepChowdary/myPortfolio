import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GithubStats from './GithubStats';

// Mock react-activity-calendar
vi.mock('react-activity-calendar', () => ({
  ActivityCalendar: () => <div data-testid="github-calendar">Mocked Calendar</div>
}));

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('GithubStats Component unit tests', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders loading skeletons initially', () => {
    // Keep both fetch calls pending
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    const { container } = render(<GithubStats />);
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(container.querySelector('.skeleton-shimmer')).toBeInTheDocument();
  });

  it('renders dynamic stats successfully upon API resolution', async () => {
    // Mock successful resolutions for both API and Calendar fetches
    mockFetch.mockImplementation((url) => {
      if (url.includes('api.github.com')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            public_repos: 42,
            followers: 125,
            following: 55
          })
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({
          total: { "2026": 10 },
          contributions: [{ date: '2026-01-01', count: 1, level: 1 }]
        })
      });
    });

    render(<GithubStats />);

    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Public Repositories')).toBeInTheDocument();
      expect(screen.getByText('@UdeepChowdary')).toBeInTheDocument();
    });
  });

  it('falls back gracefully to static numbers under rate limits or offline errors', async () => {
    // Mock API 403 Rate Limit failure for all fetch requests
    mockFetch.mockImplementation(() => Promise.resolve({
      ok: false,
      status: 403
    }));

    render(<GithubStats />);

    await waitFor(() => {
      // Assert that fallback value (18 repos) is rendered rather than 0
      expect(screen.getByText('18')).toBeInTheDocument();
      expect(screen.getByText('Public Repositories')).toBeInTheDocument();
    });
  });
});
