'use client';

import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-[var(--radius-sm)]',
  md: 'px-6 py-3 text-base rounded-[var(--radius-sm)]',
  lg: 'px-8 py-4 text-lg rounded-[var(--radius-md)]',
};

const variantClasses = {
  primary: [
    'bg-[var(--color-accent-blue)]',
    'text-[var(--color-noir)]',
    'font-semibold',
    'hover:brightness-110',
    'hover:shadow-[var(--shadow-glow)]',
    'active:scale-[0.98]',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),
  outline: [
    'border border-[var(--color-accent-blue)]',
    'text-[var(--color-accent-blue)]',
    'font-semibold',
    'hover:bg-[rgba(0,217,255,0.1)]',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),
  ghost: [
    'text-[var(--color-text-secondary)]',
    'hover:text-white',
    'hover:bg-[var(--color-glass-bg)]',
    'transition-all duration-200',
  ].join(' '),
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
