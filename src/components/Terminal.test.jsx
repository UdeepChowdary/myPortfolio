import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Terminal from './Terminal';

describe('Terminal Component unit tests', () => {
  it('does not render when isOpen is false', () => {
    render(<Terminal isOpen={false} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(screen.queryByText(/Welcome to UdeepOS/i)).not.toBeInTheDocument();
  });

  it('renders Welcome header and prompt when isOpen is true', async () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(screen.getByText(/Welcome to UdeepOS v1.0.0/i)).toBeInTheDocument();
    expect(screen.getByText(/visitor@udeep-portfolio/i)).toBeInTheDocument();
  });

  it('executes help command correctly', async () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByRole('textbox');
    
    // Simulate user typing "help" and hitting enter
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Verify terminal prints commands guide
    expect(screen.getByText(/Available commands:/i)).toBeInTheDocument();
  });

  it('clears history when "clear" command is executed', () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByRole('textbox');

    // Verify welcome text initially present
    expect(screen.getByText(/Welcome to UdeepOS v1.0.0/i)).toBeInTheDocument();

    // Type "clear" and hit enter
    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Verify welcome text is cleared
    expect(screen.queryByText(/Welcome to UdeepOS v1.0.0/i)).not.toBeInTheDocument();
  });

  it('calls onClose when "exit" command is executed', () => {
    const mockClose = vi.fn();
    render(<Terminal isOpen={true} onClose={mockClose} onOpen={vi.fn()} />);
    const input = screen.getByRole('textbox');

    // Type "exit" and hit enter
    fireEvent.change(input, { target: { value: 'exit' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
