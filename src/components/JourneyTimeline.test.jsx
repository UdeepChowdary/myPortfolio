import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JourneyTimeline from './JourneyTimeline';

describe('JourneyTimeline Component unit tests', () => {
  it('renders section headers and chronological vertical timeline', () => {
    const { container } = render(<JourneyTimeline />);
    expect(screen.getByRole('heading', { name: /JOURNEY/i })).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
    expect(container.querySelector('.timeline-line')).toBeInTheDocument();
  });

  it('renders all key narrative milestones correctly including updated dates and OSCI 2026', () => {
    render(<JourneyTimeline />);
    
    // Check SRM AP education milestone
    expect(screen.getByRole('heading', { name: /SRM University AP/i })).toBeInTheDocument();
    expect(screen.getByText(/B\.Tech in CSE/i)).toBeInTheDocument();

    // Check Derm-AI AIFT milestone
    expect(screen.getByRole('heading', { name: /AIFT Summer Challenge 2025/i })).toBeInTheDocument();

    // Check GSSoC 2026 milestone (Summer 2026)
    expect(screen.getByRole('heading', { name: /GirlScript Summer of Code \(GSSoC\) 2026/i })).toBeInTheDocument();
    expect(screen.getByText('Summer 2026')).toBeInTheDocument();

    // Check IEEE Genesis Hackathon 2026 (September 2026)
    expect(screen.getByRole('heading', { name: /IEEE Genesis Hackathon 2026/i })).toBeInTheDocument();
    expect(screen.getByText('September 2026')).toBeInTheDocument();

    // Check OSCI 2026 milestone (Sep 2026 – Present)
    expect(screen.getByRole('heading', { name: /Open Source Contribution India \(OSCI\) 2026/i })).toBeInTheDocument();
    expect(screen.getByText('Sep 2026 – Present')).toBeInTheDocument();
  });
});
