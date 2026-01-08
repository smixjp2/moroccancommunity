
import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
};

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  duration: string;
  level: string;
  href: string;
}

export interface UserCourse {
    id: string; // This will be the userCourse document ID
    courseId: string; // This will be the course ID like 'dca-strategie'
    title: string;
    description: string;
    href: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  price: string;
  href: string;
}

export interface Bank {
  name: string;
  fees: string;
  accessibility: string;
  logo: React.ReactNode;
}

export interface Brokerage {
  name: string;
  fees: string;
  custodyFees: string;
  platform: string;
  responsiveness: string;
  logo: React.ReactNode;
}

export interface Module {
    icon: LucideIcon | ((props: any) => JSX.Element);
    title: string;
    points: string[];
}
    
export interface Opcvm {
  id: string;
  name: string;
  managementCompany: string;
  description: string;
  ytd: number;
  perf1Y: number;
  perf3Y: number;
  logo?: string;
}

export interface OpcvmCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon | ((props: any) => JSX.Element);
  funds: Opcvm[];
}
