import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Menu } from '../../types';
import { Urls } from '../../Urls';

// Fetch all menus for caterer/user view (admin can fetch all as well)
export const fetchMenu = createAsyncThunk<Menu[], void>(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(Urls.MenuApi);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch menus');
    }
  }
);

// Fetch menus for a specific caterer (used on CatererProfile)
export const fetchCatererMenus = createAsyncThunk<Menu[], string>(
  'menu/fetchCatererMenus',
  async (catererId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${Urls.CatererBusinessApi}/${catererId}/menus`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch caterer menus');
    }
  }
);

// Add a dish to a menu (caterer/admin)
export const addDishToMenu = createAsyncThunk<Menu, { menuId: string; dish: any; images?: File[] }>(
  'menu/addDish',
  async ({ menuId, dish, images }, { rejectWithValue }) => {
    try {
      // Build FormData for multipart upload (images)
      const formData = new FormData();
      if (dish?.name) formData.append('name', dish.name);
      if (dish?.description) formData.append('description', dish.description);
      if (dish?.price != null) formData.append('price', String(dish.price));
      if (dish?.preparationTime) formData.append('preparationTime', dish.preparationTime);
      if (dish?.serves != null) formData.append('serves', String(dish.serves));
      if (dish?.dietaryTags) formData.append('dietaryTags', JSON.stringify(dish.dietaryTags));
      // Images from File objects
      if (images && images.length > 0) {
        images.forEach((f) => formData.append('images', f));
      }

      const response = await api.post(`${Urls.MenuApi}/${menuId}/items`, formData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to add dish');
    }
  }
);

// Update a dish/menu (generic update for toggle/status in UI)
export const updateDish = createAsyncThunk<Menu, { id: string; updates: any }>(
  'menu/updateDish',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${Urls.MenuApi}/${id}`, updates);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update');
    }
  }
);

interface MenuState {
  items: Menu[];
  isLoading: boolean;
  error: string | null;
}

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
      .addCase(fetchMenu.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.isLoading = false; state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload as string;
      })
      .addCase(addDishToMenu.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(addDishToMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        // replace or update the corresponding menu by id
        const idx = state.items.findIndex((m) => m._id === (action.payload._id || action.payload.id));
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(addDishToMenu.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload as string;
      })
      .addCase(updateDish.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(updateDish.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        const idx = state.items.findIndex((m) => m._id === (action.payload._id || action.payload.id));
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(updateDish.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
