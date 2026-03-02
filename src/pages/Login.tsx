import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  ChefHat,
  Menu,
  ClipboardList,
  Heart,
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
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

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    if (error) dispatch(clearError());

    try {
      const resultAction = await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();

      toast.success('Welcome back!');
      const role = resultAction.user?.role;
      if (role === 'admin' || role === 'caterer') {
        navigate('/caterer');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login action failed:', err);
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f6] font-['Inter',sans-serif] flex flex-col transition-colors duration-200 selection:bg-[#ef9d2a]/30">

      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract Background Shapes (Blurred Circles) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ef9d2a]/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ef9d2a]/20 blur-[120px] pointer-events-none"></div>

        {/* Centered Floating Auth Card */}
        <div className="w-full max-w-[960px] rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] z-10 bg-white animate-fade-in">
          {/* Left Side: Information/Benefits (Tinted Area) */}
          <div className="md:w-5/12 bg-[#ef9d2a]/10 p-10 flex flex-col justify-center relative">
            {/* Dotted Background Pattern Suggestion */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef9d2a_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1b160d] mb-2 leading-tight">
                  Welcome back!
                </h2>
                <p className="text-stone-600 text-base mb-10 font-medium">
                  Log in to manage your catering needs.
                </p>

                <div className="space-y-8">
                  {/* Benefit 1 */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white rounded-full shadow-sm text-[#ef9d2a] group-hover:scale-110 group-hover:shadow-md transition-all">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[#1b160d] font-bold text-lg">Track enquiries</h3>
                      <p className="text-stone-500 text-sm font-medium">
                        Keep all your booking requests in one secure place.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white rounded-full shadow-sm text-[#ef9d2a] group-hover:scale-110 group-hover:shadow-md transition-all">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[#1b160d] font-bold text-lg">Save caterers</h3>
                      <p className="text-stone-500 text-sm font-medium">
                        Create a shortlist of your favorite vendors for future events.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white rounded-full shadow-sm text-[#ef9d2a] group-hover:scale-110 group-hover:shadow-md transition-all">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[#1b160d] font-bold text-lg">Exclusive recipes</h3>
                      <p className="text-stone-500 text-sm font-medium">
                        Unlock special recipes curated by top local chefs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full backdrop-blur-sm border border-white/40 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#ef9d2a]" />
                  <span className="text-xs font-bold text-stone-700">Trusted by 10,000+ users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative z-10">
            <div className="max-w-sm mx-auto w-full">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1b160d] mb-8 text-center md:text-left">
                Login to your account
              </h1>

              {/* Google Social Auth */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 text-stone-700 font-bold py-3.5 px-6 rounded-full transition-all duration-200 shadow-sm hover:shadow mb-6 group"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <hr className="w-full border-stone-200" />
                <span className="absolute bg-white px-3 text-sm text-stone-400 font-medium">
                  or login with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Email Field */}
                <label className="block relative">
                  <span className="block text-sm font-bold text-stone-700 mb-2 pl-1">
                    Email Address
                  </span>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full h-12 px-5 rounded-full border bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 transition-all font-medium ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-stone-200 focus:border-[#ef9d2a]'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs font-bold mt-1 pl-2 block">
                      {errors.email.message as string}
                    </span>
                  )}
                </label>

                {/* Password Field */}
                <label className="block relative">
                  <span className="block text-sm font-bold text-stone-700 mb-2 pl-1">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                      })}
                      className={`w-full h-12 px-5 pr-12 rounded-full border bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 transition-all font-medium ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-stone-200 focus:border-[#ef9d2a]'}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#ef9d2a] transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-xs font-bold mt-1 pl-2 block">
                      {errors.password.message as string}
                    </span>
                  )}
                </label>

                {/* Forgot Password (Above Login Button) */}
                <div className="flex justify-end mt-1">
                  <Link
                    to="/reset-password"
                    className="text-sm font-bold text-stone-500 hover:text-[#ef9d2a] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Primary Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full h-12 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold text-base rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-sm font-medium text-stone-600">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-bold text-[#ef9d2a] hover:underline decoration-2 underline-offset-2"
                  >
                    Sign up
                  </Link>
                </p>
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-sm font-medium text-stone-600">
                    Are you a business?{' '}
                    <Link
                      to="/caterer-register"
                      className="font-bold text-[#1b160d] hover:text-[#ef9d2a] transition-colors inline-flex items-center gap-1"
                    >
                      Register as a caterer
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
