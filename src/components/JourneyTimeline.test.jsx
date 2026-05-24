import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JourneyTimeline from './JourneyTimeline';

describe('JourneyTimeline Component unit tests', () => {
  it('renders section headers and chronological path lines', () => {
    const { container } = render(<JourneyTimeline />);
    expect(screen.getByRole('heading', { name: /My Journey/i })).toBeInTheDocument();
    expect(container.querySelector('.timeline-glow-line')).toBeInTheDocument();
  });

  it('renders all key narrative milestones correctly', () => {
    render(<JourneyTimeline />);
    
    // Check SRM AP education milestone
    expect(screen.getByText(/SRM University AP/i)).toBeInTheDocument();
    expect(screen.getByText(/B.Tech in CSE/i)).toBeInTheDocument();

    // Check Derm-AI AIFT milestone
    expect(screen.getByText(/AIFT Summer Challenge 2025/i)).toBeInTheDocument();

    // Check GSSoC 2026 milestone
    expect(screen.getByText(/GirlScript Summer of Code \(GSSoC\) 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/Selected Open Source Contributor/i)).toBeInTheDocument();
  });

  it('alternates left and right layouts cleanly for items', () => {
    const { container } = render(<JourneyTimeline />);
    const items = container.querySelectorAll('.journey-item');
    
    expect(items.length).toBeGreaterThanOrEqual(4);
    
    // Assert alternating CSS alignment tags
    expect(items[0]).toHaveClass('left');
    expect(items[1]).toHaveClass('right');
    expect(items[2]).toHaveClass('left');
    expect(items[3]).toHaveClass('right');
  });
});
