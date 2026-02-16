import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Snowflake } from 'lucide-react';

const snowflakes = [
  {
    id: 1,
    src: '/assets/generated/snowflake-crystal-1.dim_400x400.png',
    title: 'Crystal Formation',
    description: 'A pristine stellar dendrite showcasing perfect hexagonal symmetry'
  },
  {
    id: 2,
    src: '/assets/generated/snowflake-artistic-2.dim_400x400.png',
    title: 'Artistic Wonder',
    description: 'An intricate pattern of ice crystals forming delicate branches'
  },
  {
    id: 3,
    src: '/assets/generated/snowflake-dendrite-3.dim_400x400.png',
    title: 'Dendrite Beauty',
    description: 'Complex dendritic arms extending in harmonious balance'
  },
  {
    id: 4,
    src: '/assets/generated/snowflake-stellar-4.dim_400x400.png',
    title: 'Stellar Perfection',
    description: 'A classic stellar crystal with radiating geometric precision'
  },
  {
    id: 5,
    src: '/assets/generated/snowflake-needle-5.dim_400x400.png',
    title: 'Needle Crystal',
    description: 'Elongated needle-like formations creating unique patterns'
  },
  {
    id: 6,
    src: '/assets/generated/snowflake-fern-6.dim_400x400.png',
    title: 'Fern-like Grace',
    description: 'Delicate fern-like structures branching in natural elegance'
  }
];

export function Gallery() {
  const [selectedSnowflake, setSelectedSnowflake] = useState<typeof snowflakes[0] | null>(null);

  return (
    <section className="py-16 md:py-24 bg-winter-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Snowflake className="h-6 w-6 text-winter-accent" />
            <h2 className="text-3xl md:text-5xl font-serif font-light text-winter-foreground">
              Gallery of Ice
            </h2>
            <Snowflake className="h-6 w-6 text-winter-accent" />
          </div>
          <p className="text-winter-muted max-w-2xl mx-auto">
            Explore the intricate architecture of nature's frozen artistry
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {snowflakes.map((snowflake) => (
            <Dialog key={snowflake.id}>
              <DialogTrigger asChild>
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelectedSnowflake(snowflake)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-winter-card border border-winter-border/50 shadow-winter transition-all duration-500 hover:shadow-winter-lg hover:scale-105 hover:border-winter-accent/50">
                    <div className="aspect-square relative">
                      <img
                        src={snowflake.src}
                        alt={snowflake.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-winter-overlay via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-xl font-serif text-winter-foreground group-hover:text-winter-accent transition-colors">
                        {snowflake.title}
                      </h3>
                      <p className="text-sm text-winter-muted leading-relaxed">
                        {snowflake.description}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-winter-dialog border-winter-border/50 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={snowflake.src}
                      alt={snowflake.title}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="space-y-3 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-winter-foreground">
                      {snowflake.title}
                    </h3>
                    <p className="text-winter-muted leading-relaxed">
                      {snowflake.description}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
