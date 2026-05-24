import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from './Contact';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Contact Component unit tests', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders all form input fields and buttons', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('blocks form submissions client-side if the spam honeypot is filled out', async () => {
    render(<Contact />);
    
    // Fill standard fields
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Spam Bot' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'bot@spam.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Message/i), { target: { value: 'Buy this product!' } });

    // Fill honeypot field (simulating a bot)
    const honeypot = screen.getByLabelText(/Do not fill this out if you are human/i);
    fireEvent.change(honeypot, { target: { value: 'gotcha-filled' } });

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    // Assert that status is marked success but no fetch request was actually made
    await waitFor(() => {
      expect(screen.getByText(/Message sent! I'll get back to you soon./i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('performs dynamic fetch calls on normal human form submissions', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    render(<Contact />);
    
    // Fill human fields
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Udeep' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'udeep@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Message/i), { target: { value: 'Hello from a human!' } });

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    // Verify fetch was dispatched to the endpoint
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Message sent! I'll get back to you soon./i)).toBeInTheDocument();
    });
  });
});
