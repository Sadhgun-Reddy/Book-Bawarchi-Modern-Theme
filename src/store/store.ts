import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';
import catererReducer from './slices/catererSlice';
import enquiryReducer from './slices/enquirySlice';
import recipeReducer from './slices/recipeSlice';
import donationReducer from './slices/donationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    caterer: catererReducer,
    enquiry: enquiryReducer,
    recipe: recipeReducer,
    donation: donationReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
