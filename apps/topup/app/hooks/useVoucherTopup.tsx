import {
  AuthUcmsResponse,
  handshakeBody,
  handShakeResponseResult,
  HelloResponse,
  setAuthUcmsResponse,
  setHelloResponse,
  setVoucherTopupState,
  voucherCodeBody,
  voucherCodeResponseResult,
} from '@/slices/voucherTopupSlice';
import {useCallback, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApi, FetchAPIResponse} from './useFetch';
import ApiList from '@/helpers/api';
import {ReduxState} from '@/store';
import {formatRupiah} from '../helpers';
import {moveToPayment, PaymentData} from '@/components/MoveToPayment';
import {IS_USING_PRODUCTION} from '@/config/devconfig';

type ContextDispatchTypesProps = {
  submitVoucherDataAndSessionID: (
    voucherCode?: string,
    mdn?: string,
  ) => Promise<voucherCodeResponseResult>;
  getTopupDataDefault: (mdn?: string) => Promise<void>;
  submitTopup: (price?: number, mdn?: string) => Promise<void>;
  fetchNominalTopupFromAPI: () => Promise<void>;
};

export const useVoucherTopup = (): ContextDispatchTypesProps => {
  const dispatch = useDispatch();
  const isAssembly = useSelector((state: ReduxState) =>
    state?.config?.isUsingProduction === true ? false : true,
  );
  const sessionResponse = useSelector(
    (state: ReduxState) => state?.voucherTopup?.handShakeResponse,
  );

  const tokenUcms = useSelector(
    (state: ReduxState) => state?.voucherTopup?.tokenUcms,
  );

  const hasFetched = useRef(false);

  const getHello = useCallback(async () => {
    try {
      dispatch(
        setHelloResponse({
          helloResponse: {
            loading: true,
          },
        }),
      );
      const response: FetchAPIResponse<HelloResponse> = await fetchApi({
        url: ApiList.hello,
      });

      if (response?.data?.data?.token) {
        dispatch(
          setHelloResponse({
            helloResponse: {
              loading: false,
              error: false,
              response: response.data,
            },
          }),
        );
        return response?.data?.data?.token;
      } else {
        throw 'token not found';
      }
    } catch (error) {
      dispatch(
        setVoucherTopupState({
          helloResponse: {
            loading: false,
            error: true,
            response: undefined,
          },
        }),
      );
      return undefined;
    }
  }, [dispatch]);

  const getAuthUcms = useCallback(async () => {
    try {
      dispatch(
        setAuthUcmsResponse({
          authUcmsResponse: {
            loading: true,
          },
        }),
      );

      const response: FetchAPIResponse<AuthUcmsResponse> = await fetchApi({
        url: ApiList.authucms,
      });

      dispatch(
        setAuthUcmsResponse({
          authUcmsResponse: {
            loading: false,
            error: false,
            response: response.data,
          },
        }),
      );

      if (!response?.data?.token) {
        throw 'token not found';
      }

      return response?.data?.token;
    } catch (error) {
      dispatch(
        setAuthUcmsResponse({
          authUcmsResponse: {
            loading: false,
            error: true,
            response: undefined,
          },
        }),
      );
      return undefined;
    }
  }, [dispatch]);

  const getSessionID = useCallback(
    async mdn => {
      try {
        dispatch(
          setVoucherTopupState({
            handShakeResponse: {
              loading: true,
              error: false,
              response: null,
            },
          }),
        );
        const body: handshakeBody = {
          mdn: mdn,
        };
        const response: FetchAPIResponse<handShakeResponseResult> =
          await fetchApi({
            url: ApiList.handShake,
            body: body,
            headers: {
              isAssembly: isAssembly,
            },
          });

        if (response?.data) {
          dispatch(
            setVoucherTopupState({
              handShakeResponse: {
                loading: false,
                error: false,
                response: response?.data,
              },
            }),
          );
        } else {
          throw response;
        }
      } catch (error) {
        dispatch(
          setVoucherTopupState({
            handShakeResponse: {
              loading: false,
              error: true,
              response: error,
            },
          }),
        );
        return;
      }
    },
    [dispatch, isAssembly],
  );

  const submitVoucherCode = useCallback(
    async (voucherCode, session_id, mdn, retryCount = 0) => {
      try {
        dispatch(
          setVoucherTopupState({
            VoucherCodeResponse: {
              loading: true,
              error: false,
              response: null,
            },
          }),
        );
        const body: voucherCodeBody = {
          voucherCode: voucherCode,
          sessionID: session_id,
        };
        const response: FetchAPIResponse<voucherCodeResponseResult> =
          await fetchApi({
            url: ApiList.voucherCode,
            body: body,
            headers: {
              isAssembly: isAssembly,
            },
          });
        if (response?.data) {
          dispatch(
            setVoucherTopupState({
              VoucherCodeResponse: {
                loading: false,
                error: false,
                response: response?.data,
              },
            }),
          );
          return response?.data;
        } else {
          throw response;
        }
      } catch (error) {
        if (
          error?.errorObject?.message === 'Session Tidak Valid' &&
          retryCount < 3
        ) {
          getSessionID(mdn);
          const sessionID = sessionResponse?.response?.data?.session_id;
          return submitVoucherCode(voucherCode, sessionID, mdn, retryCount + 1);
        }
        dispatch(
          setVoucherTopupState({
            VoucherCodeResponse: {
              loading: false,
              error: true,
              response: error,
            },
          }),
        );
        return;
      }
    },
    [
      dispatch,
      getSessionID,
      sessionResponse?.response?.data?.session_id,
      isAssembly,
    ],
  );

  const submitVoucherDataAndSessionID = useCallback(
    async (voucherCode, mdn) => {
      try {
        dispatch(
          setVoucherTopupState({
            handShakeResponse: {
              loading: true,
              error: false,
              response: null,
            },
          }),
        );
        const body: handshakeBody = {
          mdn: mdn,
        };
        const response: FetchAPIResponse<handShakeResponseResult> =
          await fetchApi({
            url: ApiList.handShake,
            body: body,
            headers: {
              isAssembly: isAssembly,
            },
          });
        if (response?.data) {
          dispatch(
            setVoucherTopupState({
              handShakeResponse: {
                loading: false,
                error: false,
                response: response?.data,
              },
            }),
          );
          const responseSubmitData = await submitVoucherCode(
            voucherCode,
            response?.data?.data?.session_id,
            mdn,
          );
          return responseSubmitData;
        } else {
          throw response;
        }
      } catch (error) {
        dispatch(
          setVoucherTopupState({
            handShakeResponse: {
              loading: false,
              error: true,
              response: error,
            },
          }),
        );
        return;
      }
    },
    [dispatch, isAssembly, submitVoucherCode],
  );

  const resetVoucherData = useCallback(async () => {
    dispatch(
      setVoucherTopupState({
        handShakeResponse: undefined,
        VoucherCodeResponse: undefined,
        submitTopup: undefined,
        helloResponse: undefined,
      }),
    );
  }, [dispatch]);

  const getTopupData = useCallback(
    async (tokenUcmsParam: string, retryCount = 0) => {
      try {
        // debugger
        dispatch(
          setVoucherTopupState({
            topupResponse: {
              loading: true,
              error: false,
              response: null,
            },
          }),
        );
        const response: FetchAPIResponse<AuthUcmsResponse> = await fetchApi({
          url: ApiList.topup,
          headers: {
            tokenucms: tokenUcmsParam || tokenUcms,
          },
        });

        if (
          JSON.stringify(response?.errorObject)
            ?.replace(/\s+/g, '')
            ?.toLowerCase()
            ?.includes('invalidjwttoken')
        ) {
          throw 'invalidjwttoken';
        } else
          dispatch(
            setVoucherTopupState({
              topupResponse: {
                loading: false,
                error: false,
                response: response,
              },
            }),
          );
      } catch (error) {
        if (error === 'invalidjwttoken' && retryCount < 3) {
          return getAuthUcms().then(tokenUcms =>
            getTopupData(tokenUcms, retryCount + 1),
          );
        }
        return;
      }
    },
    [getAuthUcms, dispatch, tokenUcms],
  );

  const getTopupDataDefault = useCallback(
    async mdn => {
      try {
        // debugger;
        dispatch(
          setVoucherTopupState({
            handShakeResponse: {
              loading: true,
              error: false,
              response: null,
            },
          }),
        );
        const body: handshakeBody = {
          mdn: mdn,
        };
        const response: FetchAPIResponse<handShakeResponseResult> =
          await fetchApi({
            url: ApiList.handShake,
            body: body,
          });
        if (response?.data) {
          dispatch(
            setVoucherTopupState({
              handShakeResponse: {
                loading: false,
                error: false,
                response: response?.data,
              },
            }),
          );
          getTopupData(response?.data?.data?.session_id);
        } else {
          throw response;
        }
      } catch (error) {
        dispatch(
          setVoucherTopupState({
            topupResponse: {
              loading: false,
              error: true,
              response: error,
            },
          }),
        );
        return;
      }
    },
    [dispatch, getTopupData],
  );

  const submitTopup = useCallback(
    async (price, mdn) => {
      try {
        dispatch(
          setVoucherTopupState({
            submitTopup: {loading: true},
          }),
        );
        getHello().then(fetchedTokenHello => {
          // const nttopup = `EVOUCHER${Math.floor(price / 1000)}K`;
          const payload: PaymentData = {
            type: 'topup',
            partner: 'MYWEB',
            isProd: IS_USING_PRODUCTION === 'true',
            isStaging: IS_USING_PRODUCTION === 'false',
            isDevelopment: IS_USING_PRODUCTION === 'false',
            sessionId: fetchedTokenHello,
            sessionType: 'hello',
            url: {
              fallbackUrl:
                IS_USING_PRODUCTION === 'true'
                  ? 'https://www.smartfren.com/voucher-topup'
                  : 'https://1.smartfren.com/voucher-topup',
              homeUrl:
                IS_USING_PRODUCTION === 'true'
                  ? 'https://www.smartfren.com'
                  : 'https://1.smartfren.com',
            },
            goods: [
              {
                id: 'EVOUCHER',
                productCode: 'EVOUCHER',
                partnerCode: '',
                typeItem: 'productCode',
                name: `Voucher ${price}`,
                price: price,
                promoPrice: 0,
                extendData: {
                  mdn: mdn,
                },
              },
            ],
            totalPrice: price,
            contactInfo: {mdn: mdn},
            summary: {
              title: `Voucher ${price}`,
              imgIcon: '',
              detailPayment: [
                {title: 'Topup', info: `Voucher ${price}`},
                {title: 'Price', info: formatRupiah(price)},
              ],
              titleSummary: 'Total Payment',
              totalSummary: formatRupiah(price),
              tnc: '',
              privacy: '',
            },
            targetUrl:
              IS_USING_PRODUCTION === 'true'
                ? 'https://www.smartfren.com/payment/checkout'
                : 'https://1.smartfren.com/payment/v2/checkout',
          };
          moveToPayment(payload);
          resetVoucherData();
        });
      } catch (error) {
        return error;
      }
    },
    [dispatch, getHello, resetVoucherData],
  );

  const isFetchTopupData = useCallback(
    (token?: string) => {
      if (!hasFetched.current) {
        hasFetched.current = true;
        getTopupData(token);
      }
    },
    [hasFetched, getTopupData],
  );

  const fetchNominalTopupFromAPI = useCallback(async () => {
    if (tokenUcms) {
      isFetchTopupData(tokenUcms);
    } else {
      getAuthUcms().then(fetchedTokenUcms => {
        isFetchTopupData(fetchedTokenUcms);
      });
    }
  }, [tokenUcms, getAuthUcms, isFetchTopupData]);

  const dispatchValueMemo = useMemo(() => {
    return {
      submitVoucherDataAndSessionID,
      getTopupDataDefault,
      submitTopup,
      fetchNominalTopupFromAPI,
    };
  }, [
    submitVoucherDataAndSessionID,
    getTopupDataDefault,
    submitTopup,
    fetchNominalTopupFromAPI,
  ]);

  return dispatchValueMemo;
};
