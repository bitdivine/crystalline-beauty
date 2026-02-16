export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-light text-winter-foreground leading-tight">
              The Art of Snowflakes
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-winter-accent to-transparent" />
          </div>
          
          <div className="prose prose-lg md:prose-xl prose-invert mx-auto">
            <p className="text-winter-muted font-light leading-relaxed italic">
              Each snowflake descends from the heavens as a unique masterpiece,
              a fleeting sculpture of ice and air. Born from the dance of water
              and cold, these crystalline wonders embody nature's infinite creativity—
              no two ever alike, each a testament to the beauty of impermanence.
            </p>
            <p className="text-winter-muted font-light leading-relaxed">
              In their six-fold symmetry lies mathematical perfection,
              in their delicate branches, the poetry of winter's breath.
              They remind us that even the smallest, most ephemeral things
              can hold extraordinary beauty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
