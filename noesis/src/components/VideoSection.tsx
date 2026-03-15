'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface VideoSectionProps {
  youtubeId: string;
  title: string;
}

export function VideoSection({ youtubeId, title }: VideoSectionProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-white mb-2">Go Deeper</h2>
      <p className="text-[var(--color-text-muted)] text-sm mb-6">
        A curated video to supplement the reading above.
      </p>
      <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-glass-border)]">
        <LiteYouTubeEmbed id={youtubeId} title={title} />
      </div>
    </section>
  );
}
