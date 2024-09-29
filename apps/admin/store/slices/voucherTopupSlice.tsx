import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type voucherTopupState = {
  handShakeResponse?: {
    loading?: boolean;
    error?: boolean;
    response?: handShakeResponseResult;
  };
  VoucherCodeResponse?: {
    loading?: boolean;
    error?: boolean;
    response?: voucherCodeResponseResult;
  };
  topupResponse?: {
    loading?: boolean;
    error?: boolean;
    response?: topupDataResult;
    // response?: topupResponseResult;
  };
  submitTopup?: {
    loading?: boolean;
  };
  helloResponse?: {
    loading?: boolean;
    error?: boolean;
    response?: HelloResponse;
  };
  authUcmsResponse?: {
    loading?: boolean;
    error?: boolean;
    response?: AuthUcmsResponse;
  };
  tokenUcms?: string;
  token?: string;
};

export type handShakeResponseResult = {
  status: number;
  msg: string;
  data: {session_id: string};
};

export type handShakeResponseData = {
  result: handShakeResponseResult;
};

export type handshakeBody = {
  mdn?: string;
};

export type voucherCodeResponseData = {
  result: '';
};

export type voucherCodeResponseResult = {
  status: string;
  msg: string;
  data: string;
  value: number;
};

export type voucherCodeBody = {
  voucherCode?: string;
  sessionID?: string;
};

export type topupBody = {
  sessionID?: string;
};

export type topupResponseDataResult = {
  result: topupResponseResult;
};

export type topupResponseDataAPIResult = {
  result: topupDataResult;
};

export type topupResponseResult = {
  data?: topupDataResult;
};

export type topupDataResult = {
  // status: string;
  // msg: string;
  data: topupResponseDataFromUCMS;
};

export type HelloResponse = {
  success: boolean;
  data: {
    token: string;
    product_type: null;
  };
};

type topupResponseDataFromUCMS = {
  defaultNominal: string;
};

// type topupResponseData = {
//   topup: {
//     defaultNominal: string | number[][];
//     defaultTitle: string[][];
//   };
// };
export type AuthUcmsResponse = {
  token: string;
};

export const initialState: voucherTopupState = {
  handShakeResponse: undefined,
  VoucherCodeResponse: undefined,
  authUcmsResponse: undefined,
  helloResponse: undefined,
  token: undefined,
  tokenUcms: undefined,
};

export const voucherTopupSlice = createSlice({
  name: 'voucherTopup',
  initialState,
  reducers: {
    setVoucherTopupState: (
      state,
      action: PayloadAction<Partial<voucherTopupState>>,
    ) => {
      Object.keys(action.payload).forEach(key => {
        const _key = key as keyof voucherTopupState;
        state[_key] = action.payload[_key] as never;
      });
    },
    setAuthUcmsResponse: (state, action) => {
      state.authUcmsResponse = action?.payload?.authUcmsResponse;
      state.tokenUcms = action?.payload?.authUcmsResponse?.response?.token;
    },
    setHelloResponse: (state, action) => {
      state.helloResponse = action.payload.helloResponse;
      state.token = action?.payload?.helloResponse?.response?.data?.token;
    },
  },
});

export const voucherTopupReducer = voucherTopupSlice.reducer;
export const {setVoucherTopupState, setAuthUcmsResponse, setHelloResponse} =
  voucherTopupSlice.actions;
