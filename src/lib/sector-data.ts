import { Landmark, Shield, Phone, HardHat, Building, Zap, Factory, ShoppingCart } from 'lucide-react';
import type { Sector } from './types';

export const sectors: Sector[] = [
  { id: 'banking', name: 'Secteur Bancaire', averagePE: 12, icon: Landmark },
  { id: 'insurance', name: 'Secteur des Assurances', averagePE: 15, icon: Shield },
  { id: 'telecom', name: 'Secteur des Télécoms', averagePE: 14, icon: Phone },
  { id: 'construction', name: 'BTP & Matériaux de Construction', averagePE: 18, icon: HardHat },
  { id: 'real_estate', name: 'Secteur Immobilier', averagePE: 20, icon: Building },
  { id: 'energy', name: 'Secteur Énergie & Services Publics', averagePE: 16, icon: Zap },
  { id: 'industry', name: 'Secteur Industriel', averagePE: 17, icon: Factory },
  { id: 'consumer_goods', name: 'Biens de Consommation', averagePE: 22, icon: ShoppingCart },
];
