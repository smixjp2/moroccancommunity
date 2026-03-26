
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Logo } from "./logo";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/articles", label: "Articles" },
  { href: "/videos", label: "Vidéos" },
  { href: "/courses", label: "Cours" },
  { href: "/resources", label: "Ressources" },
];

const toolsLinks: NavLink[] = [
    { href: "/tools/monthly-budget-simulator", label: "Simulateur de Budget" },
    { href: "/tools/loan-simulator", label: "Simulateur de Crédit"},
    { href: "/tools/fee-simulator", label: "Simulateur d'Impact des Frais"},
    { href: "/tools/dividend-yield-calculator", label: "Calculateur de Rendement"},
    { href: "/tools/retirement-planner", label: "Planificateur de Retraite"},
    { href: "/tools/investor-profile-quiz", label: "Quiz Profil d'Investisseur"},
    { href: "/tools/pe-ratio-analyzer", label: "Analyseur de P/E Ratio" },
    { href: "/tools/personal-wealth-analyzer", label: "Analyseur de Patrimoine" },
    { href: "/dashboard/stock-analyzer", label: "Analyseur d'Actions" },
    { href: "/dashboard/portfolio-allocator", label: "Simulateur d'Allocation" },
    { href: "/tools/opcvm-comparator", label: "Comparateur d'OPCVM"},
];

const aboutLink: NavLink = { href: "/about", label: "À propos" };
const contactLink: NavLink = { href: "/contact", label: "Contact" };


export function Header() {
  const pathname = usePathname();

  const ToolsDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="link" className={cn(
                "text-sm font-medium transition-colors hover:text-primary p-0 h-auto",
                pathname.startsWith('/tools') || pathname.startsWith('/dashboard/stock-analyzer') ? "text-primary" : "text-muted-foreground"
            )}>
               <span className="flex items-center gap-1">Outils <ChevronDown className="h-4 w-4" /></span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
                <Link href="/tools">Tous les Outils</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {toolsLinks.map(link => (
                 <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                 </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )

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
      <ToolsDropdown />
        <Link
            href={aboutLink.href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === aboutLink.href ? "text-primary" : "text-muted-foreground"
            )}
        >
            {aboutLink.label}
        </Link>
        <Link
            href={contactLink.href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === contactLink.href ? "text-primary" : "text-muted-foreground"
            )}
        >
            {contactLink.label}
        </Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
            <Link href="/" className="mr-4 sm:mr-6 flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xs sm:text-sm hidden xs:inline-block">The Moroccan Community</span>
            </Link>

            <div className="hidden md:flex items-center">
            <NavLinks />
            </div>
        </div>
        
        <div className="flex items-center gap-2">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Ouvrir le menu de navigation</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center gap-2 mb-6">
                    <Logo />
                    <span className="font-bold">The Moroccan Community</span>
                </Link>
                <nav className="flex flex-col items-start space-y-4 text-lg">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "font-medium transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                        >
                        {link.label}
                        </Link>
                    ))}
                     <Link href="/tools" className={cn(
                        "font-medium transition-colors hover:text-primary",
                        pathname.startsWith('/tools') ? "text-primary" : "text-muted-foreground"
                    )}>
                        Outils
                    </Link>
                    <Link
                        href={aboutLink.href}
                        className={cn(
                            "font-medium transition-colors hover:text-primary",
                            pathname === aboutLink.href ? "text-primary" : "text-muted-foreground"
                        )}
                        >
                        {aboutLink.label}
                    </Link>
                     <Link
                        href={contactLink.href}
                        className={cn(
                            "font-medium transition-colors hover:text-primary",
                            pathname === contactLink.href ? "text-primary" : "text-muted-foreground"
                        )}
                        >
                        {contactLink.label}
                    </Link>
                </nav>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
