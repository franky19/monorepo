import {useCallback, useEffect, useState} from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RawAxiosRequestHeaders,
} from 'axios';

type Props = {
  url: string;
  method?: Method;
  body?: {[key: string]: unknown};
  headers?: RawAxiosRequestHeaders;
};

export type ErrorObject = {
  error_id: number;
  message: {
    en: string;
    id: string;
  };
};

export type FetchAPIResponse<D> = {
  error: boolean;
  errorObject?: ErrorObject;
  data: D;
};

export const fetchApi = async <D,>({
  url,
  method = 'POST',
  headers,
  body,
}: Props): Promise<FetchAPIResponse<D>> => {
  try {
    const config: AxiosRequestConfig = {
      url: url,
      method: method,
      headers: headers,
      data: body,
      // timeout: 10000,
      maxContentLength: 2000,
      maxBodyLength: 2000,
    };

    const response: AxiosResponse = await axios(config);

    if (response?.status === 200 && response?.data?.error) {
      return {error: true, data: undefined, errorObject: response?.data?.error};
    }

    if (response?.status === 200 && response?.data) {
      return {error: false, data: response.data};
    } else {
      return {error: false, data: undefined};
    }
  } catch (error) {
    return {error: true, data: undefined};
  }
};

export const useFetch = <D,>({
  url,
  method,
  body,
  headers,
}: Props): {loading: boolean; data: D; error: boolean; call: () => void} => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const [data, setData] = useState<D>();

  const call = useCallback(async () => {
    try {
      setLoading(true);
      const res: {error: boolean; data: D} = await fetchApi({
        url,
        method,
        body,
        headers,
      });
      setLoading(false);
      if (res.error === false) {
        setError(false);
        setData(res.data);
      } else {
        setError(true);
        // setData(undefined);
      }
    } catch (error) {
      setError(true);
      // setData(undefined);
    }
  }, [url, method, headers, body]);

  useEffect(() => {
    call();
  }, [call]);

  return {loading, data, error, call};
};
