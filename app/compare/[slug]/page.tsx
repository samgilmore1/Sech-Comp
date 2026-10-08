import Link from 'next/link';
import Image from 'next/image';
import { CATALOG, Category } from '@/lib/catalog';
import MatchupPicker from '@/components/MatchupPicker';
import { Layers, Sparkles, Zap, ArrowUpRight } from 'lucide-react';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'gaming-monitors', label: 'Gaming Monitors' },
  { id: 'professional-monitors', label: 'Pro Displays' },
  { id: 'tvs', label: '4K & OLED TVs' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'earbuds', label: 'Earbuds' },
  { id: 'smartphones', label: 'Smartphones' },
];

// Featured pairings for high-intent SEO indexing
const FEATURED_MATCHUPS = [
  {
    category: 'Gaming Monitors',
    slugA: 'asus-rog-swift-pg32ucdm',
    slugB: 'dell-alienware-aw3225qf',
  },
  {
    category: 'Pro Displays',
    slugA: 'apple-studio-display',
    slugB: 'dell-ultrasharp-u3224kb',
  },
  {
    category: 'OLED TVs',
    slugA: 'lg-oled-g4-65',
    slugB: 'samsung-s95d-65',
  },
  {
    category: 'Headphones',
    slugA: 'bose-quietcomfort-ultra-hp',
    slugB: 'sony-wh-1000xm5',
  },
  {
    category: 'Earbuds',
    slugA: 'apple-airpods-pro-2',
    slugB: 'sony-wf-1000xm5',
  },
  {
    category: 'Smartphones',
    slugA: 'apple-iphone-17-pro-max',
    slugB: 'samsung-galaxy-s26-ultra',
  },
];

export default function HomePage() {
  const allProducts = Object.values(CATALOG);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-blue-600 selection:text-white">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[130px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-black text-white">S</span>
            Sech<span className="text-blue-500">Comp</span>
          </Link>
          <div className="text-xs text-neutral-400 font-medium hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-blue-400" /> Unbiased Benchmarks</span>
            <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-blue-400" /> Automated Specs</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> High-Performance Consumer Tech Benchmarks
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            Compare Tech Specs. <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Without the Bias.
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base">
            Direct, algorithmic hardware comparisons across flagships, gaming monitors, high-fidelity acoustics, and displays.
          </p>
        </section>

        {/* Interactive Matchmaker Widget */}
        <section className="max-w-4xl mx-auto mb-20">
          <MatchupPicker products={allProducts} categories={CATEGORIES} />
        </section>

        {/* Featured Popular Matchups */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Popular Flagship Comparisons</h2>
              <p className="text-xs sm:text-sm text-neutral-400">Direct spec showdowns between category market leaders.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_MATCHUPS.map((match) => {
              const prodA = CATALOG[match.slugA];
              const prodB = CATALOG[match.slugB];
              if (!prodA || !prodB) return null;

              const canonicalSlug = [prodA.slug, prodB.slug].sort().join('-vs-');

              return (
                <Link
                  key={canonicalSlug}
                  href={`/compare/${canonicalSlug}`}
                  className="group bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-4">
                    <span>{match.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 items-center py-2 mb-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-20 h-20 mb-2">
                        <Image src={prodA.imageUrl} alt={prodA.model} fill className="object-contain" sizes="80px" />
                      </div>
                      <span className="text-xs font-semibold text-neutral-200 line-clamp-1">{prodA.model}</span>
                      <span className="text-xs text-blue-400 font-bold">${(prodA.priceCents / 100).toFixed(0)}</span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-20 h-20 mb-2">
                        <Image src={prodB.imageUrl} alt={prodB.model} fill className="object-contain" sizes="80px" />
                      </div>
                      <span className="text-xs font-semibold text-neutral-200 line-clamp-1">{prodB.model}</span>
                      <span className="text-xs text-blue-400 font-bold">${(prodB.priceCents / 100).toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="w-full py-2 rounded-xl bg-neutral-800/40 group-hover:bg-blue-600/10 text-neutral-300 group-hover:text-blue-400 text-xs font-semibold text-center border border-transparent group-hover:border-blue-500/20 transition-all">
                    Compare Specs
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
