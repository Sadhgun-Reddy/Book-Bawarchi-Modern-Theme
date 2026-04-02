import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { MenuState, Menu, AuthState } from '../../types';
import { Urls } from '../../Urls';

// Async Thunks
export const fetchMenu = createAsyncThunk<Menu[], void>('menu/fetchMenu', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(Urls.MenuApi);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch the menu.');
  }
});

export const fetchCatererMenus = createAsyncThunk<Menu[], string>(
  'menu/fetchCatererMenus',
  async (catererId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${Urls.CatererBusinessApi}/${catererId}/menus`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch caterer menus.');
    }
  }
);

export const addDish = createAsyncThunk<Menu, any>('menu/addDish', async (newDish, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState };
    const catererId = state.auth.catererProfile?._id || state.auth.catererProfile?.id;
    
    if (!catererId) {
      return rejectWithValue('Caterer profile not found. Please complete your profile first.');
    }

    // Map frontend flat dish to backend nested Menu
    const backendData = {
      name: newDish.title,
      description: newDish.description,
      cuisineType: newDish.category || newDish.cuisine || 'Other',
      dietaryOptions: [newDish.dietaryType].filter(Boolean),
      isActive: true,
      items: [{
        name: newDish.title,
        description: newDish.description,
        price: newDish.pricePerPlate,
        imageUrl: newDish.images?.[0] || '',
        preparationTime: '30 mins',
        serves: newDish.minQuantity || 1,
        dietaryTags: newDish.ingredients || []
      }]
    };

    const response = await api.post(`${import.meta.env.VITE_API_URL}/api/v1/caterers/${catererId}/menus`, backendData);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add the dish.');
  }
});

export const updateDish = createAsyncThunk<Menu, { id: string; updates: any }>(
  'menu/updateDish',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      // Map flat updates if necessary, though PUT /menus/:id usually takes top-level fields
      const backendUpdates: any = {};
      if (updates.title) backendUpdates.name = updates.title;
      if (updates.description) backendUpdates.description = updates.description;
      if (updates.isPublic !== undefined) backendUpdates.isActive = updates.isPublic;
      
      const response = await api.put(`${Urls.MenuApi}/${id}`, { ...updates, ...backendUpdates });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update the dish.');
    }
  }
);

export const deleteDish = createAsyncThunk<string, string>('menu/deleteDish', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`${Urls.MenuApi}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to delete the dish.');
  }
});

const initialState: MenuState = {
  items: [],
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Menu
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Caterer Menus
      .addCase(fetchCatererMenus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCatererMenus.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCatererMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Dish
      .addCase(addDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDish.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Dish
      .addCase(updateDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDish.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => (item._id || item.id) === (action.payload._id || action.payload.id));
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Dish
      .addCase(deleteDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => (item._id || item.id) !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
