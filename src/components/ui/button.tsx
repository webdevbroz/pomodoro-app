import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        solid:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
          'solid-aqua': 'bg-secondary-aqua text-white hover:bg-white hover:text-secondary-aqua',
          'solid-peach': 'bg-secondary-peach text-white hover:bg-white hover:text-secondary-peach',
          'solid-purple': 'bg-secondary-purple text-white hover:bg-white hover:text-secondary-purple',
          ghost:
            'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
            'ghost-aqua': 'hover:text-secondary-aqua',
            'ghost-peach': 'hover:text-secondary-peach',
            'ghost-purple': 'hover:text-secondary-purple',
      },
      size: {
        default: 'h-10 rounded-md px-4 py-2',
        lg: 'h-10 rounded-3xl px-10',
      },
    },
    defaultVariants: {
      variant: 'solid-peach'  ,
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
