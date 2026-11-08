import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Users,
  Calendar,
  ChevronRight,
  Circle,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCatererEnquiries } from '../store/slices/enquirySlice';
import { Enquiry, User } from '../types';
import { Loader2 } from 'lucide-react';

// --- MOCK DATA ---
// Removed legacy mock data - using live Redux state

// --- UTILS & BADGE STYLES ---

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'sent':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#ef9d2a] border border-orange-200">
          <Circle className="w-2 h-2 fill-[#ef9d2a] text-[#ef9d2a]" />
          <span className="text-xs font-black tracking-wide uppercase">New</span>
        </div>
      );
    case 'responded':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="text-xs font-black tracking-wide uppercase">Replied</span>
        </div>
      );
    case 'viewed':
    case 'closed':
    default:
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          <span className="text-xs font-black tracking-wide uppercase">{status}</span>
        </div>
      );
  }
};

const getAcquisitionBadge = (type: any) => {
  return type === 'Direct' ? (
    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700">
      Direct
    </span>
  ) : (
    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">
      Broadcast
    </span>
  );
};

// --- SUB-COMPONENTS ---

const InboxHeader = ({ newLeadsCount, searchQuery, setSearchQuery, isLoading }: any) => (
  <div className="flex flex-col gap-6 mb-8">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
          Leads & Enquiries
        </h1>
      </div>
      <p className="text-stone-500 font-medium">
        {isLoading ? 'Fetching leads...' : (
          <>You have <strong className="text-[#ef9d2a]">{newLeadsCount} new leads</strong> awaiting your response.</>
        )}
      </p>
    </div>
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-white p-2 pl-4 rounded-[2rem] lg:rounded-full shadow-sm border border-stone-100">
      <div className="relative w-full lg:w-[350px] shrink-0">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder="Search by customer or event type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-3 bg-transparent border-none text-stone-900 font-medium placeholder:text-stone-400 focus:ring-0 outline-none text-sm"
        />
      </div>
      <div className="w-full h-px lg:w-px lg:h-6 bg-stone-200"></div>
      <div className="flex flex-wrap items-center gap-4 lg:gap-6 px-2 pb-2 lg:pb-0 w-full lg:w-auto">
        <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Type: All
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Status: All
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          <ArrowUpDown className="w-4 h-4 text-stone-400" />
          Newest
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-bold hover:bg-stone-50 hover:text-stone-900 transition-colors ml-auto lg:ml-0">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  </div>
);

const LeadRow = ({ enquiry }: { enquiry: Enquiry }) => {
  const user = typeof enquiry.user === 'object' ? enquiry.user as User : null;
  const initials = user?.name?.split(' ').map(n => n.charAt(0)).join('').toUpperCase() || 'C';
  const eventDate = new Date(enquiry.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeAgo = new Date(enquiry.createdAt).toLocaleString();

  return (
    <div className="relative group flex flex-col lg:flex-row lg:items-center justify-between p-5 lg:p-6 border-b border-stone-100 hover:bg-orange-50/30 transition-colors cursor-pointer bg-white first:rounded-t-[2.5rem] last:rounded-b-[2.5rem] last:border-b-0 gap-4 lg:gap-6">
      {enquiry.status === 'sent' && (
        <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#ef9d2a] rounded-r-lg"></div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 flex-1 min-w-0 lg:pr-6 pl-4 lg:pl-0">
        <div className="flex items-center gap-4 w-full sm:w-64 shrink-0">
          <div className="relative shrink-0">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border border-stone-200 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-black text-lg shadow-sm border border-slate-200">
                {initials}
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className={`text-[15px] truncate ${enquiry.status === 'sent' ? 'font-black text-stone-900' : 'font-bold text-stone-700'}`}>
              {user?.name || 'Anonymous User'}
            </span>
            <span className="text-xs font-bold text-stone-400 mt-0.5">{timeAgo}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-64 shrink-0 sm:border-l sm:border-stone-100 sm:pl-6">
          <span className={`text-[15px] truncate ${enquiry.status === 'sent' ? 'font-bold text-stone-900' : 'font-semibold text-stone-700'}`}>
            {enquiry.eventType}
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {eventDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {enquiry.guestCount} Guests
            </span>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto lg:w-48 lg:justify-end shrink-0 sm:border-l sm:border-stone-100 sm:pl-6 lg:border-none lg:pl-0 mt-2 sm:mt-0">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700">
            Direct
          </span>
          {getStatusBadge(enquiry.status)}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 shrink-0 mt-4 lg:mt-0 border-t border-stone-100 pt-4 lg:border-none lg:pt-0 w-full lg:w-auto">
        <Link 
          to={`/dashboard/enquiries/${enquiry._id}`}
          className={`flex-1 lg:flex-none flex items-center justify-center h-10 px-8 rounded-full ${enquiry.status === 'sent' ? 'bg-[#ef9d2a] text-white' : 'bg-stone-100 text-stone-600'} font-black text-sm hover:bg-opacity-90 shadow-md transition-all active:scale-95 group-hover:-translate-y-0.5`}
        >
          {enquiry.status === 'sent' ? 'Respond' : 'View Details'}
        </Link>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition-colors shrink-0">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function CatererInboxPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { catererEnquiries: enquiries, isLoading } = useAppSelector(state => state.enquiry);

  React.useEffect(() => {
    dispatch(fetchCatererEnquiries());
  }, [dispatch]);

  const newLeadsCount = useMemo(() => enquiries.filter((l) => l.status === 'sent').length, [enquiries]);

  const filteredLeads = useMemo(() => enquiries.filter(
    (enquiry) => {
      const user = typeof enquiry.user === 'object' ? enquiry.user as User : null;
      return (user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              enquiry.eventType.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  ), [enquiries, searchQuery]);

  return (
    <div className="w-full animate-in fade-in duration-500">
      <InboxHeader
        newLeadsCount={newLeadsCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
      />

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col overflow-hidden relative min-h-[400px]">
        <div className="hidden lg:flex items-center pl-6 pr-6 py-4 border-b border-stone-100 bg-stone-50/50 text-[11px] font-black text-stone-400 uppercase tracking-widest">
          <div className="w-64 pl-4 shrink-0">Customer</div>
          <div className="w-64 shrink-0 pl-6 border-l border-transparent">Logistics</div>
          <div className="w-48 shrink-0 text-right ml-auto">Lead Data</div>
          <div className="w-48 shrink-0"></div>
        </div>

        <div className="flex flex-col w-full h-full divide-y-0">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="w-10 h-10 text-[#ef9d2a] animate-spin" />
              <p className="text-stone-500 font-bold">Loading enquiries...</p>
            </div>
          ) : filteredLeads.length > 0 ? (
            filteredLeads.map((enquiry) => <LeadRow key={enquiry._id} enquiry={enquiry} />)
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center my-auto">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-[#ef9d2a]" />
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-2">No Leads Found</h3>
              <p className="text-stone-500 font-medium max-w-sm">
                {searchQuery
                  ? 'Try adjusting your search filters.'
                  : 'You have no active leads in your inbox right now.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {filteredLeads.length > 0 && (
        <div className="flex items-center justify-between px-4 mt-8">
          <span className="text-sm font-bold text-stone-500">
            Showing 1-{filteredLeads.length} of {enquiries.length} leads
          </span>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors hover:bg-white shadow-sm">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors hover:bg-white shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
