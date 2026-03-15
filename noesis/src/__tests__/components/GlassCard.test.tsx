import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GlassCard } from '@/components/GlassCard';

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard>Hello</GlassCard>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies backdrop-blur class', () => {
    const { container } = render(<GlassCard>content</GlassCard>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toMatch(/backdrop-blur/);
  });

  it('applies border class for glass border', () => {
    const { container } = render(<GlassCard>content</GlassCard>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('border');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<GlassCard onClick={onClick}>click me</GlassCard>);
    fireEvent.click(screen.getByText('click me'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('accepts className override', () => {
    const { container } = render(<GlassCard className="custom-class">x</GlassCard>);
    expect((container.firstChild as HTMLElement).className).toContain('custom-class');
  });
});
