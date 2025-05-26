'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export default function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-2 rounded-full font-semibold transition';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-900',
    secondary: 'bg-white text-black border border-black hover:bg-gray-100',
    ghost: 'bg-transparent text-black hover:bg-gray-200',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
