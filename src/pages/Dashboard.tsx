import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import {
  PlusCircle,
  Search,
  MessageSquare,
  FolderOpen,
  MessageCircle,
  Heart,
  Calendar,
  Cake,
  Users,
  Utensils,
  StickyNote,
  Star,
  Plus,
  CheckCircle,
  RefreshCw,
  Info,
} from 'lucide-react';

// TYPES
interface DashboardStat {
  id: number;
  title: string;
  value: string;
  badge: string | null;
  badgeColor: string | null;
  icon: React.ElementType;
}

interface RecentEnquiry {
  id: number;
  title: string;
  date: string;
  guests: number;
  status: string;
  statusColor: string;
  icon: React.ElementType;
}

interface AdminNote {
  id: string;
  text: string;
  time: string;
  avatar: string;
}

interface SavedCaterer {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  tags: string;
  image: string;
}

interface SupportTicketSummary {
  id: string;
  title: string;
  desc: string;
  status: string;
}

interface DashboardMockData {
  stats: DashboardStat[];
  recentEnquiries: RecentEnquiry[];
  adminNotes: AdminNote[];
  savedCaterers: SavedCaterer[];
  supportTickets: SupportTicketSummary[];
}

// MOCK DATA
const MOCK_DATA: DashboardMockData = {
  stats: [
    {
      id: 1,
      title: 'Active Enquiries',
      value: '3',
      badge: '+2 new',
      icon: FolderOpen,
      badgeColor: 'text-green-600 bg-green-50',
    },
    {
      id: 2,
      title: 'New Responses',
      value: '12',
      badge: 'Action Req.',
      icon: MessageCircle,
      badgeColor: 'text-[#ef9d2a] bg-orange-50',
    },
    { id: 3, title: 'Saved Caterers', value: '8', badge: null, icon: Heart, badgeColor: null },
    { id: 4, title: 'Upcoming Events', value: '1', badge: null, icon: Calendar, badgeColor: null },
  ],
  recentEnquiries: [
    {
      id: 1,
      title: 'Birthday Bash',
      date: 'Dec 24, 2023',
      guests: 150,
      status: 'Pending',
      icon: Cake,
      statusColor: 'bg-yellow-100 text-yellow-700',
    },
    {
      id: 2,
      title: 'Corporate Lunch',
      date: 'Jan 10, 2024',
      guests: 50,
      status: 'Confirmed',
      icon: Users,
      statusColor: 'bg-green-100 text-green-700',
    },
    {
      id: 3,
      title: 'Wedding Reception',
      date: 'Feb 14, 2024',
      guests: 300,
      status: 'Draft',
      icon: Utensils,
      statusColor: 'bg-stone-200 text-stone-600',
    },
  ],
  adminNotes: [
    {
      id: '4092',
      text: '"Customer requested gluten-free options for the dessert menu. Please update the proposal."',
      time: '2h ago',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: '3021',
      text: '"Menu tasting scheduled for Friday at 2 PM. Venue address updated."',
      time: '1d ago',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    },
  ],
  savedCaterers: [
    {
      id: 1,
      name: 'Spice Symphony',
      rating: '4.9',
      reviews: 120,
      tags: 'Indian, Mughlai',
      image:
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 2,
      name: 'Urban Platter Co.',
      rating: '4.7',
      reviews: 85,
      tags: 'Continental',
      image:
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150',
    },
  ],
  supportTickets: [
    {
      id: 'TK992',
      title: 'Payment Query',
      desc: 'Waiting for support team response.',
      status: 'In Progress',
    },
  ],
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Welcome Section & Quick Actions */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-[#1b160d] lg:text-4xl">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! <br />
            <span className="text-stone-400 font-medium text-lg">Here's what's cooking today.</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/request-food')}
            className="flex items-center gap-2 rounded-full bg-[#ef9d2a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
          >
            <PlusCircle className="w-5 h-5" />
            Create Enquiry
          </button>
          <button
            onClick={() => navigate('/caterers')}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1b160d] shadow-sm ring-1 ring-stone-100 transition-transform hover:-translate-y-0.5 hover:bg-orange-50 active:translate-y-0"
          >
            <Search className="w-5 h-5 text-[#ef9d2a]" />
            Find Caterer
          </button>
          <button className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1b160d] shadow-sm ring-1 ring-stone-100 transition-transform hover:-translate-y-0.5 hover:bg-orange-50 active:translate-y-0">
            <MessageSquare className="w-5 h-5 text-[#ef9d2a]" />
            Messages
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-stone-400">
          <Info size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Metrics (Static API)</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_DATA.stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-full bg-orange-50 p-3 text-[#ef9d2a] transition-transform group-hover:scale-110">
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.badge && (
                  <span
                    className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.badgeColor}`}
                  >
                    {stat.badge}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-[#1b160d]">{stat.value}</h3>
                <p className="text-sm font-medium text-stone-500">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Enquiries */}
        <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-[#1b160d]">Recent Enquiries</h2>
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">(Static API)</span>
            </div>
            <Link
              to="/dashboard/enquiries"
              className="text-sm font-bold text-[#ef9d2a] hover:text-orange-600 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {MOCK_DATA.recentEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50/50 p-4 transition hover:bg-stone-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#ef9d2a] shadow-sm">
                    <enquiry.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1b160d]">{enquiry.title}</h4>
                    <p className="text-xs text-stone-500">
                      {enquiry.date} &bull; {enquiry.guests} Guests
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${enquiry.statusColor}`}>
                  {enquiry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Food Requests / Admin Notes */}
        <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-[#1b160d]">Latest Food Requests</h2>
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">(Static API)</span>
            </div>
            <button className="text-stone-400 hover:text-[#ef9d2a] transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {MOCK_DATA.adminNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-dashed border-stone-200 p-4 bg-stone-50/30"
              >
                <div className="mb-2 flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-[#ef9d2a]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Request #{note.id}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#1b160d] italic">{note.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-stone-200 overflow-hidden ring-2 ring-white">
                    <img src={note.avatar} alt="Admin" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    Admin Note &bull; {note.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Caterers */}
        <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-[#1b160d]">Saved Caterers</h2>
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">(Static API)</span>
            </div>
            <Link
              to="/dashboard/saved"
              className="text-sm font-bold text-[#ef9d2a] hover:text-orange-600 transition-colors"
            >
              Browse All
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {MOCK_DATA.savedCaterers.map((caterer) => (
              <div
                key={caterer.id}
                className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-stone-50 cursor-pointer"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-stone-200 shadow-sm">
                  <img
                    src={caterer.image}
                    alt={caterer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h4 className="font-bold text-[#1b160d]">{caterer.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-[#1b160d]">{caterer.rating}</span>
                    <span>({caterer.reviews} reviews)</span> &bull; {caterer.tags}
                  </div>
                </div>
                <button className="rounded-full bg-[#ef9d2a]/10 px-4 py-2 text-sm font-bold text-[#ef9d2a] hover:bg-[#ef9d2a] hover:text-white transition-colors">
                  Enquire
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets */}
        <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-[#1b160d]">Support Tickets</h2>
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">(Static API)</span>
            </div>
            <button className="flex items-center gap-1 text-sm font-bold text-[#ef9d2a] hover:text-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              New
            </button>
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-start">
            {MOCK_DATA.supportTickets.map((ticket, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 border-l-4 border-yellow-400 bg-stone-50 p-4 rounded-r-xl shadow-sm"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#1b160d]">
                    {ticket.title} - #{ticket.id}
                  </h4>
                  <p className="mt-1 text-xs text-stone-500">{ticket.desc}</p>
                </div>
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-700">
                  {ticket.status}
                </span>
              </div>
            ))}

            {/* Empty state for other tickets */}
            <div className="flex flex-1 min-h-[120px] items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50/50 p-6 text-center mt-2">
              <div>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-400 shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <p className="text-sm text-stone-500 font-medium">No other active tickets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
