import axios, {AxiosResponse} from 'axios';
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import URL, {IS_MOCK} from '../config';
import {helloMockResponse} from './mock';
import {HelloResponse} from '../../../store/slices/voucherTopupSlice';
import {IS_USING_PRODUCTION} from '../../config/devconfig';

export async function POST() {
  try {
    if (IS_MOCK) {
      return NextResponse.json(helloMockResponse);
    }

    const url = IS_USING_PRODUCTION === 'true' ? URL.hello_prod : URL.hello;
    const data = JSON.stringify({
      grant_type: 'onboarding',
      params: ['string'],
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response: AxiosResponse<HelloResponse>) => {
        const token = response.data.data.token;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cookies().set('token', token);
        const filteredData = {
          data: {token: response.data?.data?.token},
          success: response?.data?.success,
        };

        return NextResponse.json(filteredData);
      })
      .catch(error => {
        return NextResponse.json({
          message: error.message,
          error: error?.response?.data ?? {},
        });
      });
  } catch (error) {
    return NextResponse.json(error.data);
  }
}
