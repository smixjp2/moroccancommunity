// This component is not imported anywhere yet.
// It will be used in the header and footer in subsequent steps.
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 40"
      width="30"
      height="40"
      className={cn("h-8 w-auto", className)}
      {...props}
    >
      <path d="M0,20 L15,5 L15,35 L30,20" stroke="hsl(var(--foreground))" strokeWidth="3" fill="none" />
      <path d="M10,20 L20,10 L20,30" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
    </svg>
  );
}
