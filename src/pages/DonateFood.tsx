import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Truck,
  CloudUpload,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Utensils,
  Package,
  Wheat,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { createDonation } from '../store/slices/donationSlice';

const DonationLifecycle = () => {
  const steps = [
    {
      id: 1,
      title: 'Share Details',
      icon: <HeartHandshake className="w-6 h-6 text-[#ef9d2a]" />,
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      id: 2,
      title: 'We Verify',
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      id: 3,
      title: 'We Collect',
      icon: <Truck className="w-6 h-6 text-slate-700" />,
      bg: 'bg-slate-100',
      border: 'border-slate-200',
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 relative w-full px-4">
      {/* Desktop Connecting Line */}
      <div className="hidden sm:block absolute top-[1.25rem] left-[20%] right-[20%] h-0.5 bg-stone-100 -z-10"></div>

      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center gap-3 relative bg-white sm:px-4">
          <div
            className={`w-12 h-12 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center shadow-sm`}
          >
            {step.icon}
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest text-center whitespace-nowrap">
            <span className="text-slate-400 mr-1">{step.id}.</span> {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

const PhotoUploadWidget = ({ file, onDrop, onRemove }: any) => {
  return (
    <div className="relative group">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onDrop(e.target.files[0]);
          }
        }}
      />

      <div
        className={`w-full border-2 ${file ? 'border-[#ef9d2a]' : 'border-dashed border-slate-300 group-hover:border-[#ef9d2a]/50'} bg-slate-50 rounded-2xl p-8 transition-colors flex flex-col items-center justify-center text-center gap-4`}
      >
        {!file ? (
          <>
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#ef9d2a] transition-colors">
              <CloudUpload className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">
                <span className="text-[#ef9d2a]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs font-medium text-slate-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-[#ef9d2a] shrink-0">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
              <p className="text-xs font-medium text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemove();
              }}
              className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-full hover:bg-red-50 relative z-20"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, icon: Icon, type = 'text', placeholder, options, ...props }: any) => {
  const inputClasses =
    'w-full bg-slate-50 border-transparent focus:border-[#ef9d2a]/30 focus:bg-white focus:ring-4 focus:ring-[#ef9d2a]/10 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all shadow-sm outline-none';

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[13px] font-bold text-slate-700 ml-2">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
        )}

        {type === 'select' ? (
          <select className={`${inputClasses} appearance-none ${Icon ? 'pl-12' : ''}`} {...props}>
            <option value="" disabled className="text-slate-400">
              {placeholder}
            </option>
            {options?.map((opt: any) => (
              <option key={opt.value} value={opt.value} className="text-slate-900 py-2">
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            className={`${inputClasses} min-h-[120px] resize-y ${Icon ? 'pl-12' : ''}`}
            placeholder={placeholder}
            {...props}
          />
        ) : (
          <input
            type={type}
            className={`${inputClasses} ${Icon ? 'pl-12' : ''}`}
            placeholder={placeholder}
            {...props}
          />
        )}

        {/* Custom Chevron for Selects */}
        {type === 'select' && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default function DonateFoodPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    category: '',
    quantity: '',
    description: '',
    date: '',
    time: '',
    address: '',
  });

  const categories = [
    { value: 'cooked', label: 'Cooked Meals (Prepared Food)' },
    { value: 'raw', label: 'Raw Ingredients / Produce' },
    { value: 'packaged', label: 'Packaged / Canned Goods' },
  ];

  const timeWindows = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
    { value: 'evening', label: 'Evening (4 PM - 8 PM)' },
  ];

  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
         foodType: formData.category,
         quantity: formData.quantity,
         pickupLocation: formData.address,
         // Creating valid datetimes from string for backend
         availabilityFrom: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
         availabilityTo: formData.date ? new Date(new Date(formData.date).getTime() + 86400000).toISOString() : new Date(new Date().getTime() + 86400000).toISOString(),
         specialInstructions: formData.description
      };
      
      await dispatch(createDonation(payload)).unwrap();
      alert('Donation Submitted Successfully! A representative will contact you shortly.');
      navigate('/food-requests'); // Redirect to food listings
    } catch (err: any) {
      alert(err.message || 'Error submitting donation');
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl shadow-stone-200/50 outline outline-1 outline-stone-100 overflow-hidden">
        {/* Form Header */}
        <div className="px-8 sm:px-16 pt-16 pb-8 text-center bg-gradient-to-b from-orange-50/50 to-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ef9d2a]/20 text-[#ef9d2a] text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ef9d2a] animate-pulse"></span>
            Community Initiative
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Donate Food
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
            List your surplus food. We'll verify it and match it with local community centers or
            those in urgent need.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="px-5 sm:px-12 lg:px-20 pb-16">
          <DonationLifecycle />

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 mt-8">
            {/* SECTION 1 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-black text-[#ef9d2a] flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ef9d2a] text-white text-sm">
                  1
                </span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                  value={formData.fullName}
                  onChange={(e: any) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* SECTION 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-black text-[#ef9d2a] flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ef9d2a] text-white text-sm">
                  2
                </span>
                Donation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Food Category"
                  type="select"
                  icon={Utensils}
                  options={categories}
                  placeholder="Select a category"
                  value={formData.category}
                  onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                />
                <InputField
                  label="Quantity (Servings / Kg)"
                  placeholder="e.g. 50 servings"
                  value={formData.quantity}
                  onChange={(e: any) => setFormData({ ...formData, quantity: e.target.value })}
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Description"
                    type="textarea"
                    placeholder="Briefly describe the food (e.g. Rice and Chicken Curry prepared today. Contains dairy.)"
                    value={formData.description}
                    onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              {/* Upload Area */}
              <div className="mt-2 text-left">
                <label className="text-[13px] font-bold text-slate-700 ml-2 mb-2 block">
                  Proof of Donation / Image
                </label>
                <PhotoUploadWidget file={file} onDrop={setFile} onRemove={() => setFile(null)} />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* SECTION 3 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-black text-[#ef9d2a] flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ef9d2a] text-white text-sm">
                  3
                </span>
                Pickup Logistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Preferred Pickup Date"
                  type="date"
                  icon={Calendar}
                  value={formData.date}
                  onChange={(e: any) => setFormData({ ...formData, date: e.target.value })}
                />
                <InputField
                  label="Preferred Time Window"
                  type="select"
                  icon={Clock}
                  options={timeWindows}
                  placeholder="Select time"
                  value={formData.time}
                  onChange={(e: any) => setFormData({ ...formData, time: e.target.value })}
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Pickup Address"
                    icon={MapPin}
                    placeholder="Full building address and floor/suite number"
                    value={formData.address}
                    onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Footer & Submit */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-orange-50 border border-orange-100">
                <div className="bg-white rounded-full p-1 shadow-sm shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#ef9d2a]" />
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Your contact details are secure. We only share exact pickup locations with
                  verified collection partners once a match is confirmed.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#ef9d2a] hover:bg-[#d98a1e] disabled:bg-[#ef9d2a]/50 text-white font-black text-lg py-5 shadow-xl shadow-orange-500/20 active:translate-y-0.5 transition-all flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Donation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
