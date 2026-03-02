import React from 'react';
import {
  Play,
  Search,
  CalendarCheck,
  Utensils,
  PartyPopper,
  ShieldCheck,
  Truck,
  HeartHandshake,
  ChefHat,
  Star,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

// --- MOCK DATA ---

const CUSTOMER_STEPS = [
  {
    id: 'step-1',
    icon: Search,
    title: 'Discover',
    desc: 'Browse hundreds of verified local caterers based on your cuisine, budget, and event type.',
  },
  {
    id: 'step-2',
    icon: Utensils,
    title: 'Customize Menu',
    desc: 'Select dishes, build your perfect menu, and request custom modifications directly.',
  },
  {
    id: 'step-3',
    icon: CalendarCheck,
    title: 'Book & Pay securely',
    desc: 'Confirm your dates and lock in your caterer with our secure escort payment system.',
  },
  {
    id: 'step-4',
    icon: PartyPopper,
    title: 'Enjoy your Event',
    desc: 'Relax while top-rated chefs deliver and serve an unforgettable culinary experience.',
  },
];

const CATERER_BENEFITS = [
  {
    id: 'cat-1',
    title: 'Grow Your Business Locally',
    desc: 'Get discovered by thousands of event planners, corporate hosts, and families looking for authentic food in your exact delivery radius.',
    points: ['Zero upfront listing fees', 'Control your own delivery zones', 'Automated marketing'],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop',
    imageReverse: false,
  },
  {
    id: 'cat-2',
    title: 'Secure & Guaranteed Payouts',
    desc: 'Never chase an invoice again. Book Bawarchi holds customer deposits securely and releases funds to your account 48 hours before the event date.',
    points: [
      'Escrow protection on all orders',
      'Direct bank transfers',
      'Handling cancellation policies',
    ],
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=400&fit=crop',
    imageReverse: true,
  },
];

const SUPPORT_EVENTS = [
  {
    id: 'supp-1',
    title: 'Excess Food Donation System',
    desc: 'We have built a one-click system for hosts to request pickup of excess hygienic food post-event. Our NGO partners are notified instantly for distribution.',
    icon: HeartHandshake,
    side: 'left',
  },
  {
    id: 'supp-2',
    title: 'Verified NGO Network',
    desc: 'Only registered and highly vetted NGOs are part of our food recovery network, ensuring that the food reaches those who truly need it safely.',
    icon: ShieldCheck,
    side: 'right',
  },
  {
    id: 'supp-3',
    title: 'Zero-Waste Goal',
    desc: 'By tracking recovery metrics, we help caterers analyze consumption patterns to reduce source wastage for future events.',
    icon: Truck,
    side: 'left',
  },
];

const TRUST_FEATURES = [
  {
    id: 'trust-1',
    title: 'Verified Partners',
    desc: 'Every caterer must pass FSSAI license verification and background checks.',
    icon: ChefHat,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    id: 'trust-2',
    title: 'Escrow Payments',
    desc: 'Your money is held safely until the caterer fulfills their service obligations.',
    icon: ShieldCheck,
    color: 'bg-emerald-50 text-emerald-500',
  },
  {
    id: 'trust-3',
    title: 'Real Reviews',
    desc: 'Read authentic feedback from past customers before making your decision.',
    icon: Star,
    color: 'bg-purple-50 text-purple-500',
  },
];

// --- SUB-COMPONENTS ---

const VideoHero = () => (
  <div className="  mx-auto pt-20 pb-16 px-6 text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight max-w-4xl mx-auto">
      How Book Bawarchi is <span className="text-[#ef9d2a]">Simplified</span>
    </h1>
    <p className="mt-6 text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
      We are revolutionizing event catering by connecting you directly with the best local chefs,
      managing payments, and ensuring zero food waste.
    </p>

    {/* Video Placeholder Card */}
    <div className="mt-12 lg:mt-16 w-full max-w-5xl mx-auto aspect-video bg-slate-900 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-2xl">
      {/* Background Image (Darkened) */}
      <img
        src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&h=900&fit=crop"
        alt="Catering Event"
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
      />
      {/* Absolute Overlay Details */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#ef9d2a] transition-colors duration-300">
          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 md:ml-2" fill="currentColor" />
        </div>
        <h3 className="mt-8 text-2xl md:text-4xl font-black text-white tracking-wide shadow-black/50 drop-shadow-lg">
          Delivering memories, one plate at a time.
        </h3>
      </div>
    </div>
  </div>
);

const ProcessStepper = () => (
  <div className="  mx-auto py-24 px-6 relative w-full overflow-hidden">
    <div className="text-center mb-16">
      <span className="text-sm font-black text-[#ef9d2a] uppercase tracking-widest">
        For Customers
      </span>
      <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">The Booking Process</h2>
    </div>

    {/* Stepper Grid Container */}
    <div className="relative max-w-5xl mx-auto">
      {/* Connecting Dashed Line (Visible on Desktop) */}
      <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-orange-200 -z-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {CUSTOMER_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex flex-col items-center text-center relative">
              {/* Icon Bubble */}
              <div className="w-24 h-24 rounded-full bg-[#fcfaf8] flex items-center justify-center z-10 mb-6 relative">
                {/* Inner colored circle */}
                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-[#ef9d2a] shadow-sm transform transition-transform hover:scale-110">
                  <Icon className="w-8 h-8" />
                </div>
                {/* Step Number Badge */}
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#ef9d2a] flex items-center justify-center text-white font-black text-sm border-4 border-[#fcfaf8]">
                  {index + 1}
                </div>
              </div>

              {/* Text */}
              <h3 className="text-lg font-black text-stone-900 mb-3">{step.title}</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed px-2">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const ZigZagFeatures = () => (
  <div className="bg-white py-24 w-full">
    <div className="  mx-auto px-6 flex flex-col gap-24">
      <div className="text-center">
        <span className="text-sm font-black text-[#ef9d2a] uppercase tracking-widest">
          For Caterers
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">
          Elevate Your Business
        </h2>
      </div>

      <div className="flex flex-col gap-24 lg:gap-32 max-w-6xl mx-auto w-full">
        {CATERER_BENEFITS.map((benefit, index) => (
          <div
            key={benefit.id}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${benefit.imageReverse ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Text Block */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              <h3 className="text-3xl font-black text-stone-900 leading-tight">{benefit.title}</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>

              <ul className="flex flex-col gap-4 mt-2">
                {benefit.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-[#ef9d2a]" strokeWidth={3} />
                    </div>
                    <span className="text-stone-700 font-bold text-base">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register-caterer"
                className="mt-4 text-[#ef9d2a] font-bold flex items-center gap-2 hover:gap-3 transition-all w-fit"
              >
                Learn more about partnerships
                <ArrowRight className="w-4 h-4" strokeWidth={3} />
              </Link>
            </div>

            {/* Image Block (Polaroid Style) */}
            <div className="flex-1 w-full max-w-lg relative group">
              {/* Decorative Background Blob optional, sticking to strictly requested polaroid style */}
              <div
                className={`bg-white p-4 rounded-[2.5rem] shadow-2xl border flex-col border-slate-100 transform transition-transform duration-500 ${benefit.imageReverse ? '-rotate-2 group-hover:rotate-0' : 'rotate-2 group-hover:rotate-0'}`}
              >
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-auto aspect-[4/3] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VerticalTimeline = () => (
  <div className="bg-slate-900 py-24 w-full relative overflow-hidden">
    {/* Subtle Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#ef9d2a] rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-3xl"></div>
    </div>

    <div className="  mx-auto px-6 relative z-10 w-full">
      <div className="text-center mb-20">
        <span className="text-sm font-black text-[#ef9d2a] uppercase tracking-widest">
          Community
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-2">Food Support Initiative</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-medium">
          Our platform is designed to tackle hunger by ensuring excess event food finds its way to
          those in need, safely and efficiently.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-4xl mx-auto relative pl-4 md:pl-0">
        {/* Central Axis (Orange Line) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-orange-500/30 md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-12 md:gap-24 w-full">
          {SUPPORT_EVENTS.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full"
              >
                {/* Central Node (Dot/Icon) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-[18px] md:-translate-x-1/2 w-10 h-10 rounded-full bg-[#ef9d2a] border-4 border-slate-900 flex items-center justify-center text-white z-10 top-0 md:top-auto">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Side (Left or Right) */}
                {/* On mobile, always on the right (pl-20). On MD, alternates. */}
                <div
                  className={`w-full md:w-5/12 pl-20 pt-1 md:pt-0 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto md:text-left'}`}
                >
                  <h4 className="text-xl md:text-2xl font-black text-white mb-3">{event.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{event.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const TrustSafetyGrid = () => (
  <div className="w-full py-24 mb-10   mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-black text-stone-900">Trust & Safety First</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {TRUST_FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.id}
            className="bg-white rounded-[2rem] p-10 flex flex-col items-start gap-6 border border-orange-50/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${feature.color}`}
            >
              <Icon className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-stone-900">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const BottomCTABlock = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <div className="  mx-auto px-6 pb-24">
      {/* The Orange Ribbon */}
      <div className="w-full bg-[#ef9d2a] rounded-[3rem] p-12 md:p-16 text-center shadow-xl shadow-orange-500/20 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        {/* Background Decorations */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            {isAuthenticated ? 'Plan Your Next Success' : 'Ready to Plan Your Perfect Event?'}
          </h2>
          <p className="text-orange-50 text-lg md:text-xl font-medium mb-10 max-w-xl">
            {isAuthenticated
              ? 'Browse our top caterers or check your ongoing enquiries from the dashboard.'
              : 'Join thousands of happy hosts and verified caterers scaling their experiences with Book Bawarchi.'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            {isAuthenticated ? (
              <Link
                to={user?.role === 'caterer' || user?.role === 'admin' ? '/caterer' : '/dashboard'}
                className="w-full sm:w-auto px-10 py-4 bg-white text-[#ef9d2a] rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </Link>
            ) : (
              <Link
                to="/caterer-register"
                className="w-full sm:w-auto px-10 py-4 bg-white text-[#ef9d2a] rounded-full font-black text-lg flex items-center justify-center gap-2 hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </Link>
            )}
            <Link
              to="/contact"
              className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-orange-200 text-white rounded-full font-bold text-lg hover:bg-orange-400/30 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function HowItWorksPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 animate-in fade-in duration-500 overflow-x-hidden">
      {/* 
                Assumes a global fixed Navbar exists above this layout. 
                Using standard top padding to clear it visually via VideoHero pt-20. 
            */}

      <VideoHero />

      <ProcessStepper />

      <ZigZagFeatures />

      <VerticalTimeline />

      <TrustSafetyGrid />

      <BottomCTABlock />
    </div>
  );
}
