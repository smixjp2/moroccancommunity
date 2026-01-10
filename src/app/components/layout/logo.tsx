
// This component is not imported anywhere yet.
// It will be used in the header and footer in subsequent steps.
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      {...props}
    >
        <path d="M0 0H18V18H0V0Z" fill="hsl(var(--foreground))" fillOpacity="0.8"/>
        <path d="M24 24H42V42H24V24Z" fill="hsl(var(--foreground))" fillOpacity="0.8"/>
        <path d="M0 24H18V42H0V24Z" fill="hsl(var(--primary))"/>
    </svg>
  );
}
