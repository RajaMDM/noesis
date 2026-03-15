import Link from 'next/link';
import { Button } from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-noir)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-mono text-[var(--color-accent-blue)] text-lg mb-4">404</p>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          This page doesn&apos;t exist. Navigate back to explore Noesis.
        </p>
        {/* Link-wrapping pattern (Button has no asChild) */}
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
