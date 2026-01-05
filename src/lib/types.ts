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
  platform: string;
  responsiveness: string;
  logo: React.ReactNode;
}