import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  Utensils,
  PartyPopper,
  Check,
  Filter,
  RotateCcw,
  ChevronDown,
  Building2,
  Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// --- INTERFACES ---
interface Caterer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  cuisine: string;
  distance: string;
  eventTypes: string[];
  minOrder: string;
  pricePerPlate: string;
  image: string;
  isVerified: boolean;
  tags: string[];
}

// --- MOCK DATA ---
const MOCK_CATERERS: Caterer[] = [
  {
    id: 'CAT-001',
    name: 'Royal Feast Caterers',
    rating: 4.9,
    reviews: 120,
    cuisine: 'North Indian, Continental',
    distance: '3.2 km',
    eventTypes: ['Weddings', 'Corporate'],
    minOrder: '$500',
    pricePerPlate: '$25 - $45',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    isVerified: true,
    tags: ['Premium', 'Top Rated'],
  },
  {
    id: 'CAT-002',
    name: 'Green Leaf Vegan Banquets',
    rating: 4.7,
    reviews: 85,
    cuisine: 'Healthy, Vegan, Italian',
    distance: '5.1 km',
    eventTypes: ['Private Parties', 'Corporate'],
    minOrder: '$200',
    pricePerPlate: '$15 - $30',
    image:
      'https://images.unsplash.com/photo-1498837167922-41c53bbfcdcd?auto=format&fit=crop&q=80&w=800',
    isVerified: true,
    tags: ['Eco-Friendly'],
  },
  {
    id: 'CAT-003',
    name: 'Spice Route Express',
    rating: 4.5,
    reviews: 42,
    cuisine: 'South Indian, Street Food',
    distance: '1.8 km',
    eventTypes: ['Birthdays', 'Casual'],
    minOrder: '$100',
    pricePerPlate: '$10 - $20',
    image:
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    isVerified: false,
    tags: [],
  },
  {
    id: 'CAT-004',
    name: 'Oceanic Seafood & Grill',
    rating: 4.8,
    reviews: 210,
    cuisine: 'Seafood, Mediterranean',
    distance: '7.5 km',
    eventTypes: ['Weddings', 'Galas'],
    minOrder: '$1000',
    pricePerPlate: '$40 - $80',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
    isVerified: true,
    tags: ['Luxury'],
  },
  {
    id: 'CAT-005',
    name: "Mama Joy's Home Cooking",
    rating: 4.6,
    reviews: 34,
    cuisine: 'Comfort Food, BBQ',
    distance: '2.0 km',
    eventTypes: ['Family Events', 'Tailgates'],
    minOrder: '$150',
    pricePerPlate: '$12 - $25',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8892b07d5b?auto=format&fit=crop&q=80&w=800',
    isVerified: false,
    tags: ['Home Chef'],
  },
  {
    id: 'CAT-006',
    name: 'Artisan Baking Co.',
    rating: 4.9,
    reviews: 305,
    cuisine: 'Desserts, French Pastry',
    distance: '4.2 km',
    eventTypes: ['Weddings', 'Bridal Showers'],
    minOrder: '$300',
    pricePerPlate: '$15 - $35',
    image:
      'https://images.unsplash.com/photo-1550184658-ff6132a71714?auto=format&fit=crop&q=80&w=800',
    isVerified: true,
    tags: ['Award Winning'],
  },
];

const CUISINES: string[] = [
  'North Indian',
  'South Indian',
  'Chinese',
  'Italian',
  'Mexican',
  'Vegan',
  'Desserts',
  'Mediterranean',
  'BBQ',
];
const EVENT_TYPES: string[] = ['Weddings', 'Corporate', 'Birthdays', 'Private Parties', 'Casual', 'Galas'];

// --- SUB-COMPONENTS ---

const FilterSidebar: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['North Indian', 'Chinese']);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['Weddings']);
  const [priceRange, setPriceRange] = useState<number>(500);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-transparent sticky top-6">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-black text-xl">
          <Filter className="w-5 h-5" />
          Filters
        </div>
        <button
          onClick={onReset}
          className="text-[#ef9d2a] font-bold text-sm flex items-center gap-1 hover:text-[#d98a1e] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Cuisine Filter (Pill Grid) */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">
          Cuisine Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <button
                key={cuisine}
                onClick={() => toggleCuisine(cuisine)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 flex items-center gap-1.5 ${isSelected
                  ? 'bg-orange-50 border-[#ef9d2a] text-[#ef9d2a]'
                  : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            Max Price / Plate
          </h3>
          <span className="text-[#ef9d2a] font-black">${priceRange}</span>
        </div>

        <div className="relative pt-1">
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#ef9d2a]"
            style={{
              background: `linear-gradient(to right, #ef9d2a ${(priceRange / 2000) * 100}%, #e5e7eb ${(priceRange / 2000) * 100}%)`,
            }}
          />
          {/* Simulated dual handles visually via CSS styling on the range input accent */}
          <div className="flex justify-between text-xs text-stone-400 mt-2 font-medium">
            <span>$10</span>
            <span>$2000+</span>
          </div>
        </div>
      </div>

      {/* Event Types */}
      <div>
        <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">
          Event Category
        </h3>
        <div className="flex flex-col gap-3">
          {EVENT_TYPES.map((event) => {
            const isSelected = selectedEvents.includes(event);
            return (
              <label key={event} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected
                    ? 'bg-[#ef9d2a] border-[#ef9d2a]'
                    : 'border-stone-300 group-hover:border-[#ef9d2a]'
                    }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <span
                  className={`text-sm font-medium ${isSelected ? 'text-stone-900' : 'text-stone-600'}`}
                >
                  {event}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CatererCard: React.FC<{ caterer: Caterer }> = ({ caterer }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/caterers/${caterer.id}`)}
      className="bg-white rounded-[2.5rem] shadow-sm border border-transparent hover:border-stone-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Image Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
        <img
          src={caterer.image}
          alt={caterer.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md border border-white/20">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-black text-stone-900 text-sm">{caterer.rating}</span>
            <span className="font-medium text-stone-400 text-xs">({caterer.reviews})</span>
          </div>
        </div>

        {/* Tags */}
        {caterer.tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {caterer.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#ef9d2a] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 md:p-8 flex flex-col flex-1 gap-5">
        <div className="flex flex-col gap-1.5 border-b border-stone-100 pb-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-black text-stone-900 leading-tight group-hover:text-[#ef9d2a] transition-colors line-clamp-1">
              {caterer.name}
            </h3>
            {caterer.isVerified && (
              <div
                className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"
                title="Verified Caterer"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-stone-500 mt-1">
            <Utensils className="w-4 h-4 shrink-0" />
            <p className="text-sm font-medium line-clamp-1">{caterer.cuisine}</p>
          </div>
        </div>

        {/* Sub-Pills */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 text-xs font-bold border border-stone-100">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            {caterer.distance}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 text-xs font-bold border border-stone-100">
            <PartyPopper className="w-3.5 h-3.5 text-pink-500" />
            <span className="line-clamp-1 max-w-[100px]">
              {caterer.eventTypes[0]} {caterer.eventTypes.length > 1 && '+'}
            </span>
          </div>
        </div>

        {/* Pricing / Meta footer of body */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Price per plate
            </span>
            <span className="text-lg font-black text-stone-900">{caterer.pricePerPlate}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Min Order
            </span>
            <span className="text-sm font-bold text-stone-600">{caterer.minOrder}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-0 flex gap-3 mt-auto">
        <button className="flex-1 h-12 rounded-full border-2 border-stone-200 text-stone-600 font-bold text-sm hover:border-stone-300 hover:bg-stone-50 transition-colors">
          View Profile
        </button>
        <button className="flex-1 h-12 rounded-full bg-[#ef9d2a] text-white font-bold text-sm hover:bg-[#d98a1e] shadow-lg shadow-orange-500/20 transition-transform active:scale-95">
          Enquire
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function FindCaterersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30">
      {/* Minimalist Top Nav (If not layout-wrapper provided) */}

      <div className="  mx-auto px-6 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-8 items-start mt-4">
        {/* LEFT SIDEBAR: Filters (~25%) */}
        <div className="w-full lg:w-[320px] shrink-0">
          <FilterSidebar onReset={() => console.log('Reset filters')} />
        </div>

        {/* MAIN CONTENT (~75%) */}
        <div className="flex-1 w-full flex flex-col min-w-0 pb-20">
          {/* Search Hero Pill */}
          <div className="bg-white rounded-[2rem] p-3 shadow-sm border border-stone-100 flex items-center mb-8 relative z-20">
            <div className="flex-1 flex items-center px-4 gap-3 relative">
              <MapPin className="w-5 h-5 text-[#ef9d2a] shrink-0" />
              <input
                type="text"
                placeholder="Zip code or city (e.g. New York, 10001)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-stone-900 font-medium placeholder:text-stone-400 py-3"
              />
              {/* Vertical Divider */}
              <div className="hidden md:block absolute right-4 top-2 bottom-2 w-px bg-stone-100"></div>
            </div>

            {/* Optional Second Input Block (Date/Guests) - Hidden on smallest screens */}
            <div className="hidden md:flex flex-1 items-center px-8 gap-3">
              <Users className="w-5 h-5 text-stone-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">
                  Guest Count
                </span>
                <span className="text-sm font-bold text-stone-900">50 - 100 People</span>
              </div>
            </div>

            <button className="h-14 px-8 rounded-[1.5rem] bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black flex items-center gap-2 shadow-lg shadow-orange-500/20 active:translate-y-0.5 transition-all shrink-0 ml-2">
              <Search className="w-4 h-4 md:hidden" strokeWidth={3} />
              <span className="hidden md:block">Search</span>
            </button>
          </div>

          {/* Meta/Results Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Top Rated Caterers{' '}
              <span className="text-stone-400 font-medium text-lg ml-2">
                {MOCK_CATERERS.length} found
              </span>
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-bold text-stone-500">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-black text-stone-900 hover:text-[#ef9d2a] transition-colors rounded-full px-4 py-2 bg-white shadow-sm border border-stone-100">
                Recommended <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Caterer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_CATERERS.map((caterer) => (
              <CatererCard key={caterer.id} caterer={caterer} />
            ))}
          </div>

          {/* Load More */}
          <div className="w-full flex justify-center mt-12">
            <button className="px-8 py-4 rounded-full bg-white border-2 border-stone-200 text-stone-600 font-black hover:border-stone-300 hover:bg-stone-50 transition-colors shadow-sm focus:ring-4 focus:ring-stone-100">
              Load 12 more caterers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
