// This component is not imported anywhere yet.
// It will be used in the header and footer in subsequent steps.
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="151"
      height="42"
      viewBox="0 0 151 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      {...props}
    >
        <path d="M25.333 1.58331H12.2913V40.25H25.333V26.2083H34.4997V16.0833H25.333V1.58331Z" fill="hsl(var(--foreground))" fillOpacity="0.8"/>
        <path d="M49.0413 1.58331H36V40.25H49.0413V26.2083H58.208V16.0833H49.0413V1.58331Z" fill="hsl(var(--foreground))" fillOpacity="0.8"/>
        <path d="M96.3332 40.25L75.9165 1.58331H87.0832L101.416 24.9166L115.75 1.58331H126.916L106.5 40.25H96.3332Z" fill="hsl(var(--foreground))" fillOpacity="0.8"/>
        <path d="M149.333 26.2083V1.58331H134.75V11.7083H128.5V40.25H142V16.0833H149.333V26.2083Z" fill="hsl(var(--foreground))" fillOpacity="0.8"/>
        <path d="M132.083 31.9167L138.916 22.0833H144L136.166 33.5833L144.416 45H138L132.083 35.5V31.9167Z" fill="#00C48C"/>
    </svg>
  );
}
