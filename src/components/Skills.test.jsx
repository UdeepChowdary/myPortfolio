import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';

describe('Skills Component unit tests', () => {
    it('renders section title and metadata header', () => {
        render(<Skills />);
        expect(screen.getByRole('heading', { name: /CAPABILITIES/i })).toBeInTheDocument();
        expect(screen.getByText(/SPEC SHEET \/\/ 2026/i)).toBeInTheDocument();
        expect(screen.getByText(/VERIFIED STACK/i)).toBeInTheDocument();
    });

    it('renders all three engineering disciplines', () => {
        render(<Skills />);
        
        expect(screen.getByText('AI & INTELLIGENT SYSTEMS')).toBeInTheDocument();
        expect(screen.getByText('FULL-STACK PLATFORMS')).toBeInTheDocument();
        expect(screen.getByText('SYSTEMS, AIOps & FOUNDATIONS')).toBeInTheDocument();
    });

    it('renders key technical skills and verified roles', () => {
        render(<Skills />);
        
        // Key technologies
        expect(screen.getByText('Gemini API')).toBeInTheDocument();
        expect(screen.getByText('Multimodal Agents & Vision')).toBeInTheDocument();

        expect(screen.getByText('React 19 & Next.js')).toBeInTheDocument();
        expect(screen.getByText('Python')).toBeInTheDocument();

        expect(screen.getByText('AIOps Automation')).toBeInTheDocument();
        expect(screen.getByText('DSA & Algorithms')).toBeInTheDocument();
    });

    it('renders proof references for disciplines', () => {
        render(<Skills />);
        expect(screen.getByText(/Derm\.AI/i)).toBeInTheDocument();
        expect(screen.getByText(/AlgoViz Studio/i)).toBeInTheDocument();
        expect(screen.getByText(/IEEE Genesis 2026/i)).toBeInTheDocument();
    });
});
