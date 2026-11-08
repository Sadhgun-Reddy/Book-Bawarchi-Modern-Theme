import React, { useState, useMemo } from 'react';
import { Search, Plus, Star, Heart, MapPin, Calendar, Users, X, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_SAVED_CATERERS = [
  {
    id: 'SC-01',
    name: 'Royal Feast Caterers',
    cuisine: 'North Indian, Continental',
    rating: 4.9,
    reviews: 120,
    distance: '3.2 km',
    eventTypes: ['Weddings', 'Corporate'],
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    isTopRated: true,
  },
  {
    id: 'SC-02',
    name: 'Green Leaf Vegan Banquets',
    cuisine: 'Healthy, Vegan, Italian',
    rating: 4.7,
    reviews: 85,
    distance: '5.1 km',
    eventTypes: ['Private Parties', 'Corporate'],
    image:
      'https://images.unsplash.com/photo-1498837167922-41c53bbfcdcd?auto=format&fit=crop&q=80&w=800',
    isTopRated: false,
  },
  {
    id: 'SC-03',
    name: 'Oceanic Seafood & Grill',
    cuisine: 'Seafood, Mediterranean',
    rating: 4.8,
    reviews: 210,
    distance: '7.5 km',
    eventTypes: ['Weddings', 'Galas'],
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
    isTopRated: true,
  },
  {
    id: 'SC-04',
    name: 'Artisan Baking Co.',
    cuisine: 'Desserts, French Pastry',
    rating: 4.9,
    reviews: 305,
    distance: '4.2 km',
    eventTypes: ['Weddings', 'Showers'],
    image:
      'https://images.unsplash.com/photo-1550184658-ff6132a71714?auto=format&fit=crop&q=80&w=800',
    isTopRated: true,
  },
];

// --- SUB-COMPONENTS ---

const SavedCatererCard = ({ caterer, onRemove, onEnquire }: any) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-transparent hover:border-stone-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group relative">
    {/* Image Header */}
    <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
      <img
        src={caterer.image}
        alt={caterer.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Badges Overlays */}
      {caterer.isTopRated && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#ef9d2a] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            Top Rated
          </span>
        </div>
      )}

      {/* Unsave Action */}
      <button
        onClick={() => onRemove(caterer.id)}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 hover:bg-red-50 hover:border-red-100 transition-colors group/btn"
        title="Remove from saved"
      >
        <Heart className="w-5 h-5 text-[#ef9d2a] fill-[#ef9d2a] group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors" />
      </button>
    </div>

    {/* Content Body */}
    <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-black text-stone-900 leading-tight group-hover:text-[#ef9d2a] transition-colors line-clamp-1">
            {caterer.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md shrink-0">
            <span className="font-bold text-green-700 text-sm">{caterer.rating}</span>
            <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
          </div>
        </div>
        <p className="text-sm font-medium text-stone-500 line-clamp-1">{caterer.cuisine}</p>
      </div>

      {/* Meta Muted Text Row */}
      <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-stone-400 mt-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {caterer.distance}
        </div>
        <div className="w-1 h-1 rounded-full bg-stone-300"></div>
        <span className="line-clamp-1">{caterer.eventTypes.join(', ')}</span>
      </div>
    </div>

    {/* Footer Conversion Action */}
    <div className="px-6 md:px-8 pb-6 mt-auto">
      <button
        onClick={() => onEnquire(caterer)}
        className="w-full h-12 rounded-full border-2 border-[#ef9d2a] text-[#ef9d2a] font-black text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
      >
        Quick Enquiry
      </button>
    </div>
  </div>
);

const QuickEnquiryModal = ({ caterer, isOpen, onClose }: any) => {
  if (!isOpen || !caterer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-stone-100 flex items-start justify-between bg-stone-50/50">
          <div>
            <h2 className="text-2xl font-black text-stone-900 leading-tight">Quick Enquiry</h2>
            <p className="text-stone-500 font-medium text-sm mt-1">
              Sending to <span className="text-[#ef9d2a] font-bold">{caterer.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Date Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Event Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border-transparent rounded-2xl text-stone-900 font-medium focus:border-[#ef9d2a] focus:bg-white focus:ring-2 focus:ring-[#ef9d2a]/20 transition-all outline-none"
                />
              </div>
            </div>

            {/* Guest Count */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Guests
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border-transparent rounded-2xl text-stone-900 font-medium placeholder:text-stone-300 focus:border-[#ef9d2a] focus:bg-white focus:ring-2 focus:ring-[#ef9d2a]/20 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Additional Details
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-stone-400" />
              </div>
              <textarea
                rows={4}
                placeholder="Any specific dietary requirements or questions?"
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border-transparent rounded-2xl text-stone-900 font-medium placeholder:text-stone-300 focus:border-[#ef9d2a] focus:bg-white focus:ring-2 focus:ring-[#ef9d2a]/20 transition-all outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer Submit */}
        <div className="p-8 pt-0 mt-auto">
          <button
            onClick={onClose} // Typically would submit data here
            className="w-full h-14 rounded-2xl sm:rounded-full bg-[#ef9d2a] text-white font-black text-lg hover:bg-[#d98a1e] transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            Send Request
          </button>
          <p className="text-center text-xs text-stone-400 font-medium mt-4">
            Usually responds within 2 hours
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function SavedCaterersPage() {
  const [savedList, setSavedList] = useState(MOCK_SAVED_CATERERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaterer, setSelectedCaterer] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleRemove = (id: any) => {
    const catererToRemove = savedList.find((c) => c.id === id);
    setSavedList((prev) => prev.filter((c) => c.id !== id));

    // Show Dark Theme Toast
    setToastMessage(`${catererToRemove?.name || 'Caterer'} removed from saved.`);
    setTimeout(() => setToastMessage(''), 3000); // Auto hide after 3s
  };

  const filteredList = useMemo(() => savedList.filter(
    (caterer) =>
      caterer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  ), [savedList, searchQuery]);

  return (
    <div className="w-full relative animate-in fade-in duration-500">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            Saved Caterers
          </h1>
          <p className="text-stone-500 font-medium text-lg">
            Manage your shortlisted catering options.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Global Search Pill */}
          <div className="relative w-full sm:w-[300px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search saved by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-transparent rounded-full text-stone-900 font-medium placeholder:text-stone-400 shadow-sm focus:border-[#ef9d2a] focus:ring-4 focus:ring-[#ef9d2a]/10 transition-all outline-none"
            />
          </div>

          {/* Find More Action */}
          <Link
            to="/caterers"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-8 py-3.5 font-black shadow-lg shadow-orange-500/20 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Find Caterers
          </Link>
        </div>
      </div>

      {/* 3-Column Grid */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredList.map((caterer) => (
            <SavedCatererCard
              key={caterer.id}
              caterer={caterer}
              onRemove={handleRemove}
              onEnquire={setSelectedCaterer}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-stone-200 mt-4">
          <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mb-6">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-stone-800 mb-2">No Saved Caterers</h3>
          <p className="text-stone-500 font-medium text-lg max-w-sm text-center mb-8">
            {searchQuery
              ? 'No results match your search criteria.'
              : 'Start exploring and save your favorite vendors to shortlist them here.'}
          </p>
          {!searchQuery && (
            <Link
              to="/caterers"
              className="px-8 py-4 rounded-full bg-stone-900 text-white font-black hover:bg-stone-800 transition-colors shadow-lg"
            >
              Browse Directory
            </Link>
          )}
        </div>
      )}

      {/* Quick Enquiry Modal Overlay */}
      <QuickEnquiryModal
        caterer={selectedCaterer}
        isOpen={!!selectedCaterer}
        onClose={() => setSelectedCaterer(null)}
      />

      {/* Global Dark Theme Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 px-6 py-3 rounded-full bg-slate-900 text-white shadow-2xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          <span className="font-bold text-sm select-none">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
