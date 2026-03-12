import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Caterer, CatererState } from '../../types';
import { Urls } from '../../Urls';

export const fetchCaterers = createAsyncThunk<{ data: Caterer[]; count: number }, void>(
    'caterer/fetchCaterers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(Urls.CatererBusinessApi);
            if (!response.data.success) {
                return rejectWithValue('Failed to fetch caterers');
            }
            return {
                data: response.data.data,
                count: response.data.count,
            };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch caterers. Please try again later.'
            );
        }
    }
);

const initialState: CatererState = {
    caterers: [],
    isLoading: false,
    error: null,
    count: 0,
};

const catererSlice = createSlice({
    name: 'caterer',
    initialState,
    reducers: {
        clearCatererError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCaterers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCaterers.fulfilled, (state, action: PayloadAction<{ data: Caterer[]; count: number }>) => {
                state.isLoading = false;
                state.caterers = action.payload.data;
                state.count = action.payload.count;
            })
            .addCase(fetchCaterers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCatererError } = catererSlice.actions;
export default catererSlice.reducer;
