import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('primary variant has accent-blue background', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect((container.firstChild as HTMLElement).className).toMatch(/accent-blue/);
  });

  it('outline variant has border and accent-blue text', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    const className = (container.firstChild as HTMLElement).className;
    expect(className).toMatch(/border/);
    expect(className).toMatch(/accent-blue/);
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByText('Go'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('disabled prevents click', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    const btn = screen.getByText('Disabled').closest('button')!;
    expect(btn).toBeDisabled();
  });
});
