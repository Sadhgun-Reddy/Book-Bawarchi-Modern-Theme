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
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCatererById } from '../store/slices/catererSlice';
import { fetchCatererMenus } from '../store/slices/menuSlice';
import { createEnquiry } from '../store/slices/enquirySlice';
import { Caterer, Menu, MenuItem } from '../types';
import { useForm } from 'react-hook-form';
import { Loader2, X } from 'lucide-react';

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
interface EnquiryFormInputs {
  eventType: string;
  eventDate: string;
  guestCount: number;
  budget: number;
  specialRequirements: string;
}

const EnquiryModal: React.FC<{ isOpen: boolean; onClose: () => void; catererId: string; catererName: string }> = ({ isOpen, onClose, catererId, catererName }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.enquiry);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryFormInputs>();

  if (!isOpen) return null;

  const onSubmit = async (data: EnquiryFormInputs) => {
    try {
      await dispatch(createEnquiry({
        caterer: catererId,
        ...data
      })).unwrap();
      toast.success('Enquiry sent successfully!');
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err || 'Failed to send enquiry');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Send Enquiry</h2>
            <p className="text-sm font-medium text-stone-500">To {catererName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Event Type</label>
              <select {...register('eventType', { required: true })} className="w-full h-12 px-4 rounded-xl border-stone-200 bg-stone-50 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none font-bold text-sm">
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
                <option value="Private Party">Private Party</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Event Date</label>
              <input type="date" {...register('eventDate', { required: true })} className="w-full h-12 px-4 rounded-xl border-stone-200 bg-stone-50 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none font-bold text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Guest Count</label>
              <input type="number" {...register('guestCount', { required: true, min: 1 })} className="w-full h-12 px-4 rounded-xl border-stone-200 bg-stone-50 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none font-bold text-sm" placeholder="Approx. guests" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Budget (₹)</label>
              <input type="number" {...register('budget')} className="w-full h-12 px-4 rounded-xl border-stone-200 bg-stone-50 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none font-bold text-sm" placeholder="Optional" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Special Requirements</label>
            <textarea {...register('specialRequirements')} rows={3} className="w-full p-4 rounded-xl border-stone-200 bg-stone-50 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none font-medium text-sm resize-none" placeholder="Any specific cuisines or services?" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full h-14 rounded-full bg-[#ef9d2a] text-white font-black hover:bg-[#d98a1e] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
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

const ProfileHero: React.FC<{ caterer: Caterer; onEnquire: () => void }> = ({ caterer, onEnquire }) => (
  <div className="relative w-full   mx-auto h-[400px] rounded-[2.5rem] overflow-hidden shadow-sm feature-hero mt-4">
    {/* Background Image & Gradient */}
    <img
      src={caterer.profileImage || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600'}
      alt={caterer.businessName}
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
          {caterer.businessName}
        </h1>
        {caterer.approvalStatus === 'approved' && (
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
          <span>{caterer.specialties?.join(' • ') || 'Multicuisine'}</span>
        </div>
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
          <Calendar className="w-4 h-4" />
          <span>{caterer.yearsExperience} Years Experience</span>
        </div>
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-[#ef9d2a]/90 text-white px-3 py-1 rounded-full border border-orange-400/30">
          <Star className="w-4 h-4 fill-white" />
          <span className="font-bold">4.8</span>
          <span className="text-white/80 text-sm">(120)</span>
        </div>
      </div>
    </div>

    {/* Primary Actions (Bottom Right) */}
    <div className="absolute bottom-8 right-8 md:right-12 flex items-center gap-3 z-10">
      <button className="hidden sm:flex items-center gap-2 h-12 px-6 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-50 transition-colors shadow-lg">
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        Save
      </button>
      <button 
        onClick={onEnquire}
        className="h-12 px-8 rounded-full bg-[#ef9d2a] text-white font-black hover:bg-[#d98a1e] transition-colors shadow-lg shadow-orange-500/30 transform active:scale-95"
      >
        Request Quote
      </button>
    </div>
  </div>
);

const SignatureDishCard: React.FC<{ menu: Menu }> = ({ menu }) => {
  const firstItem = menu.items?.[0];
  if (!firstItem) return null;

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden flex flex-col group hover:shadow-md transition-all">
      <div className="relative h-48 w-full shrink-0">
        <img
          src={firstItem.imageUrl || 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600'}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dietary Dot Badge */}
        <div className="absolute top-4 right-4 z-10 bg-white p-1.5 rounded-md shadow-sm">
          <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
        </div>
        {/* Price Pill overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="bg-[#ef9d2a] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
            ₹{firstItem.price}/plate
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-in bg-white relative z-20">
        <h4 className="text-lg font-bold text-stone-900 line-clamp-1 group-hover:text-[#ef9d2a] transition-colors">
          {menu.name}
        </h4>
        <p className="text-sm font-medium text-stone-500 line-clamp-2">{menu.description}</p>
      </div>
    </div>
  );
};

const StickySidebar: React.FC<{ caterer: Caterer; onEnquire: () => void }> = ({ caterer, onEnquire }) => (
  <div className="sticky top-24 flex flex-col gap-6">
    {/* Current Offers Card */}
    <div className="bg-orange-50 rounded-[2rem] p-6 border border-orange-100/50">
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-[#ef9d2a] font-black uppercase tracking-widest text-xs">
          Deals & Offers
        </span>
        <h3 className="text-xl font-bold text-stone-900">Standard Package</h3>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
        <p className="font-bold text-stone-900 mb-1">Catering for {caterer.capacity}</p>
        <p className="text-sm text-stone-500 font-medium">
          Professional service for {caterer.serviceAreas?.join(', ')}.
        </p>
      </div>
    </div>

    {/* Trust & Map Card */}
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Kitchen Details</h3>
        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#ef9d2a] shrink-0 mt-0.5" />
            <span className="text-sm font-medium text-stone-700">{caterer.kitchenAddress}</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-sm font-medium text-stone-700">FSSAI Registered Facility</span>
          </li>
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
      </div>
    </div>

    {/* Primary Booking CTA Card (Dark Theme) */}
    <div className="bg-slate-900 rounded-[2rem] p-6 text-center transform transition-all shadow-xl shadow-slate-900/10">
      <h3 className="text-2xl font-black text-white mb-2">Ready to book?</h3>
      <p className="text-slate-400 font-medium text-sm mb-6">
        Get a customized quote for your event within 24 hours.
      </p>
      <button
        onClick={onEnquire}
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
  const dispatch = useAppDispatch();
  const tabs = ['Overview', 'Menu', 'Gallery'];
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const { currentCaterer: caterer, isLoading: isCatererLoading } = useAppSelector((state) => state.caterer);
  const { items: menus, isLoading: isMenuLoading } = useAppSelector((state) => state.menu);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchCatererById(id));
      dispatch(fetchCatererMenus(id));
    }
  }, [id, dispatch]);

  if (isCatererLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfaf8] gap-4">
        <Loader2 className="w-10 h-10 text-[#ef9d2a] animate-spin" />
        <p className="text-stone-500 font-bold animate-pulse">Loading profile...</p>
      </div>
    );
  }

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
      <main className="  mx-auto px-6">
        <ProfileHero caterer={caterer} onEnquire={() => setIsEnquiryModalOpen(true)} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-12">
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

            <section className="scroll-mt-32" id="overview">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ef9d2a]">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-stone-900">About the Caterer</h2>
              </div>
              <p className="text-stone-600 font-medium leading-relaxed text-lg">{caterer.description}</p>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-3 p-3 pr-6 rounded-xl bg-white border border-stone-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-stone-800">FSSAI Certified</span>
                </div>
              </div>
            </section>

            <hr className="border-stone-100" />

            <section className="scroll-mt-32" id="menu">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ef9d2a]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-stone-900">Signature Menu</h2>
                </div>
              </div>

              {isMenuLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-8 h-8 text-[#ef9d2a] animate-spin" />
                </div>
              ) : menus.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {menus.map((menu) => (
                    <SignatureDishCard key={menu._id} menu={menu} />
                  ))}
                </div>
              ) : (
                <p className="text-stone-400 font-medium italic">No public menus available yet.</p>
              )}
            </section>
          </div>

          <aside className="lg:col-span-1">
            <StickySidebar caterer={caterer} onEnquire={() => setIsEnquiryModalOpen(true)} />
          </aside>
        </div>
      </main>

      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
        catererId={caterer._id} 
        catererName={caterer.businessName} 
      />
    </div>
  );
}
