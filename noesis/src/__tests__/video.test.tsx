import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VideoSection } from '@/components/VideoSection';

describe('VideoSection', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <VideoSection youtubeId="dQw4w9WgXcQ" title="Test Video" />
    );
    expect(container).toBeTruthy();
  });

  it('renders a section element', () => {
    const { container } = render(
      <VideoSection youtubeId="dQw4w9WgXcQ" title="Test Video" />
    );
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });

  it('renders "Go Deeper" heading', () => {
    const { getByText } = render(
      <VideoSection youtubeId="dQw4w9WgXcQ" title="Test Video" />
    );
    expect(getByText('Go Deeper')).toBeTruthy();
  });
});
