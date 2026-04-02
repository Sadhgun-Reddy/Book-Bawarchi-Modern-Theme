import React, { useState } from 'react';
import {
  Check,
  Download,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  MapPin,
  Users,
  Utensils,
  Calendar,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchEnquiryById } from '../store/slices/enquirySlice';
import { Loader2, AlertCircle } from 'lucide-react';
import { Caterer, User } from '../types';

// --- MOCK DATA ---
// Removed mock data - using live Redux state

const STEPS = [
  { id: 1, label: 'Reviewing', status: 'completed' },
  { id: 2, label: 'Quotes', status: 'active' },
  { id: 3, label: 'Negotiation', status: 'upcoming' },
  { id: 4, label: 'Confirmed', status: 'upcoming' },
];

// --- SUB-COMPONENTS ---

const ProgressStepper = ({ status }: any) => {
  const steps = [
    { id: 1, label: 'Sent', status: status === 'sent' ? 'active' : 'completed' },
    { id: 2, label: 'Viewed', status: status === 'viewed' ? 'active' : (['responded', 'closed'].includes(status) ? 'completed' : 'upcoming') },
    { id: 3, label: 'Responded', status: status === 'responded' ? 'active' : (status === 'closed' ? 'completed' : 'upcoming') },
    { id: 4, label: 'Closed', status: status === 'closed' ? 'active' : 'upcoming' },
  ];

  const progressMap: any = { sent: '0%', viewed: '33%', responded: '66%', closed: '100%' };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0 hidden sm:block">
          <div
            className="h-full bg-[#ef9d2a] rounded-full transition-all duration-500"
            style={{ width: progressMap[status] || '0%' }}
          ></div>
        </div>

        {steps.map((step: any) => (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center gap-2 bg-[#fcfaf8] sm:bg-transparent px-2"
          >
            {step.status === 'completed' ? (
              <div className="w-10 h-10 rounded-full bg-[#ef9d2a] text-white flex items-center justify-center shadow-md shadow-orange-500/20 ring-4 ring-[#fcfaf8]">
                <Check className="w-5 h-5" strokeWidth={3} />
              </div>
            ) : step.status === 'active' ? (
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#ef9d2a] flex items-center justify-center shadow-md ring-4 ring-[#fcfaf8]">
                <div className="w-3 h-3 rounded-full bg-[#ef9d2a]"></div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 font-bold flex items-center justify-center ring-4 ring-[#fcfaf8]">
                {step.id}
              </div>
            )}
            <span
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest ${step.status === 'upcoming' ? 'text-slate-400' : 'text-stone-900'
                }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EnquirySummary = ({ data }: any) => {
  const eventDate = new Date(data.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-transparent flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-black text-stone-900 tracking-tight">Enquiry Summary</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Event Type
          </span>
          <span className="text-base font-bold text-stone-900">{data.eventType}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Guest Count
          </span>
          <span className="text-base font-bold text-stone-900">{data.guestCount} PAX</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Status
          </span>
          <span className="text-base font-bold text-[#ef9d2a] uppercase">{data.status}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Date</span>
          <span className="text-base font-bold text-stone-900">{eventDate}</span>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Reference ID
          </span>
          <span className="text-base font-bold text-stone-900">#{(data._id || '').toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

const QuoteCard = ({ quote }: any) => (
  <div
    className={`bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border transition-shadow hover:shadow-md ${quote.isNew ? 'border-[#ef9d2a]/30 ring-4 ring-[#ef9d2a]/5' : 'border-transparent'}`}
  >
    {/* Top Array */}
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-500 font-bold shrink-0">
          {quote.caterer.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-black text-stone-900">{quote.caterer}</h3>
          <span className="text-xs font-bold text-slate-400">{quote.time}</span>
        </div>
      </div>
      <div className="flex flex-col sm:items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
          Estimated Quote
        </span>
        <span className="text-2xl font-black text-[#ef9d2a] leading-none">{quote.price}</span>
        <span className="text-xs font-bold text-slate-500 mt-1">{quote.perHead}</span>
      </div>
    </div>

    {/* Message Body String */}
    <div className="w-full bg-slate-50 rounded-2xl p-5 text-sm font-medium text-stone-600 leading-relaxed border border-slate-100 mb-6 relative">
      {/* Speech Bubble Tail */}
      <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 rotate-45 border-l border-t border-slate-100"></div>
      {quote.message}
    </div>

    {/* Action Blocks */}
    <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
      <button className="w-full sm:flex-1 h-12 rounded-full border-2 border-[#ef9d2a] text-[#ef9d2a] hover:bg-orange-50 font-black text-sm transition-colors flex items-center justify-center gap-2">
        <FileText className="w-4 h-4" />
        View Full Proposal
      </button>
      <button className="w-full sm:w-auto h-12 px-6 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-bold text-sm transition-colors flex items-center justify-center">
        Ignore
      </button>
    </div>
  </div>
);

const ActivityHistory = ({ log }: any) => (
  <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-transparent h-fit sticky top-24">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-black text-stone-900 tracking-tight">Activity History</h2>
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <div className="relative border-l-2 border-slate-100 ml-3 pl-6 space-y-8">
      {log.map((item: any, idx: any) => (
        <div key={item.id} className="relative">
          {/* Node Visual */}
          {item.type === 'success' ? (
            <div className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full border-[3px] border-[#fcfaf8] bg-green-500 ring-2 ring-green-500/20"></div>
          ) : item.type === 'alert' ? (
            <div className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full border-[3px] border-[#fcfaf8] bg-[#ef9d2a] ring-2 ring-[#ef9d2a]/20"></div>
          ) : (
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#fcfaf8] bg-slate-300"></div>
          )}

          {/* Node Data */}
          <div className="flex flex-col gap-1">
            <span
              className={`text-sm font-bold ${item.type === 'success' ? 'text-stone-900' : 'text-stone-700'}`}
            >
              {item.title}
            </span>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>{item.auth}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AssignedAgent = () => (
  <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-transparent mt-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm shrink-0">
      NA
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-stone-900">Not Assigned</span>
      <span className="text-xs font-medium text-slate-400">No agent connected yet</span>
    </div>
    <button className="ml-auto text-sm font-bold text-[#ef9d2a] hover:text-[#d98a1e] transition-colors">
      Assign
    </button>
  </div>
);

// --- MAIN PAGE ---

export default function EnquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentEnquiry, isLoading, error } = useAppSelector(state => state.enquiry);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchEnquiryById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-[#ef9d2a] animate-spin mb-4" />
        <p className="text-stone-500 font-black tracking-tight">Loading enquiry details...</p>
      </div>
    );
  }

  if (error || !currentEnquiry) {
    return (
      <div className="w-full min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center p-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-4">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Error Loading Enquiry</h2>
        <p className="text-stone-500 mb-6">{error || 'Enquiry not found.'}</p>
        <Link to="/dashboard/enquiries" className="px-8 py-3 bg-[#ef9d2a] text-white rounded-full font-bold">
          Back to Enquiries
        </Link>
      </div>
    );
  }

  const caterer = typeof currentEnquiry.caterer === 'object' ? currentEnquiry.caterer as Caterer : null;

  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 pl-4 ">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Link to="/dashboard/enquiries" className="hover:text-stone-900 transition-colors flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Enquiries
              </Link>
              <span>/</span>
              <span className="text-stone-600 font-black">#{currentEnquiry._id?.slice(-8).toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
                {currentEnquiry.eventType}
              </h1>
              <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black tracking-widest border border-blue-200 uppercase">
                {currentEnquiry.status}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none h-12 px-6 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black text-sm transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" strokeWidth={3} />
                Update Status
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-6">
          <div className="xl:col-span-2 flex flex-col gap-6 lg:gap-8">
            <ProgressStepper status={currentEnquiry.status} />
            <EnquirySummary data={currentEnquiry} />

            <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-transparent">
              <h3 className="text-xl font-black text-stone-900 mb-6">Conversation with {caterer?.businessName || 'Caterer'}</h3>
              <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 text-center">
                 <p className="text-slate-400 font-medium">No messages yet. Start the conversation to finalize your booking.</p>
                 <button className="mt-4 px-6 py-2 bg-[#ef9d2a] text-white rounded-full font-bold text-sm">Send Message</button>
              </div>
            </div>
          </div>

          <div className="col-span-1 pt-6 xl:pt-24">
             <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-transparent">
                <h3 className="text-lg font-black text-stone-900 mb-4">Caterer Info</h3>
                {caterer ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-bold text-[#ef9d2a]">
                      {caterer.businessName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-stone-900">{caterer.businessName}</span>
                      <span className="text-xs text-stone-400">{caterer.specialties.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-stone-400 text-sm">General Enquiry</p>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
