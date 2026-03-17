import { Users, MapPin, Truck, UtensilsCrossed, Shirt, UserCheck, DollarSign, Package, Building2, Leaf, ShoppingBag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ParentDomainId = 'party' | 'product' | 'location' | 'financial' | 'asset';

export interface ParentDomain {
  id: ParentDomainId;
  name: string;
  tagline: string;
  color: string;
}

export interface Domain {
  slug: string;
  name: string;
  tagline: string;
  parentDomain: ParentDomainId;
  icon: LucideIcon;
  color: string;
  dmTechniques: string[];
  comingSoon?: boolean;
}

export const parentDomains: ParentDomain[] = [
  {
    id: 'party',
    name: 'Party Domain',
    tagline: 'Every legal entity or person who plays a role in your business. Customer, Supplier, Employee, Partner — the same identity resolution challenge, different stakes.',
    color: '#0071e3',
  },
  {
    id: 'product',
    name: 'Product Domain',
    tagline: 'Anything made, sold, consumed, or traded. Food, apparel, beauty — the domain varies by sub-type, but the data management imperative is always accuracy and completeness.',
    color: '#7c3aed',
  },
  {
    id: 'location',
    name: 'Location Domain',
    tagline: 'Where things happen — physically and digitally. Store hierarchies, trading areas, YEXT listings, delivery zones. The skeleton everything else hangs off.',
    color: '#0891b2',
  },
  {
    id: 'financial',
    name: 'Financial Domain',
    tagline: 'The ledger everything posts to. Chart of Accounts, Cost Centres, Legal Entities. Dirty financial data doesn\'t show itself until close day — then everyone sees it.',
    color: '#d97706',
  },
  {
    id: 'asset',
    name: 'Asset Domain',
    tagline: 'What the business owns and maintains: property, equipment, digital assets. DAM sits here AND in Product — the governance model determines which records live where.',
    color: '#059669',
  },
];

export const domains: Domain[] = [
  // ── PARTY ──
  {
    slug: 'customer',
    name: 'Customer',
    tagline: 'Every business thinks it knows its customers. Almost none of them do.',
    parentDomain: 'party',
    icon: Users,
    color: '#0071e3',
    dmTechniques: ['MDM', 'Data Quality', 'Governance', 'Reverse Integration'],
  },
  {
    slug: 'supplier',
    name: 'Supplier',
    tagline: 'You can\'t manage what you haven\'t mastered. Most supplier databases are archaeological sites.',
    parentDomain: 'party',
    icon: Truck,
    color: '#0071e3',
    dmTechniques: ['Data Quality', 'Governance', 'Data Integration', 'MDM'],
  },
  {
    slug: 'employee',
    name: 'Employee',
    tagline: 'Headcount is simple arithmetic. Employee data is not.',
    parentDomain: 'party',
    icon: UserCheck,
    color: '#0071e3',
    dmTechniques: ['Governance', 'Data Quality', 'Data Integration'],
  },
  {
    slug: 'partner',
    name: 'Partner / Franchise',
    tagline: 'A franchise outlet is not a store. A partner is not a supplier. The distinction matters enormously when it comes to data ownership.',
    parentDomain: 'party',
    icon: Building2,
    color: '#0071e3',
    dmTechniques: ['MDM', 'Governance', 'Data Integration'],
    comingSoon: true,
  },
  // ── PRODUCT ──
  {
    slug: 'product-hospitality',
    name: 'F&B · Hospitality',
    tagline: 'A menu item is not just a name and a price. It is a data contract between your kitchen, your supplier, and your customer.',
    parentDomain: 'product',
    icon: UtensilsCrossed,
    color: '#7c3aed',
    dmTechniques: ['Data Quality', 'Data Integration', 'Governance', 'MDM'],
  },
  {
    slug: 'product-apparel',
    name: 'Apparel & Accessories',
    tagline: 'A blue t-shirt in size medium is actually dozens of data attributes held together by brittle convention.',
    parentDomain: 'product',
    icon: Shirt,
    color: '#7c3aed',
    dmTechniques: ['MDM', 'Data Quality', 'Data Integration'],
  },
  {
    slug: 'product-beauty',
    name: 'Beauty & Wellness',
    tagline: 'INCI lists, CPSR compliance, claims substantiation. In beauty, product data is a regulatory document — not a catalogue entry.',
    parentDomain: 'product',
    icon: Leaf,
    color: '#7c3aed',
    dmTechniques: ['Data Quality', 'Governance', 'Data Integration'],
  },
  {
    slug: 'product-fmcg',
    name: 'FMCG · CPG',
    tagline: 'From formulation to shelf — the data journey of a consumer packaged good spans R&D, regulatory, commercial, and logistics.',
    parentDomain: 'product',
    icon: ShoppingBag,
    color: '#7c3aed',
    dmTechniques: ['MDM', 'Data Quality', 'Data Integration', 'Governance'],
  },
  // ── LOCATION ──
  {
    slug: 'location',
    name: 'Location',
    tagline: 'A store address seems simple. The data reality of location is anything but.',
    parentDomain: 'location',
    icon: MapPin,
    color: '#0891b2',
    dmTechniques: ['Data Quality', 'Data Integration', 'MDM', 'Reverse Integration'],
  },
  // ── FINANCIAL ──
  {
    slug: 'financial',
    name: 'Financial Domain',
    tagline: 'Every number in your P&L traces back to a data record. Bad records, wrong numbers — forever.',
    parentDomain: 'financial',
    icon: DollarSign,
    color: '#d97706',
    dmTechniques: ['MDM', 'Data Governance', 'Data Integration', 'Data Quality'],
  },
  // ── ASSET ──
  {
    slug: 'asset',
    name: 'Asset Domain',
    tagline: 'Equipment, property, DAM — the things your business owns. DAM spans here and Product: two domains, one system, two governance models.',
    parentDomain: 'asset',
    icon: Package,
    color: '#059669',
    dmTechniques: ['Governance', 'Data Quality', 'Data Integration'],
    comingSoon: true,
  },
];
