import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { AuthState, User, Caterer } from '../../types';
import { Urls } from '../../Urls';

export const loginUser = createAsyncThunk<{ user: User; catererProfile: Caterer | null; token: string }, any>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(Urls.UserSignIn, credentials);
      if (!response.data.success) {
        return rejectWithValue(response.data.error || 'Login failed');
      }
      const token = response.data.token;

      // Store token early so subsequent requests attach it
      localStorage.setItem('token', token);

      const profileRes = await api.get(Urls.UserGetProfile);
      if (!profileRes.data.success) {
        return rejectWithValue('Failed to fetch profile');
      }
      const { user, caterer } = profileRes.data.data;

      return { user, catererProfile: caterer || null, token };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    }
  }
);

export const registerUser = createAsyncThunk<{ user: User; catererProfile: Caterer | null; token: string }, any>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(Urls.UserSignUp, userData);
      if (!response.data.success) {
        return rejectWithValue(response.data.error || 'Registration failed');
      }
      const token = response.data.token;

      // Store token early so subsequent requests attach it
      localStorage.setItem('token', token);

      const profileRes = await api.get(Urls.UserGetProfile);
      if (!profileRes.data.success) {
        return rejectWithValue('Failed to fetch profile');
      }
      const { user, caterer } = profileRes.data.data;

      return { user, catererProfile: caterer || null, token };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Registration failed. Please check your details and try again.'
      );
    }
  }
);

export const catererRegister = createAsyncThunk<{ user: User; catererProfile: Caterer | null; token: string }, any>(
  'auth/catererRegister',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(Urls.CatererSignUp, userData);
      if (!response.data.success) {
        return rejectWithValue(response.data.error || 'Caterer Registration failed');
      }
      const token = response.data.token;

      // Store token early so subsequent requests attach it
      localStorage.setItem('token', token);

      const profileRes = await api.get(Urls.UserGetProfile);
      if (!profileRes.data.success) {
        return rejectWithValue('Failed to fetch profile');
      }
      const { user, caterer } = profileRes.data.data;

      return { user, catererProfile: caterer || null, token };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Caterer registration failed. Please check your details and try again.'
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk<{ user: User; catererProfile: Caterer | null }, void>(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const profileRes = await api.get(Urls.UserGetProfile);
      if (!profileRes.data.success) {
        return rejectWithValue('Failed to fetch profile');
      }
      const { user, caterer } = profileRes.data.data;
      return { user, catererProfile: caterer || null };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.message || 
        'Failed to fetch user profile.'
      );
    }
  }
);

const initialState: AuthState = {
  user: null,
  catererProfile: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; catererProfile: Caterer | null; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.catererProfile = action.payload.catererProfile || null;
        state.token = action.payload.token;
        // localStorage is already set in the thunk
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; catererProfile: Caterer | null; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.catererProfile = action.payload.catererProfile || null;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // CATERER REGISTER
    builder
      .addCase(catererRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(catererRegister.fulfilled, (state, action: PayloadAction<{ user: User; catererProfile: Caterer | null; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.catererProfile = action.payload.catererProfile || null;
        state.token = action.payload.token;
      })
      .addCase(catererRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // FETCH PROFILE
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<{ user: User; catererProfile: Caterer | null }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.catererProfile = action.payload.catererProfile || null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // If fetching profile fails, logged out state might need forcing
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
