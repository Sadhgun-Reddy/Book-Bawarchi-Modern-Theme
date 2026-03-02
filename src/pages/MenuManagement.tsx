import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMenu, updateDish } from '../store/slices/menuSlice';
import { Dish } from '../types';
import { CheckCircle2, Plus, Utensils, Edit2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/common/SkeletonCard';

// --- COMPONENTS ---

interface MenuPackageCardProps {
  menu: Dish;
  onToggle: (id: string) => void;
}

const MenuPackageCard: React.FC<MenuPackageCardProps> = ({ menu, onToggle }) => {
  const isDraft = menu.status === 'draft';

  return (
    <div
      className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#ef9d2a]/20 relative flex flex-col h-full ${isDraft ? 'opacity-80' : ''}`}
    >
      {/* Top Absolute Badge */}
      <div className="absolute top-6 right-6 z-10">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${isDraft ? 'bg-stone-100 text-stone-600' : 'bg-emerald-100 text-emerald-800'
            }`}
        >
          {menu.status === 'published' ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* Avatar Group (Images) */}
      <div
        className={`flex -space-x-4 mb-6 pt-2 pl-2 ${isDraft ? 'filter grayscale opacity-70' : ''}`}
      >
        {/* Image 1 */}
        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-30 bg-stone-100 flex items-center justify-center">
          {menu.images[0] ? (
            <img src={menu.images[0]} alt="Dish 1" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-stone-300" />
          )}
        </div>
        {/* Image 2 */}
        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-20 bg-stone-100 flex items-center justify-center">
          {menu.images[1] ? (
            <img src={menu.images[1]} alt="Dish 2" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-stone-300" />
          )}
        </div>
        {/* Count Indicator */}
        {menu.additionalImagesCount > 0 ? (
          <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-10 bg-stone-100 flex items-center justify-center">
            <span className="text-xs font-bold text-stone-500">+{menu.additionalImagesCount}</span>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-10 bg-stone-50 flex items-center justify-center"></div>
        )}
      </div>

      {/* Content Payload */}
      <div className="flex-1 mb-4">
        <span className="text-[#ef9d2a] text-[10px] font-black uppercase tracking-wider mb-1.5 block">
          {menu.category}
        </span>
        <h3 className="text-xl font-bold text-stone-900 leading-tight mb-2">{menu.title}</h3>
        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed font-medium">
          {menu.description}
        </p>
      </div>

      {/* Statistics Row */}
      <div className="flex items-center gap-4 py-4 border-t border-stone-100 mb-4 mt-auto">
        <div className="flex items-center gap-1.5">
          <Utensils className="w-4 h-4 text-stone-400" />
          <span className="text-sm font-bold text-stone-700">{menu.itemCount} Items</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-stone-300"></div>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-black text-[#ef9d2a]">${menu.pricePerPlate}</span>
          <span className="text-xs text-stone-400 font-bold uppercase tracking-wide">/ plate</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        {/* Toggle Logic */}
        <div className={`flex items-center gap-2 ${isDraft ? 'opacity-60' : ''}`}>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={menu.isPublic}
              onChange={() => onToggle(menu.id)}
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ef9d2a]"></div>
          </label>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
            {menu.isPublic ? 'Public' : 'Hidden'}
          </span>
        </div>

        {/* Edit Action */}
        <button className="text-stone-400 hover:text-[#ef9d2a] hover:bg-[#ef9d2a]/10 p-2 rounded-full transition-colors">
          <Edit2 className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

const AddNewPlaceholder: React.FC = () => {
  return (
    <Link
      to="/caterer/menus/dish/new"
      className="group bg-transparent rounded-2xl p-6 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center min-h-[360px] cursor-pointer hover:border-[#ef9d2a]/50 hover:bg-[#ef9d2a]/5 transition-all"
    >
      <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Plus className="text-[#ef9d2a] w-8 h-8" strokeWidth={3} />
      </div>
      <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors">
        Create New Menu
      </h3>
      <p className="text-stone-500 text-sm mt-2 text-center font-medium">
        Start from scratch or use a template
      </p>
    </Link>
  );
};

const MenuManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: menus, isLoading, error } = useAppSelector((state) => state.menu);

  // Fetch menus on mount
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleTogglePublic = (menuId: string) => {
    const targetMenu = menus.find((m: Dish) => m.id === menuId);
    if (!targetMenu) return;

    const newIsPublic = !targetMenu.isPublic;

    // Dispatch the thunk to update server and Redux State
    dispatch(
      updateDish({
        id: menuId,
        updates: {
          isPublic: newIsPublic,
          status: newIsPublic ? 'published' : 'draft',
        },
      })
    );
  };

  const activeMenusCount = menus.filter((m) => m.status === 'published').length;

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in-up">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight mb-2">
            Menu Management
          </h1>
          <div className="flex items-center gap-2 text-stone-500">
            <CheckCircle2 className="w-5 h-5 text-[#ef9d2a]" strokeWidth={2.5} />
            <span className="text-sm font-medium">
              Active Menus: <strong className="text-stone-900 ml-1">{activeMenusCount}</strong> / 10
            </span>
          </div>
        </div>

        <Link
          to="/caterer/menus/dish/new"
          className="bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          Create New Menu
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 font-bold flex items-center">
          {error}
        </div>
      )}

      {/* Grid Area */}
      {isLoading && menus.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in delay-100">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in delay-100">
          {menus.map((menu) => (
            <MenuPackageCard key={menu.id} menu={menu} onToggle={handleTogglePublic} />
          ))}

          {/* Last slot is always the create new trigger */}
          <AddNewPlaceholder />
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
