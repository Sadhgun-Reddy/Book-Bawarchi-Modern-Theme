import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Menu, X, User as UserIcon } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

const Navbar: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Caterers', path: '/caterers' },
        { name: 'Recipes', path: '/recipes' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'Donate Food', path: '/donate-food' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-sm py-3'
                : 'bg-white border-b border-transparent py-5'
                }`}
        >
            <div className="mx-auto flex   items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <Link className="flex items-center gap-2 text-neutral-800 transition hover:opacity-80" to="/">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ef9d2a] text-white shadow-lg shadow-orange-500/20">
                        <UtensilsCrossed size={20} strokeWidth={2.5} />
                    </div>
                    <span className="font-black text-xl tracking-tight text-slate-900">Book Bawarchi</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-bold transition-colors ${isActive(link.path)
                                ? 'text-[#ef9d2a]'
                                : 'text-stone-500 hover:text-stone-900'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    {isAuthenticated ? (
                        <Link
                            to={user?.role === 'caterer' || user?.role === 'admin' ? '/caterer' : '/dashboard'}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors shadow-md transform active:scale-95"
                        >
                            <UserIcon size={16} />
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors shadow-md transform active:scale-95"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-lg font-bold transition-colors ${isActive(link.path)
                                ? 'text-[#ef9d2a]'
                                : 'text-stone-500'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-4 border-t border-stone-50">
                        {isAuthenticated ? (
                            <Link
                                to={user?.role === 'caterer' || user?.role === 'admin' ? '/caterer' : '/dashboard'}
                                className="w-full py-4 flex items-center justify-center gap-2 font-bold text-white bg-stone-900 rounded-2xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <UserIcon size={18} />
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="w-full py-4 text-center font-bold text-stone-600 border border-stone-200 rounded-2xl"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="w-full py-4 text-center font-bold text-white bg-stone-900 rounded-2xl"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
