// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserInfo } from "../../types/UserInfo";

// type UserState = {
//   userInfo: UserInfo | null; // Make sure to allow null
// };

// const initialState: UserState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo")!)
//     : null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     userSignIn: (state, action: PayloadAction<UserInfo>) => {
//       state.userInfo = action.payload;
//     },
//     userSignOut: (state) => {
//       state.userInfo = null;
//     },
//   },
// });

// export const { userSignIn, userSignOut } = userSlice.actions;

// export default userSlice.reducer;

// userSlice.js
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from '../../apiClient'; // Adjust the import based on your project structure
import { UserInfo } from "../../types/UserInfo"; // Adjust the import based on your project structure

// Define initial state
type UserState = {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  loading: false,
  error: null,
};

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  'user/signup',
  async ({ name, email, password }: { name: string; email: string; password: string; }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<UserInfo>('/api/users/signup', { name, email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Signup failed');
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignIn: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userSignOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

// Export actions and reducer
export const { userSignIn, userSignOut } = userSlice.actions;
export default userSlice.reducer;
