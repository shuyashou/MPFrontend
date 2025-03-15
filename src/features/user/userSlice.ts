import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IdTokenClaims, AccountInfo } from '@azure/msal-browser';
import type { RootState } from '../../app/store' 

export interface AuthState {
    activeAccount: AccountInfo | null,
    accessToken: string | null,
    idTokenClaims: object | undefined
}

const initialState: AuthState = {
    activeAccount: null,
    accessToken: null,
    idTokenClaims: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
   reducers: {
    setActiveAccount(state, action: PayloadAction<AccountInfo | null>) {
      state.activeAccount = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
        state.accessToken = action.payload;
    },
    setClaims(state, action: PayloadAction<IdTokenClaims | undefined>) {
        state.idTokenClaims = action.payload;
    }
  }
});

export const { setActiveAccount, setAccessToken, setClaims } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.activeAccount;
export const selectClaims = (state: RootState) => state.user.idTokenClaims;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export default userSlice.reducer;