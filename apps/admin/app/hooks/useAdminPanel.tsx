import {LoginBody, LoginType, setadminPanelState} from '@/slices/adminSlice';
import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApi, FetchAPIResponse} from './useFetch';
import ApiList from '@/helpers/api';
import {ReduxState} from '@/store';

type ContextDispatchTypesProps = {
  SubmitLogin: (
    email: string,
    password: string,
  ) => Promise<string | undefined>;
};

export const useadminPanel = (): ContextDispatchTypesProps => {
  const dispatch = useDispatch();
  const isAssembly = useSelector((state: ReduxState) =>
    state?.config?.isUsingProduction === true ? false : true,
  );

  const SubmitLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const body: LoginBody = {
          email: email,
          password: password,
        };
        const response: FetchAPIResponse<LoginType | undefined> =
          await fetchApi({
            url: ApiList.login,
            body: body,
            headers: {
              isAssembly: isAssembly,
            },
          });
        if (response?.data?.data.token) {
          // dispatch(
          //   setadminPanelState({
          //     VoucherCodeResponse: {
          //       loading: false,
          //       error: false,
          //       response: response?.data,
          //     },
          //   }),
          // );
          return response?.data?.data?.token;
        } else {
          throw response;
        }
      } catch (error) {
        return;
      }
    },
    [dispatch],
  );
  const dispatchValueMemo = useMemo(() => {
    return {
      SubmitLogin,
    };
  }, [SubmitLogin]);

  return dispatchValueMemo;
};
