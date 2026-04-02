import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Recipe, RecipeState } from '../../types';
import { Urls } from '../../Urls';

export const fetchRecipes = createAsyncThunk<Recipe[], void>(
  'recipe/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(Urls.RecipeApi);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch recipes');
    }
  }
);

export const fetchRecipeById = createAsyncThunk<Recipe, string>(
  'recipe/fetchRecipeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${Urls.RecipeApi}/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch recipe details');
    }
  }
);

export const createRecipe = createAsyncThunk<Recipe, any>(
  'recipe/createRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      // Assuming a FormData upload if there are images, otherwise standard JSON.
      // In this case, we'll configure JSON headers by default unless passed otherwise.
      const response = await api.post(Urls.RecipeApi, recipeData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create recipe');
    }
  }
);

const initialState: RecipeState = {
  recipes: [],
  currentRecipe: null,
  isLoading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    clearRecipeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.isLoading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch By ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<Recipe>) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
        state.isLoading = false;
        state.recipes.unshift(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRecipeError } = recipeSlice.actions;
export default recipeSlice.reducer;
