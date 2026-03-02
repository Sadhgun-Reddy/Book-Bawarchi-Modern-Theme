import React, { useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  Users,
  Utensils,
  Clock,
  Check,
  Lock,
  AlertCircle,
  MessageSquare,
  Plus,
  Building2,
  CalendarClock,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_REQUEST = {
  id: '#REQ-2103',
  status: 'LOOKING FOR DONOR',
  createdAt: 'Oct 24, 2026',
  location: 'Community Center, Block B, 124 Unity St.',
  distance: '2.5 km away',
  beneficiaries: '25 People',
  beneficiaryTypes: 'Families & Children',
  dietaryNeeds: 'Vegetarian Only',
  dietaryTags: ['NO MEAT', 'NO NUTS'],
  urgency: 'High Priority',
  urgencyTime: 'Within 24hrs',
  currentStage: 3, // 1: Received, 2: Verified, 3: Matching, 4: Fulfilled
};

const MOCK_OFFERS = [
  {
    id: 1,
    donorName: 'City Bakery & Cafe',
    distance: '4.8 miles away',
    capacity: 'Can provide 30 vegetarian meals',
    pickupTime: 'Today, 6:00 PM',
    contact: 'Sarah J.',
    isTopMatch: true,
  },
];

const MOCK_ACTIVITY = [
  {
    id: 1,
    type: 'alert', // alert, note, status
    message: 'Request matched with potential donor (City Bakery)',
    time: 'Today, 2:45 PM',
    author: 'System',
  },
  {
    id: 2,
    type: 'status',
    message: 'Request status changed to Verified',
    time: 'Today, 1:15 PM',
    author: 'Admin User',
  },
  {
    id: 3,
    type: 'note',
    message:
      'Called the community leader. They confirmed the urgent need for 25 people by tonight.',
    time: 'Today, 1:00 PM',
    author: 'Admin User',
  },
  {
    id: 4,
    type: 'status',
    message: 'Request Received from portal',
    time: 'Today, 12:45 PM',
    author: 'System',
  },
];

// --- SUB-COMPONENTS ---

const ProgressTracker = ({ currentStage }: any) => {
  const stages = [
    { num: 1, label: 'Received' },
    { num: 2, label: 'Verified' },
    { num: 3, label: 'Matching' },
    { num: 4, label: 'Fulfilled' },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative px-4">
        {/* Background Track */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-stone-200 rounded-full z-0"></div>

        {/* Active Fill */}
        <div
          className="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-[#ef9d2a] rounded-full z-0 transition-all duration-500 ease-out"
          style={{ width: `calc(${((currentStage - 1) / (stages.length - 1)) * 100}% - 5rem)` }}
        ></div>

        {/* Nodes */}
        {stages.map((stage) => {
          const isCompleted = currentStage > stage.num;
          const isActive = currentStage === stage.num;

          return (
            <div key={stage.num} className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isCompleted
                  ? 'bg-[#ef9d2a] border-[#ef9d2a] text-white'
                  : isActive
                    ? 'bg-white border-[#ef9d2a] text-[#ef9d2a]'
                    : 'bg-white border-stone-200 text-stone-300'
                  }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={4} />
                ) : (
                  <div
                    className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#ef9d2a]' : 'bg-transparent'}`}
                  ></div>
                )}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider absolute -bottom-6 w-max ${isCompleted || isActive ? 'text-stone-900' : 'text-stone-400'
                  }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Status Helper */}
      <div className="mt-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ef9d2a]/10 text-[#d98a1e] text-sm font-bold border border-[#ef9d2a]/20 shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#ef9d2a] animate-pulse"></div>
          Current Status: Matching with donors nearby...
        </span>
      </div>
    </div>
  );
};

const RequestSummaryCard = ({ data }: any) => {
  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-stone-100 flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <h3 className="font-bold text-lg text-stone-900">Request Brief</h3>
        <span className="text-sm font-medium text-stone-400">Created {data.createdAt}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        {/* Location */}
        <div className="flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">
              Location
            </span>
            <span className="font-bold text-stone-900">{data.location}</span>
            <span className="text-sm font-medium text-stone-500 mt-0.5">{data.distance}</span>
          </div>
        </div>

        {/* Beneficiaries */}
        <div className="flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-orange-50 flex items-center justify-center text-[#ef9d2a]">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">
              Beneficiaries
            </span>
            <span className="font-bold text-stone-900">{data.beneficiaries}</span>
            <span className="text-sm font-medium text-stone-500 mt-0.5">
              {data.beneficiaryTypes}
            </span>
          </div>
        </div>

        {/* Dietary */}
        <div className="flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Utensils className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">
              Dietary Needs
            </span>
            <span className="font-bold text-stone-900">{data.dietaryNeeds}</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.dietaryTags.map((tag: any) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-black tracking-wider uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div className="flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-inner">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">
              Urgency
            </span>
            <span className="font-bold text-red-600">{data.urgency}</span>
            <span className="text-sm font-bold text-stone-500 mt-0.5">{data.urgencyTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchOfferCard = ({ offer }: any) => {
  return (
    <div className="bg-slate-900 rounded-[2rem] p-6 lg:p-8 shadow-xl text-white relative overflow-hidden">
      {/* Subtle graphic accent */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ef9d2a] opacity-20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5 shrink-0">
              <Building2 className="w-6 h-6 text-[#ef9d2a]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#ef9d2a] font-bold mb-1 block">
                Potential Match
              </span>
              <h3 className="text-xl font-bold">{offer.donorName}</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-medium text-slate-200">{offer.capacity}</p>
          <p className="text-sm text-slate-400">{offer.distance}</p>
        </div>

        {/* Info Pills Row */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700/50">
            <CalendarClock className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-200">
              Pickup: <span className="font-bold text-white">{offer.pickupTime}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700/50">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-200">
              Contact: <span className="font-bold text-white">{offer.contact}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-6 border-t border-slate-800">
          <button className="flex-1 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold py-3.5 px-6 transition-colors flex items-center justify-center gap-2 text-sm">
            <Check className="w-4 h-4" strokeWidth={3} />
            Confirm Match
          </button>
          <button className="flex-1 rounded-full bg-transparent border-2 border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-bold py-3.5 px-6 transition-colors flex items-center justify-center text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityLog = ({ log }: any) => {
  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-stone-100 flex flex-col h-full h-min">
      <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6 sticky top-0 bg-white z-10">
        <h3 className="font-bold text-lg text-stone-900">Activity & Notes</h3>
        <button
          className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-[#ef9d2a] hover:text-white transition-colors"
          title="Add Note"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative pb-4">
        {/* Vertical Timeline Guide */}
        <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-stone-100"></div>

        <div className="flex flex-col gap-6 relative z-10">
          {log.map((item: any) => (
            <div key={item.id} className="flex gap-4">
              {/* Node icon */}
              <div className="relative shrink-0 mt-0.5">
                {item.type === 'alert' && (
                  <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-blue-500 shadow-sm shadow-blue-500/10">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
                {item.type === 'note' && (
                  <div className="w-8 h-8 rounded-full bg-orange-50 border-2 border-white flex items-center justify-center text-[#ef9d2a] shadow-sm shadow-orange-500/10">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
                {item.type === 'status' && (
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center text-emerald-500 shadow-sm shadow-emerald-500/10">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Content segment */}
              <div className="flex flex-col gap-1 pb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-stone-400">{item.time}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span className="text-xs font-bold text-stone-500">{item.author}</span>
                </div>

                {item.type === 'note' ? (
                  <div className="bg-stone-50 p-3.5 rounded-2xl rounded-tl-none border border-stone-100 mt-1 max-w-[280px]">
                    <p className="text-sm font-medium text-stone-600 leading-relaxed italic block">
                      "{item.message}"
                    </p>
                  </div>
                ) : (
                  <p
                    className={`text-sm font-bold mt-0.5 ${item.type === 'alert' ? 'text-blue-600' : 'text-stone-700'}`}
                  >
                    {item.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function FoodRequestDetailPage() {
  const { id = '2103' } = useParams();

  // In a real app, use the ID to fetch data. Using mock for layout design.
  const request = { ...MOCK_REQUEST, id: `#REQ-${id}` };

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 p-4 sm:p-8 w-full   mx-auto flex flex-col pt-20 sm:pt-8">
      {/* Context Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-bold text-stone-500 mb-2">
            <Link
              to="/caterer/requests"
              className="hover:text-[#ef9d2a] transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Requests List
            </Link>
          </nav>

          {/* Title Area */}
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
              Request {request.id}
            </h2>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold ring-1 ring-inset ring-blue-600/10 tracking-widest uppercase shadow-sm shadow-blue-500/10">
              {request.status}
            </span>
          </div>
        </div>

        <div className="flex">
          <button className="flex items-center justify-center rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-8 py-3.5 font-bold shadow-xl shadow-orange-500/20 transition-all active:translate-y-0.5 w-full md:w-auto">
            Close Request
          </button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Tracker, Brief, Offers */}
        <div className="xl:col-span-2 flex flex-col gap-6 lg:gap-8 min-w-0">
          {/* Progress Tracker Layer */}
          <div className="bg-white rounded-[2rem] px-4 sm:px-8 shadow-sm border border-stone-100 flex flex-col">
            <ProgressTracker currentStage={request.currentStage} />
          </div>

          {/* Summary Brief */}
          <RequestSummaryCard data={request} />

          {/* Donor Matches / Offers Layer */}
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="font-black text-xl text-stone-900">Active Matches (1)</h3>

            <div className="flex flex-col gap-4">
              {MOCK_OFFERS.map((offer) => (
                <MatchOfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Activity Log */}
        <div className="xl:col-span-1 h-full min-h-[600px]">
          <ActivityLog log={MOCK_ACTIVITY} />
        </div>
      </div>
    </div>
  );
}
