import { topics } from './topics';
import { topicContent } from './topic-content';
import { domains } from './domains';
import { domainContent } from './domain-content';

export type SearchCategory = 'Topic' | 'Domain' | 'Entity' | 'Scenario' | 'Integration';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  url: string;
  body: string; // for fuzzy match
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Topics
  topics.forEach(t => {
    items.push({
      id: `topic-${t.slug}`,
      title: t.title,
      subtitle: t.description ?? '',
      category: 'Topic',
      url: `/topics/${t.slug}`,
      body: [t.title, t.description, topicContent[t.slug]?.tagline ?? '', topicContent[t.slug]?.analogy ?? ''].join(' '),
    });
  });

  // Domains (non-comingSoon)
  domains.filter(d => !d.comingSoon).forEach(d => {
    const content = domainContent[d.slug];
    items.push({
      id: `domain-${d.slug}`,
      title: d.name,
      subtitle: d.tagline,
      category: 'Domain',
      url: `/domains/${d.slug}`,
      body: [d.name, d.tagline, content?.analogy ?? ''].join(' '),
    });

    if (content) {
      // Entities
      content.entities.forEach(e => {
        items.push({
          id: `entity-${d.slug}-${e.name}`,
          title: e.name,
          subtitle: e.definition,
          category: 'Entity',
          url: `/domains/${d.slug}`,
          body: [e.name, e.definition, e.example].join(' '),
        });
      });

      // Scenarios
      content.scenarios.forEach(s => {
        items.push({
          id: `scenario-${d.slug}-${s.title}`,
          title: s.title,
          subtitle: s.narrative.slice(0, 120) + '…',
          category: 'Scenario',
          url: `/domains/${d.slug}`,
          body: [s.title, s.narrative].join(' '),
        });
      });

      // Integrations
      content.integrations.forEach(i => {
        items.push({
          id: `integration-${d.slug}-${i.name}`,
          title: i.name,
          subtitle: `${i.category} · ${i.description.slice(0, 80)}`,
          category: 'Integration',
          url: `/domains/${d.slug}`,
          body: [i.name, i.category, i.description].join(' '),
        });
      });
    }
  });

  return items;
}

export const searchIndex = buildSearchIndex();
