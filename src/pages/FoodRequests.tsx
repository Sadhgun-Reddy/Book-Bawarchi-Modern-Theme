import React, { useState } from 'react';
import {
  Search,
  Filter,
  FilterX,
  Eye,
  Utensils,
  Carrot,
  Milk,
  AlertTriangle,
  ArrowDown,
  Minus,
  ChevronDown,
  Calendar,
  Plus,
  IceCream,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FoodRequest } from '../types';

// --- MOCK DATA ---
const MOCK_REQUESTS: any[] = [
  {
    id: '#REQ-001',
    foodTitle: 'Rice & Curry Meals',
    foodType: 'meals', // determines icon/color
    quantity: '50 Servings',
    location: 'Downtown Shelter',
    urgency: 'high',
    status: 'open',
    note: 'Needs pickup by 5 PM sharp.',
  },
  {
    id: '#REQ-002',
    foodTitle: 'Fresh Vegetables',
    foodType: 'produce',
    quantity: '20 kg',
    location: 'Community Center B',
    urgency: 'medium',
    status: 'pending',
    note: 'Check refrigeration capacity first.',
  },
  {
    id: '#REQ-003',
    foodTitle: 'Bread Loaves',
    foodType: 'bakery',
    quantity: '100 Units',
    location: 'Hope Kitchen',
    urgency: 'low',
    status: 'open',
    note: 'Bakery donation surplus.',
  },
  {
    id: '#REQ-004',
    foodTitle: 'Milk Cartons',
    foodType: 'dairy',
    quantity: '30 Liters',
    location: 'Kids Safe Home',
    urgency: 'high',
    status: 'closed',
    note: 'Delivered successfully.',
  },
  {
    id: '#REQ-005',
    foodTitle: 'Fruit Baskets',
    foodType: 'produce',
    quantity: '15 Units',
    location: 'Senior Care A',
    urgency: 'low',
    status: 'open',
    note: 'Seasonal fruits only.',
  },
];

// --- HELPER COMPONENTS ---

// 1. Food Type Visualizer
const FoodTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'meals':
      return (
        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
          <Utensils className="w-5 h-5" />
        </div>
      );
    case 'produce':
      return (
        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
          <Carrot className="w-5 h-5" />
        </div>
      );
    case 'dairy':
      return (
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
          <Milk className="w-5 h-5" />
        </div>
      );
    case 'bakery':
      return (
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
          <IceCream className="w-5 h-5" /> {/* Using IceCream as generic bakery/sweets for now */}
        </div>
      );
    default:
      return (
        <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
          <Utensils className="w-5 h-5" />
        </div>
      );
  }
};

// 2. Urgency Badge
const UrgencyBadge = ({ level }: { level: string }) => {
  switch (level?.toLowerCase()) {
    case 'high':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} />
          High
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
          <Minus className="w-3.5 h-3.5" strokeWidth={3} />
          Medium
        </span>
      );
    case 'low':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-500 text-xs font-bold">
          <ArrowDown className="w-3.5 h-3.5" strokeWidth={3} />
          Low
        </span>
      );
    default:
      return <span className="text-xs text-stone-400">-</span>;
  }
};

// 3. Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  switch (status?.toLowerCase()) {
    case 'open':
    case 'approved':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold ring-1 ring-inset ring-emerald-600/10">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold ring-1 ring-inset ring-amber-600/10">
          Pending
        </span>
      );
    case 'closed':
    case 'rejected':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-bold ring-1 ring-inset ring-stone-400/20">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    default:
      return <span className="text-xs text-stone-400">{status}</span>;
  }
};

// --- MAIN COMPONENTS ---

const RequestsToolbar: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
      {/* Search */}
      <div className="relative flex-1 min-w-[280px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder="Search by ID, food type, or location..."
          className="block w-full pl-11 pr-4 py-3 rounded-xl border-none bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-[#ef9d2a]/50 focus:bg-white transition-all text-sm font-medium outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 px-2 pb-2 xl:pb-0">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors text-sm font-medium group">
          <span>
            Status: <span className="text-stone-900 font-bold group-hover:text-[#ef9d2a]">All</span>
          </span>
          <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-[#ef9d2a]" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors text-sm font-medium group">
          <span>Urgency</span>
          <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-[#ef9d2a]" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors text-sm font-medium group">
          <span>Date Range</span>
          <Calendar className="w-4 h-4 text-stone-400 group-hover:text-[#ef9d2a]" />
        </button>

        {/* Clear Filters */}
        <button
          className="p-2.5 ml-1 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Clear Filters"
        >
          <FilterX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const RequestsTable = ({ data }: { data: any[] }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden animate-fade-in delay-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/50">
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider w-32">
                Ref ID
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider">
                Food Type
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider text-center">
                Urgency
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider text-center">
                Status
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider hidden lg:table-cell">
                Note
              </th>
              <th className="px-6 py-5 text-xs font-bold text-stone-400 uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {data.map((req, idx) => (
              <tr
                key={idx}
                className="group hover:bg-[#ef9d2a]/[0.05] transition-colors cursor-default"
              >
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-stone-500 font-mono tracking-tight">
                    {req.id}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <FoodTypeIcon type={req.foodType} />
                    <span className="text-sm font-bold text-stone-900">{req.foodTitle}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold text-stone-600">{req.quantity}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-stone-600">{req.location}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <UrgencyBadge level={req.urgency} />
                </td>
                <td className="px-6 py-5 text-center">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-6 py-5 hidden lg:table-cell">
                  <p className="text-xs font-medium text-stone-400 max-w-[160px] truncate">
                    {req.note}
                  </p>
                </td>
                <td className="px-6 py-5 text-right">
                  {/* Action Button */}
                  <Link
                    to={`/caterer/requests/${req.id.replace('#REQ-', '')}`}
                    className="inline-flex items-center gap-2 justify-center h-10 px-6 rounded-full border border-stone-200 text-stone-600 text-xs font-bold hover:bg-[#ef9d2a] hover:text-white hover:border-[#ef9d2a] transition-all shadow-sm"
                  >
                    View <Eye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State (Hidden if data exists) */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-24 h-24 bg-[#ef9d2a]/10 rounded-full flex items-center justify-center mb-6">
            <FilterX className="text-[#ef9d2a] w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">No Requests Found</h3>
          <p className="text-stone-500 max-w-sm mx-auto mb-8 font-medium">
            It looks like there are no active food requests matching your current filters.
          </p>
        </div>
      )}

      {/* Minimal Pagination Footer */}
      {data.length > 0 && (
        <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-6 py-4">
          <p className="text-sm text-stone-500 font-medium">
            Showing <span className="font-bold text-stone-900">1</span> to{' '}
            <span className="font-bold text-stone-900">{data.length}</span> of{' '}
            <span className="font-bold text-stone-900">{data.length}</span> results
          </p>
        </div>
      )}
    </div>
  );
};

export default function FoodRequestsPage() {
  const [requests] = useState<any[]>(MOCK_REQUESTS);

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 p-4 sm:p-8 w-full   mx-auto flex flex-col h-full overflow-hidden">
      <div className="flex-1 flex flex-col gap-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
              Food Requests
            </h2>
            <p className="text-stone-500 font-medium text-lg">
              Manage and track community food assistance workflows.
            </p>
          </div>

          <Link
            to="/request-food"
            className="flex items-center justify-center gap-2 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-8 py-3.5 shadow-lg shadow-orange-500/30 transition-all active:translate-y-0.5 group shrink-0"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" strokeWidth={3} />
            <span className="font-bold text-sm tracking-wide">Create Request</span>
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-4 animate-fade-in delay-75 w-full">
          {/* Floating Toolbar */}
          <RequestsToolbar />

          {/* Render Main Table */}
          <RequestsTable data={requests} />
        </div>
      </div>
    </div>
  );
}
