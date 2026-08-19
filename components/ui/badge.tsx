import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'high' | 'medium' | 'measurement' | 'demo';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'high', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md px-3 py-1 text-xs font-medium',
          {
            'bg-success-light text-success-dark': variant === 'high',
            'bg-warning-light text-warning-dark': variant === 'medium',
            'bg-brand-grey-100 text-brand-grey-700': variant === 'measurement',
            'bg-neutral-200 text-neutral-700 border border-neutral-300':
              variant === 'demo',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
