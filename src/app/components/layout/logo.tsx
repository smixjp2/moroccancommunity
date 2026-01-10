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
      <rect width="10" height="42" rx="2" fill="hsl(var(--foreground))" fillOpacity="0.9" />
      <rect x="16" y="12" width="10" height="30" rx="2" fill="hsl(var(--primary))" />
      <rect x="32" width="10" height="42" rx="2" fill="hsl(var(--foreground))" fillOpacity="0.9" />
    </svg>
  );
}
