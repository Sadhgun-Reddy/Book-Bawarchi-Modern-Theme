import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addDish } from '../store/slices/menuSlice';
import toast from 'react-hot-toast';
import { Check, ChevronLeft, Leaf, Bone, Flame, Plus, Minus, IndianRupee } from 'lucide-react';
import ImageUploader from '../components/common/ImageUploader';
import TagInput from '../components/common/TagInput';

interface DishFormInputs {
  dishName: string;
  description: string;
  category: string;
  cuisine: string;
  basePrice: string;
}

// 3. Main Dish Editor Component
const DishEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.menu);

  // Form States via react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<DishFormInputs>({
    defaultValues: {
      dishName: '',
      description: '',
      category: '',
      cuisine: '',
      basePrice: '0'
    }
  });

  const [minQuantity, setMinQuantity] = useState(1);

  // Complex States
  const [images, setImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [dietaryType, setDietaryType] = useState<'veg' | 'non-veg' | 'vegan'>('veg');
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'medium' | 'hot'>('mild');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleQuantityChange = (delta: number) => {
    setMinQuantity((prev) => Math.max(1, prev + delta));
  };

  const onSubmit: SubmitHandler<DishFormInputs> = async (data) => {
    try {
      await dispatch(
        addDish({
          title: data.dishName,
          description: data.description,
          category: data.category,
          cuisine: data.cuisine,
          pricePerPlate: Number(data.basePrice),
          minQuantity,
          dietaryType,
          spiceLevel,
          ingredients,
        })
      ).unwrap();

      toast.success('Dish added successfully!');
      navigate('/caterer/menus');
    } catch (err) {
      console.error('Failed to add dish:', err);
      toast.error('Failed to add dish. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] text-stone-900 selection:bg-[#ef9d2a]/30">
      {/* Top Bar Wrapper / Header Context */}
      <header className="sticky top-0 z-20 flex h-20 items-center border-b border-stone-100 bg-white/80 px-4 sm:px-8 backdrop-blur-md w-full   mx-auto">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link
            to="/caterer/menus"
            className="text-stone-400 transition-colors hover:text-[#ef9d2a] flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Menu List
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900">Add New Dish</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-8 pb-32">
        {/* Page Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900 mb-2">
              Add New Dish
            </h1>
            <p className="text-stone-500 font-medium">Create a new item for your menu packages.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/caterer/menus"
              className="rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-bold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-full w-40 bg-[#ef9d2a] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d98a1e] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-5 h-5" strokeWidth={3} />
                  Save Dish
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-2 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 font-bold flex items-center">
            {error}
          </div>
        )}

        {/* Left/Right Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-fade-in delay-100">
          {/* LEFT COLUMN: Visuals & Pricing (col-span-1) */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <ImageUploader
              images={images}
              setImages={setImages}
              mainImageIndex={mainImageIndex}
              setMainImageIndex={setMainImageIndex}
            />

            {/* Pricing Card */}
            <section className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-stone-100">
              <h2 className="text-lg font-bold text-stone-900">Pricing Configuration</h2>

              {/* Base Price */}
              <div className="space-y-2">
                <label className="ml-1 text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Base Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('basePrice', { required: 'Price is required' })}
                    className={`block w-full rounded-full border-stone-200 bg-stone-50 px-5 py-4 pl-12 text-xl font-black text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all ${errors.basePrice ? 'border-red-500' : ''}`}
                  />
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                </div>
                {errors.basePrice && <span className="text-red-500 text-xs font-bold pl-2">{errors.basePrice.message}</span>}
              </div>

              {/* Min Quantity Selector */}
              <div className="space-y-2 mt-2">
                <label className="ml-1 text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Min. Order Quantity
                </label>
                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-full border border-stone-100 w-max mx-auto sm:mx-0">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-[#ef9d2a] transition-colors"
                  >
                    <Minus className="w-4 h-4" strokeWidth={3} />
                  </button>
                  <span className="w-12 text-center text-xl font-black text-stone-900 select-none">
                    {minQuantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-[#ef9d2a] transition-colors"
                  >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Dish Details (col-span-2) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <section className="flex flex-col gap-8 rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-sm ring-1 ring-stone-100">
              <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">
                Dish Details
              </h2>

              <div className="space-y-6">
                {/* Details Input Row */}
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-bold text-stone-700">Dish Name</label>
                  <input
                    type="text"
                    {...register('dishName', { required: 'Dish name is required' })}
                    placeholder="E.g., Authentic Hyderabadi Biryani"
                    className={`w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-bold text-lg text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all ${errors.dishName ? 'border-red-500' : ''}`}
                  />
                  {errors.dishName && <span className="text-red-500 text-xs font-bold pl-2">{errors.dishName.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-sm font-bold text-stone-700">Description</label>
                  <textarea
                    rows={4}
                    {...register('description')}
                    placeholder="Describe the dish, its preparation, and what makes it special..."
                    className="w-full resize-none rounded-3xl border-stone-200 bg-stone-50 px-6 py-5 font-medium text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                  />
                </div>

                {/* Selectors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-bold text-stone-700">Category</label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className={`w-full appearance-none rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-bold text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all ${errors.category ? 'border-red-500' : ''}`}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="starters">Starters</option>
                      <option value="main-course">Main Course</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Beverages</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-sm font-bold text-stone-700">Cuisine</label>
                    <select
                      {...register('cuisine')}
                      className="w-full appearance-none rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-bold text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                    >
                      <option value="" disabled>
                        Select Cuisine
                      </option>
                      <option value="indian">Indian</option>
                      <option value="chinese">Chinese</option>
                      <option value="italian">Italian</option>
                      <option value="continental">Continental</option>
                    </select>
                  </div>
                </div>

                <div className="h-px bg-stone-100 my-4"></div>

                {/* Dietary Preference Pills */}
                <div className="space-y-3">
                  <label className="ml-1 text-sm font-bold text-stone-700">Dietary Type</label>
                  <div className="flex flex-wrap gap-3">
                    {/* Veg */}
                    <button
                      onClick={() => setDietaryType('veg')}
                      className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${dietaryType === 'veg'
                        ? 'bg-[#ef9d2a] text-white shadow-md'
                        : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                    >
                      <Leaf className="w-5 h-5" />
                      Vegetarian
                    </button>
                    {/* Non-Veg */}
                    <button
                      onClick={() => setDietaryType('non-veg')}
                      className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${dietaryType === 'non-veg'
                        ? 'bg-[#ef9d2a] text-white shadow-md'
                        : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                    >
                      <Bone className="w-5 h-5" />
                      Non-Vegetarian
                    </button>
                    {/* Vegan */}
                    <button
                      onClick={() => setDietaryType('vegan')}
                      className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${dietaryType === 'vegan'
                        ? 'bg-[#ef9d2a] text-white shadow-md'
                        : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                    >
                      <Leaf className="w-5 h-5" />
                      Vegan
                    </button>
                  </div>
                </div>

                {/* Spice Level Bar */}
                <div className="space-y-3 pt-4 border-t border-stone-50">
                  <label className="ml-1 text-sm font-bold text-stone-700">Spice Level</label>
                  <div className="flex bg-stone-50 p-1.5 rounded-full w-max border border-stone-100">
                    <button
                      onClick={() => setSpiceLevel('mild')}
                      className={`flex flex-col items-center justify-center w-24 py-2 rounded-full transition-all ${spiceLevel === 'mild'
                        ? 'bg-white shadow-sm ring-1 ring-stone-200/50'
                        : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                      <Flame
                        className={`w-5 h-5 ${spiceLevel === 'mild' ? 'text-[#ef9d2a]' : ''}`}
                      />
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${spiceLevel === 'mild' ? 'text-[#ef9d2a]' : ''}`}
                      >
                        Mild
                      </span>
                    </button>
                    <button
                      onClick={() => setSpiceLevel('medium')}
                      className={`flex flex-col items-center justify-center w-24 py-2 rounded-full transition-all ${spiceLevel === 'medium'
                        ? 'bg-white shadow-sm ring-1 ring-stone-200/50'
                        : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                      <div className="flex">
                        <Flame
                          className={`w-5 h-5 ${spiceLevel === 'medium' ? 'text-[#ef9d2a]' : ''}`}
                        />
                        <Flame
                          className={`w-5 h-5 -ml-2 ${spiceLevel === 'medium' ? 'text-[#ef9d2a]' : ''}`}
                        />
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${spiceLevel === 'medium' ? 'text-[#ef9d2a]' : ''}`}
                      >
                        Medium
                      </span>
                    </button>
                    <button
                      onClick={() => setSpiceLevel('hot')}
                      className={`flex flex-col items-center justify-center w-24 py-2 rounded-full transition-all ${spiceLevel === 'hot'
                        ? 'bg-white shadow-sm ring-1 ring-stone-200/50'
                        : 'text-stone-400 hover:text-stone-600'
                        }`}
                    >
                      <div className="flex">
                        <Flame
                          className={`w-5 h-5 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`}
                        />
                        <Flame
                          className={`w-5 h-5 -ml-2 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`}
                        />
                        <Flame
                          className={`w-5 h-5 -ml-2 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`}
                        />
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`}
                      >
                        Hot
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Ingredients Section */}
            <section className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-sm ring-1 ring-stone-100">
              <TagInput tags={ingredients} setTags={setIngredients} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DishEditor;
