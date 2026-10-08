// app/compare/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { CATALOG, CATEGORY_SPECS, getAllCanonicalPairs, SpecField } from '@/lib/catalog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseSlug(slugParam: string) {
  const parts = slugParam.split('-vs-');
  if (parts.length !== 2) return null;
  return { slugA: parts[0], slugB: parts[1] };
}

export async function generateStaticParams() {
  return getAllCanonicalPairs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const productA = CATALOG[parsed.slugA];
  const productB = CATALOG[parsed.slugB];
  if (!productA || !productB) return {};

  return {
    title: `${productA.model} vs ${productB.model} Comparison: Specs, Tests & Value`,
    description: `Side-by-side comparison of ${productA.brand} ${productA.model} and ${productB.brand} ${productB.model}.`,
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const canonicalSlug = [parsed.slugA, parsed.slugB].sort().join('-vs-');
  if (slug !== canonicalSlug) {
    permanentRedirect(`/compare/${canonicalSlug}`);
  }

  const productA = CATALOG[parsed.slugA];
  const productB = CATALOG[parsed.slugB];

  if (!productA || !productB || productA.category !== productB.category) {
    notFound();
  }

  const specGroups = CATEGORY_SPECS[productA.category] || [];

  const getWinner = (field: SpecField, valA: any, valB: any): 'A' | 'B' | null => {
    if (field.type !== 'number' || valA === valB || typeof valA !== 'number' || typeof valB !== 'number') {
      return null;
    }
    if (field.higherIsBetter) return valA > valB ? 'A' : 'B';
    return valA < valB ? 'A' : 'B';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-blue-600 selection:text-white pb-20">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{productA.category.replace('-', ' ')}</span>
        <span className="mx-2">/</span>
        <span className="text-neutral-200 font-medium">{productA.model} vs {productB.model}</span>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Technical Spec Comparison
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {productA.model} <span className="text-blue-500">vs</span> {productB.model}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
            Comprehensive specs, hardware differentials, and value evaluation.
          </p>
        </header>

        {/* Head-to-Head Cards */}
        <section className="grid grid-cols-2 gap-3 sm:gap-6 mb-12">
          {[productA, productB].map((item) => (
            <div key={item.id} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center">
              <div className="relative w-36 h-36 sm:w-52 sm:h-52 mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.model}
                  fill
                  sizes="(max-width: 640px) 150px, 250px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">{item.brand}</span>
              <h2 className="text-base sm:text-xl font-bold text-white mb-2">{item.model}</h2>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-4">
                ${(item.priceCents / 100).toFixed(0)}
              </div>
              <a
                href={item.affiliateUrl}
                className="w-full mt-auto py-2.5 sm:py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                <span>View Current Deal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </section>

        {/* Spec Comparison Table */}
        <section className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
            <h3 className="font-bold text-lg text-white">Full Technical Specifications</h3>
          </div>

          {specGroups.map((group, groupIdx) => (
            <div key={group.group} className={groupIdx !== 0 ? 'border-t border-neutral-800' : ''}>
              <div className="px-6 py-2 bg-neutral-950/60 text-xs font-semibold uppercase tracking-wider text-blue-400 border-b border-neutral-800/60">
                {group.group}
              </div>

              <div className="divide-y divide-neutral-800/50">
                {group.fields.map((field) => {
                  const valA = productA.specs[field.key];
                  const valB = productB.specs[field.key];
                  const winner = getWinner(field, valA, valB);

                  return (
                    <div key={field.key} className="grid grid-cols-12 py-3 px-4 sm:px-6 hover:bg-neutral-800/20 transition-colors">
                      <div className="col-span-4 flex items-center justify-start text-xs sm:text-sm">
                        <span className={`font-medium ${winner === 'A' ? 'text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20' : 'text-neutral-300'}`}>
                          {typeof valA === 'boolean' ? (valA ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-neutral-500" />) : `${valA ?? '—'}${valA && field.unit ? field.unit : ''}`}
                        </span>
                      </div>

                      <div className="col-span-4 flex items-center justify-center text-center">
                        <span className="text-xs text-neutral-400 font-medium uppercase tracking-tight">{field.label}</span>
                      </div>

                      <div className="col-span-4 flex items-center justify-end text-xs sm:text-sm">
                        <span className={`font-medium ${winner === 'B' ? 'text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20' : 'text-neutral-300'}`}>
                          {typeof valB === 'boolean' ? (valB ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-neutral-500" />) : `${valB ?? '—'}${valB && field.unit ? field.unit : ''}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
