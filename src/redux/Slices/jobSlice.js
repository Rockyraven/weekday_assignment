// jobSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJobData = createAsyncThunk(
  "job/fetchJobData",
  async (limit, thunkAPI) => { // Accept limit parameter
    try {
      const requestBody = {
        limit: limit,
      };

      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data?.jdList;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobData: [],
    status: "idle",
    error: null,
    hasMoreData: true
  },
  reducers: {
    // Reducers if needed
    setJobData: (state, action) => {
      state.jobData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobData = action.payload;
        if (action.payload?.length > 600) {
          state.hasMoreData = false
        }
      })
      .addCase(fetchJobData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setJobData } = jobSlice.actions;
export default jobSlice.reducer;
