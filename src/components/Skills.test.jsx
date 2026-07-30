import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';

describe('Skills Component unit tests', () => {
    it('renders section title and tech stack badge', () => {
        render(<Skills />);
        expect(screen.getByRole('heading', { name: /Technical Skills/i })).toBeInTheDocument();
        expect(screen.getByText(/TECH STACK & CAPABILITIES/i)).toBeInTheDocument();
    });

    it('renders user skills across all 4 symmetrical categories', () => {
        render(<Skills />);
        
        // Category headers
        expect(screen.getByRole('heading', { name: 'Languages & Core CS' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Full Stack Web' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'AI & Data Systems' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Tools & OS Systems' })).toBeInTheDocument();

        // Skill chips
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('React.js')).toBeInTheDocument();
        expect(screen.getByText('Gemini API')).toBeInTheDocument();
        expect(screen.getByText('Git & GitHub')).toBeInTheDocument();
    });

    it('filters category cards cleanly using filter pills', () => {
        render(<Skills />);
        
        const aiTab = screen.getByRole('button', { name: /^AI & Data$/i });
        fireEvent.click(aiTab);

        expect(screen.getByRole('heading', { name: 'AI & Data Systems' })).toBeInTheDocument();
        expect(screen.getByText('Gemini API')).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Languages & Core CS' })).not.toBeInTheDocument();
    });
});
