import { LucideIcon, Database, GitMerge, ShieldCheck, Layers, ArrowLeftRight, Scale, Bot } from 'lucide-react';

export interface Topic {
  slug: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const topics: Topic[] = [
  {
    slug: 'data-sources',
    title: 'Data Sources',
    description: 'Where data originates — databases, APIs, files, streams, and real-time feeds.',
    Icon: Database,
  },
  {
    slug: 'data-integration',
    title: 'Data Integration',
    description: 'Moving and transforming data across systems using ETL, ELT, and event-driven patterns.',
    Icon: GitMerge,
  },
  {
    slug: 'data-quality',
    title: 'Data Quality',
    description: 'Ensuring data is accurate, complete, consistent, and fit for purpose.',
    Icon: ShieldCheck,
  },
  {
    slug: 'master-data-management',
    title: 'Master Data Management',
    description: 'Creating a single source of truth for critical business entities like customers and products.',
    Icon: Layers,
  },
  {
    slug: 'reverse-integration',
    title: 'Reverse Integration',
    description: 'Activating warehouse data by pushing insights back into operational tools.',
    Icon: ArrowLeftRight,
  },
  {
    slug: 'data-governance',
    title: 'Data Governance',
    description: 'Policies, standards, and accountability that ensure data is managed as a strategic asset.',
    Icon: Scale,
  },
  {
    slug: 'ai-in-data-management',
    title: 'AI in Data Management',
    description: 'How machine learning and generative AI are transforming data pipelines and discovery.',
    Icon: Bot,
  },
];
