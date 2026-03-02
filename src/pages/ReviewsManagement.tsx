import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  Flag,
  Trash2,
  BarChart,
  Clock,
  CheckCircle2,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';

// --- MOCK DATA ---

const STATS = {
  rating: 4.8,
  totalReviews: 128,
  responseRate: 94,
  avgReplyTime: '2h',
  positiveSentiment: 88,
};

const FILTER_TABS = ['All Reviews', 'Unanswered', 'Flagged'];

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    user: { name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', isVerified: true },
    date: '2 days ago',
    rating: 5,
    text: 'The absolute highlight of our wedding! The menu was executed flawlessly, and the catering staff was incredibly professional. Every guest raved about the butter chicken and the live chaat counter.',
    eventType: 'Wedding - Dec 2023',
    reply: {
      text: 'Thank you so much, Sarah! It was an absolute honor to be part of your special day. The live chaat counter is one of our favorites to run. Wishing you both a lifetime of happiness!',
      date: '1 day ago',
    },
  },
  {
    id: 'rev-2',
    user: { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?u=michael', isVerified: true },
    date: '1 week ago',
    rating: 4,
    text: 'Great food for our corporate retreat. The delivery was slightly delayed due to traffic, but the quality of the biryani more than made up for it. Would book again.',
    eventType: 'Corporate - Nov 2023',
    reply: null,
  },
  {
    id: 'rev-3',
    user: { name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=priya', isVerified: false },
    date: '3 weeks ago',
    rating: 5,
    text: 'We hired them for a small family gathering (50 people) and the service was intimate and perfect. The appetizers were served piping hot.',
    eventType: 'Private Party - Oct 2023',
    reply: {
      text: 'Hi Priya, thrilled to hear the intimate scale worked well for your family gathering! We love making smaller events feel special. See you next time!',
      date: '2 weeks ago',
    },
  },
];

// --- SUB-COMPONENTS ---

const Scoreboard = ({ stats }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {/* Card 1: Overall Rating */}
    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center items-center text-center">
      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">
        Overall Rating
      </h3>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-5xl font-black text-stone-900 tracking-tighter">
          {stats.rating.toFixed(1)}
        </span>
        <div className="flex flex-col items-start">
          <div className="flex items-center text-[#ef9d2a]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-400 mt-1">
            Based on {stats.totalReviews} reviews
          </span>
        </div>
      </div>
    </div>

    {/* Card 2: Positive Sentiment */}
    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-full text-emerald-600">
            <BarChart className="w-5 h-5" />
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">Sentiment</h3>
        </div>
        <span className="text-2xl font-black text-emerald-600">{stats.positiveSentiment}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: `${stats.positiveSentiment}%` }}
        ></div>
      </div>
      <p className="text-sm font-medium text-slate-400 mt-3 text-right">Positive reviews</p>
    </div>

    {/* Card 3: Response Rate */}
    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-50 rounded-full text-[#ef9d2a]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Response Rate
          </h3>
        </div>
        <span className="text-2xl font-black text-stone-900">{stats.responseRate}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#ef9d2a] rounded-full"
          style={{ width: `${stats.responseRate}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-end gap-1.5 mt-3 text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-sm font-medium">Avg reply: {stats.avgReplyTime}</span>
      </div>
    </div>
  </div>
);

const FilterBar = ({ activeTab, setActiveTab }: any) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full scrollbar-hide">
      {FILTER_TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${isActive
              ? 'bg-[#ef9d2a] text-white shadow-md shadow-orange-500/20'
              : 'bg-white border border-slate-200 text-slate-500 hover:border-[#ef9d2a]/50 hover:text-stone-900'
              }`}
          >
            {tab}
          </button>
        );
      })}
    </div>

    {/* Optional Sort Dropdown Simulation */}
    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-50 shrink-0">
      Sort: Newest <ChevronDown className="w-4 h-4 text-slate-400" />
    </button>
  </div>
);

const ReviewCard = ({ review, onPostReply }: any) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onPostReply(review.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 break-inside-avoid w-full">
      {/* Header: User Info & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className="size-12 md:size-14 rounded-full object-cover border-2 border-slate-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-lg text-stone-900">{review.user.name}</h4>
              {review.user.isVerified && (
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-slate-400">{review.date}</span>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 self-start">
          <button
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            title="Report"
          >
            <Flag className="w-4 h-4" />
          </button>
          {!review.reply && !isReplying && (
            <button
              onClick={() => setIsReplying(true)}
              className="bg-orange-50 text-[#ef9d2a] hover:bg-[#ef9d2a] hover:text-white px-5 py-2 rounded-full font-bold text-sm transition-colors border border-orange-100"
            >
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Rating & Content */}
      <div className="pl-0 sm:pl-[72px]">
        <div className="flex items-center gap-1 text-[#ef9d2a] mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${s <= review.rating ? 'fill-current' : 'text-slate-200 fill-slate-200'}`}
            />
          ))}
        </div>

        <p className="text-slate-600 text-base leading-relaxed mb-4">{review.text}</p>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full">
            {review.eventType}
          </span>
        </div>

        {/* Published Reply (Nested) */}
        {review.reply && (
          <div className="mt-6 ml-4 md:ml-8 p-6 bg-slate-50 rounded-[1.5rem] border-l-4 border-l-[#ef9d2a] relative group">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-bold text-stone-900 text-sm">Your Response</h5>
              <span className="text-xs text-slate-400 font-medium">{review.reply.date}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{review.reply.text}</p>

            {/* Edit/Delete Actions on Hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-slate-50 pl-2">
              <button className="text-xs font-bold text-slate-400 hover:text-[#ef9d2a]">
                Edit
              </button>
              <span className="text-slate-300">•</span>
              <button className="text-xs font-bold text-rose-400 hover:text-rose-600">
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Inline Reply Input Box */}
        {isReplying && (
          <div className="mt-6 ml-4 md:ml-8 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-slate-50 p-2 border border-slate-200 rounded-[1.5rem] focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-orange-300 transition-all">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Write a response to ${review.user.name.split(' ')[0]}...`}
                className="w-full bg-transparent border-none outline-none resize-none text-sm text-slate-700 p-4 h-24 placeholder:text-slate-400"
                autoFocus
              />
              <div className="flex justify-end gap-2 p-2 pt-0">
                <button
                  onClick={() => setIsReplying(false)}
                  className="px-5 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                  className="bg-[#ef9d2a] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-[#d98a1e] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function ReviewsManagementPage() {
  const [activeTab, setActiveTab] = useState(FILTER_TABS[0]);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const handlePostReply = (reviewId: any, text: any) => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === reviewId) {
          return {
            ...rev,
            reply: { text, date: 'Just now' },
          };
        }
        return rev;
      })
    );
  };

  // Simulated filtering
  const filteredReviews = reviews.filter((rev) => {
    if (activeTab === 'Unanswered') return !rev.reply;
    if (activeTab === 'Flagged') return false; // Mock empty state for flagged
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-32 animate-in fade-in duration-500">
      {/* 
                Container aligned for fluid dashboard right-column
            */}
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Reviews Management</h1>
          <p className="text-base font-medium text-slate-500 mt-1">
            Monitor your reputation and engage with clients.
          </p>
        </div>

        {/* Top Metrics */}
        <Scoreboard stats={STATS} />

        {/* Filters */}
        <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Review Stack */}
        <div className="flex flex-col gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} onPostReply={handlePostReply} />
            ))
          ) : (
            <div className="bg-white rounded-[2.5rem] p-16 border border-slate-100 flex flex-col items-center justify-center text-center mt-4 shadow-sm">
              <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">No {activeTab.toLowerCase()}</h3>
              <p className="text-slate-500 mt-2 max-w-sm">
                You're all caught up! When clients leave reviews or require responses, they will
                appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
