// lib/catalog.ts

export type Category = 
  | 'smartphones'
  | 'gaming-monitors'
  | 'professional-monitors'
  | 'tvs'
  | 'headphones'
  | 'earbuds';

export interface SpecField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean';
  unit?: string;
  higherIsBetter?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  category: Category;
  brand: string;
  model: string;
  priceCents: number;
  imageUrl: string;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  specs: Record<string, string | number | boolean>;
}

export const CATEGORY_SPECS: Record<Category, { group: string; fields: SpecField[] }[]> = {
  smartphones: [
    {
      group: 'Display & Design',
      fields: [
        { key: 'screenSize', label: 'Screen Size', type: 'number', unit: '″', higherIsBetter: true },
        { key: 'panelType', label: 'Panel Type', type: 'text' },
        { key: 'refreshRate', label: 'Refresh Rate', type: 'number', unit: 'Hz', higherIsBetter: true },
        { key: 'peakBrightness', label: 'Brightness', type: 'number', unit: ' nits', higherIsBetter: true },
      ],
    },
    {
      group: 'Internals & Power',
      fields: [
        { key: 'ram', label: 'RAM', type: 'number', unit: 'GB', higherIsBetter: true },
        { key: 'batteryCapacity', label: 'Battery Capacity', type: 'number', unit: 'mAh', higherIsBetter: true },
        { key: 'chargeSpeed', label: 'Fast Charge', type: 'number', unit: 'W', higherIsBetter: true },
      ],
    },
  ],
  'gaming-monitors': [
    {
      group: 'Panel & Motion',
      fields: [
        { key: 'screenSize', label: 'Size', type: 'number', unit: '″', higherIsBetter: true },
        { key: 'refreshRate', label: 'Refresh Rate', type: 'number', unit: 'Hz', higherIsBetter: true },
        { key: 'responseTime', label: 'Response Time (GtG)', type: 'number', unit: 'ms', higherIsBetter: false },
        { key: 'panelType', label: 'Panel Tech', type: 'text' },
      ],
    },
    {
      group: 'Visuals & Inputs',
      fields: [
        { key: 'resolution', label: 'Native Resolution', type: 'text' },
        { key: 'peakBrightness', label: 'Peak HDR Brightness', type: 'number', unit: ' nits', higherIsBetter: true },
        { key: 'hdmiPorts', label: 'HDMI 2.1 Ports', type: 'number', higherIsBetter: true },
      ],
    },
  ],
  'professional-monitors': [
    {
      group: 'Color Accuracy & Detail',
      fields: [
        { key: 'screenSize', label: 'Size', type: 'number', unit: '″', higherIsBetter: true },
        { key: 'resolution', label: 'Resolution', type: 'text' },
        { key: 'colorGamut', label: 'DCI-P3 Coverage', type: 'number', unit: '%', higherIsBetter: true },
        { key: 'hardwareCalibration', label: 'Hardware Calibration', type: 'boolean' },
      ],
    },
    {
      group: 'Connectivity & Productivity',
      fields: [
        { key: 'thunderboltPowerDelivery', label: 'USB-C / TB PD', type: 'number', unit: 'W', higherIsBetter: true },
        { key: 'kvmSwitch', label: 'Built-in KVM Switch', type: 'boolean' },
      ],
    },
  ],
  tvs: [
    {
      group: 'Picture Quality & Backlight',
      fields: [
        { key: 'screenSize', label: 'Standard Screen Size', type: 'number', unit: '″', higherIsBetter: true },
        { key: 'displayType', label: 'Display Technology', type: 'text' },
        { key: 'refreshRate', label: 'Native Refresh Rate', type: 'number', unit: 'Hz', higherIsBetter: true },
        { key: 'peakBrightness', label: 'Peak Brightness', type: 'number', unit: ' nits', higherIsBetter: true },
      ],
    },
    {
      group: 'Audio & Processing',
      fields: [
        { key: 'processor', label: 'Picture Engine', type: 'text' },
        { key: 'hdmiPorts', label: 'HDMI 2.1 Ports (4K@120Hz)', type: 'number', higherIsBetter: true },
      ],
    },
  ],
  headphones: [
    {
      group: 'Audio & Acoustics',
      fields: [
        { key: 'driverSize', label: 'Acoustic Driver Size', type: 'number', unit: 'mm', higherIsBetter: true },
        { key: 'ancSupport', label: 'Active Noise Cancelling', type: 'boolean' },
        { key: 'spatialAudio', label: 'Head-Tracked Spatial Audio', type: 'boolean' },
      ],
    },
    {
      group: 'Battery & Portability',
      fields: [
        { key: 'batteryLife', label: 'Battery Life (ANC On)', type: 'number', unit: ' hrs', higherIsBetter: true },
        { key: 'weight', label: 'Weight', type: 'number', unit: 'g', higherIsBetter: false },
        { key: 'multipoint', label: 'Bluetooth Multipoint', type: 'boolean' },
      ],
    },
  ],
  earbuds: [
    {
      group: 'Form & Performance',
      fields: [
        { key: 'batteryLife', label: 'Single Playback Time', type: 'number', unit: ' hrs', higherIsBetter: true },
        { key: 'caseBatteryLife', label: 'Total Playback with Case', type: 'number', unit: ' hrs', higherIsBetter: true },
        { key: 'waterResistance', label: 'IP Rating', type: 'text' },
        { key: 'wirelessCharging', label: 'Qi Wireless Case', type: 'boolean' },
      ],
    },
    {
      group: 'Connectivity & Codecs',
      fields: [
        { key: 'ancSupport', label: 'Adaptive ANC', type: 'boolean' },
        { key: 'multipoint', label: 'Bluetooth Multipoint', type: 'boolean' },
      ],
    },
  ],
};

export const CATALOG: Record<string, Product> = {
  // --- SMARTPHONES ---
  'apple-iphone-17-pro-max': {
    id: 'phone_17pm',
    slug: 'apple-iphone-17-pro-max',
    category: 'smartphones',
    brand: 'Apple',
    model: 'iPhone 17 Pro Max',
    priceCents: 119900,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.8,
    reviewCount: 342,
    specs: { screenSize: 6.9, panelType: 'LTPO OLED', refreshRate: 120, peakBrightness: 3000, ram: 12, batteryCapacity: 4850, chargeSpeed: 45 },
  },
  'samsung-galaxy-s26-ultra': {
    id: 'phone_s26u',
    slug: 'samsung-galaxy-s26-ultra',
    category: 'smartphones',
    brand: 'Samsung',
    model: 'Galaxy S26 Ultra',
    priceCents: 129900,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.7,
    reviewCount: 219,
    specs: { screenSize: 6.8, panelType: 'Dynamic AMOLED 2X', refreshRate: 144, peakBrightness: 3200, ram: 16, batteryCapacity: 5000, chargeSpeed: 65 },
  },

  // --- GAMING MONITORS ---
  'asus-rog-swift-pg32ucdm': {
    id: 'mon_pg32ucdm',
    slug: 'asus-rog-swift-pg32ucdm',
    category: 'gaming-monitors',
    brand: 'ASUS ROG',
    model: 'Swift OLED PG32UCDM',
    priceCents: 129900,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.9,
    reviewCount: 145,
    specs: { screenSize: 32, refreshRate: 240, responseTime: 0.03, panelType: 'QD-OLED', resolution: '3840 x 2160 (4K)', peakBrightness: 1000, hdmiPorts: 2 },
  },
  'dell-alienware-aw3225qf': {
    id: 'mon_aw3225qf',
    slug: 'dell-alienware-aw3225qf',
    category: 'gaming-monitors',
    brand: 'Dell Alienware',
    model: 'AW3225QF Curved QD-OLED',
    priceCents: 119900,
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.8,
    reviewCount: 198,
    specs: { screenSize: 32, refreshRate: 240, responseTime: 0.03, panelType: 'Curved QD-OLED (1700R)', resolution: '3840 x 2160 (4K)', peakBrightness: 1000, hdmiPorts: 2 },
  },

  // --- PROFESSIONAL MONITORS ---
  'apple-studio-display': {
    id: 'mon_studio_disp',
    slug: 'apple-studio-display',
    category: 'professional-monitors',
    brand: 'Apple',
    model: 'Studio Display 5K',
    priceCents: 159900,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.6,
    reviewCount: 310,
    specs: { screenSize: 27, resolution: '5120 x 2880 (5K)', colorGamut: 99, hardwareCalibration: false, thunderboltPowerDelivery: 96, kvmSwitch: false },
  },
  'dell-ultrasharp-u3224kb': {
    id: 'mon_u3224kb',
    slug: 'dell-ultrasharp-u3224kb',
    category: 'professional-monitors',
    brand: 'Dell',
    model: 'UltraSharp 32 6K (U3224KB)',
    priceCents: 239900,
    imageUrl: 'https://images.unsplash.com/photo-1585792180666-f7547c6a28c5?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.7,
    reviewCount: 88,
    specs: { screenSize: 32, resolution: '6144 x 3456 (6K)', colorGamut: 99, hardwareCalibration: true, thunderboltPowerDelivery: 140, kvmSwitch: true },
  },

  // --- TVS ---
  'lg-oled-g4-65': {
    id: 'tv_lgg4',
    slug: 'lg-oled-g4-65',
    category: 'tvs',
    brand: 'LG',
    model: 'OLED evo G4 Series (65″)',
    priceCents: 279900,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.9,
    reviewCount: 164,
    specs: { screenSize: 65, displayType: 'MLA OLED', refreshRate: 144, peakBrightness: 1500, processor: 'α11 AI Processor 4K', hdmiPorts: 4 },
  },
  'samsung-s95d-65': {
    id: 'tv_sams95d',
    slug: 'samsung-s95d-65',
    category: 'tvs',
    brand: 'Samsung',
    model: 'S95D Glare-Free OLED (65″)',
    priceCents: 299900,
    imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.8,
    reviewCount: 142,
    specs: { screenSize: 65, displayType: 'Glare-Free QD-OLED', refreshRate: 144, peakBrightness: 1650, processor: 'NQ4 AI Gen2', hdmiPorts: 4 },
  },

  // --- OVER-EAR HEADPHONES ---
  'sony-wh-1000xm5': {
    id: 'hp_sony_xm5',
    slug: 'sony-wh-1000xm5',
    category: 'headphones',
    brand: 'Sony',
    model: 'WH-1000XM5 Wireless',
    priceCents: 39900,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.7,
    reviewCount: 890,
    specs: { driverSize: 30, ancSupport: true, spatialAudio: true, batteryLife: 30, weight: 250, multipoint: true },
  },
  'bose-quietcomfort-ultra-hp': {
    id: 'hp_bose_qc_ultra',
    slug: 'bose-quietcomfort-ultra-hp',
    category: 'headphones',
    brand: 'Bose',
    model: 'QuietComfort Ultra Headphones',
    priceCents: 42900,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.6,
    reviewCount: 650,
    specs: { driverSize: 35, ancSupport: true, spatialAudio: true, batteryLife: 24, weight: 252, multipoint: true },
  },

  // --- EARBUDS ---
  'apple-airpods-pro-2': {
    id: 'eb_airpods_pro_2',
    slug: 'apple-airpods-pro-2',
    category: 'earbuds',
    brand: 'Apple',
    model: 'AirPods Pro (2nd Gen USB-C)',
    priceCents: 24900,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.8,
    reviewCount: 1450,
    specs: { batteryLife: 6, caseBatteryLife: 30, waterResistance: 'IP54', wirelessCharging: true, ancSupport: true, multipoint: false },
  },
  'sony-wf-1000xm5': {
    id: 'eb_sony_wf_xm5',
    slug: 'sony-wf-1000xm5',
    category: 'earbuds',
    brand: 'Sony',
    model: 'WF-1000XM5 True Wireless',
    priceCents: 29900,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    affiliateUrl: '#',
    rating: 4.6,
    reviewCount: 520,
    specs: { batteryLife: 8, caseBatteryLife: 24, waterResistance: 'IPX4', wirelessCharging: true, ancSupport: true, multipoint: true },
  },
};

export function getAllCanonicalPairs(): { slug: string }[] {
  const products = Object.values(CATALOG);
  const pairs: { slug: string }[] = [];

  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      const prodA = products[i];
      const prodB = products[j];
      // Restrict comparisons to the same category
      if (prodA.category === prodB.category) {
        const canonicalSlug = [prodA.slug, prodB.slug].sort().join('-vs-');
        pairs.push({ slug: canonicalSlug });
      }
    }
  }

  return pairs;
}
