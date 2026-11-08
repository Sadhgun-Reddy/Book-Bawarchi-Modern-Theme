import React, { useState, useMemo } from 'react';
import {
  CloudUpload,
  Check,
  Star,
  Trash2,
  Folder,
  Download,
  Image as ImageIcon,
} from 'lucide-react';

// --- MOCK DATA ---
const TABS = ['All Photos', 'Kitchen', 'Events', 'Team', 'Decorations'];

const MOCK_GALLERY = [
  {
    id: 'img-1',
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&aspect=1',
    category: 'Events',
    isCover: true,
  },
  {
    id: 'img-2',
    src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&aspect=1',
    category: 'Kitchen',
    isCover: false,
  },
  {
    id: 'img-3',
    src: 'https://images.unsplash.com/photo-1414235077428-33898bd12284?w=800&aspect=1',
    category: 'Food',
    isCover: false,
  },
  {
    id: 'img-4',
    src: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&aspect=1',
    category: 'Events',
    isCover: false,
  },
  {
    id: 'img-5',
    src: 'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?w=800&aspect=1',
    category: 'Decorations',
    isCover: false,
  },
  {
    id: 'img-6',
    src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&aspect=1',
    category: 'Team',
    isCover: false,
  },
  {
    id: 'img-7',
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&aspect=1',
    category: 'Events',
    isCover: false,
  },
  {
    id: 'img-8',
    src: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&aspect=1',
    category: 'Kitchen',
    isCover: false,
  },
];

// --- SUB-COMPONENTS ---

const GalleryHeader = () => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
    <div>
      <h1 className="text-3xl font-black text-stone-900 tracking-tight">Gallery Management</h1>
      <p className="text-base font-medium text-slate-500 mt-1">
        Upload and organize your portfolio photos
      </p>
    </div>

    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-2 items-end">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          75 / 200 Photos
        </span>
        <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#ef9d2a] rounded-full" style={{ width: '37%' }}></div>
        </div>
      </div>

      <button className="bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm">
        <CloudUpload className="w-4 h-4" strokeWidth={3} />
        Bulk Upload
      </button>
    </div>
  </div>
);

const FilterNavigation = ({ activeTab, setActiveTab }: any) => (
  <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
    {TABS.map((tab) => {
      const isActive = activeTab === tab;
      return (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${isActive
              ? 'bg-[#ef9d2a] text-white shadow-md shadow-orange-500/20'
              : 'bg-white border border-slate-200 text-slate-500 hover:border-[#ef9d2a]/50 hover:text-stone-900'
            }`}
        >
          {tab}
        </button>
      );
    })}
  </div>
);

const MediaCard = ({ item, isSelected, toggleSelection }: any) => (
  <div
    onClick={() => toggleSelection(item.id)}
    className={`aspect-square rounded-[2.5rem] relative overflow-hidden group cursor-pointer bg-slate-100 transition-all duration-300 ${isSelected ? 'shadow-xl scale-[0.98]' : 'hover:shadow-lg'}`}
  >
    {/* The Image */}
    <img
      src={item.src}
      alt="Gallery Item"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    {/* Selected Overlay Border */}
    {isSelected && (
      <div className="absolute inset-0 border-4 border-[#ef9d2a] rounded-[2.5rem] z-20 pointer-events-none"></div>
    )}

    {/* Top Right Checkmark (If Selected) */}
    {isSelected && (
      <div className="absolute top-4 right-4 z-30 bg-[#ef9d2a] text-white rounded-full p-1.5 shadow-md animate-in zoom-in duration-200">
        <Check className="w-4 h-4" strokeWidth={4} />
      </div>
    )}

    {/* Hover Gradient */}
    <div
      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${isSelected ? 'opacity-10' : ''}`}
    ></div>

    {/* Top Actions (Visible on Hover, unless selected) */}
    {!isSelected && (
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${item.isCover ? 'bg-[#ef9d2a] text-white' : 'bg-white/80 hover:bg-white text-slate-500 hover:text-[#ef9d2a]'}`}
          title="Set as Cover"
          onClick={(e) => {
            e.stopPropagation();
            // Handle set cover logic
          }}
        >
          <Star
            className="w-4 h-4"
            fill={item.isCover ? 'currentColor' : 'none'}
            strokeWidth={2.5}
          />
        </button>
      </div>
    )}

    {/* Bottom Metadata (Visible on Hover) */}
    <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1">
      <span className="text-white text-xs font-bold px-2.5 py-1 backdrop-blur-md bg-black/40 rounded-full">
        {item.category}
      </span>
    </div>
  </div>
);

const FloatingActionDock = ({ selectedCount, clearSelection }: any) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-300">
      <div className="bg-[#1a1a1a] border border-stone-800 text-white rounded-full px-6 md:px-8 py-3.5 shadow-2xl shadow-black/30 flex items-center justify-between gap-6 md:gap-10">
        {/* Counter & Label */}
        <div className="flex items-center gap-3">
          <button
            onClick={clearSelection}
            className="w-7 h-7 bg-white text-stone-900 rounded-full flex items-center justify-center font-black text-sm hover:bg-rose-100 hover:text-rose-600 transition-colors group"
            title="Clear Selection"
          >
            <span className="group-hover:hidden">{selectedCount}</span>
            <span className="hidden group-hover:inline-block">×</span>
          </button>
          <span className="text-sm font-bold text-slate-300">Selected</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-stone-700"></div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2.5 text-slate-300 hover:text-white hover:bg-stone-800 rounded-full flex items-center gap-2 text-sm font-bold transition-colors">
            <Folder className="w-4 h-4" />
            <span className="hidden sm:inline">Move</span>
          </button>
          <button className="p-2.5 text-slate-300 hover:text-white hover:bg-stone-800 rounded-full flex items-center gap-2 text-sm font-bold transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-stone-800 rounded-full flex items-center gap-2 text-sm font-bold transition-colors ml-2">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function GalleryManagementPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  // Simulated filtering
  const filteredGallery = useMemo(() =>
    activeTab === 'All Photos'
      ? MOCK_GALLERY
      : MOCK_GALLERY.filter((img) => img.category === activeTab),
  [activeTab]);

  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-32 animate-in fade-in duration-500">
      {/* 
                Assuming DashboardLayout handles the left sidebar and TopNav.
                This container aligns with the standard right fluid content area styling. 
            */}
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 shrink-0">
        <GalleryHeader />

        <FilterNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredGallery.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              toggleSelection={toggleSelection}
            />
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">No photos found</h3>
            <p className="text-slate-500 mt-2">Try uploading some photos to this category.</p>
          </div>
        )}

        <FloatingActionDock selectedCount={selectedIds.length} clearSelection={clearSelection} />
      </div>
    </div>
  );
}
