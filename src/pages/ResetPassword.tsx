import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Menu, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { getPasswordStrength } from '../utils/security';


const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (strength.score < 3) {
      alert('Please provide a stronger password (min 8 chars, 1 number).');
      return;
    }

    setIsLoading(true);
    // Simulate API logic
    setTimeout(() => {
      setIsLoading(false);
      // Success, route to login
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col text-stone-900 selection:bg-[#ef9d2a]/30">

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Abstract Background Shapes (Blurred Circles) */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#ef9d2a]/10 blur-[100px] pointer-events-none w-max-[500px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ef9d2a]/20 blur-[120px] pointer-events-none"></div>

        {/* Auth Card */}
        <div className="w-full max-w-md bg-white rounded-[2rem] sm:rounded-3xl shadow-2xl shadow-stone-200/50 border border-stone-100 p-8 sm:p-10 relative z-10 animate-fade-in-up">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#ef9d2a]/10 text-[#ef9d2a] mb-6 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b160d] mb-3 tracking-tight">
              Set New Password
            </h1>
            <p className="text-stone-500 font-medium text-sm leading-relaxed max-w-[280px] mx-auto">
              Your new password must be different from previously used passwords.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* New Password Field */}
            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-bold uppercase tracking-wider text-stone-500">
                New Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-6 pr-12 bg-stone-50 border border-stone-200 rounded-full text-[#1b160d] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#ef9d2a] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="flex items-center gap-3 mt-3 px-2">
                <div className="flex-1 h-[6px] bg-stone-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-300 w-1/3 border-r border-white/50 ${strength.score >= 1 ? strength.color : 'bg-transparent'}`}
                  ></div>
                  <div
                    className={`h-full transition-all duration-300 w-1/3 border-r border-white/50 ${strength.score >= 2 ? strength.color : 'bg-transparent'}`}
                  ></div>
                  <div
                    className={`h-full transition-all duration-300 w-1/3 ${strength.score >= 3 ? strength.color : 'bg-transparent'}`}
                  ></div>
                </div>
                <span className={`text-xs font-bold w-12 text-right ${strength.textClass}`}>
                  {strength.label}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium px-2 pt-1">
                Must be at least 8 characters.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5 mt-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-wider text-stone-500">
                Confirm Password
              </label>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full h-12 px-6 pr-12 bg-stone-50 border rounded-full text-[#1b160d] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all font-medium ${confirmPassword.length > 0 && password !== confirmPassword
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-500/50'
                    : 'border-stone-200'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#ef9d2a] transition-colors p-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || password !== confirmPassword || password.length === 0}
              className="mt-6 w-full h-12 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-bold text-base rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Update Password</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Back Link */}
            <div className="text-center mt-2 pt-2">
              <button
                onClick={() => navigate('/login')}
                type="button"
                className="inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-[#ef9d2a] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-in z-10">
          <p className="text-sm text-stone-500 font-medium">Secure via BookBawarchi Auth</p>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
