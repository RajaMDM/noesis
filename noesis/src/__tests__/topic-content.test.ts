import { describe, it, expect } from 'vitest';
import { topicContent } from '@/lib/topic-content';
import { topics } from '@/lib/topics';

const MANDATORY_FIELDS = [
  'slug',
  'title',
  'overview',
  'howAIApplies',
  'fromTheField',
  'architectureCaption',
  'relatedTopics',
  'video',
  'whereToGoNext',
] as const;

describe('TopicContent schema', () => {
  it('has entries for all 7 topic slugs', () => {
    const contentSlugs = Object.keys(topicContent);
    const topicSlugs = topics.map((t) => t.slug);
    expect(contentSlugs.sort()).toEqual(topicSlugs.sort());
  });

  for (const topic of topics) {
    describe(`${topic.slug} entry`, () => {
      it('has all mandatory fields', () => {
        const content = topicContent[topic.slug];
        expect(content).toBeDefined();
        for (const field of MANDATORY_FIELDS) {
          expect(content[field], `${topic.slug} missing field: ${field}`).toBeDefined();
        }
      });

      it('fromTheField has text and anonymization', () => {
        const content = topicContent[topic.slug];
        expect(content.fromTheField.text).toBeTruthy();
        expect(content.fromTheField.anonymization).toBeTruthy();
      });

      it('video has youtubeId and title', () => {
        const content = topicContent[topic.slug];
        expect(content.video.youtubeId).toBeTruthy();
        expect(content.video.title).toBeTruthy();
      });

      it('relatedTopics contains valid slugs', () => {
        const content = topicContent[topic.slug];
        const validSlugs = topics.map((t) => t.slug);
        for (const relSlug of content.relatedTopics) {
          expect(validSlugs).toContain(relSlug);
        }
      });
    });
  }
});
