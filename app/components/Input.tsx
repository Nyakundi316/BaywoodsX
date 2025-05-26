'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full border border-gray-300 px-4 py-2 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black',
        className
      )}
      {...props}
    />
  );
}
