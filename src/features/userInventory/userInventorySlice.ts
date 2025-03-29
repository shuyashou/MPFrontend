import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store' 
import { Product } from '../../dataModels/Product';

export enum LoadingStatus {
    Idle = 0,
    Loading = 1,
    Succeeed = 2,
    Failed = 3
}

export interface InventoryState {
    products: Array<Product>
    status: LoadingStatus,
    error: string | null | undefined
}

const initialState: InventoryState = {
    products: [],
    status: LoadingStatus.Idle,
    error: null
};


export const userInventorySlice = createSlice({
  name: 'userInventory',
  initialState,
   reducers: {
    listProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload)
    },
    refreshData(state) {
      state.status = LoadingStatus.Idle
    }
  },

});

export const { listProduct, refreshData } = userInventorySlice.actions;
export const selectInventoryProducts = (state: RootState) => state.userInventory.products;
export default userInventorySlice.reducer;