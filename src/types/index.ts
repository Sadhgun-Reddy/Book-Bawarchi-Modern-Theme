export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    role: 'admin' | 'caterer' | 'customer';
    profileImage?: string | null;
    createdAt?: string;
}

export interface MenuItem {
    _id?: string;
    id?: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    preparationTime?: string;
    serves?: number;
    dietaryTags?: string[];
}

export interface Menu {
    _id: string;
    id: string;
    caterer: string | Caterer;
    name: string;
    description?: string;
    cuisineType: string;
    dietaryOptions: string[];
    isActive: boolean;
    approvalStatus: 'pending' | 'approved' | 'rejected';
    items: MenuItem[];
    createdAt: string;
}

// Temporary Alias for components still using 'Dish'
export type Dish = Menu;

export interface FoodRequest {
    id: string;
    eventName: string;
    date: string;
    guestCount: number;
    location: string;
    urgency: 'Standard' | 'Urgent' | 'Critical';
    status: 'Open' | 'Pending' | 'Closed';
    dietaryNotes: string;
    [key: string]: any;
}

export interface AuthState {
    user: User | null;
    catererProfile: Caterer | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface MenuState {
    items: Menu[];
    isLoading: boolean;
    error: string | null;
}

export interface SupportTicket {
    id: string;
    subject: string;
    message: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    userId: string;
    category: string;
    createdAt: string;
}

export interface Caterer {
    _id: string;
    id: string;
    user: string | {
        _id: string;
        name: string;
        email: string;
        phone?: string;
    };
    businessName: string;
    description: string;
    yearsExperience: number;
    specialties: string[];
    certifications: string[];
    kitchenAddress: string;
    serviceAreas: string[];
    capacity: string;
    approvalStatus: 'pending' | 'approved' | 'rejected';
    profileViews: number;
    responseRate: number;
    profileImage?: string | null;
    createdAt: string;
    updatedAt: string;
    adminRemarks?: string;
}

export interface CatererState {
    caterers: Caterer[];
    isLoading: boolean;
    error: string | null;
    count: number;
}

export interface Enquiry {
    _id: string;
    id: string;
    user: string | User;
    caterer?: string | Caterer;
    eventType: string;
    eventDate: string;
    guestCount: number;
    budget?: number;
    specialRequirements?: string;
    status: 'sent' | 'viewed' | 'responded' | 'closed';
    respondedAt?: string;
    createdAt: string;
}

export interface EnquiryState {
  myEnquiries: Enquiry[];
  catererEnquiries: Enquiry[];
  currentEnquiry: Enquiry | null;
  isLoading: boolean;
  error: string | null;
}

export interface Recipe {
  _id: string;
  id?: string;
  caterer: string | Caterer;
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
  views: number;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  publishedAt?: string;
  createdAt: string;
}

export interface RecipeState {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

export interface Donation {
  _id: string;
  id?: string;
  donor: string | User;
  foodType: string;
  quantity: string;
  pickupLocation: string;
  availabilityFrom: string;
  availabilityTo: string;
  status: 'available' | 'allocated' | 'fulfilled';
  specialInstructions?: string;
  createdAt: string;
}

export interface DonationState {
  donations: Donation[];
  currentDonation: Donation | null;
  isLoading: boolean;
  error: string | null;
}
