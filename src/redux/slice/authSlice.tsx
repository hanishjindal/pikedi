import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your user data
interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: number;
  // Add other user properties as needed
}

// Define the initial state for the auth slice
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Create a Redux Toolkit slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // You can add more reducers for actions like updating user data, etc.
  },
});

// Export the actions generated by createSlice
export const { signIn, signOut } = authSlice.actions;

// Create a selector to access the auth state
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

// Export the reducer for the auth slice
export default authSlice.reducer;
