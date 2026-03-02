import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Heart,
  Share2,
  CheckCircle,
  Award,
  Info,
  Utensils,
  Calendar,
  Leaf,
  ShieldCheck,
  ThumbsUp,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppSelector } from '../hooks/redux';

// --- TYPES ---
export interface CatererProfileData {
  name: string;
  isVerified: boolean;
  coverImage: string;
  cuisineTags: string;
  yearsInBusiness: string;
  rating: number;
  reviews: number;
  eventsCompleted: string;
  about: string;
  certifications: { icon: React.ElementType; label: string; color: string; bg: string }[];
}

export interface SignatureDish {
  id: string;
  title: string;
  description: string;
  price: string;
  isVeg: boolean;
  image: string;
}

// --- MOCK DATA ---
const CATERER: CatererProfileData = {
  name: 'Royal Feast Caterers',
  isVerified: true,
  coverImage:
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600',
  cuisineTags: 'North Indian • Continental • Mughlai',
  yearsInBusiness: '12 Years in Business',
  rating: 4.9,
  reviews: 120,
  eventsCompleted: '500+',
  about:
    'At Royal Feast Caterers, we believe that every event is a story waiting to be told through food. With over a decade of experience in crafting unforgettable culinary experiences, our team of master chefs specializes in bringing authentic flavors to your special occasions. From intimate gatherings to grand weddings, we source only the freshest ingredients and employ traditional cooking methods to ensure every dish is a masterpiece.',
  certifications: [
    { icon: ShieldCheck, label: 'FSSAI Certified', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Leaf, label: 'Sustainable Packaging', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Award, label: 'Top Rated 2023', color: 'text-purple-600', bg: 'bg-purple-50' },
  ],
};

const DISHES: SignatureDish[] = [
  {
    id: 'D01',
    title: 'Mughlai Chicken Biryani',
    description: 'Slow-cooked basmati rice with marinated chicken and aromatic spices.',
    price: '₹350/plate',
    isVeg: false,
    image:
      'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'D02',
    title: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a rich, creamy tomato gravy.',
    price: '₹280/plate',
    isVeg: true,
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe1a71e7?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'D03',
    title: 'Dal Makhani',
    description: 'Creamy black lentils simmered overnight for authentic flavor.',
    price: '₹220/plate',
    isVeg: true,
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'D04',
    title: 'Tandoori Platter',
    description: 'Assortment of grilled kebabs and tikkas served with mint chutney.',
    price: '₹450/plate',
    isVeg: false,
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
  },
];

const GALLERY: string[] = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1505366518141-eb6662e6afbe?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1530103862676-de8892b07d5b?auto=format&fit=crop&q=80&w=600',
];

// --- SUB-COMPONENTS ---

const ProfileHero: React.FC<{ caterer: CatererProfileData }> = ({ caterer }) => (
  <div className="relative w-full   mx-auto h-[400px] rounded-[2.5rem] overflow-hidden shadow-sm feature-hero mt-4">
    {/* Background Image & Gradient */}
    <img
      src={caterer.coverImage}
      alt={caterer.name}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

    {/* Top Right Actions */}
    <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20">
        <Share2 className="w-4 h-4" />
      </button>
    </div>

    {/* Content Box (Bottom Left) */}
    <div className="absolute bottom-8 left-8 md:left-12 flex flex-col gap-3 z-10 w-full md:w-2/3 pr-8">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
          {caterer.name}
        </h1>
        {caterer.isVerified && (
          <div
            className="w-8 h-8 rounded-full bg-[#ef9d2a] flex items-center justify-center shrink-0 shadow-lg"
            title="Verified Caterer"
          >
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-white/90 font-medium">
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
          <Utensils className="w-4 h-4" />
          <span>{caterer.cuisineTags}</span>
        </div>
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
          <Calendar className="w-4 h-4" />
          <span>{caterer.yearsInBusiness}</span>
        </div>
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-[#ef9d2a]/90 text-white px-3 py-1 rounded-full border border-orange-400/30">
          <Star className="w-4 h-4 fill-white" />
          <span className="font-bold">{caterer.rating}</span>
          <span className="text-white/80 text-sm">({caterer.reviews})</span>
        </div>
      </div>
    </div>

    {/* Primary Actions (Bottom Right) */}
    <div className="absolute bottom-8 right-8 md:right-12 flex items-center gap-3 z-10">
      <button className="hidden sm:flex items-center gap-2 h-12 px-6 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-50 transition-colors shadow-lg">
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        Save
      </button>
      <button className="h-12 px-8 rounded-full bg-[#ef9d2a] text-white font-black hover:bg-[#d98a1e] transition-colors shadow-lg shadow-orange-500/30 transform active:scale-95">
        Request Quote
      </button>
    </div>
  </div>
);

const SignatureDishCard: React.FC<{ dish: SignatureDish }> = ({ dish }) => (
  <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden flex flex-col group hover:shadow-md transition-all">
    <div className="relative h-48 w-full shrink-0">
      <img
        src={dish.image}
        alt={dish.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Dietary Dot Badge */}
      <div className="absolute top-4 right-4 z-10 bg-white p-1.5 rounded-md shadow-sm">
        <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      {/* Price Pill overlay */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="bg-[#ef9d2a] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
          {dish.price}
        </span>
      </div>
    </div>
    <div className="p-5 flex flex-col gap-2 flex-1 bg-white relative z-20">
      <h4 className="text-lg font-bold text-stone-900 line-clamp-1 group-hover:text-[#ef9d2a] transition-colors">
        {dish.title}
      </h4>
      <p className="text-sm font-medium text-stone-500 line-clamp-2">{dish.description}</p>
    </div>
  </div>
);

const StickySidebar: React.FC<{ caterer: CatererProfileData }> = ({ caterer }) => (
  <div className="sticky top-24 flex flex-col gap-6">
    {/* Current Offers Card */}
    <div className="bg-orange-50 rounded-[2rem] p-6 border border-orange-100/50">
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-[#ef9d2a] font-black uppercase tracking-widest text-xs">
          Deals & Offers
        </span>
        <h3 className="text-xl font-bold text-stone-900">Early Bird Special</h3>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
        <p className="font-bold text-stone-900 mb-1">10% Off Winter Weddings</p>
        <p className="text-sm text-stone-500 font-medium">
          Book before Nov 30th for events in Dec-Jan. Minimum guest count 100.
        </p>
      </div>
    </div>

    {/* Trust & Map Card */}
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Kitchen Standards</h3>
        <ul className="flex flex-col gap-3">
          {[
            'FSSAI Registered Facility',
            '100% Staff Vaccinated',
            'Daily Temperature Checks',
            'Regular Pest Control',
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm font-medium text-stone-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Static Map Region */}
      <div className="relative h-40 w-full bg-slate-100 mt-2">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&blur=2"
          alt="Map Location"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <MapPin className="w-6 h-6 text-[#ef9d2a] fill-orange-100" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white to-transparent h-12"></div>
      </div>
      <div className="px-6 py-4 bg-white text-center border-t border-stone-50">
        <p className="text-sm font-bold text-stone-600">Serves up to 50km radius</p>
      </div>
    </div>

    {/* Primary Booking CTA Card (Dark Theme) */}
    <div className="bg-slate-900 rounded-[2rem] p-6 text-center transform transition-all shadow-xl shadow-slate-900/10">
      <h3 className="text-2xl font-black text-white mb-2">Ready to book?</h3>
      <p className="text-slate-400 font-medium text-sm mb-6">
        Get a customized quote for your event within 24 hours.
      </p>
      <button
        onClick={() => toast.success('Enquiry Sent Successfully!')}
        className="w-full h-14 rounded-full bg-[#ef9d2a] text-white font-black hover:bg-[#d98a1e] transition-all shadow-lg shadow-orange-500/20 active:scale-95 text-lg"
      >
        Send Enquiry Now
      </button>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function CatererProfilePage() {
  const { id } = useParams<{ id: string }>();
  const tabs = ['Overview', 'Menu', 'Reviews', 'Gallery'];
  const [activeTab, setActiveTab] = useState('Overview');

  const catererFromStore = useAppSelector((state: any) => state.caterers?.items?.find((c: any) => c.id === id));
  const caterer: CatererProfileData | undefined = catererFromStore || (id === 'CAT-001' || !id ? CATERER : undefined);

  if (!caterer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="text-center p-8 bg-white rounded-[2rem] shadow-sm border border-stone-100 max-w-md w-full">
          <Utensils className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-2">Caterer Not Found</h2>
          <p className="text-stone-500 font-medium mb-6">The caterer profile you're looking for doesn't exist.</p>
          <Link to="/caterers" className="w-full inline-flex justify-center py-3 px-6 rounded-full bg-[#ef9d2a] text-white font-bold hover:bg-[#d98a1e] transition-colors shadow-lg shadow-orange-500/20">
            Find Caterers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24">
      {/* Minimal Header Nav */}

      <main className="  mx-auto px-6">
        {/* 1. Hero Container */}
        <ProfileHero caterer={caterer} />

        {/* 2. Primary Layout Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            {/* Custom Tab Navigation */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm border border-stone-100 w-max overflow-x-auto max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                    ? 'bg-[#ef9d2a] text-white shadow-md'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* About Module */}
            <section className="scroll-mt-32" id="overview">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ef9d2a]">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-stone-900">About the Caterer</h2>
              </div>
              <p className="text-stone-600 font-medium leading-relaxed text-lg">{caterer.about}</p>

              {/* Certifications Row */}
              <div className="flex flex-wrap gap-4 mt-8">
                {caterer.certifications.map((cert, idx) => {
                  const Icon = cert.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 pr-6 rounded-xl bg-white border border-stone-100 shadow-sm"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${cert.bg} ${cert.color} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-stone-800">{cert.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Menu Module */}
            <section className="scroll-mt-32" id="menu">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ef9d2a]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-stone-900">Signature Menu</h2>
                </div>
                <button className="text-[#ef9d2a] font-bold text-sm hover:underline">
                  View Full Menu
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {DISHES.map((dish) => (
                  <SignatureDishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Gallery Module */}
            <section className="scroll-mt-32" id="gallery">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ef9d2a]">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-stone-900">Event Gallery</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Event ${idx + 1}`}
                    className="w-full aspect-square object-cover rounded-[1.5rem] hover:opacity-90 transition-opacity cursor-pointer border border-stone-100 shadow-sm"
                  />
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <aside className="lg:col-span-1">
            <StickySidebar caterer={caterer} />
          </aside>
        </div>
      </main>
    </div>
  );
}
