import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        destructive: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400',
        success: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400',
        outline: 'border border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-300',
        premium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
        achievement: 'bg-gradient-to-r from-purple-400 to-pink-500 text-white',
        level: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants }; 