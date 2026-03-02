import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  Heart,
  User,
  Headset,
  LogOut,
  Menu,
  Bell,
  ChefHat,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

interface LayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/dashboard/enquiries', icon: Mail, badge: 3 },
    { name: 'Saved Caterers', path: '/dashboard/saved', icon: Heart },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Support', path: '/dashboard/support', icon: Headset },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f7f6] text-[#1b160d] font-['Inter',sans-serif] selection:bg-[#ef9d2a]/30">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-stone-200 bg-white transition-transform duration-300 lg:static lg:flex lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'
          } shadow-sm h-full`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          {/* Logo & Menu */}
          <div className="flex flex-col gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ef9d2a] text-white">
                <ChefHat className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight text-[#1b160d]">Book Bawarchi</h1>
                <p className="text-xs font-medium text-[#9a794c]">User Portal</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/dashboard'} // Active styling strictly for /dashboard
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    group flex items-center gap-3 rounded-full px-4 py-3 transition-colors
                    ${isActive
                      ? 'bg-[#ef9d2a]/10 text-[#ef9d2a] hover:bg-[#ef9d2a]/20'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-[#1b160d]'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-semibold">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#ef9d2a] text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-stone-100 pt-6">
            <button className="flex w-full items-center gap-3 rounded-full px-4 py-3 text-stone-600 transition-colors hover:bg-red-50 hover:text-red-600">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#f8f7f6]">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md lg:px-10 lg:py-6 border-b border-stone-100 lg:border-none lg:bg-transparent">
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-[#1b160d]">Book Bawarchi</span>
          </div>

          {/* Desktop Breadcrumbs */}
          <div className="hidden items-center gap-2 text-sm font-medium text-stone-500 lg:flex">
            <a href="/" className="hover:text-[#ef9d2a] transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1b160d]">Dashboard</span>
          </div>

          {/* Right Actions (Notifications & Profile) */}
          <div className="flex items-center gap-4">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-600 shadow-sm transition hover:text-[#ef9d2a] hover:shadow-md">
              <Bell className="w-5 h-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            <div
              onClick={() => navigate('/dashboard/profile')}
              className="flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="h-9 w-9 overflow-hidden rounded-full bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-[#1b160d] hidden sm:block">Rahul M.</span>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </div>
          </div>
        </header>

        {/* Page Content (Dashboard, Profile, etc.) */}
        <div className="flex flex-1 flex-col p-6 lg:p-10   mx-auto w-full pb-12">
          {children || <Outlet />}

          {/* Footer */}
          <footer className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <p>© 2024 Book Bawarchi Inc.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#ef9d2a] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[#ef9d2a] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[#ef9d2a] transition-colors">
                Help
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
