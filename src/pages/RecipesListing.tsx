import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Search, Clock, Flame, Heart, ArrowRight, Filter, Loader2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchRecipes, fetchRecipesFromMenus } from '../store/slices/recipeSlice';
import { Recipe, Caterer } from '../types';
// MOCK CATEGORIES
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

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const navigate = useNavigate();
  const imageUrl = recipe.images && recipe.images.length > 0
    ? `http://localhost:5000/uploads/${recipe.images[0]}`
    : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&h=600';

  let catererName = 'Community Chef';
  let catererAvatar = 'https://i.pravatar.cc/150?img=11';

  if (typeof recipe.caterer === 'object') {
    catererName = (recipe.caterer as Caterer).businessName;
    const catAvatar = (recipe.caterer as Caterer).profileImage;
    if (catAvatar) {
        catererAvatar = `http://localhost:5000/uploads/${catAvatar}`;
    }
  }

  // Fallback metadata if tags aren't specifically formatted
  const category: string = (recipe.tags && recipe.tags.length > 0) ? recipe.tags[0] : 'General';
  const time: string = '45m'; // Default fallback
  const difficulty: string = 'Medium'; // Default fallback


  return (
    <article
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-[#ef9d2a]/20 flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/recipes/${recipe._id}`)}
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-stone-100">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&h=600';
          }}
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-500" strokeWidth={2.5} /> {time}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <Flame
              className={`w-3.5 h-3.5 ${difficulty === 'Hard' ? 'text-red-500' : 'text-orange-500'}`}
              strokeWidth={2.5}
            />{' '}
            {difficulty}
          </span>
        </div>
        <button className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center text-stone-400 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-[#ef9d2a] hover:text-white active:scale-95">
          <Heart className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex flex-col flex-grow px-1">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-[#ef9d2a] uppercase tracking-wider">
            {category}
          </span>
        </div>
        <h3 className="text-[1.15rem] font-bold text-stone-900 mb-2 leading-tight group-hover:text-[#ef9d2a] transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-stone-500 mb-4 line-clamp-2 leading-relaxed">
          {recipe.content}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-200 overflow-hidden ring-2 ring-white shadow-sm">
               <img
                  src={catererAvatar}
                  alt={catererName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150?img=11';
                  }}
               />
            </div>
            <span className="text-xs font-medium text-stone-500 group-hover:text-stone-800 transition-colors line-clamp-1">
              By {catererName}
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
  const dispatch = useAppDispatch();
  const { recipes, fromMenus, isLoading, error } = useAppSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipes());
    // Also fetch dishes from menus for user-facing content
    dispatch(fetchRecipesFromMenus() as any);
  }, [dispatch]);

  // Prefer recipes from menus (dishes) if available, otherwise fall back to recipes
  const dataSource = (fromMenus && fromMenus.length > 0) ? fromMenus : recipes;

  // Filter for approved recipes only, then apply search/category
  const filteredRecipes = dataSource
    .filter((r) => r.approvalStatus === 'approved')
    .filter((recipe) => {
      const category = (recipe.tags && recipe.tags.length > 0) ? recipe.tags[0] : 'General';
      const matchesCategory = activeCategory === 'All' || category === activeCategory;
      // Guard against possibly undefined title; fallback to empty string
      const title = (recipe.title ?? '').toLowerCase();
      const query = searchQuery?.toLowerCase?.() ?? '';
      const matchesSearch =
        title.includes(query) ||
        category.toLowerCase().includes(query);
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

        {/* Loader / Error / Content */}
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#ef9d2a]">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="font-bold text-stone-500">Loading authentic recipes...</p>
            </div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-500">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="font-bold">{error}</p>
            </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 animate-fade-in">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
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
