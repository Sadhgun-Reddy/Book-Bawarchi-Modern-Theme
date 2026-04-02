import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Donation, DonationState } from '../../types';
import { Urls } from '../../Urls';

export const fetchDonations = createAsyncThunk<Donation[], void>(
  'donation/fetchDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(Urls.DonationApi);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch donations');
    }
  }
);

export const fetchDonationById = createAsyncThunk<Donation, string>(
  'donation/fetchDonationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${Urls.DonationApi}/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch donation details');
    }
  }
);

export const createDonation = createAsyncThunk<Donation, any>(
  'donation/createDonation',
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await api.post(Urls.DonationApi, donationData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to submit donation');
    }
  }
);

export const updateDonationStatus = createAsyncThunk<Donation, { id: string, status: string }>(
  'donation/updateDonationStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${Urls.DonationApi}/${id}`, { status });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update donation status');
    }
  }
);

const initialState: DonationState = {
  donations: [],
  currentDonation: null,
  isLoading: false,
  error: null,
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    clearDonationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchDonations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action: PayloadAction<Donation[]>) => {
        state.isLoading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch By ID
      .addCase(fetchDonationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDonationById.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.isLoading = false;
        state.currentDonation = action.payload;
      })
      .addCase(fetchDonationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createDonation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDonation.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.isLoading = false;
        state.donations.unshift(action.payload);
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Status
      .addCase(updateDonationStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDonationStatus.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.isLoading = false;
        // Update in list
        const index = state.donations.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.donations[index] = action.payload;
        }
        // Update current if matching
        if (state.currentDonation && state.currentDonation._id === action.payload._id) {
          state.currentDonation = action.payload;
        }
      })
      .addCase(updateDonationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDonationError } = donationSlice.actions;
export default donationSlice.reducer;
