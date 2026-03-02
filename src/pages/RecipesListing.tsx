import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Menu, Search, Clock, Flame, Heart, ArrowRight, Filter } from 'lucide-react';

// --- MOCK DATA ---
const RECIPES = [
  {
    id: 1,
    title: 'Spicy Vegan Tacos',
    description: 'Packed with plant-based protein and topped with a zesty lime crema.',
    category: 'Vegan',
    time: '45m',
    difficulty: 'Medium',
    image:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800&h=600',
    chef: {
      name: 'Green Kitchen',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
  },
  {
    id: 2,
    title: 'Classic Butter Chicken',
    description: 'Rich, creamy tomato curry with tender pieces of tandoori chicken.',
    category: 'Main Course',
    time: '1h',
    difficulty: 'Medium',
    image:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800&h=600',
    chef: {
      name: 'Royal Punjab',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
  },
  {
    id: 3,
    title: 'Mango Lassi Mousse',
    description: 'A light and airy dessert capturing the essence of summer mangoes in every bite.',
    category: 'Desserts',
    time: '15m',
    difficulty: 'Easy',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&h=600',
    chef: {
      name: 'Sweet Treats',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
  },
  {
    id: 4,
    title: 'Smoky Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers.',
    category: 'Snacks',
    time: '30m',
    difficulty: 'Easy',
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800&h=600',
    chef: {
      name: 'Tandoori Nights',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
  },
  {
    id: 5,
    title: 'Avocado Toast with Egg',
    description: 'Crispy sourdough topped with smashed avocado, chili flakes, and a poached egg.',
    category: 'Breakfast',
    time: '10m',
    difficulty: 'Easy',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800&h=600',
    chef: {
      name: 'Morning Cafe',
      avatar: 'https://i.pravatar.cc/150?img=44',
    },
  },
  {
    id: 6,
    title: 'Hyderabadi Biryani',
    description:
      'A fragrant rice dish made with aromatic spices and marinated meat, cooked in layers.',
    category: 'Main Course',
    time: '2h',
    difficulty: 'Hard',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800&h=600',
    chef: {
      name: 'Spice Kingdom',
      avatar: 'https://i.pravatar.cc/150?img=59',
    },
  },
];

const CATEGORIES = ['All', 'Breakfast', 'Vegan', 'Desserts', 'Main Course', 'Snacks'];

// --- COMPONENTS ---


const FilterBar = ({ activeCategory, setActiveCategory }: any) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#f3ece7]">
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto overflow-y-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm shrink-0 transition-all ${activeCategory === cat
              ? 'bg-[#ef9d2a] text-white font-bold shadow-md shadow-orange-500/25'
              : 'bg-white border border-[#f3ece7] text-stone-700 font-medium hover:border-[#ef9d2a]/30 hover:bg-orange-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <button className="text-sm font-bold text-stone-500 hover:text-[#ef9d2a] flex items-center gap-1.5 shrink-0 transition-colors">
        <Filter className="w-4 h-4" />
        More Filters
      </button>
    </div>
  );
};

const RecipeCard = ({ recipe }: any) => {
  const navigate = useNavigate();

  return (
    <article
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-[#ef9d2a]/20 flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      {/* Image & Overlays */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-500" strokeWidth={2.5} /> {recipe.time}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <Flame
              className={`w-3.5 h-3.5 ${recipe.difficulty === 'Hard' ? 'text-red-500' : 'text-orange-500'}`}
              strokeWidth={2.5}
            />{' '}
            {recipe.difficulty}
          </span>
        </div>

        {/* Bottom-Right Like Button (Hidden by default) */}
        <button className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center text-stone-400 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-[#ef9d2a] hover:text-white active:scale-95">
          <Heart className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Payload */}
      <div className="flex flex-col flex-grow px-1">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-[#ef9d2a] uppercase tracking-wider">
            {recipe.category}
          </span>
        </div>
        <h3 className="text-[1.15rem] font-bold text-stone-900 mb-2 leading-tight group-hover:text-[#ef9d2a] transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-stone-500 mb-4 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Footer Line */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-200 overflow-hidden ring-2 ring-white shadow-sm">
              <img
                src={recipe.chef.avatar}
                alt={recipe.chef.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-stone-500 group-hover:text-stone-800 transition-colors line-clamp-1">
              By {recipe.chef.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm font-bold text-[#ef9d2a] group-hover:underline">
            Read <ArrowRight className="w-4 h-4 ml-0.5" strokeWidth={3} />
          </div>
        </div>
      </div>
    </article>
  );
};

const RecipesListing = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state for filtering
  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] text-stone-900 selection:bg-[#ef9d2a]/30">

      <main className="flex-grow w-full   mx-auto px-6 py-8 md:py-12">
        {/* Hero & Search Array */}
        <div className="flex flex-col items-center text-center gap-6 mb-12 animate-fade-in-up">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[#ef9d2a] font-bold tracking-wider uppercase text-xs">
              Community Kitchen
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Discover Local Flavors
            </h1>
            <p className="text-stone-500 text-lg md:text-xl font-medium mt-2">
              Authentic recipes shared directly by our community of expert caterers.
            </p>
          </div>

          {/* Search Bar Segment */}
          <div className="w-full max-w-xl relative group mt-2">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#ef9d2a] transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Butter Chicken, Vegan, etc..."
              className="w-full bg-white border-2 border-[#f3ece7] focus:border-[#ef9d2a]/50 focus:ring-4 focus:ring-[#ef9d2a]/10 text-stone-900 placeholder-stone-400 text-base font-medium rounded-full py-4 pl-14 pr-6 transition-all shadow-sm outline-none"
            />
          </div>
        </div>

        {/* Horizontal Filter Bar */}
        <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* 3-Column Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 animate-fade-in">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">No recipes found</h3>
            <p className="text-stone-500 font-medium">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-6 text-[#ef9d2a] font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Structural Pagination Element */}
        {filteredRecipes.length > 0 && (
          <div className="flex justify-center mb-12 border-t border-stone-100 pt-12">
            <button className="px-8 py-3.5 bg-white border border-[#f3ece7] text-stone-700 font-bold rounded-full hover:bg-[#ef9d2a]/5 hover:text-[#ef9d2a] hover:border-[#ef9d2a]/30 transition-all flex items-center gap-2 shadow-sm group">
              Load More Recipes
              <ChefHat className="w-4 h-4 text-stone-400 group-hover:text-[#ef9d2a] transition-colors" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RecipesListing;
