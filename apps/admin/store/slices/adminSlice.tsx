import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type adminPanelState = {
  token?: string;
};

export const initialState: adminPanelState = {
  token: undefined,
};

export type LoginType = {
  status: number;
  data: {
    token: string;
  };
};

export type LoginBody = {
  email: string;
  password: string;
};

export type GetMembership = {
  id: number;
  attributes: GetAttributeMembership;
};

export type GetDatatable = {
  id: string;
  data: GetDataDatatable;
};

type GetDataDatatable = {
  title: string;
  description: string;
  director: string;
  writer: string;
  total_episod: number;
};

type GetAttributeMembership = {
  name: string;
  gender: string;
  address: string;
  vehicle: string;
  colorVehicle: string;
  policeNo: string;
};

export const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState,
  reducers: {
    setadminPanelState: (
      state,
      action: PayloadAction<Partial<adminPanelState>>,
    ) => {
      Object.keys(action.payload).forEach(key => {
        const _key = key as keyof adminPanelState;
        state[_key] = action.payload[_key] as never;
      });
    },
  },
});

export const adminPanelReducer = adminPanelSlice.reducer;
export const {setadminPanelState} = adminPanelSlice.actions;
