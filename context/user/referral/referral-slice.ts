import { createSlice } from "@reduxjs/toolkit";
import { referralInitialState, storeReferralDataReducer } from "./referral-reducer";

const referralSlice = createSlice({
    name:"referral",
    initialState: referralInitialState,
    reducers: {
        storeReferralData: storeReferralDataReducer
    }
})

export const referralSliceReducer = referralSlice.reducer;
export const referralSliceActions = referralSlice.actions;