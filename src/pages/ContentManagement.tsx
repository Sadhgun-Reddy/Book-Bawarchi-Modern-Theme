import React from 'react';
import { Plus, Edit2, Trash2, Eye, Heart, Edit3, Utensils, ChevronDown } from 'lucide-react';

const MOCK_POSTS = [
  {
    id: 1,
    title: 'Mastering the Perfect Biryani',
    type: 'Recipe',
    typeColor: 'text-orange-500', // Adapted for Lucide/Tailwind
    description:
      'Discover the secret blend of spices and the crucial "dum" technique that makes a biryani truly unforgettable and authentic.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOvLEUMtfEFdcV3KMUA8JlnDikgeMRthDYW69jCtycUXejsUbLwD-wY29s2uF0VYaJgka8L-uhUQjmv0gwcg-lqDXJYkh53EIiyKh6582yYOKMqXzcWTxcHdudnZChBVFg60nQKexUoFtK-gfmDH9An0ywPpW0AYJAyzJjiNHlFLYKjPSqoleZRKE6gZ0_RUyFU2j6ID1DYo04bL7VZEj2T_ItVIBqAU6cR_VDdJXtsxGmCO9jQiNwrIq1rqp_JTasazK6hNpO0Hs',
    views: '1.2k views',
    likes: '45 likes',
    date: 'Published Oct 24, 2023',
  },
  {
    id: 2,
    title: '5 Tips for Sourcing Spices',
    type: 'Tip',
    typeColor: 'text-emerald-600',
    description:
      'Spices are the soul of Indian cooking. Learn how to identify fresh, high-quality spices from local markets and vendors.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLIDrSsa2X5tSSoI3nBRo0m3mKh6JAtbnVMEyn7vZLH5ah9xYqIiDCSS7IrFqCPpv-kZbhkRS9WfEjljNPsrm-tEJzQcZ_efXpSGqSegx24OqbfevNhhn1mbxd0ovDDI0lrO7bsFsWhbqgxooSJ202uSQXh6ovblmBH7TBbVYdmBFYYQHSdiwpBHexcIG5Sd8uQSduAjSoT2YGj4BEtHoATlLsfMv69KTj4XvVCkRxJ9QP7XKg_11g6FfFzDWNo0iY8nTaDAkTStw',
    views: '800 views',
    likes: '12 likes',
    date: 'Published Oct 20, 2023',
  },
  {
    id: 3,
    title: 'New Seasonal Menu Launch',
    type: 'Update',
    typeColor: 'text-blue-600',
    description:
      'Introducing our Autumn harvest menu featuring slow-cooked lamb, roasted seasonal vegetables, and saffron-infused desserts.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4HMQw1RXWI7I9WVw3ssIR0ZeF5LZgedIiiC6ro8RiQyir-3oLsgkPNpALVgb0q1pHUSp0Htk0xs8wzeN8_NTdM-3ACKutqIWDswcPB79J2S6KbXtF-8fTvYpV9JjxhcB2dhlGRJoKa4Y9EhKI4RvP4amJLJS2U8Mp7_GCDWsc-dhkfmmX8YoENR2ulxwjsUdySoBZiaCxE-RjkBHgg8YnfhAtSSHisBR1VycrFrjDchOhI_1BkpsGZPZVb4RcCJ6V-mRpe1AfqTM',
    views: '500 views',
    likes: '30 likes',
    date: 'Published Oct 15, 2023',
  },
];

export default function ContentManagementPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30">
      {/* 
                Assuming DashboardLayout handles the left sidebar and TopNav.
                This container aligns with the standard right fluid content area styling. 
            */}
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-10 shrink-0 animate-in fade-in duration-500">
        {/* Content Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Content & Blog Management
            </h2>
            <p className="text-slate-500 mt-1">
              Manage your culinary stories, tips, and seasonal updates.
            </p>
          </div>
          <button className="bg-[#ef9d2a] hover:bg-[#ef9d2a]/90 text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="w-5 h-5" strokeWidth={3} />
            Create New Post
          </button>
        </div>

        {/* Content List */}
        <div className="space-y-6 pb-20">
          {MOCK_POSTS.length > 0 ? (
            <>
              {MOCK_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl p-5 border border-[#ef9d2a]/5 hover:border-[#ef9d2a]/20 hover:shadow-xl hover:shadow-[#ef9d2a]/5 transition-all group flex flex-col sm:flex-row gap-6"
                >
                  {/* Image Block */}
                  <div className="w-full sm:w-64 h-48 sm:h-40 rounded-lg overflow-hidden shrink-0 relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={post.title}
                      src={post.image}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p
                        className={`text-[10px] font-bold ${post.typeColor} uppercase tracking-widest`}
                      >
                        {post.type}
                      </p>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ef9d2a] transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex gap-1 sm:gap-2 shrink-0">
                          <button
                            className="p-2 text-slate-400 hover:text-[#ef9d2a] hover:bg-[#ef9d2a]/5 rounded-full transition-all"
                            aria-label={`Edit ${post.title}`}
                            title={`Edit ${post.title}`}
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            aria-label={`Delete ${post.title}`}
                            title={`Delete ${post.title}`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-500 mt-2 line-clamp-2 text-sm leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Eye className="w-4 h-4 text-[#ef9d2a]" />
                        <span className="text-sm font-semibold">{post.views}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Heart className="w-4 h-4 text-[#ef9d2a]" />
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </div>
                      <div className="ml-auto text-xs font-medium text-slate-400 w-full sm:w-auto mt-2 sm:mt-0 text-right sm:text-left">
                        {post.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More / Pagination Placeholder */}
              <div className="pt-8 flex justify-center">
                <button className="text-sm font-bold text-slate-400 hover:text-[#ef9d2a] transition-colors flex items-center gap-2">
                  View Archive Posts
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-48 h-48 bg-[#ef9d2a]/5 rounded-full flex items-center justify-center mb-8">
                <div className="w-32 h-32 bg-[#ef9d2a]/10 rounded-full flex items-center justify-center">
                  <Edit3 className="w-16 h-16 text-[#ef9d2a]/40" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Hungry for engagement?</h3>
              <p className="text-slate-500 max-w-md mt-3 mb-8">
                You haven't shared any culinary stories yet. Share your first recipe or kitchen tip
                to start building your audience!
              </p>
              <button className="bg-[#ef9d2a] hover:bg-[#ef9d2a]/90 text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all">
                <Utensils className="w-4 h-4" />
                Share your first recipe!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
