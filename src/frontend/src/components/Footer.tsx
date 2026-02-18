import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-winter-border/30 bg-winter-glass backdrop-blur-md py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-winter-muted flex items-center justify-center gap-2">
            © 2025. Built with{' '}
            <Heart className="h-4 w-4 text-winter-accent fill-winter-accent animate-pulse" />{' '}
            using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-winter-accent hover:text-winter-accent-bright transition-colors underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-winter-muted/70 italic">
            "In every snowflake, nature writes a poem that melts before it can be read"
          </p>
        </div>
      </div>
    </footer>
  );
}
