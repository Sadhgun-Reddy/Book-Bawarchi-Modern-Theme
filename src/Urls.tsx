const Url = "http://localhost:5000/"
// const Url = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/"

export const Urls = {
    UserSignUp: Url + "api/v1/auth/register",
    UserSignIn: Url + "api/v1/auth/login",
    UserGetProfile: Url + "api/v1/auth/me",
    CatererSignUp: Url + "api/v1/caterers/auth/register",
    CatererBusinessApi: Url + "api/v1/caterers",
    CatererGetProfile: Url + "api/v1/caterers/profile",
    MenuApi: Url + "api/v1/menus",
    EnquiryApi: Url + "api/v1/enquiries",
    RecipeApi: Url + "api/v1/recipes",
    DonationApi: Url + "api/v1/food-support/donations",
    RecipesFromMenus: Url + "api/v1/recipes/from-menus",
}
