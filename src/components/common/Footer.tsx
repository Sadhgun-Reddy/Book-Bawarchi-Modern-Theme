import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Globe, Camera, AtSign, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-neutral-100 bg-white py-16">
            <div className="mx-auto   px-6 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link className="mb-6 flex items-center gap-2 text-neutral-800" to="/">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ef9d2a]/10 text-[#ef9d2a]">
                                <UtensilsCrossed size={16} strokeWidth={3} />
                            </div>
                            <span className="font-black text-lg tracking-tight">Book Bawarchi</span>
                        </Link>
                        <p className="mb-6 text-sm font-medium text-neutral-500 leading-relaxed">
                            Connecting hungry neighbors with talented local chefs since 2023. Building a stronger community through food recovery and home-cooked expertise.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-neutral-400 hover:text-[#ef9d2a] hover:bg-orange-50 transition-all" href="#">
                                <Globe size={18} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-neutral-400 hover:text-[#ef9d2a] hover:bg-orange-50 transition-all" href="#">
                                <Camera size={18} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-neutral-400 hover:text-[#ef9d2a] hover:bg-orange-50 transition-all" href="#">
                                <AtSign size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links: Explore */}
                    <div>
                        <h4 className="mb-6 font-black text-neutral-900 uppercase tracking-widest text-[11px]">
                            Explore
                        </h4>
                        <ul className="space-y-4 text-sm font-bold text-neutral-500">
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/caterers">
                                    Search Caterers
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/recipes">
                                    Browse Recipes
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/request-food">
                                    Request Assistance
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/donate-food">
                                    Donate Surplus
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links: Company */}
                    <div>
                        <h4 className="mb-6 font-black text-neutral-900 uppercase tracking-widest text-[11px]">
                            Company
                        </h4>
                        <ul className="space-y-4 text-sm font-bold text-neutral-500">
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/how-it-works">
                                    About Our Mission
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/">
                                    Become a Partner
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/">
                                    Blog & Stories
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-[#ef9d2a] transition-colors" to="/">
                                    Trust & Safety
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-6 font-black text-neutral-900 uppercase tracking-widest text-[11px]">
                            Stay Fed
                        </h4>
                        <p className="mb-6 text-sm font-medium text-neutral-500">
                            Get the latest local food news and community event updates.
                        </p>
                        <form className="flex gap-2">
                            <input
                                className="w-full rounded-full border border-neutral-100 bg-stone-50 px-5 py-3 text-sm font-bold focus:border-[#ef9d2a] focus:outline-none focus:ring-1 focus:ring-[#ef9d2a] placeholder-stone-400 transition-all"
                                placeholder="Email address"
                                type="email"
                            />
                            <button
                                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-stone-900 text-white hover:bg-[#ef9d2a] transition-all shadow-md active:scale-95"
                                type="button"
                            >
                                <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 border-t border-neutral-100 pt-8 text-center text-xs font-bold text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span>© {new Date().getFullYear()} Book Bawarchi. Empowering communities through food.</span>
                    <div className="flex gap-6 uppercase tracking-widest text-[10px]">
                        <a href="#" className="hover:text-stone-900 cursor-pointer transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-stone-900 cursor-pointer transition-colors">
                            Terms
                        </a>
                        <a href="#" className="hover:text-stone-900 cursor-pointer transition-colors">
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
