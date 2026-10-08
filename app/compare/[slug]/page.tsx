import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface SpecItem {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean';
  unit?: string;
  higherIsBetter?: boolean;
}

interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  priceCents: number;
  imageUrl: string;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  specs: Record<string, string | number | boolean>;
}

const SPEC_CONFIG: { category: string; items: SpecItem[] }[] = [
  {
    category: 'Display & Visuals',
    items: [
      { key: 'screenSize', label: 'Screen Size', type: 'number', unit: '″', higherIsBetter: true },
      { key: 'panelType', label: 'Panel Type', type: 'text' },
      { key: 'refreshRate', label: 'Refresh Rate', type: 'number', unit: 'Hz', higherIsBetter: true },
      { key: 'peakBrightness', label: 'Peak Brightness', type: 'number', unit: ' nits', higherIsBetter: true },
    ],
  },
  {
    category: 'Hardware & Performance',
    items: [
      { key: 'processor', label: 'Chipset / Processor', type: 'text' },
      { key: 'ram', label: 'Base RAM', type: 'number', unit: 'GB', higherIsBetter: true },
      { key: 'storage', label: 'Base Storage', type: 'number', unit: 'GB', higherIsBetter: true },
      { key: 'weight', label: 'Weight', type: 'number', unit: 'g', higherIsBetter: false },
    ],
  },
  {
    category: 'Battery & Charging',
    items: [
      { key: 'batteryCapacity', label: 'Battery Capacity', type: 'number', unit: 'mAh', higherIsBetter: true },
      { key: 'chargeSpeed', label: 'Max Fast Charging', type: 'number', unit: 'W', higherIsBetter: true },
      { key: 'wirelessCharging', label: 'Wireless Charging', type: 'boolean' },
    ],
  },
];

async function fetchProduct(slug: string): Promise<Product | null> {
  const mockDB: Record<string, Product> = {
    'apple-iphone-17-pro-max': {
      id: 'prod_1',
      slug: 'apple-iphone-17-pro-max',
      brand: 'Apple',
      model: 'iPhone 17 Pro Max',
      priceCents: 119900,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
      affiliateUrl: '#',
      rating: 4.8,
      reviewCount: 342,
      specs: {
        screenSize: 6.9,
        panelType: 'LTPO OLED 120Hz',
        refreshRate: 120,
        peakBrightness: 3000,
        processor: 'Apple A19 Pro',
        ram: 12,
        storage: 256,
        weight: 221,
        batteryCapacity: 4850,
        chargeSpeed: 45,
        wirelessCharging: true,
      },
    },
    'samsung-galaxy-s26-ultra': {
      id: 'prod_2',
      slug: 'samsung-galaxy-s26-ultra',
      brand: 'Samsung',
      model: 'Galaxy S26 Ultra',
      priceCents: 129900,
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
      affiliateUrl: '#',
      rating: 4.7,
      reviewCount: 219,
      specs: {
        screenSize: 6.8,
        panelType: 'Dynamic AMOLED 2X',
        refreshRate: 144,
        peakBrightness: 3200,
        processor: 'Snapdragon 8 Elite Gen 2',
        ram: 16,
        storage: 256,
        weight: 219,
        batteryCapacity: 5000,
        chargeSpeed: 65,
        wirelessCharging: true,
      },
    },
  };

  return mockDB[slug] || null;
}

function parseSlug(slugParam: string) {
  const parts = slugParam.split('-vs-');
  if (parts.length !== 2) return null;
  return { slugA: parts[0], slugB: parts[1] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const productA = await fetchProduct(parsed.slugA);
  const productB = await fetchProduct(parsed.slugB);

  if (!productA || !productB) return {};

  return {
    title: `${productA.model} vs ${productB.model} Comparison: Specs, Display & Value`,
    description: `Direct comparison between ${productA.brand} ${productA.model} and ${productB.brand} ${productB.model}.`,
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const canonicalSlug = [parsed.slugA, parsed.slugB].sort().join('-vs-');
  if (slug !== canonicalSlug) {
    permanentRedirect(`/compare/${canonicalSlug}`);
  }

  const [productA, productB] = await Promise.all([
    fetchProduct(parsed.slugA),
    fetchProduct(parsed.slugB),
  ]);

  if (!productA || !productB) notFound();

  const getWinner = (item: SpecItem, valA: any, valB: any): 'A' | 'B' | null => {
    if (item.type !== 'number' || valA === valB || typeof valA !== 'number' || typeof valB !== 'number') {
      return null;
    }
    if (item.higherIsBetter) {
      return valA > valB ? 'A' : 'B';
    }
    return valA < valB ? 'A' : 'B';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-blue-600 selection:text-white">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-200 font-medium">{productA.model} vs {productB.model}</span>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Technical Comparison
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {productA.model} <span className="text-blue-500">vs</span> {productB.model}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
            Comprehensive side-by-side spec comparison and performance breakdown.
          </p>
        </header>

        <section className="grid grid-cols-2 gap-3 sm:gap-6 mb-12">
          {/* Card A */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 sm:w-52 sm:h-52 mb-4">
              <Image
                src={productA.imageUrl}
                alt={productA.model}
                fill
                sizes="(max-width: 640px) 150px, 250px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">{productA.brand}</span>
            <h2 className="text-base sm:text-xl font-bold text-white mb-2">{productA.model}</h2>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-4">
              ${(productA.priceCents / 100).toFixed(0)}
            </div>
            <a
              href={productA.affiliateUrl}
              className="w-full mt-auto py-2.5 sm:py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              <span>View Best Deal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Card B */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 sm:w-52 sm:h-52 mb-4">
              <Image
                src={productB.imageUrl}
                alt={productB.model}
                fill
                sizes="(max-width: 640px) 150px, 250px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">{productB.brand}</span>
            <h2 className="text-base sm:text-xl font-bold text-white mb-2">{productB.model}</h2>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-4">
              ${(productB.priceCents / 100).toFixed(0)}
            </div>
            <a
              href={productB.affiliateUrl}
              className="w-full mt-auto py-2.5 sm:py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              <span>View Best Deal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Spec Comparison Table */}
        <section className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
            <h3 className="font-bold text-lg text-white">Full Technical Specifications</h3>
          </div>

          {SPEC_CONFIG.map((group, groupIdx) => (
            <div key={group.category} className={groupIdx !== 0 ? 'border-t border-neutral-800' : ''}>
              <div className="px-6 py-2 bg-neutral-950/60 text-xs font-semibold uppercase tracking-wider text-blue-400 border-b border-neutral-800/60">
                {group.category}
              </div>

              <div className="divide-y divide-neutral-800/50">
                {group.items.map((item) => {
                  const valA = productA.specs[item.key];
                  const valB = productB.specs[item.key];
                  const winner = getWinner(item, valA, valB);

                  return (
                    <div key={item.key} className="grid grid-cols-12 py-3 px-4 sm:px-6 hover:bg-neutral-800/20 transition-colors">
                      <div className="col-span-4 flex items-center justify-start text-xs sm:text-sm">
                        <span className={`font-medium ${winner === 'A' ? 'text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20' : 'text-neutral-300'}`}>
                          {typeof valA === 'boolean' ? (valA ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-neutral-500" />) : `${valA ?? '—'}${valA && item.unit ? item.unit : ''}`}
                        </span>
                      </div>

                      <div className="col-span-4 flex items-center justify-center text-center">
                        <span className="text-xs text-neutral-400 font-medium uppercase tracking-tight">{item.label}</span>
                      </div>

                      <div className="col-span-4 flex items-center justify-end text-xs sm:text-sm">
                        <span className={`font-medium ${winner === 'B' ? 'text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20' : 'text-neutral-300'}`}>
                          {typeof valB === 'boolean' ? (valB ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-neutral-500" />) : `${valB ?? '—'}${valB && item.unit ? item.unit : ''}`}
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