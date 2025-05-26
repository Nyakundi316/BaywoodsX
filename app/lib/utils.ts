// app/lib/utils.ts

/**
 * A utility function that joins class names conditionally.
 * Example: cn('px-4', isActive && 'bg-black') → "px-4 bg-black"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
