import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat,
  Menu,
  ChevronRight,
  Clock,
  BarChart,
  Users,
  ArrowUpRight,
  ShoppingCart,
  CheckCircle2,
  Minus,
  Plus,
  Mail,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

// --- TYPES ---
export interface RecipeDetails {
  id: string;
  title: string;
  description: string;
  category: {
    main: string;
    sub: string;
    type: string;
  };
  time: string;
  difficulty: string;
  serves: number;
  image: string;
  chef: {
    name: string;
    avatar: string;
    bio: string;
  };
  ingredients: { name: string; amount: string }[];
  steps: { id: number; title: string; description: string; image?: string }[];
}

// --- MOCK DATA ---
const RECIPE_DATA: RecipeDetails = {
  id: 'hyderabadi-biryani',
  title: 'Hyderabadi Dum Biryani with Saffron & Whole Spices',
  description:
    "A rich and aromatic preparation of basmati rice and chicken, cooked on dum with saffron and whole spices. This heirloom recipe brings the authentic taste of the Nizam's kitchen to your home.",
  category: {
    main: 'Recipes',
    sub: 'Indian',
    type: 'Main Course',
  },
  time: '45 Mins',
  difficulty: 'Medium',
  serves: 4,
  image:
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=2400&h=1000',
  chef: {
    name: 'Royal Caterers',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Specializing in grand wedding feasts and corporate events since 1995. We bring the royal flavors of Hyderabad to your plate.',
  },
  ingredients: [
    { name: 'Basmati Rice, soaked', amount: '500g' },
    { name: 'Chicken, curry cut', amount: '1kg' },
    { name: 'Fried Onions (Birista)', amount: '1 cup' },
    { name: 'Ginger Garlic Paste', amount: '2 tbsp' },
    { name: 'Saffron strands, in milk', amount: '1 tsp' },
    { name: 'Mint & Coriander leaves', amount: '1/2 cup' },
    { name: 'Ghee or Oil', amount: '4 tbsp' },
  ],
  steps: [
    {
      id: 1,
      title: 'Marinate the Chicken',
      description:
        'In a large bowl, mix chicken with yogurt, ginger-garlic paste, red chili powder, turmeric, biryani masala, half of the fried onions, mint, coriander, lemon juice, and salt. Let it marinate for at least 2 hours.',
    },
    {
      id: 2,
      title: 'Cook the Rice',
      description:
        'Boil water with whole spices (bay leaf, cloves, cardamom, cinnamon) and salt. Add the soaked rice and cook until it is 70% done. The grain should still have a slight bite to it. Drain the water and set aside.',
      image:
        'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800&h=400',
    },
    {
      id: 3,
      title: 'Layering (Dum)',
      description:
        'In a heavy-bottomed pot, spread the marinated chicken evenly at the bottom. Layer the 70% cooked rice over the chicken. Sprinkle the remaining fried onions, chopped mint, coriander, saffron milk, and ghee over the rice.',
    },
    {
      id: 4,
      title: 'Slow Cooking',
      description:
        'Seal the pot with dough or a tight lid with a cloth. Cook on high heat for 5 minutes, then lower the flame to the lowest setting and cook for 25-30 minutes. Turn off the heat and let it rest for another 10 minutes before opening.',
    },
    {
      id: 5,
      title: 'Serve Hot',
      description:
        'Gently fluff the rice from one side to mix the layers slightly. Serve hot with raita and mirchi ka salan.',
    },
  ],
};

// --- COMPONENTS ---


const RecipeHeroGrid: React.FC<{ data: RecipeDetails }> = ({ data }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 animate-fade-in-up">
      {/* Left: Title & Meta (Cols 1-7) */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-6 font-medium">
          <Link to="/recipes" className="hover:text-stone-800 transition-colors">
            {data.category.main}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-stone-800 transition-colors cursor-pointer">
            {data.category.sub}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#ef9d2a] font-bold">{data.category.type}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1b160d] leading-[1.1] mb-6 tracking-tight">
          {data.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-2xl font-medium">
          {data.description}
        </p>

        {/* Tracking Pills */}
        <div className="flex flex-wrap gap-3">
          <div className="flex h-10 items-center gap-2.5 rounded-full bg-[#ef9d2a]/10 px-5 border border-[#ef9d2a]/20">
            <Clock className="w-5 h-5 text-[#ef9d2a]" strokeWidth={2.5} />
            <span className="text-sm font-bold text-[#1b160d]">{data.time}</span>
          </div>
          <div className="flex h-10 items-center gap-2.5 rounded-full bg-[#ef9d2a]/10 px-5 border border-[#ef9d2a]/20">
            <BarChart className="w-5 h-5 text-[#ef9d2a]" strokeWidth={2.5} />
            <span className="text-sm font-bold text-[#1b160d]">{data.difficulty} Difficulty</span>
          </div>
          <div className="flex h-10 items-center gap-2.5 rounded-full bg-[#ef9d2a]/10 px-5 border border-[#ef9d2a]/20">
            <Users className="w-5 h-5 text-[#ef9d2a]" strokeWidth={2.5} />
            <span className="text-sm font-bold text-[#1b160d]">Serves {data.serves}</span>
          </div>
        </div>
      </div>

      {/* Right: Floating Chef Card (Cols 8-12) */}
      <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 w-full max-w-sm">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={data.chef.avatar}
              alt={data.chef.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-stone-100"
            />
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1">
                Recipe By
              </p>
              <h3 className="text-xl font-bold text-[#1b160d] leading-none">{data.chef.name}</h3>
            </div>
          </div>
          <p className="text-sm text-stone-600 mb-6 leading-relaxed font-medium">{data.chef.bio}</p>
          <button className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-white border-2 border-stone-200 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-all text-sm font-bold text-stone-800 group">
            <span>View Caterer Profile</span>
            <ArrowUpRight
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              strokeWidth={3}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

const CinematicImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="w-full aspect-[21/9] rounded-2xl md:rounded-[3rem] overflow-hidden mb-16 shadow-lg relative group animate-fade-in bg-stone-100">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Subtle bottom gradient to ground the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none opacity-80" />
    </div>
  );
};

const IngredientsSidebar: React.FC<{ ingredients: RecipeDetails['ingredients']; initialServes: number }> = ({ ingredients, initialServes }) => {
  const [serves, setServes] = useState(initialServes);

  const handleMultiplier = (action: 'add' | 'sub') => {
    if (action === 'sub' && serves > 1) setServes(serves - 1);
    if (action === 'add' && serves < 20) setServes(serves + 1);
  };

  return (
    <div className="md:col-span-5 lg:col-span-4 animate-fade-in-up">
      <div className="bg-[#fdf8f0] rounded-3xl p-8 sticky top-28 border border-[#ef9d2a]/10 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#1b160d]">
          <ShoppingCart className="w-6 h-6 text-[#ef9d2a]" strokeWidth={2.5} />
          Ingredients
        </h3>

        <ul className="space-y-4">
          {ingredients.map((ing, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 pb-3 border-b border-[#ef9d2a]/10 last:border-0 last:pb-0"
            >
              <CheckCircle2 className="w-5 h-5 text-[#ef9d2a] mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="text-stone-700 leading-snug font-medium">
                <strong className="text-[#1b160d] font-bold mr-1.5">{ing.amount}</strong>
                {ing.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Portion Adjuster Widget */}
        <div className="mt-8 pt-6 border-t border-[#ef9d2a]/10">
          <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl shadow-sm border border-stone-100">
            <span className="text-sm font-bold text-stone-500 pl-3 uppercase tracking-wider">
              Portions
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleMultiplier('sub')}
                disabled={serves <= 1}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-[#ef9d2a]/20 hover:text-[#ef9d2a] text-stone-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" strokeWidth={3} />
              </button>
              <span className="text-lg font-black text-[#1b160d] w-6 text-center">{serves}</span>
              <button
                onClick={() => handleMultiplier('add')}
                disabled={serves >= 20}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-[#ef9d2a]/20 hover:text-[#ef9d2a] text-stone-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructionStep: React.FC<{ step: RecipeDetails['steps'][0] }> = ({ step }) => {
  return (
    <div className="flex gap-6 group mb-12 last:mb-0">
      {/* Number Badge */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#ef9d2a] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
          {step.id}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 pt-1">
        <h4 className="text-xl font-bold text-[#1b160d] mb-3">{step.title}</h4>
        <p className="text-stone-600 leading-relaxed mb-4 text-[1.05rem] font-medium">
          {step.description}
        </p>

        {/* Optional Step Image */}
        {step.image && (
          <img
            src={step.image}
            alt={`Step ${step.id}`}
            className="rounded-2xl w-full h-64 md:h-80 object-cover mt-6 mb-2 shadow-sm border border-stone-100"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

const LeadGenCTA: React.FC<{ chefName: string }> = ({ chefName }) => {
  return (
    <div className="mt-20 mb-8 animate-fade-in">
      <div className="bg-white border-2 border-[#ef9d2a]/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl shadow-orange-500/5">
        {/* Decorative Abstract Blobs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#ef9d2a]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#ef9d2a]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-black text-[#1b160d] mb-4 tracking-tight">
              Love this recipe?
            </h2>
            <p className="text-stone-600 text-lg font-medium leading-relaxed">
              Skip the cooking and get this authentic dish prepared perfectly for your next family
              gathering or corporate event by{' '}
              <strong className="text-stone-900 border-b-2 border-[#ef9d2a]/50">{chefName}</strong>.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group">
              <span>Send Enquiry</span>
              <Mail
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Use app selector. Using `as any` state fallback since this is a UI migration phase
  const recipeFromStore = useAppSelector((state: any) => state.menu?.items?.find((item: any) => item.id === id));

  // Fallback to mock data for demonstration purposes. We'll show RECIPE_DATA regardless of id during static phase.
  const data: RecipeDetails | undefined = recipeFromStore || RECIPE_DATA;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="text-center p-8 bg-white rounded-[2rem] shadow-sm border border-stone-100 max-w-md w-full">
          <ChefHat className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-2">Recipe Not Found</h2>
          <p className="text-stone-500 font-medium mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/recipes" className="w-full inline-flex justify-center py-3 px-6 rounded-full bg-[#ef9d2a] text-white font-bold hover:bg-[#d98a1e] transition-colors shadow-lg shadow-orange-500/20">
            Browse All Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] text-stone-900 selection:bg-[#ef9d2a]/30">

      {/* Main Content Wrapper */}
      <main className="flex-1 w-full   mx-auto px-6 py-8 md:py-16">
        {/* 1. Header Logic */}
        <RecipeHeroGrid data={data} />

        {/* 2. Cinematic Presentation */}
        <CinematicImage src={data.image} alt={data.title} />

        {/* 3. Core Blueprint (Two-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Sidebar */}
          <IngredientsSidebar ingredients={data.ingredients} initialServes={data.serves} />

          {/* Right Instructions Container */}
          <div className="md:col-span-7 lg:col-span-8 animate-fade-in-up delay-100">
            <h3 className="text-3xl font-black mb-8 text-[#1b160d] tracking-tight border-b-2 border-stone-200 pb-4 inline-block">
              Method
            </h3>
            <div className="mt-4">
              {data.steps.map((step) => (
                <InstructionStep key={step.id} step={step} />
              ))}
            </div>
          </div>
        </div>

        {/* 4. Lead Generation Footer */}
        <LeadGenCTA chefName={data.chef.name} />
      </main>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-stone-200 text-center text-sm font-bold text-stone-400">
        <p>© {new Date().getFullYear()} Book Bawarchi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RecipeDetailPage;
