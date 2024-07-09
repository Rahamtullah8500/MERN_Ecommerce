import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleFetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      console.log("error fetching products list", error);
    }
  }
);

const initialState = {
  status: "idle",
  products: null,
  error: null,
};

const FetchProducts = createSlice({
  name: "FetchProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleFetchProducts.fulfilled, (state, action) => {
        state.status = "succeed",
          state.products = action.payload,
          state.error = null;
      })
      .addCase(handleFetchProducts.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  },
});

export default FetchProducts.reducer;
