/**
 * Shared data model for Udyana's construction packages.
 *
 * Split out of components/HomesThatBreathe.tsx so both the marketing
 * teaser (which only shows the name + one-line price) and the gated
 * dossier at /dossier (which shows the full room / material / upgrade
 * detail) read from the same source. If either has to change, edit
 * this file -- never the components that consume it.
 */

export type Landscape = {
  id: 'l1' | 'l2';
  name: string;
  trigger: string;
  tagline: string;
  includes: string[];
  investment: string;
};

export type HouseSection = {
  heading: string;
  rows: Array<[string, string]>;
};

export type Home = {
  id: 'h1' | 'h2';
  name: string;
  trigger: string;
  area: string;
  styleLabel: string;
  styleDesc: string;
  styleNote?: string;
  spaceProgram: Array<[string, string]>;
  materials: Array<[string, string]>;
  featuresLabel: 'Signature Features' | 'Experience Features';
  features: string[];
  upgrades?: HouseSection;
  investment: Array<[string, string]>;
};

export const LANDSCAPES: Landscape[] = [
  {
    id: 'l1',
    name: 'The Understory',
    trigger: 'From ₹1.5 Lakhs',
    tagline: 'Perfect for first-time buyers & nature enthusiasts',
    includes: [
      '10–15 native trees',
      'Pathway stones',
      'Flowering plants',
      'Basic irrigation',
      'Lawn preparation',
      'Sit-out corner',
    ],
    investment: 'Rs. 1.5 – 3 Lakhs',
  },
  {
    id: 'l2',
    name: 'The Woodland',
    trigger: 'From ₹4 Lakhs',
    tagline: 'For eco-conscious buyers seeking a private woodland',
    includes: [
      'Dense native plantation',
      'Meditation corner',
      'Fruit-bearing trees',
      'Stone seating',
      'Bamboo clusters',
      'Water feature + lighting',
    ],
    investment: 'Rs. 4 – 8 Lakhs',
  },
];

export const HOMES: Home[] = [
  {
    id: 'h1',
    name: 'The Earth-Block Pavilion',
    trigger: '1 BHK · From ₹22 Lakhs',
    area: '800 sq.ft',
    styleLabel: 'Architectural Style',
    styleDesc: 'Modern Tropical Earth Home',
    styleNote: 'High sloping roof · Exposed rafters · Deep verandah',
    spaceProgram: [
      ['Living Room', '14 × 12 ft'],
      ['Kitchen', '10 × 8 ft'],
      ['Bedroom', '12 × 12 ft'],
      ['Toilet', '8 × 5 ft'],
      ['Sit-out Deck', '12 × 8 ft'],
      ['Utility', '6 × 4 ft'],
    ],
    materials: [
      ['Structure', 'RCC Frame · M25 Concrete · Fe500 Steel'],
      ['Walls', '9-inch CSEB Blocks, Exposed Earth Finish'],
      ['Flooring', 'Kota Stone / Rustic Tiles'],
      ['Roof', 'RCC Slab + Clay Tile Finish'],
      ['Doors', 'Engineered Teak Finish'],
      ['Windows', 'Aluminium Wood-Finish, Large Panoramic'],
    ],
    featuresLabel: 'Signature Features',
    features: [
      'Sit-out Deck',
      'Outdoor Firepit Zone',
      'Panoramic Windows',
      'Rainwater Harvesting',
      'Solar Provision',
      'Natural Ventilation',
    ],
    investment: [
      ['Standard Premium', 'Rs. 22 – 24 Lakhs'],
      ['Luxury Retreat Finish', 'Rs. 28 – 32 Lakhs'],
    ],
  },
  {
    id: 'h2',
    name: 'The Verandah House',
    trigger: '2 BHK · From ₹34 Lakhs',
    area: '1200 sq.ft',
    styleLabel: 'Design Language',
    styleDesc: '"Luxury Earth Retreat"',
    spaceProgram: [
      ['Living Room', '16 × 14 ft'],
      ['Kitchen + Dining', '12 × 10 ft'],
      ['Master Bedroom', '13 × 12 ft'],
      ['Bedroom 2', '12 × 11 ft'],
      ['Toilets', '8 × 5 ft each'],
      ['Sit-out Deck', '16 × 8 ft'],
      ['Courtyard', 'Optional'],
    ],
    materials: [
      ['Structure', 'RCC Frame, Seismic Compliant'],
      [
        'Walls',
        'Exposed CSEB Masonry · Lime-plastered (cools interiors 3–4°C below concrete)',
      ],
      ['Flooring', 'Natural Stone / IPS / Rustic Tiles'],
      ['Exterior', 'Stone Cladding Accents + Lime Texture'],
      ['Roof', 'Sloped Tiled Roof with Insulation Layer'],
      ['Windows', 'Floor-to-Ceiling Toughened Glass'],
    ],
    featuresLabel: 'Experience Features',
    features: [
      'Private Sit-out Deck',
      'Courtyard Option',
      'Outdoor Shower',
      'Hammock Zone',
      'Firepit Area',
      'Pergola Seating',
    ],
    upgrades: {
      heading: 'Optional Upgrades',
      rows: [
        ['Solar Package', 'Rs. 2.5 Lakhs'],
        ['Jacuzzi Deck', 'Rs. 3.0 Lakhs'],
        ['Infinity Reflection Pond', 'Rs. 2.0 Lakhs'],
        ['Outdoor Kitchen', 'Rs. 1.5 Lakhs'],
        ['Smart Automation', 'Rs. 1.2 Lakhs'],
      ],
    },
    investment: [
      ['Premium Nature Finish', 'Rs. 34 – 38 Lakhs'],
      ['Ultra Luxury Retreat', 'Rs. 42 – 48 Lakhs'],
    ],
  },
];
