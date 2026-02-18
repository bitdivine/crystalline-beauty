import { Snowflake } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-winter-border/30 bg-winter-glass backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <Snowflake className="h-8 w-8 text-winter-accent animate-spin-slow" />
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-winter-foreground">
            Crystalline Beauty
          </h1>
          <Snowflake className="h-8 w-8 text-winter-accent animate-spin-slow-reverse" />
        </div>
      </div>
    </header>
  );
}
