import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GithubStats from './GithubStats';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('GithubStats Component unit tests', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders loading skeletons initially', () => {
    // Keep fetch pending
    mockFetch.mockReturnValueOnce(new Promise(() => {}));
    
    const { container } = render(<GithubStats />);
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(container.querySelector('.skeleton-shimmer')).toBeInTheDocument();
  });

  it('renders dynamic stats successfully upon API resolution', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        public_repos: 42,
        followers: 125,
        following: 55
      })
    });

    render(<GithubStats />);

    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Public Repositories')).toBeInTheDocument();
      expect(screen.getByText('@UdeepChowdary')).toBeInTheDocument();
    });
  });

  it('falls back gracefully to static numbers under rate limits or offline errors', async () => {
    // Mock a 403 Rate Limit failure
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403
    });

    render(<GithubStats />);

    await waitFor(() => {
      // Assert that fallback value (18 repos) is rendered rather than 0
      expect(screen.getByText('18')).toBeInTheDocument();
      expect(screen.getByText('Public Repositories')).toBeInTheDocument();
    });
  });
});
