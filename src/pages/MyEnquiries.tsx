import React, { useState } from 'react';
import {
  Search,
  Calendar,
  ChevronDown,
  LayoutList,
  LayoutGrid,
  Send,
  MessageSquare,
  CheckCircle2,
  Archive,
  Eye,
  Bell,
  PartyPopper,
  Cake,
  Briefcase,
  Users,
  Filter,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMyEnquiries } from '../store/slices/enquirySlice';
import { Enquiry } from '../types';
import { Loader2 } from 'lucide-react';

// Removed redundant mock data - using live Redux state

// --- UTILS ---
const getStatusStyles = (status: string) => {
  switch (status) {
    case 'responded':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'sent':
      return 'text-[#ef9d2a] bg-orange-50 border-orange-200';
    case 'viewed':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'closed':
      return 'text-stone-500 bg-stone-50 border-stone-200';
    default:
      return 'text-stone-500 bg-stone-50 border-stone-200';
  }
};

const getStatusDotColor = (status: string) => {
  switch (status) {
    case 'responded':
      return 'bg-green-500';
    case 'sent':
      return 'bg-[#ef9d2a]';
    case 'viewed':
      return 'bg-blue-500';
    case 'closed':
      return 'bg-stone-400';
    default:
      return 'bg-stone-400';
  }
};

const getEventIcon = (type: string) => {
  if (type.toLowerCase().includes('wedding')) return PartyPopper;
  if (type.toLowerCase().includes('birthday')) return Cake;
  if (type.toLowerCase().includes('corporate')) return Briefcase;
  return Users;
};

export default function MyEnquiriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { myEnquiries: enquiries, isLoading } = useAppSelector(state => state.enquiry);

  React.useEffect(() => {
    dispatch(fetchMyEnquiries());
  }, [dispatch]);

  const stats = [
    { label: 'SENT', value: enquiries.length.toString(), icon: Send, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'RESPONSES', value: enquiries.filter(e => e.status === 'responded').length.toString(), icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'CLOSED', value: enquiries.filter(e => e.status === 'closed').length.toString(), icon: Archive, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  const filteredEnquiries = enquiries.filter(e => 
    e.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof e.caterer === 'object' && e.caterer?.businessName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Page Title & Call to Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            My Enquiries
          </h1>
          <p className="text-stone-500 font-medium text-lg leading-snug">
            Track the status of your catering requests, manage proposals, and connect with the best
            bawarchis for your events.
          </p>
        </div>
        <Link
          to="/caterers"
          className="w-full lg:w-auto flex items-center justify-center gap-2 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-8 py-4 font-black shadow-lg shadow-orange-500/20 transition-all active:scale-95 shrink-0"
        >
          <Search className="w-5 h-5" strokeWidth={3} />
          Find Caterers
        </Link>
      </div>

      {/* 4 Stats Cards Layer */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-stone-400">
                  {stat.label}
                </span>
                <span className="text-3xl font-black text-stone-900">{stat.value}</span>
              </div>
              <div
                className={`w-14 h-14 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <Icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters & Toggles Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full bg-white p-2 pl-4 rounded-[2rem] lg:rounded-full shadow-sm border border-stone-100 mb-8">
        {/* Search Component */}
        <div className="relative w-full lg:w-[400px] shrink-0">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Caterer or Ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-transparent border-none text-stone-900 font-medium placeholder:text-stone-400 focus:ring-0 outline-none"
          />
        </div>

        <div className="w-full h-px lg:w-px lg:h-8 bg-stone-100"></div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 px-2 pb-2 lg:pb-0">
          <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900">
            <Calendar className="w-4 h-4 text-stone-400" />
            All Dates
            <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
          </button>

          <div className="w-px h-5 bg-stone-200 hidden sm:block"></div>

          <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900">
            <Filter className="w-4 h-4 text-stone-400" />
            Status: All
            <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
          </button>

          <div className="w-px h-5 bg-stone-200 hidden sm:block"></div>

          {/* View Toggles */}
          <div className="bg-stone-50 flex items-center p-1 rounded-full border border-stone-100">
            <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#ef9d2a] border border-stone-200">
              <LayoutList className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors">
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Data Table Component */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/30">
              <th className="py-5 px-8 text-xs font-black text-stone-400 uppercase tracking-widest">
                Reference
              </th>
              <th className="py-5 px-6 text-xs font-black text-stone-400 uppercase tracking-widest">
                Event Type
              </th>
              <th className="py-5 px-6 text-xs font-black text-stone-400 uppercase tracking-widest">
                Caterer
              </th>
              <th className="py-5 px-6 text-xs font-black text-stone-400 uppercase tracking-widest">
                Event Date
              </th>
              <th className="py-5 px-6 text-xs font-black text-stone-400 uppercase tracking-widest text-center">
                Guests
              </th>
              <th className="py-5 px-6 text-xs font-black text-stone-400 uppercase tracking-widest text-center">
                Status
              </th>
              <th className="py-5 px-8 text-xs font-black text-stone-400 uppercase tracking-widest text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#ef9d2a] animate-spin" />
                    <p className="text-stone-400 font-bold">Fetching your enquiries...</p>
                  </div>
                </td>
              </tr>
            ) : filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <p className="text-stone-400 font-medium italic">No enquiries found matched your criteria.</p>
                </td>
              </tr>
            ) : filteredEnquiries.map((enquiry, idx) => {
              const EventIcon = getEventIcon(enquiry.eventType);
              const caterer = typeof enquiry.caterer === 'object' ? enquiry.caterer : null;
              const eventDate = new Date(enquiry.eventDate);

              return (
                <tr key={enquiry._id || idx} className="hover:bg-stone-50/50 transition-colors group">
                  {/* Reference */}
                  <td className="py-5 px-8 whitespace-nowrap">
                    <span className="text-sm font-bold text-stone-400">#{(enquiry._id || '').slice(-6).toUpperCase()}</span>
                  </td>

                  {/* Event Type */}
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-orange-100 text-[#ef9d2a] flex items-center justify-center shadow-sm`}
                      >
                        <EventIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[15px] font-black text-stone-900 group-hover:text-[#ef9d2a] transition-colors">
                        {enquiry.eventType}
                      </span>
                    </div>
                  </td>

                  {/* Caterer */}
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center font-bold text-sm border border-stone-200">
                        {caterer?.businessName?.charAt(0) || 'C'}
                      </div>
                      <span className="text-[15px] font-bold text-stone-700">
                        {caterer?.businessName || 'Multiple'}
                      </span>
                    </div>
                  </td>

                  {/* Event Date */}
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="flex flex-col text-sm font-medium text-stone-600">
                      <span>{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>{eventDate.getFullYear()}</span>
                    </div>
                  </td>

                  {/* Guests */}
                  <td className="py-5 px-6 whitespace-nowrap text-center">
                    <span className="text-[15px] font-medium text-stone-900">{enquiry.guestCount}</span>
                  </td>

                  {/* Status */}
                  <td className="py-5 px-6 whitespace-nowrap text-center">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusStyles(enquiry.status)}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusDotColor(enquiry.status)}`}
                      ></div>
                      <span className="text-xs font-black tracking-wide uppercase">{enquiry.status}</span>
                    </div>
                  </td>

                  <td className="py-5 px-8 whitespace-nowrap text-center">
                    <Link
                      to={`/dashboard/enquiries/${enquiry._id}`}
                      className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#ef9d2a] hover:border-[#ef9d2a] hover:bg-orange-50 mx-auto transition-all shadow-sm"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination Strip */}
      <div className="flex items-center justify-between px-4 mt-6">
        <span className="text-sm font-medium text-stone-500">
          Showing <strong className="text-stone-800">1–4</strong> of{' '}
          <strong className="text-stone-800">12</strong> enquiries
        </span>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors hover:bg-white shadow-sm">
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors hover:bg-white shadow-sm">
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
