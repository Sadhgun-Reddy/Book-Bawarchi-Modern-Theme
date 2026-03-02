import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- TYPES ---
export interface TicketSummary {
  id: string;
  subject: string;
  snippet: string;
  category: string;
  categoryColor: string;
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  lastUpdated: string;
}

// --- MOCK DATA ---
const MOCK_TICKETS: TicketSummary[] = [
  {
    id: '#TK-1024',
    subject: 'Caterer requested deposit change',
    snippet: 'The caterer for my event on 12th Aug is asking for 50% upfront instead of 30%.',
    category: 'Billing',
    categoryColor: 'bg-purple-50 text-purple-700',
    status: 'Open',
    lastUpdated: '2 hours ago',
  },
  {
    id: '#TK-1023',
    subject: 'Menu item substitution issue',
    snippet: 'Need to replace Paneer Tikka with Mushroom due to allergy constraints.',
    category: 'Service',
    categoryColor: 'bg-rose-50 text-rose-700',
    status: 'Pending',
    lastUpdated: 'Yesterday',
  },
  {
    id: '#TK-1019',
    subject: 'Cannot download final invoice',
    snippet: 'Clicking the download button on my completed order returns a 404 error.',
    category: 'Technical',
    categoryColor: 'bg-slate-100 text-slate-700',
    status: 'Resolved',
    lastUpdated: '3 days ago',
  },
  {
    id: '#TK-1015',
    subject: 'Question about refund policy',
    snippet: 'If I cancel 14 days prior, how much of my security deposit is returned?',
    category: 'General',
    categoryColor: 'bg-teal-50 text-teal-700',
    status: 'Closed',
    lastUpdated: 'Last week',
  },
  {
    id: '#TK-1002',
    subject: 'Incorrect location pinned on map',
    snippet: 'The venue address is correct but the map pin shows a location 5km away.',
    category: 'Technical',
    categoryColor: 'bg-slate-100 text-slate-700',
    status: 'Closed',
    lastUpdated: '2 months ago',
  },
];

// --- SUB-COMPONENTS ---

const TicketHeader: React.FC = () => (
  <div className="bg-white rounded-[2rem] p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm border border-transparent">
    <div className="flex flex-col gap-1.5">
      <h1 className="text-2xl lg:text-3xl font-black text-stone-900 tracking-tight">
        Need help with an order?
      </h1>
      <p className="text-slate-500 font-medium">
        Create a new ticket and our support team will assist you within 24 hours.
      </p>
    </div>
    <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all shrink-0">
      <Plus className="w-5 h-5" strokeWidth={3} />
      Create Ticket
    </button>
  </div>
);

const StatusBadge: React.FC<{ status: TicketSummary['status'] }> = ({ status }) => {
  switch (status) {
    case 'Open':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          Open
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          Pending
        </span>
      );
    case 'Resolved':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Resolved
        </span>
      );
    case 'Closed':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
          Closed
        </span>
      );
    default:
      return null;
  }
};

const TicketTableControls: React.FC = () => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
    {/* Filters */}
    <div className="flex flex-wrap items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-stone-900 hover:bg-slate-50 transition-colors">
        <Filter className="w-4 h-4 text-slate-400" />
        Status: Open
        <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-stone-900 hover:bg-slate-50 transition-colors">
        Category: All
        <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
      </button>
    </div>

    {/* Search */}
    <div className="relative w-full lg:w-80 shrink-0">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search tickets by ID or keyword..."
        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow placeholder:text-slate-400"
      />
    </div>
  </div>
);

const TicketTable: React.FC = () => (
  <div className="w-full overflow-x-auto">
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead>
        <tr>
          <th className="pb-4 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold text-slate-400 pl-4 w-32">
            Ticket ID
          </th>
          <th className="pb-4 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold text-slate-400">
            Subject
          </th>
          <th className="pb-4 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold text-slate-400">
            Category
          </th>
          <th className="pb-4 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold text-slate-400">
            Status
          </th>
          <th className="pb-4 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold text-slate-400">
            Last Updated
          </th>
          <th className="pb-4 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold text-slate-400 text-right pr-4">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {MOCK_TICKETS.map((ticket, index) => (
          <tr
            key={index}
            className="group hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50 last:border-0"
          >
            <td className="py-5 pl-4 align-top">
              <span className="text-slate-600 font-mono text-sm font-medium">{ticket.id}</span>
            </td>

            <td className="py-5 pr-8 align-top">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors line-clamp-1">
                  {ticket.subject}
                </span>
                <span className="text-xs font-medium text-slate-400 line-clamp-1">
                  {ticket.snippet}
                </span>
              </div>
            </td>

            <td className="py-5 align-top">
              <span
                className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${ticket.categoryColor}`}
              >
                {ticket.category}
              </span>
            </td>

            <td className="py-5 align-top">
              <StatusBadge status={ticket.status} />
            </td>

            <td className="py-5 align-top">
              <span className="text-sm font-semibold text-slate-500">{ticket.lastUpdated}</span>
            </td>

            <td className="py-5 pr-4 align-top text-right">
              <Link
                to={`/dashboard/tickets/${ticket.id.replace('#', '')}`}
                className="inline-block border border-slate-200 rounded-full px-6 py-1.5 text-sm font-bold text-stone-900 hover:bg-white hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors shadow-sm"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Pagination Footer */}
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
      <span className="text-sm font-semibold text-slate-500 ml-4">
        Showing 1 to 5 of 12 tickets
      </span>
      <div className="flex items-center gap-2 mr-4">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-stone-900 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function SupportTicketsPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24 animate-in fade-in duration-500">
      <div className="w-full">
        <TicketHeader />

        {/* Massive Main Card Container */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-transparent flex flex-col w-full">
          <TicketTableControls />
          <TicketTable />
        </div>
      </div>
    </div>
  );
}
