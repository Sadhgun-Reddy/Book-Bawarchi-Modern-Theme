import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Paperclip,
  Send,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Printer,
  ArrowLeft,
  Clock,
  Tag,
  UserCircle,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- TYPES ---
interface Message {
  id: string;
  type: 'user' | 'system' | 'agent';
  content: string;
  sender?: string;
  avatar?: string;
  timestamp?: string;
  role?: string;
}

// --- MOCK DATA ---
const TICKET_DETAILS = {
  id: '#TKT-1024',
  subject: 'Payment issue with recent order',
  status: 'In Progress',
  priority: 'High',
  category: 'Billing',
  agent: 'Sarah Jenkins',
  created: 'Oct 24, 2024 at 10:30 AM',
  source: 'Email',
};

const REQUESTER_INFO = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98765 43210',
  memberSince: 'Mar 2023',
  tier: 'Premium',
};

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    type: 'user',
    sender: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    timestamp: 'Oct 24, 10:30 AM',
    content:
      'Hi support team, I was charged twice for my caterer booking (ID: ORD-9921) yesterday. My bank statement shows two deductions of ₹15,000 each. Can you please check and initiate a refund for the duplicate charge? I have attached the bank screenshot for reference.',
  },
  {
    id: 'sys-1',
    type: 'system',
    content: 'Ticket assigned to Sarah Jenkins',
  },
  {
    id: 'msg-2',
    type: 'agent',
    sender: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    role: 'SUPPORT',
    timestamp: 'Oct 24, 11:15 AM',
    content:
      'Hello Priya, I apologize for the inconvenience. I am looking into this right now. Our payment gateway had a minor sync delay yesterday afternoon that caused some duplicate auth-holds. Give me a few minutes to trace the transaction IDs.',
  },
  {
    id: 'msg-3',
    type: 'agent',
    sender: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    role: 'SUPPORT',
    timestamp: 'Oct 24, 11:32 AM',
    content:
      'Update: I have found the duplicate transaction (Ref: TXN-88291A). It was only an authorization hold, not a full capture. I have voided the second hold from our end. The amount of ₹15,000 should reflect back in your account within 24-48 business hours depending on your bank.',
  },
  {
    id: 'sys-2',
    type: 'system',
    content: 'Ticket status changed to In Progress',
  },
];

// --- SUB-COMPONENTS ---

const ThreadHeader: React.FC = () => (
  <div className="flex flex-col gap-4 mb-6">
    <Link
      to="/dashboard/tickets"
      className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#ef9d2a] transition-colors w-fit"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Tickets
    </Link>
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-[#ef9d2a] tracking-widest">
            {TICKET_DETAILS.id}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
          {TICKET_DETAILS.subject}
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Created {TICKET_DETAILS.created} via {TICKET_DETAILS.source}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-stone-900 transition-colors">
          <Printer className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-stone-900 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
        <button className="px-6 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 font-bold text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors">
          <CheckCircle className="w-4 h-4" strokeWidth={3} />
          Mark Resolved
        </button>
      </div>
    </div>
  </div>
);

const MetadataSidebar: React.FC = () => (
  <div className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-sm flex flex-col gap-6 sticky top-6">
    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
      Ticket Info
    </h3>

    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400">STATUS</span>
        <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-bold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          {TICKET_DETAILS.status}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400">PRIORITY</span>
        <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
          <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
          {TICKET_DETAILS.priority}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400">CATEGORY</span>
        <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
          <Tag className="w-4 h-4 text-slate-400 shrink-0" />
          {TICKET_DETAILS.category}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400">ASSIGNED TO</span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <UserCircle className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-sm font-bold text-[#ef9d2a]">{TICKET_DETAILS.agent}</span>
        </div>
      </div>
    </div>
  </div>
);

const ContextSidebar: React.FC = () => (
  <div className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-sm flex flex-col gap-6 sticky top-6 hidden xl:flex">
    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Requester</h3>

    <div className="flex flex-col items-center text-center gap-2 mb-4 border-b border-slate-100 pb-6">
      <img
        src={MOCK_MESSAGES[0].avatar}
        alt="User"
        className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white shadow-md"
      />
      <span className="text-lg font-black text-stone-900 leading-tight">{REQUESTER_INFO.name}</span>
      <span className="text-sm font-medium text-slate-500">{REQUESTER_INFO.email}</span>
      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#ef9d2a]/10 text-[#ef9d2a] rounded-full text-xs font-bold">
        <ShieldCheck className="w-3.5 h-3.5" />
        {REQUESTER_INFO.tier} Member
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        Recent Activity
      </h4>
      <div className="flex flex-col gap-3">
        <Link
          to="#"
          className="group flex flex-col gap-1 border border-slate-100 rounded-xl p-3 hover:border-[#ef9d2a]/30 transition-colors"
        >
          <span className="text-[11px] font-black tracking-widest text-[#ef9d2a]">#TKT-0892</span>
          <span className="text-sm font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors leading-tight">
            Missing items in delivery
          </span>
          <span className="text-xs font-medium text-slate-400">Closed • Sep 12</span>
        </Link>
        <Link
          to="#"
          className="group flex flex-col gap-1 border border-slate-100 rounded-xl p-3 hover:border-[#ef9d2a]/30 transition-colors bg-slate-50/50"
        >
          <span className="text-[11px] font-black tracking-widest text-slate-400 group-hover:text-[#ef9d2a] transition-colors">
            #TKT-0511
          </span>
          <span className="text-sm font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors leading-tight">
            How to change password
          </span>
          <span className="text-xs font-medium text-emerald-500">Resolved • Jun 04</span>
        </Link>
      </div>
    </div>
  </div>
);

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center w-full my-4">
        <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold">
          {message.content}
        </span>
      </div>
    );
  }

  const isAgent = message.type === 'agent';

  return (
    <div
      className={`flex gap-4 w-full p-6 rounded-3xl ${isAgent ? 'bg-orange-50/30 border border-orange-100/50' : 'bg-white border border-slate-100'} shadow-sm`}
    >
      {/* Avatar */}
      <div className="shrink-0 pt-1">
        <img
          src={message.avatar}
          alt={message.sender}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-[15px] font-black text-stone-900">{message.sender}</span>
          {message.role && (
            <span className="bg-[#ef9d2a] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">
              {message.role}
            </span>
          )}
          <span className="text-xs font-medium text-slate-400 ml-auto whitespace-nowrap">
            {message.timestamp}
          </span>
        </div>

        <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-medium">
          {message.content}
        </p>
      </div>
    </div>
  );
};

const ChatInputDock: React.FC = () => (
  <div className="mt-auto bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-[#ef9d2a]/20 focus-within:border-[#ef9d2a] transition-all">
    {/* Toolbar */}
    <div className="bg-slate-50 px-4 py-2 flex items-center gap-1 border-b border-slate-100">
      <button className="p-2 text-slate-400 hover:text-stone-900 hover:bg-slate-200 rounded-lg transition-colors">
        <Bold className="w-4 h-4" />
      </button>
      <button className="p-2 text-slate-400 hover:text-stone-900 hover:bg-slate-200 rounded-lg transition-colors">
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
      <button className="p-2 text-slate-400 hover:text-stone-900 hover:bg-slate-200 rounded-lg transition-colors">
        <LinkIcon className="w-4 h-4" />
      </button>
      <button className="p-2 text-slate-400 hover:text-stone-900 hover:bg-slate-200 rounded-lg transition-colors">
        <Paperclip className="w-4 h-4" />
      </button>
    </div>

    {/* Textarea */}
    <textarea
      className="w-full p-5 min-h-[120px] resize-none border-none outline-none text-sm font-medium text-stone-900 placeholder:text-slate-400 leading-relaxed"
      placeholder="Type your reply here..."
    ></textarea>

    {/* Footer */}
    <div className="p-2 pl-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-slate-50">
      <p className="text-xs font-medium text-slate-400 shrink-0 hidden sm:block">
        Please do not share sensitive passwords or full card details.
      </p>
      <button className="w-full sm:w-auto px-8 py-3 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white rounded-full font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all self-end shrink-0">
        Send Reply
        <Send className="w-4 h-4" strokeWidth={3} />
      </button>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function TicketDetailPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24 animate-in fade-in duration-500">
      <div className="w-full">
        <ThreadHeader />

        {/* --- 3-Column Split Structure --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-8">
          {/* LEFT PANE (Metadata: 3 cols on Large) */}
          <div className="col-span-1 lg:col-span-3">
            <MetadataSidebar />
          </div>

          {/* CENTER PANE (Chat Thread: 6 or 9 cols depending on Right Pane presence) */}
          <div className="col-span-1 lg:col-span-9 xl:col-span-6 flex flex-col gap-6">
            <div className="bg-[#fcfaf8] flex flex-col gap-6">
              {/* Date Separator */}
              <div className="flex items-center gap-4 w-full px-4 mb-2">
                <div className="h-[1px] bg-slate-200 flex-1"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
                  Today, October 24
                </span>
                <div className="h-[1px] bg-slate-200 flex-1"></div>
              </div>

              {/* Message Stream */}
              <div className="flex flex-col gap-4">
                {MOCK_MESSAGES.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
              </div>
            </div>

            {/* Spacer before input */}
            <div className="h-4"></div>

            {/* Fixed/Sticky Input Dock effect achieved by placing it at the end of the flex column */}
            <ChatInputDock />
          </div>

          {/* RIGHT PANE (Context: Hidden on Large, 3 cols on XL) */}
          <div className="col-span-1 xl:col-span-3">
            <ContextSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
