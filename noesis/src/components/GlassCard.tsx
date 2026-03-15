import { ReactNode } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'relative',
        'bg-[var(--color-glass-bg)]',
        'backdrop-blur-[10px]',
        'border border-[var(--color-glass-border)]',
        'rounded-[var(--radius-md)]',
        'p-6',
        'shadow-[var(--shadow-glass)]',
        'transition-all duration-300',
        'hover:bg-[var(--color-glass-bg-hover)]',
        'hover:border-[var(--color-glass-border-hover)]',
        onClick ? 'cursor-pointer' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
