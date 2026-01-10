// This component is not imported anywhere yet.
// It will be used in the header and footer in subsequent steps.
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="104"
      height="29"
      viewBox="0 0 104 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      {...props}
    >
      <path
        d="M25.7539 28.5V0.5H41.5539V5.7H31.3539V11.5H40.4539V16.7H31.3539V23.3H41.5539V28.5H25.7539Z"
        fill="hsl(var(--foreground))"
        fillOpacity="0.8"
      />
      <path
        d="M45.6914 28.5V0.5H66.4914V5.7H58.9914L55.5914 10.1H64.9914V16.6H54.6914L45.6914 28.5Z"
        fill="hsl(var(--foreground))"
        fillOpacity="0.8"
      />
      <path
        d="M68.791 28.5V0.5H74.391V28.5H68.791Z"
        fill="hsl(var(--foreground))"
        fillOpacity="0.8"
      />
      <path
        d="M82.3539 0.5L88.9539 10.4L95.5539 0.5H103.054L92.7539 16V28.5H86.9539V16L76.6539 0.5H82.3539Z"
        fill="hsl(var(--foreground))"
        fillOpacity="0.8"
      />
      <path
        d="M100 11.4L92.1 0H86.9L96.4 15.3V29H102V15.3L111.5 0H105.9L100 8.5V0H94.4V11.4H100Z"
        fill="hsl(var(--foreground))"
        fillOpacity="0.8"
      />
      <path d="M96 11V5H102V11H96Z" fill="hsl(var(--primary))" />
      <path d="M102 5V0H108L102 8.4V5Z" fill="hsl(var(--primary))" />
    </svg>
  );
}
