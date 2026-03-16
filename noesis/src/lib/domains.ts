import { LucideIcon, Users, MapPin, Truck, UtensilsCrossed, Shirt, UserCheck } from 'lucide-react';

export interface Domain {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  color: string;
  dmTechniques: string[];
}

export const domains: Domain[] = [
  {
    slug: 'customer',
    name: 'Customer Domain',
    tagline: 'The hardest entity to master — because customers change, merge, and multiply across every channel.',
    icon: Users,
    color: '#0071e3',
    dmTechniques: ['Identity Resolution', 'MDM', 'Data Quality', 'Golden Record', 'GDPR'],
  },
  {
    slug: 'location',
    name: 'Location Domain',
    tagline: 'Addresses are never just strings — they encode geography, jurisdiction, and logistics reality.',
    icon: MapPin,
    color: '#059669',
    dmTechniques: ['Geocoding', 'Address Validation', 'Hierarchy', 'Data Quality', 'Reference Data'],
  },
  {
    slug: 'supplier',
    name: 'Supplier Domain',
    tagline: 'Every supply chain failure traces back to a data problem — wrong supplier, wrong lead time, wrong cost.',
    icon: Truck,
    color: '#d97706',
    dmTechniques: ['Supplier MDM', 'Onboarding', 'Risk Data', 'Hierarchy', 'Data Governance'],
  },
  {
    slug: 'fb',
    name: 'Food & Beverage Domain',
    tagline: 'Perishability, regulation, and recipe complexity make F&B product data unlike any other.',
    icon: UtensilsCrossed,
    color: '#e11d48',
    dmTechniques: ['Recipe Management', 'Allergen Data', 'Shelf Life', 'Regulatory', 'Product MDM'],
  },
  {
    slug: 'apparel',
    name: 'Apparel Domain',
    tagline: 'Size, colour, and fit variation explode SKU counts — and break systems not designed for it.',
    icon: Shirt,
    color: '#7c3aed',
    dmTechniques: ['Variant Management', 'Product MDM', 'Size Curves', 'Taxonomy', 'Data Quality'],
  },
  {
    slug: 'employee',
    name: 'Employee Domain',
    tagline: 'HR data is the most sensitive in the enterprise — and the most fragmented across systems.',
    icon: UserCheck,
    color: '#0891b2',
    dmTechniques: ['HR MDM', 'Identity', 'Privacy', 'Org Hierarchy', 'Data Governance'],
  },
];
