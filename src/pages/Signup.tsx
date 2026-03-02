import React, { useState, useEffect, useRef, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  ChefHat,
  Menu,
  User,
  Mail,
  PhoneCall,
  Lock,
  Eye,
  EyeOff,
  MailCheck,
  ArrowLeft,
} from 'lucide-react';

// Lightweight Navbar just for the Auth screen

// Google Icon SVG
const GoogleIcon = () => (
  <svg
    className="w-5 h-5 group-hover:scale-110 transition-transform"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const SignUpPage = () => {
  const navigate = useNavigate();

  // View State: 1 = Sign Up Form, 2 = OTP Verification
  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  // OTP State (kept for future but unused right now)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer logic for OTP Resend
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error('Please accept the Terms & Conditions to proceed.');
      return;
    }

    try {
      if (error) dispatch(clearError());

      const resultAction = await dispatch(
        registerUser({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      ).unwrap();

      toast.success('Account created successfully!');
      navigate('/dashboard');

    } catch (err) {
      console.error('Registration failed:', err);
      toast.error(err as string || 'Registration failed');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow pasting
    if (value.length > 1) {
      const pastedData = value.slice(0, 6).split('');
      for (let i = 0; i < pastedData.length; i++) {
        if (index + i < 6) newOtp[index + i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus last filled input or next available
      const focusIndex = Math.min(index + pastedData.length, 5);
      otpInputs.current[focusIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace auto-focus
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    // Simulate verification API call
    setTimeout(() => {
      setIsLoading(false);
      // Success! Route to user dashboard
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col text-stone-900 selection:bg-[#ef9d2a]/30">

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Abstract Background Shapes (Blurred Circles) */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#ef9d2a]/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ef9d2a]/20 blur-[120px] pointer-events-none"></div>

        {/* Dynamic Constraint Container */}
        <div className="w-full max-w-md mx-auto relative z-10">
          {/* STEP 1: SIGN UP FORM */}
          {step === 1 && (
            <div className="bg-white rounded-[2rem] shadow-xl border border-stone-100 p-8 sm:p-10 animate-fade-in flex flex-col min-h-[600px]">
              <div className="mb-8 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-[#ef9d2a]/10 text-[#ef9d2a] text-xs font-bold uppercase tracking-wider mb-3">
                  Step 1 of 2
                </span>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1b160d] mb-2 tracking-tight">
                  Create Account
                </h1>
                <p className="text-stone-500 font-medium">Join us to find the best local chefs.</p>
              </div>

              {/* Google Social Auth */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 text-stone-700 font-bold py-3 px-6 rounded-full transition-all duration-200 mb-6 group"
              >
                <GoogleIcon />
                <span>Sign up with Google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <hr className="w-full border-stone-200" />
                <span className="absolute bg-white px-3 text-sm text-stone-400 font-medium">
                  or sign up with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4 flex-1">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1 pl-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 pl-11 pr-5 rounded-full border border-stone-200 bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1 pl-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 pl-11 pr-5 rounded-full border border-stone-200 bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all font-medium"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1 pl-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 pl-11 pr-5 rounded-full border border-stone-200 bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all font-medium"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1 pl-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 pl-11 pr-12 rounded-full border border-stone-200 bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#ef9d2a] transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start pl-1 mt-2 mb-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="termsAccepted"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-stone-300 text-[#ef9d2a] focus:ring-[#ef9d2a] transition-colors cursor-pointer accent-[#ef9d2a]"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="text-stone-600 font-medium cursor-pointer select-none"
                    >
                      I agree to the{' '}
                      <a
                        href="#"
                        className="font-bold text-[#ef9d2a] hover:underline decoration-2 underline-offset-2"
                      >
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                </div>

                {/* Primary Action */}
                <div className="mt-auto pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold text-base rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  <p className="mt-6 text-center text-sm font-medium text-stone-600">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-bold text-[#1b160d] hover:text-[#ef9d2a] transition-colors"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 2 && (
            <div className="bg-white rounded-[2rem] shadow-xl border border-stone-100 p-8 sm:p-10 animate-fade-in flex flex-col min-h-[500px] justify-between">
              <div>
                <div className="mb-8 text-center">
                  <span className="inline-block py-1 px-3 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider mb-4">
                    Step 2 of 2
                  </span>

                  <div className="mx-auto w-16 h-16 bg-[#ef9d2a]/10 rounded-full flex items-center justify-center mb-4 text-[#ef9d2a]">
                    <MailCheck className="w-8 h-8" />
                  </div>

                  <h1 className="text-3xl font-extrabold text-[#1b160d] mb-2 tracking-tight">
                    Verify your email
                  </h1>
                  <p className="text-stone-500 font-medium">
                    We've sent a 6-digit verification code to <br />
                    <span className="font-bold text-stone-800">
                      {formData.email || 'your email'}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-8">
                  {/* OTP Inputs (6 Boxes) */}
                  <div className="flex justify-between gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={6} // To allow pasting full string on one input
                        value={digit}
                        ref={(el) => {
                          otpInputs.current[index] = el;
                        }}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-full aspect-square text-center text-2xl font-bold bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] text-[#1b160d] transition-all caret-[#ef9d2a]"
                      />
                    ))}
                  </div>

                  {/* Verify Action */}
                  <button
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full h-12 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold text-base rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Verify Email'
                    )}
                  </button>
                </form>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-stone-500 text-sm font-medium">
                  Didn't receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="font-bold text-stone-400 cursor-not-allowed">
                      Resend in 00:{timeLeft.toString().padStart(2, '0')}
                    </span>
                  ) : (
                    <button
                      onClick={() => setTimeLeft(30)}
                      className="font-bold text-[#ef9d2a] hover:underline"
                    >
                      Resend Now
                    </button>
                  )}
                </p>

                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center text-sm font-bold text-stone-600 hover:text-[#ef9d2a] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to sign up
                </button>
              </div>
            </div>
          )}

          {/* Decorative Info Card (Underneath logic container) */}
          <div className="mt-8 text-center max-w-2xl px-6 animate-fade-in mx-auto">
            <h3 className="text-xl font-bold text-[#1b160d] mb-3 tracking-tight">
              Why join Book Bawarchi?
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-stone-600 font-bold">
              <span className="px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ef9d2a]"></span> Access 500+ Local Chefs
              </span>
              <span className="px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ef9d2a]"></span> Verified Reviews
              </span>
              <span className="px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ef9d2a]"></span> Secure Booking
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
