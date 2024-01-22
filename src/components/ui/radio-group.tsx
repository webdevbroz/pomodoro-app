import * as React from 'react';
import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

type RadioItemVariant = 'colour' | 'font';

interface RadioGroupProps {
  isSelected?: boolean;
  variant?: RadioItemVariant;
  selectedText?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & RadioGroupProps
>(({ className, isSelected, variant, selectedText, ...props }, ref) => {
  const renderIndicator = () => {
    switch (variant) {
      case 'colour':
        return <div className="font-bold text-black">✓</div>;
      case 'font':
        if (selectedText) {
          return (
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full font-bold text-on-dark-background dark:bg-app-background">
              {selectedText}
            </div>
          );
        }
      default:
        return <Circle className="h-2.5 w-2.5 fill-current text-current" />;
    }
  };

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-slate-200 border-slate-900 text-slate-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {renderIndicator()}
      </RadioGroupPrimitive.Indicator>
      {selectedText && (
        <div className="flex items-center justify-center text-black">{isSelected ? null : selectedText}</div> // Render text next to the radio item
      )}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
