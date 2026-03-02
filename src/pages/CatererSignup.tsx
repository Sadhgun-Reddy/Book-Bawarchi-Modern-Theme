import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Building2,
    ChefHat,
    MapPin,
    User,
    Mail,
    Phone,
    Lock,
    CheckCircle,
    ShieldCheck,
    FileBadge2,
    Receipt,
    Utensils,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { catererRegister } from '../store/slices/authSlice';
import api from '../services/api';
import { Urls } from '../Urls';
import toast from 'react-hot-toast';

// Reusing style constants for consistency
const inputClasses = "w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-5 py-4 font-bold text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] focus:bg-white outline-none transition-all";

export default function CatererSignupPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        // Step 1: Personal
        ownerName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '',
        // Step 2: Business
        businessName: '',
        description: '',
        yearsExperience: '',
        specialties: '',
        kitchenAddress: '',
        serviceAreas: '',
        capacity: '10-50 guests',
        // Step 3: Compliance
        fssaiNumber: '',
        gstin: '',
        termsAccepted: false,
    });

    // Auto-skip step 1 for already authenticated caterers who need business setup
    useEffect(() => {
        if (isAuthenticated && user?.role === 'caterer') {
            const checkExistingProfile = async () => {
                try {
                    const res = await api.get(Urls.CatererGetProfile);
                    if (res.data.success) {
                        // If they ALREADY have a profile, send them to dashboard
                        navigate('/caterer', { replace: true });
                    }
                } catch (err: any) {
                    // If 404/not found, they are in the right place but need to start at Step 2
                    if (err.response?.status === 404 || err.response?.data?.error?.includes('not found')) {
                        setStep(2);
                        // Pre-fill Step 1 info just in case they go back
                        setFormData(prev => ({
                            ...prev,
                            ownerName: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || ''
                        }));
                    }
                }
            };
            checkExistingProfile();
        }
    }, [isAuthenticated, user, navigate]);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBack = () => setStep(prev => prev - 1);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            setIsLoading(true);
            try {
                const userData = {
                    name: formData.ownerName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                };
                const resultAction = await dispatch(catererRegister(userData));
                if (catererRegister.fulfilled.match(resultAction)) {
                    setStep(2);
                } else {
                    toast.error(resultAction.payload as string || 'Registration failed');
                }
            } catch (error) {
                toast.error('An error occurred');
            } finally {
                setIsLoading(false);
            }
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setIsLoading(true);
            try {
                const businessData = {
                    businessName: formData.businessName,
                    description: formData.description,
                    yearsExperience: Number(formData.yearsExperience) || 0,
                    specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
                    certifications: [
                        `FSSAI: ${formData.fssaiNumber}`,
                        formData.gstin ? `GSTIN: ${formData.gstin}` : null
                    ].filter(Boolean),
                    kitchenAddress: formData.kitchenAddress,
                    serviceAreas: formData.serviceAreas.split(',').map(s => s.trim()).filter(Boolean),
                    capacity: formData.capacity,
                };

                const res = await api.post(Urls.CatererBusinessApi, businessData);
                if (res.data.success) {
                    toast.success('Business profile created successfully! Welcome to Book Bawarchi.');
                    navigate('/caterer');
                } else {
                    toast.error('Failed to create business profile');
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Business profile creation failed');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 flex flex-col pt-20">

            <main className="flex-1 flex items-center justify-center p-4 py-12 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ef9d2a]/10 blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100 p-8 sm:p-12 relative z-10">

                    {/* Header & Progress Indicator */}
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#ef9d2a] text-xs font-bold uppercase tracking-widest mb-6">
                            <ChefHat className="w-4 h-4" />
                            Partner Registration
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-2">
                            Join Book Bawarchi
                        </h1>
                        <p className="text-stone-500 font-medium pb-6">
                            Step {step} of 3: {
                                step === 1 ? 'Personal Details' :
                                    step === 2 ? 'Business Profile' :
                                        'Trust & Compliance'
                            }
                        </p>

                        {/* Progress Bar Container */}
                        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex-1 h-2 rounded-full overflow-hidden bg-stone-100 relative">
                                    <div
                                        className={`absolute top-0 left-0 h-full bg-[#ef9d2a] transition-all duration-500 ease-out ${step >= s ? 'w-full' : 'w-0'
                                            }`}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">

                        {/* --- STEP 1: PERSONAL --- */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Account Owner Name</label>
                                    <div className="relative">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="text" name="ownerName" required
                                            value={formData.ownerName} onChange={handleInputChange}
                                            placeholder="e.g. Rahul Sharma"
                                            className={`${inputClasses} pl-14`}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                            <input
                                                type="email" name="email" required
                                                value={formData.email} onChange={handleInputChange}
                                                placeholder="you@example.com"
                                                className={`${inputClasses} pl-14`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                            <input
                                                type="tel" name="phone" required
                                                value={formData.phone} onChange={handleInputChange}
                                                placeholder="+91 90000 00000"
                                                className={`${inputClasses} pl-14`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Create Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="password" name="password" required
                                            value={formData.password} onChange={handleInputChange}
                                            placeholder="Min. 8 characters"
                                            className={`${inputClasses} pl-14`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- STEP 2: BUSINESS --- */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Caterer / Business Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="text" name="businessName" required
                                            value={formData.businessName} onChange={handleInputChange}
                                            placeholder="e.g. Royal Feast Banquets"
                                            className={`${inputClasses} pl-14`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Kitchen Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                            <input
                                                type="text" name="kitchenAddress" required
                                                value={formData.kitchenAddress} onChange={handleInputChange}
                                                placeholder="e.g. 123 Main St, Mumbai"
                                                className={`${inputClasses} pl-14`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Service Areas (comma-separated)</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                            <input
                                                type="text" name="serviceAreas" required
                                                value={formData.serviceAreas} onChange={handleInputChange}
                                                placeholder="e.g. Andheri, Bandra, Juhu"
                                                className={`${inputClasses} pl-14`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Business Description</label>
                                    <div className="relative">
                                        <Utensils className="absolute left-5 top-4 w-5 h-5 text-stone-400" />
                                        <textarea
                                            name="description" required rows={2}
                                            value={formData.description} onChange={handleInputChange}
                                            placeholder="Premium catering for weddings and corporate events..."
                                            className={`${inputClasses} pl-14 resize-none`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Specialties (comma-separated)</label>
                                    <div className="relative">
                                        <Utensils className="absolute left-5 top-4 w-5 h-5 text-stone-400" />
                                        <textarea
                                            name="specialties" required rows={2}
                                            value={formData.specialties} onChange={handleInputChange}
                                            placeholder="e.g. Authentic North Indian, Continental, Vegan..."
                                            className={`${inputClasses} pl-14 resize-none`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Years of Experience</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                            <input
                                                type="number" name="yearsExperience" required min="0"
                                                value={formData.yearsExperience} onChange={handleInputChange}
                                                placeholder="e.g. 5"
                                                className={`${inputClasses} pl-14`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">Capacity</label>
                                        <select
                                            name="capacity"
                                            value={formData.capacity} onChange={handleInputChange}
                                            className={`${inputClasses} cursor-pointer appearance-none`}
                                        >
                                            <option value="10-50 guests">10-50 guests</option>
                                            <option value="50-300 guests">50-300 guests</option>
                                            <option value="300-1000 guests">300-1000 guests</option>
                                            <option value="1000+ guests">1000+ guests</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- STEP 3: COMPLIANCE --- */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 text-blue-800">
                                    <ShieldCheck className="w-5 h-5 shrink-0" />
                                    <p className="text-sm font-medium">To maintain the highest trust standards on Book Bawarchi, verified licensing is required.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">FSSAI License Number <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <FileBadge2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="text" name="fssaiNumber" required minLength={14} maxLength={14}
                                            value={formData.fssaiNumber} onChange={handleInputChange}
                                            placeholder="14-digit registration number"
                                            className={`${inputClasses} pl-14 font-mono`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2 pl-2">GSTIN (Optional)</label>
                                    <div className="relative">
                                        <Receipt className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="text" name="gstin" maxLength={15}
                                            value={formData.gstin} onChange={handleInputChange}
                                            placeholder="15-character GST identification"
                                            className={`${inputClasses} pl-14 font-mono uppercase`}
                                        />
                                    </div>
                                </div>

                                <label className="flex items-start gap-4 p-4 mt-4 bg-stone-50 rounded-2xl cursor-pointer hover:bg-stone-100 transition-colors border border-stone-200">
                                    <input
                                        type="checkbox" name="termsAccepted" required
                                        checked={formData.termsAccepted} onChange={handleInputChange}
                                        className="w-5 h-5 mt-0.5 rounded text-[#ef9d2a] focus:ring-[#ef9d2a] border-stone-300"
                                    />
                                    <span className="text-sm text-stone-600 font-medium leading-normal">
                                        I confirm that the provided information is accurate and I agree to the <a href="#" className="text-[#ef9d2a] hover:underline font-bold">Terms of Service</a> and <a href="#" className="text-[#ef9d2a] hover:underline font-bold">Partner Agreement</a>.
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 pt-6 mt-4 border-t border-stone-100">
                            {step > 1 && (!isAuthenticated || step > 2) && (
                                <button
                                    type="button" onClick={handleBack}
                                    className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 h-14 bg-[#1b160d] hover:bg-stone-800 text-white rounded-full font-black text-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : step < 3 ? (
                                    <>Continue <ArrowRight className="w-5 h-5" strokeWidth={2.5} /></>
                                ) : (
                                    <>Submit Registration <CheckCircle className="w-5 h-5" strokeWidth={2.5} /></>
                                )}
                            </button>
                        </div>

                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-stone-500 font-medium">
                            Already a partner? <Link to="/login" className="text-[#ef9d2a] font-bold hover:underline">Log in here</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
