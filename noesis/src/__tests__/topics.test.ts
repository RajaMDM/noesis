import { describe, it, expect } from 'vitest';
import { topics } from '@/lib/topics';

describe('topics array', () => {
  it('contains exactly 7 topics', () => {
    expect(topics).toHaveLength(7);
  });

  it('all slugs are unique', () => {
    const slugs = topics.map((t) => t.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(7);
  });

  it('all topics have required fields', () => {
    for (const topic of topics) {
      expect(topic.slug).toBeTruthy();
      expect(topic.title).toBeTruthy();
      expect(topic.description).toBeTruthy();
      expect(topic.Icon).toBeDefined();
    }
  });

  it('slugs match expected learning path order', () => {
    const expectedOrder = [
      'data-sources',
      'data-integration',
      'data-quality',
      'master-data-management',
      'reverse-integration',
      'data-governance',
      'ai-in-data-management',
    ];
    expect(topics.map((t) => t.slug)).toEqual(expectedOrder);
  });
});
