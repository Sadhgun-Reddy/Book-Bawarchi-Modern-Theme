import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Enquiry, EnquiryState } from '../../types';
import { Urls } from '../../Urls';

export const createEnquiry = createAsyncThunk<Enquiry, any>(
  'enquiry/createEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await api.post(Urls.EnquiryApi, enquiryData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to send enquiry');
    }
  }
);

export const fetchMyEnquiries = createAsyncThunk<Enquiry[], void>(
  'enquiry/fetchMyEnquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(Urls.EnquiryApi);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch enquiries');
    }
  }
);

export const fetchCatererEnquiries = createAsyncThunk<Enquiry[], void>(
  'enquiry/fetchCatererEnquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${Urls.EnquiryApi}/caterer`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch enquiries');
    }
  }
);

export const fetchEnquiryById = createAsyncThunk<Enquiry, string>(
  'enquiry/fetchEnquiryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${Urls.EnquiryApi}/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch enquiry details');
    }
  }
);

const initialState: EnquiryState = {
  myEnquiries: [],
  catererEnquiries: [],
  currentEnquiry: null,
  isLoading: false,
  error: null,
};

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    clearEnquiryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action: PayloadAction<Enquiry>) => {
        state.isLoading = false;
        state.myEnquiries.unshift(action.payload);
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // My Enquiries
      .addCase(fetchMyEnquiries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyEnquiries.fulfilled, (state, action: PayloadAction<Enquiry[]>) => {
        state.isLoading = false;
        state.myEnquiries = action.payload;
      })
      .addCase(fetchMyEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Caterer Enquiries
      .addCase(fetchCatererEnquiries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCatererEnquiries.fulfilled, (state, action: PayloadAction<Enquiry[]>) => {
        state.isLoading = false;
        state.catererEnquiries = action.payload;
      })
      .addCase(fetchCatererEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch By ID
      .addCase(fetchEnquiryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnquiryById.fulfilled, (state, action: PayloadAction<Enquiry>) => {
        state.isLoading = false;
        state.currentEnquiry = action.payload;
      })
      .addCase(fetchEnquiryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEnquiryError } = enquirySlice.actions;
export default enquirySlice.reducer;
