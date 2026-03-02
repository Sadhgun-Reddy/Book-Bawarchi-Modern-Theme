import React from 'react';
import {
  Eye,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Cake,
  Briefcase,
  Users,
  ImagePlus,
  CalendarClock,
  Share2,
  HelpCircle,
  Reply,
  PartyPopper,
} from 'lucide-react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

// TYPES
interface KPIStat {
  id: number;
  title: string;
  value: string;
  subtext: string;
  badge: string | null;
  badgeIcon?: React.ElementType;
  badgeColor?: string;
  isPrimary: boolean;
}

interface RecentEnquiry {
  id: number;
  type: string;
  date: string;
  guests: number;
  customer: string;
  status: 'New' | 'Viewed' | 'Replied';
  icon: React.ElementType;
  iconColor: string;
  statusColor: string;
  action: 'reply' | 'view';
}

// MOCK DATA
const MOCK_DATA: { kpiStats: KPIStat[]; recentEnquiries: RecentEnquiry[] } = {
  kpiStats: [
    {
      id: 1,
      title: 'Profile Views',
      value: '1,240',
      subtext: 'this month',
      badge: '+12%',
      badgeIcon: TrendingUp,
      badgeColor: 'text-green-700 bg-green-100',
      isPrimary: false,
    },
    {
      id: 2,
      title: 'New Enquiries',
      value: '8',
      subtext: 'unread',
      badge: 'New',
      badgeColor: 'text-[#ef9d2a] bg-[#ef9d2a]/20',
      isPrimary: true,
    },
    {
      id: 3,
      title: 'Open Enquiries',
      value: '3',
      subtext: 'in progress',
      badge: null,
      isPrimary: false,
    },
    {
      id: 4,
      title: 'Response Rate',
      value: '94%',
      subtext: 'excellent',
      badge: 'Avg 2h',
      badgeColor: 'text-gray-600 bg-gray-100',
      isPrimary: false,
    },
  ],
  recentEnquiries: [
    {
      id: 1,
      type: 'Wedding Reception',
      date: 'Dec 12th, 2023',
      guests: 200,
      customer: 'Priya Sharma',
      status: 'New',
      icon: PartyPopper,
      iconColor: 'bg-blue-50 text-blue-600',
      statusColor: 'bg-[#ef9d2a]/10 text-[#ef9d2a]',
      action: 'reply',
    },
    {
      id: 2,
      type: 'Birthday Party',
      date: 'Nov 5th, 2023',
      guests: 50,
      customer: 'Rahul V.',
      status: 'Viewed',
      icon: Cake,
      iconColor: 'bg-purple-50 text-purple-600',
      statusColor: 'bg-gray-100 text-gray-600',
      action: 'reply',
    },
    {
      id: 3,
      type: 'Corporate Lunch',
      date: 'Oct 28th, 2023',
      guests: 120,
      customer: 'TechCorp Inc.',
      status: 'Replied',
      icon: Briefcase,
      iconColor: 'bg-orange-50 text-orange-600',
      statusColor: 'bg-green-100 text-green-700',
      action: 'view',
    },
  ],
};

const CatererDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { catererProfile } = useOutletContext<{ catererProfile: any }>();

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1b160d] mb-2">
            Welcome back, {catererProfile?.user?.name || catererProfile?.businessName || 'Chef'}!
          </h1>
          <p className="text-stone-500 text-lg">
            Here's what's happening with your catering business today.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-full h-12 px-6 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white text-base font-bold shadow-lg shadow-orange-500/20 transition-transform active:scale-95">
          <Eye className="w-5 h-5" />
          View Public Profile
        </button>
      </div>

      {/* Alert Banner */}
      <div className="w-full bg-orange-50 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-sm">
        <div className="p-2 bg-white rounded-full text-orange-600 shadow-sm shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#1b160d]">Pending Admin Approval</h3>
          <p className="text-sm text-stone-600 mt-1">
            Your updated documents are currently under review. Your profile visibility is limited
            until approval (approx. 24-48h).
          </p>
        </div>
        <a
          href="#"
          className="text-sm font-bold text-orange-700 hover:text-orange-800 whitespace-nowrap flex items-center gap-1 group transition-colors"
        >
          Check Status
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_DATA.kpiStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden min-h-[140px]"
          >
            {/* Background flourish for primary stat */}
            {stat.isPrimary && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#ef9d2a]/5 rounded-bl-full -mr-2 -mt-2"></div>
            )}

            <div className="flex items-center justify-between relative z-10 mb-4">
              <p className="text-stone-500 text-sm font-medium">{stat.title}</p>
              {stat.badge && (
                <div
                  className={`${stat.badgeColor} text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}
                >
                  {stat.badgeIcon && <stat.badgeIcon className="w-3.5 h-3.5" />}
                  {stat.badge}
                </div>
              )}
            </div>

            <div className="flex items-end gap-2 relative z-10">
              <h2
                className={`text-3xl font-bold ${stat.isPrimary ? 'text-[#ef9d2a]' : 'text-[#1b160d]'}`}
              >
                {stat.value}
              </h2>
              <span className="text-sm text-stone-400 mb-1">{stat.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Left Column: Recent Enquiries (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-[#1b160d]">Recent Enquiries</h2>
            <Link
              to="/caterer/requests"
              className="text-sm font-bold text-[#ef9d2a] hover:text-orange-600 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col">
            {MOCK_DATA.recentEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-5 border-b border-stone-50 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between group last:border-0"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${enquiry.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <enquiry.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base text-[#1b160d]">{enquiry.type}</h3>
                      <span
                        className={`${enquiry.statusColor} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}
                      >
                        {enquiry.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 font-medium">
                      <span className="flex items-center gap-1">
                        <CalendarClock className="w-4 h-4" /> {enquiry.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {enquiry.guests} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {enquiry.customer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions based on status */}
                {enquiry.action === 'reply' ? (
                  <>
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 hover:border-[#ef9d2a] hover:text-[#ef9d2a] rounded-full text-sm font-bold shadow-sm transition-all whitespace-nowrap">
                      Reply <Reply className="w-4 h-4" />
                    </button>
                    <button className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-bold shadow-sm">
                      Reply
                    </button>
                  </>
                ) : (
                  <>
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-transparent text-stone-400 hover:text-[#ef9d2a] text-sm font-medium transition-all whitespace-nowrap">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-stone-50 rounded-full text-sm font-bold shadow-sm">
                      View Details
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions (1/3) */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#1b160d] mb-1">Quick Actions</h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-full flex flex-col">
            <div className="grid grid-cols-1 gap-3 flex-1">
              <button
                onClick={() => navigate('/caterer/menus')}
                className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group text-left"
              >
                <div className="bg-white p-2 rounded-full shadow-sm text-stone-600 group-hover:text-[#ef9d2a] transition-colors">
                  <ImagePlus className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-[#1b160d] group-hover:text-[#ef9d2a] transition-colors">
                    Upload new dish
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Update your gallery</span>
                </div>
              </button>

              <button
                onClick={() => navigate('/caterer/settings')}
                className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group text-left"
              >
                <div className="bg-white p-2 rounded-full shadow-sm text-stone-600 group-hover:text-[#ef9d2a] transition-colors">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-[#1b160d] group-hover:text-[#ef9d2a] transition-colors">
                    Update availability
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Manage your calendar</span>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group text-left">
                <div className="bg-white p-2 rounded-full shadow-sm text-stone-600 group-hover:text-[#ef9d2a] transition-colors">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-[#1b160d] group-hover:text-[#ef9d2a] transition-colors">
                    Share profile
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Get link or QR code</span>
                </div>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <p className="text-xs text-stone-400 mb-3 uppercase tracking-wider font-bold">
                Support
              </p>
              <a
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-[#ef9d2a] transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add User icon that was imported but used in mock rendering
const User: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

export default CatererDashboard;
