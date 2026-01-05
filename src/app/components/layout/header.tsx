"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scaling } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/articles", label: "Articles" },
  { href: "/tools", label: "Outils" },
  { href: "/courses", label: "Cours" },
  { href: "/resources", label: "Ressources" },
];

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Scaling className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">The Moroccan Community</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu de navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center gap-2 mb-6">
                <Scaling className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">The Moroccan Community</span>
              </Link>
              <NavLinks className="flex-col items-start space-y-4 text-lg" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
