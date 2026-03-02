import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import {
  Flame,
  MapPin,
  Search,
  Frown,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  Star,
  ChevronRight,
  UtensilsCrossed,
  MessageCircle,
  Lock,
  Smile,
  Globe,
  Camera,
  AtSign,
  ArrowRight as ArrowRightIcon,
} from 'lucide-react';

// --- MOCK DATA ---
const CATERERS = [
  {
    id: 1,
    name: "Maria's Empanadas",
    image:
      'https://images.unsplash.com/photo-1544025162-8369fd9975e5?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    cuisine: 'Argentinian',
    distance: '2.5 miles away',
    tagColor: 'text-orange-700',
    tagBg: 'bg-orange-100',
  },
  {
    id: 2,
    name: "Ken's Sushi Bar",
    image:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    cuisine: 'Japanese',
    distance: '1.2 miles away',
    tagColor: 'text-blue-700',
    tagBg: 'bg-blue-100',
  },
  {
    id: 3,
    name: "Priya's Curry House",
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    cuisine: 'Indian',
    distance: '3.0 miles away',
    tagColor: 'text-red-700',
    tagBg: 'bg-red-100',
  },
  {
    id: 4,
    name: "Nonna's Italian",
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    cuisine: 'Italian',
    distance: '0.8 miles away',
    tagColor: 'text-green-700',
    tagBg: 'bg-green-100',
  },
];

const RECIPES = [
  {
    id: 1,
    title: 'Avocado Super Bowl',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    time: '15 mins',
    type: 'Healthy',
  },
  {
    id: 2,
    title: 'Spicy Chicken Curry',
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
    time: '45 mins',
    type: 'Spicy',
  },
  {
    id: 3,
    title: 'Fluffy Pancakes',
    image:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600',
    time: '25 mins',
    type: 'Breakfast',
  },
  {
    id: 4,
    title: 'Berry Smoothie',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600',
    time: '5 mins',
    type: 'Drink',
  },
];

// --- COMPONENTS ---


const Hero = () => {
  const navigate = useNavigate();

  return (
    <header className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-orange-100/40 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-sm font-bold text-primary">
          <Flame size={16} strokeWidth={2.5} />
          New caterers added daily!
        </span>

        <h1 className="font-display mb-6 text-5xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
          Discover Trusted Local Caterers & <span className="text-primary">Community Food</span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-neutral-600 sm:text-xl">
          From home-cooked meals to event catering, find the best food in your neighborhood crafted by
          passionate local chefs.
        </p>

        <div className="w-full max-w-2xl">
          <form className="group relative flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-2 shadow-xl shadow-black/5 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full text-neutral-400">
              <MapPin size={24} />
            </div>
            <input
              className="flex-1 border-none bg-transparent px-2 text-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0"
              placeholder="Enter your zip code or city..."
              type="text"
            />
            <button
              onClick={() => navigate('/caterers')}
              className="flex h-12 flex-none items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white transition hover:bg-primary-dark sm:px-10"
              type="button"
            >
              <span className="hidden sm:inline">Find a Caterer</span>
              <Search size={20} className="sm:hidden" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

const ProblemSolution = () => (
  <section className="mx-auto   px-6 py-20">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Problem Card */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-neutral-100 p-10 lg:p-16">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/50 blur-2xl"></div>
        <div className="relative z-10">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-neutral-400 shadow-sm">
            <Frown size={28} />
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold text-neutral-900">
            Tired of generic fast food?
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600">
            Skip the chains and processed meals. Often, the food available quickly nearby lacks the
            soul, nutrition, and variety you crave after a long day.
          </p>
        </div>
      </div>

      {/* Solution Card */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-primary p-10 lg:p-16 text-white">
        <div className="absolute left-0 bottom-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-white/20 blur-2xl"></div>
        <div className="relative z-10">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
            <HeartHandshake size={28} />
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold">Taste the local difference.</h2>
          <p className="text-lg leading-relaxed text-white/90">
            Connect directly with passionate home chefs and local caterers. Discover unique,
            homemade dishes prepared with love, heritage, and fresh ingredients right in your
            community.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CatererCard = ({ caterer }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative flex w-80 flex-none flex-col gap-4 cursor-pointer"
      onClick={() => navigate(`/caterers/${caterer.id}`)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
        <img
          alt={caterer.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={caterer.image}
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm font-bold text-neutral-900 shadow-sm">
          <Star size={16} className="text-amber-400 fill-amber-400" /> {caterer.rating.toFixed(1)}
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-1">
          {caterer.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${caterer.tagColor} ${caterer.tagBg}`}
          >
            {caterer.cuisine}
          </span>
          <span className="text-sm font-medium text-neutral-500">{caterer.distance}</span>
        </div>
      </div>
    </div>
  );
};

const FeaturedCaterers = () => {
  return (
    <section className="py-20 bg-neutral-50 border-y border-neutral-100 overflow-hidden">
      <div className="mx-auto   px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Featured Caterers
            </h2>
            <p className="mt-4 text-lg text-neutral-500">Top-rated chefs in your area this week.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary transition">
              <ArrowLeft size={20} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary transition">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider visually hidden scrollbar */}
        <div className="hide-scrollbar flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATERERS.map((c) => (
            <CatererCard key={c.id} caterer={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '1. Search',
      desc: 'Enter your location to find local chefs nearby.',
      icon: <MapPin size={32} />,
    },
    {
      id: 2,
      title: '2. Browse',
      desc: 'Explore menus, photos, and chef profiles.',
      icon: <UtensilsCrossed size={32} />,
    },
    {
      id: 3,
      title: '3. Chat',
      desc: 'Discuss details and customize your order.',
      icon: <MessageCircle size={32} />,
    },
    {
      id: 4,
      title: '4. Book',
      desc: 'Securely pay and confirm your delicious meal.',
      icon: <Lock size={32} />,
    },
    {
      id: 5,
      title: '5. Enjoy',
      desc: 'Savor the food and leave a review for the community.',
      icon: <Smile size={32} />,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto   px-6">
        <div className="mb-16 text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-wider text-primary">
            Simple & Secure
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
            How Book Bawarchi Works
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-0 top-12 hidden h-0.5 w-full -translate-y-1/2 border-t-2 border-dashed border-neutral-200 lg:block"></div>

          <div className="grid gap-12 lg:grid-cols-5">
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-neutral-50 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="font-display mb-2 text-xl font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RecipeCard = ({ recipe }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative flex w-72 flex-none flex-col rounded-3xl bg-white p-4 shadow-xl shadow-neutral-200/50 transition-transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
        <img
          alt={recipe.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={recipe.image}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="font-display mb-1 text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        <p className="mb-4 text-sm font-medium text-neutral-500">
          {recipe.time} • {recipe.type}
        </p>
        <button className="mt-auto flex w-full items-center justify-center rounded-full bg-neutral-100 py-3 text-sm font-bold text-neutral-900 hover:bg-neutral-200 transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  );
};

const CommunityRecipes = () => (
  <section className="overflow-hidden bg-primary-light/40 py-24 border-y border-neutral-100">
    <div className="mx-auto   px-6">
      <h2 className="font-display mb-12 text-center text-3xl font-bold text-neutral-900 sm:text-4xl">
        Latest Recipes from the Community
      </h2>
      <div className="hide-scrollbar flex gap-8 overflow-x-auto px-6 pb-12 -mx-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {RECIPES.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60"></div>

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <h2 className="font-display mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          {isAuthenticated ? 'Ready for your next event?' : 'Ready to taste the difference?'}
        </h2>
        <p className="mb-10 text-xl font-medium text-neutral-600">
          {isAuthenticated
            ? 'Browse our top-rated caterers and plan your next memorable meal today.'
            : 'Join thousands of food lovers and talented local chefs building a stronger community through food.'
          }
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate('/caterers')}
            className="h-14 min-w-[200px] rounded-full bg-primary px-8 text-lg font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark hover:-translate-y-0.5"
          >
            Find a Caterer
          </button>
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/signup')}
              className="h-14 min-w-[200px] rounded-full border-2 border-neutral-200 bg-transparent px-8 text-lg font-bold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              Get Started
            </button>
          )}
          <button
            onClick={() => navigate('/recipes')}
            className={`h-14 min-w-[200px] rounded-full border-2 border-neutral-200 bg-transparent px-8 text-lg font-bold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-50 ${isAuthenticated ? '' : 'sm:hidden lg:inline-flex'}`}
          >
            View Recipes
          </button>
        </div>
      </div>
    </section>
  );
};


// --- MAIN PAGE ---

const HomePage = () => {
  return (
    <div className="bg-background-light font-sans text-neutral-800 selection:bg-primary selection:text-white">
      <main>
        <Hero />
        <ProblemSolution />
        <FeaturedCaterers />
        <HowItWorks />
        <CommunityRecipes />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;
