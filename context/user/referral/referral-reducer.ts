import { PayloadAction } from "@reduxjs/toolkit";

export interface IReferralState {
  referees: number;
  referrers: number;
  referrerBalance: number;
  refereeBalance: number;
}

export const referralInitialState: IReferralState = {
  referees: 0,
  referrers: 0,
  referrerBalance: 0,
  refereeBalance: 0,
};

export const storeReferralDataReducer = (
  state: IReferralState,
  action: PayloadAction<IReferralState>
) => {
  state.refereeBalance = action.payload.refereeBalance
  state.referrerBalance = action.payload.referrerBalance
  state.referees = action.payload.referees
  state.referrers = action.payload.referrers
};
