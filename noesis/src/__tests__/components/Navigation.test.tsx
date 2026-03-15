import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navigation } from '@/components/Navigation';

// Mock next/link for tests
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Navigation', () => {
  it('renders Noesis logo', () => {
    render(<Navigation />);
    expect(screen.getByText('Noesis')).toBeInTheDocument();
  });

  it('renders Topics button', () => {
    render(<Navigation />);
    expect(screen.getByText('Topics')).toBeInTheDocument();
  });

  it('hamburger button is present', () => {
    render(<Navigation />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('hamburger toggles mobile menu', () => {
    render(<Navigation />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    // After open, all 7 topics should be visible in mobile menu
    expect(screen.getByText('Data Sources')).toBeInTheDocument();
    expect(screen.getByText('AI in Data Management')).toBeInTheDocument();
  });

  it('shows all 7 topic titles in mobile menu', () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    const expectedTopics = [
      'Data Sources', 'Data Integration', 'Data Quality',
      'Master Data Management', 'Reverse Integration',
      'Data Governance', 'AI in Data Management',
    ];
    expectedTopics.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
