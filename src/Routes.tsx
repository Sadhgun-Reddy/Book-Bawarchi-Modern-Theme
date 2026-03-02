import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/common/Loading';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthRoute from './components/common/AuthRoute';
import NotFound from './pages/NotFound';

const HomePage = React.lazy(() => import('./pages/Home'));
const DashboardLayout = React.lazy(() => import('./layouts/DashboardLayout'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const DishEditor = React.lazy(() => import('./pages/DishEditor'));
const CatererLayout = React.lazy(() => import('./layouts/CatererLayout'));
const CatererDashboard = React.lazy(() => import('./pages/CatererDashboard'));
const LoginPage = React.lazy(() => import('./pages/Login'));
const SignUpPage = React.lazy(() => import('./pages/Signup'));
const CatererSignupPage = React.lazy(() => import('./pages/CatererSignup'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const EmailVerificationPage = React.lazy(() => import('./pages/EmailVerification'));
const RecipesListing = React.lazy(() => import('./pages/RecipesListing'));
const RecipeDetailPage = React.lazy(() => import('./pages/RecipeDetail'));
const RequestFoodPage = React.lazy(() => import('./pages/RequestFood'));
const FoodRequestsPage = React.lazy(() => import('./pages/FoodRequests'));
const FoodRequestDetailPage = React.lazy(() => import('./pages/FoodRequestDetail'));
const DonateFoodPage = React.lazy(() => import('./pages/DonateFood'));
const OffersManagementPage = React.lazy(() => import('./pages/OffersManagement'));
const MenuManagement = React.lazy(() => import('./pages/MenuManagement'));
const FindCaterersPage = React.lazy(() => import('./pages/FindCaterers'));
const CatererProfilePage = React.lazy(() => import('./pages/CatererProfile'));
const SavedCaterersPage = React.lazy(() => import('./pages/SavedCaterers'));
const MyEnquiriesPage = React.lazy(() => import('./pages/MyEnquiries'));
const EnquiryDetailPage = React.lazy(() => import('./pages/EnquiryDetail'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfile'));
const CatererInboxPage = React.lazy(() => import('./pages/CatererEnquiries'));
const CatererSettingsPage = React.lazy(() => import('./pages/CatererSettings'));
const ContactSupportPage = React.lazy(() => import('./pages/ContactSupport'));
const SupportTicketsPage = React.lazy(() => import('./pages/SupportTickets'));
const TicketDetailPage = React.lazy(() => import('./pages/TicketDetail'));
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorks'));
const GalleryManagementPage = React.lazy(() => import('./pages/GalleryManagement'));
const ReviewsManagementPage = React.lazy(() => import('./pages/ReviewsManagement'));
const ContentManagementPage = React.lazy(() => import('./pages/ContentManagement'));

const PublicLayout = React.lazy(() => import('./layouts/PublicLayout'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* --- PUBLIC ROUTES (WRAPPED IN PUBLICLAYOUT) --- */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />

                    {/* Auth Pages (Redirect if logged in) */}
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                    </Route>

                    {/* Caterer Auth (Handles its own logged-in redirection) */}
                    <Route path="/caterer-register" element={<CatererSignupPage />} />

                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email" element={<EmailVerificationPage />} />
                    <Route path="/recipes" element={<RecipesListing />} />
                    <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                    <Route path="/request-food" element={<RequestFoodPage />} />
                    <Route path="/donate-food" element={<DonateFoodPage />} />
                    <Route path="/caterers" element={<FindCaterersPage />} />
                    <Route path="/caterers/:id" element={<CatererProfilePage />} />
                </Route>

                {/* --- PROTECTED ROUTES (GENERAL USERS) --- */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="saved" element={<SavedCaterersPage />} />
                        <Route path="enquiries" element={<MyEnquiriesPage />} />
                        <Route path="enquiries/:id" element={<EnquiryDetailPage />} />
                        <Route path="profile" element={<MyProfilePage />} />
                        <Route path="support" element={<ContactSupportPage />} />
                        <Route path="tickets" element={<SupportTicketsPage />} />
                        <Route path="tickets/:id" element={<TicketDetailPage />} />
                    </Route>
                </Route>

                {/* --- PROTECTED ROUTES (CATERER & ADMIN ROLE) --- */}
                <Route element={<ProtectedRoute requiredRole="caterer" />}>
                    <Route path="/caterer" element={<CatererLayout />}>
                        <Route index element={<CatererDashboard />} />
                        <Route path="requests" element={<FoodRequestsPage />} />
                        <Route path="requests/:id" element={<FoodRequestDetailPage />} />
                        <Route path="menus" element={<MenuManagement />} />
                        <Route path="menus/dish/new" element={<DishEditor />} />
                        <Route path="offers" element={<OffersManagementPage />} />
                        <Route path="enquiries" element={<CatererInboxPage />} />
                        <Route path="settings" element={<CatererSettingsPage />} />
                        <Route path="gallery" element={<GalleryManagementPage />} />
                        <Route path="reviews" element={<ReviewsManagementPage />} />
                        <Route path="content" element={<ContentManagementPage />} />
                    </Route>
                </Route>

                {/* --- 404 CATCH-ALL ROUTE --- */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
