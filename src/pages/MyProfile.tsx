import React, { useState } from 'react';
import { Check, Camera, Lock, Home, Briefcase, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

// --- INTERFACES ---
interface UserProfileInputs {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

interface Address {
  id: string;
  type: string;
  icon: React.ElementType;
  line1: string;
  line2: string;
  isDefault: boolean;
}

// --- MOCK DATA ---
const MOCK_USER = {
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  bio: 'Food enthusiast and frequent host of community gatherings. Always looking for authentic local caterers.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
};

const MOCK_ADDRESSES: Address[] = [
  {
    id: 'A-01',
    type: 'Home',
    icon: Home,
    line1: '124, Lotus Apartments, 3rd Block',
    line2: 'Koramangala, Bangalore 560034',
    isDefault: true,
  },
  {
    id: 'A-02',
    type: 'Work',
    icon: Briefcase,
    line1: 'TechPark Business Center',
    line2: 'Indiranagar, Bangalore 560038',
    isDefault: false,
  },
];

// --- SUB-COMPONENTS ---

const ProfileHeader = () => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mb-8">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-black text-stone-900 tracking-tight">My Profile</h1>
      <p className="text-stone-500 font-medium">
        Manage your personal information and preferences.
      </p>
    </div>
    <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all">
      <Check className="w-4 h-4" strokeWidth={3} />
      Save Changes
    </button>
  </div>
);

const PersonalParamsForm: React.FC<{ user: typeof MOCK_USER }> = ({ user }) => {
  const { register, handleSubmit } = useForm<UserProfileInputs>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      bio: user.bio,
    },
  });

  const onSubmit: SubmitHandler<UserProfileInputs> = (data) => {
    console.log('Saved data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-transparent w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-stone-900 tracking-tight">Personal Information</h2>
        <button className="text-sm font-bold text-[#ef9d2a] hover:text-[#d98a1e] transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Avatar Row */}
      <div className="flex items-start gap-8 mb-8">
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-orange-100 flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-orange-300">{user.firstName[0]}</span>
            )}
          </div>
          {/* Edit Camera Overlay */}
          <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:scale-110 border-2 border-white transition-transform cursor-pointer">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-col justify-center py-4">
          <h3 className="text-lg font-black text-stone-900 leading-tight block sm:hidden">
            Profile Photo
          </h3>{' '}
          {/* Mobile context */}
          <p className="text-sm font-medium text-slate-400 max-w-xs mt-1 sm:mt-0 leading-snug">
            Allowed *.jpeg, *.jpg, *.png, *.gif <br />
            Max size of 3 MB
          </p>
        </div>
      </div>

      {/* Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Text Input Field Map */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-900 ml-2">First Name</label>
          <input
            type="text"
            {...register('firstName', { required: true })}
            className="w-full bg-slate-50 border-none rounded-full px-6 py-3.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
            placeholder="Enter first name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-900 ml-2">Last Name</label>
          <input
            type="text"
            {...register('lastName', { required: true })}
            className="w-full bg-slate-50 border-none rounded-full px-6 py-3.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
            placeholder="Enter last name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-900 ml-2">Email Address</label>
          <div className="relative">
            <input
              type="email"
              defaultValue={user.email}
              disabled
              className="w-full bg-slate-100 border-none rounded-full pl-6 pr-12 py-3.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
            />
            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <span className="text-xs font-semibold text-slate-400 ml-2 mt-1">
            Email cannot be changed directly for security.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-900 ml-2">Phone Number</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full bg-slate-50 border-none rounded-full px-6 py-3.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
          />
        </div>

        {/* Expanding Area for Bio */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-bold text-stone-900 ml-2">Bio</label>
          <textarea
            {...register('bio')}
            rows={4}
            className="w-full bg-slate-50 border-none rounded-[1.5rem] p-6 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow resize-none leading-relaxed"
          ></textarea>
        </div>
      </div>
    </form>
  );
};

const AddressBook: React.FC<{ addresses: Address[] }> = ({ addresses }) => (
  <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-transparent w-full mt-8">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-black text-stone-900 tracking-tight">Saved Addresses</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Map Existing Cards */}
      {addresses.map((address) => {
        const Icon = address.icon;
        return (
          <div
            key={address.id}
            className="flex flex-col justify-between border border-slate-100 rounded-[1.5rem] p-6 hover:border-[#ef9d2a]/30 transition-colors group relative bg-[#fcfaf8]/50"
          >
            {/* Upper Block */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col pr-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-black text-stone-900">{address.type}</h3>
                  {address.isDefault && (
                    <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold text-[10px] tracking-widest uppercase">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-500 mt-2">
                  {address.line1}
                  <br />
                  {address.line2}
                </p>
              </div>
            </div>

            {/* Top Right Action */}
            <button className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>

            {/* Bottom Action (if we wanted to select it, or just leave as static display area) */}
            <div className="mt-6 pt-4 border-t border-slate-100/50 flex items-center justify-end">
              <button className="text-xs font-bold text-[#ef9d2a] hover:text-[#d98a1e] transition-colors">
                Edit Address
              </button>
            </div>
          </div>
        );
      })}

      {/* Add New Interactive Card */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[1.5rem] p-6 h-full min-h-[160px] cursor-pointer hover:bg-slate-50 hover:border-[#ef9d2a]/50 group transition-all">
        <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-orange-50 text-slate-400 group-hover:text-[#ef9d2a] flex items-center justify-center mb-3 transition-colors">
          <Plus className="w-5 h-5" strokeWidth={3} />
        </div>
        <span className="text-sm font-bold text-stone-600 group-hover:text-[#ef9d2a] transition-colors">
          Add New Address
        </span>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function MyProfilePage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24 animate-in fade-in duration-500">
      {/* Dashboard Fluid Content Wrapper */}
      <div className="w-full">
        <ProfileHeader />

        {/* Vertical Scroll Stack Layout */}
        <div className="flex flex-col w-full space-y-8">
          <PersonalParamsForm user={MOCK_USER} />
          <AddressBook addresses={MOCK_ADDRESSES} />

          {/* Security Sub-section (Danger Zone logic mapping) */}
          <div className="w-full pb-8 pt-4 flex justify-end">
            <button className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors px-4 py-2 hover:bg-red-50 rounded-full">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
