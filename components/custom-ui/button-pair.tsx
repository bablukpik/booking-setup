import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type ButtonPairProps = {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryIcon?: ReactNode;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

/**
 * Reusable paired buttons (secondary + primary).
 * Defaults match the existing Cancel/Next layout, but labels,
 * handlers, and classes can be overridden per usage.
 */
export function ButtonPair({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryIcon,
  className = '',
  primaryClassName = '',
  secondaryClassName = '',
}: ButtonPairProps) {
  return (
    <div className={`flex gap-5 ${className}`}>
      <Button
        variant="outline"
        className={`px-3 py-2 bg-transparent cursor-pointer font-medium text-[14px] leading-[20px] ${secondaryClassName}`}
        onClick={onSecondary}
      >
        {secondaryLabel}
      </Button>
      <Button
        className={`px-3 py-2 gap-2 bg-[#072AC8] hover:bg-blue-700 cursor-pointer font-medium text-[14px] leading-[20px] ${primaryClassName}`}
        onClick={onPrimary}
      >
        {primaryLabel}
        {primaryIcon ?? <ChevronRight className="h-4 w-4" />}
      </Button>
    </div>
  );
}
