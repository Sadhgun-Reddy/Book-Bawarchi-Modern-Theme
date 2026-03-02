import React, { useState } from 'react';
import { Plus, Megaphone, TrendingUp, Edit2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- TYPES ---
export interface Offer {
  id: string;
  title: string;
  discount: string;
  meta: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'PAUSED';
  rejectionReason?: string;
  image: string;
}

// --- MOCK DATA ---
const MOCK_OFFERS: Offer[] = [
  {
    id: 'OFF-001',
    title: 'Summer Wedding Special',
    discount: '15% OFF Total Bill',
    meta: 'Min. order $2,000 • Valid till Aug 30',
    status: 'ACTIVE', // ACTIVE, PENDING, REJECTED, PAUSED
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'OFF-002',
    title: 'Corporate Lunch Box',
    discount: 'Buy 10 Get 1 Free',
    meta: 'Mon-Fri delivery only',
    status: 'PAUSED',
    image:
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'OFF-003',
    title: 'Early Bird Holiday Feast',
    discount: 'Free Dessert Buffet',
    meta: 'Bookings before Nov 15',
    status: 'PENDING',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'OFF-004',
    title: 'Birthday Party Bonanza',
    discount: '20% OFF Kids Menu',
    meta: 'Groups of 20+ children',
    status: 'REJECTED',
    rejectionReason: 'Discount terms are unclear. Please specify the maximum discount amount.',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8892b07d5b?auto=format&fit=crop&q=80&w=800',
  },
];

// --- SUB-COMPONENTS ---

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  trendColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, trendColor }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-100 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${trendColor} bg-opacity-10`}
    >
      <Icon className={`w-6 h-6 ${trendColor.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <div className="text-xl sm:text-2xl font-black text-slate-900">{value}</div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  </div>
);

interface OfferCardProps {
  offer: Offer;
  onToggle: (id: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onToggle }) => {
  const isPaused = offer.status === 'PAUSED';
  const isRejected = offer.status === 'REJECTED';

  const getStatusStyles = (status: Offer['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500 text-white';
      case 'PENDING':
        return 'bg-amber-400 text-white';
      case 'REJECTED':
        return 'bg-zinc-700 text-white';
      case 'PAUSED':
        return 'bg-slate-500 text-white';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-transparent hover:border-slate-100 hover:shadow-md transition-all overflow-hidden flex flex-col">
      {/* Header Image & Status */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
        <img
          src={offer.image}
          alt={offer.title}
          className={`w-full h-full object-cover transition-all duration-500 hover:scale-105 ${isPaused ? 'grayscale opacity-70' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

        {/* Floating Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${getStatusStyles(offer.status)}`}
          >
            {offer.status}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3
            className={`text-xl font-bold tracking-tight ${isPaused ? 'text-slate-500' : 'text-slate-900'}`}
          >
            {offer.title}
          </h3>
          <p className={`text-2xl font-black ${isPaused ? 'text-slate-400' : 'text-[#ef9d2a]'}`}>
            {offer.discount}
          </p>
          <p className="text-sm font-medium text-slate-500 mt-1">{offer.meta}</p>
        </div>

        {/* Moderation Alert */}
        {isRejected && offer.rejectionReason && (
          <div className="mt-2 flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
                Action Required
              </span>
              <p className="text-sm font-medium text-red-600 leading-snug">
                {offer.rejectionReason}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="px-6 md:px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
        {/* Custom Toggle Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(offer.id)}
            disabled={offer.status === 'REJECTED' || offer.status === 'PENDING'}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9d2a] focus-visible:ring-offset-2 ${offer.status === 'ACTIVE' ? 'bg-[#ef9d2a]' : 'bg-slate-300'
              } ${offer.status === 'REJECTED' || offer.status === 'PENDING' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="sr-only">Toggle offer status</span>
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${offer.status === 'ACTIVE' ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
          <span className="text-sm font-bold text-slate-600">
            {offer.status === 'ACTIVE' ? 'Live' : 'Paused'}
          </span>
        </div>

        {/* Edit Action */}
        <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-200 hover:border-[#ef9d2a] hover:bg-orange-50 text-slate-400 hover:text-[#ef9d2a] transition-colors">
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function OffersManagementPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS);

  const tabs = ['All', 'Active', 'Pending'];

  const filteredOffers = offers.filter((offer) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return offer.status === 'ACTIVE';
    if (activeTab === 'Pending') return offer.status === 'PENDING';
    return true;
  });

  const handleToggle = (id: string) => {
    setOffers(
      offers.map((offer) => {
        if (offer.id === id) {
          if (offer.status === 'ACTIVE') return { ...offer, status: 'PAUSED' };
          if (offer.status === 'PAUSED') return { ...offer, status: 'ACTIVE' };
        }
        return offer;
      })
    );
  };

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Offers & Promotions
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your catering deals and boost inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Stat Cards Row */}
          <div className="flex items-center gap-4 mr-2">
            <StatCard
              icon={Megaphone}
              value="3 Live"
              label="Active Offers"
              trendColor="bg-emerald-500 text-emerald-500"
            />
            <StatCard
              icon={TrendingUp}
              value="+12%"
              label="Inquiry Lift"
              trendColor="bg-[#ef9d2a] text-[#ef9d2a]"
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-6 py-4 font-bold shadow-xl shadow-orange-500/20 transition-all active:translate-y-0.5">
            <Plus className="w-5 h-5" />
            Create New Offer
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center mb-8">
        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200/50">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onToggle={handleToggle} />
        ))}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 mt-4">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
            <Megaphone className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">No Offers Found</h3>
          <p className="text-slate-500 font-medium max-w-sm text-center">
            You don't have any {activeTab.toLowerCase()} offers matching the current filter
            criteria.
          </p>
        </div>
      )}
    </div>
  );
}
