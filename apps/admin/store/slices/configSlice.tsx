'use client';

import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IS_USING_PRODUCTION, IS_USING_STAGING} from '@/config/devconfig';

type ConfigState = {
  isUsingProduction?: boolean;
  isUsingStaging?: boolean;
};

const initialState: ConfigState = {
  // isUsingProduction: IS_USING_PRODUCTION,
  isUsingStaging: IS_USING_STAGING,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigState: (state, action: PayloadAction<Partial<ConfigState>>) => {
      Object.keys(action.payload).forEach(key => {
        const _key = key as keyof ConfigState;
        state[_key] = action.payload[_key] as never;
      });
    },
  },
});

export const configReducer = configSlice.reducer;
export const {setConfigState} = configSlice.actions;
