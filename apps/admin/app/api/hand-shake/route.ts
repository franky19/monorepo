import {NextRequest, NextResponse} from 'next/server';
import URL from '../config';
import axios, {AxiosResponse} from 'axios';
import {handshakeBody, handShakeResponseData} from '@/slices/adminSlice';
import {IS_USING_PRODUCTION} from '@/config/devconfig';
import {cookies} from 'next/headers';

export async function POST(request: NextRequest) {
  const url =
    IS_USING_PRODUCTION === 'true' ? URL.handshake_prod : URL.handshake;
  try {
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const body: handshakeBody = await request.json();
    const data = JSON.stringify({
      id: 0,
      jsonrpc: '2.0',
      method: 'HandshakeNew',
      challenge: '1KuWTlL2X2nlQNxd1mWFwgn',
      params: [
        `IJC${body?.mdn}`,
        'WEB',
        'Apple',
        'iPhone',
        '13.3',
        'MySmartfren',
        '7.2',
        'indonesia',
        '480',
      ],
      imei: '867306034317506',
      imeis: {
        meid: 'TESTSIP1000001',
        imei1: '3521664735216647',
        imei2: '3521664735216647',
      },
      he_params: {
        http_imsi: 'IJC628881851557',
        http_msisdn: '628815341123',
        http_imeisv: '3521664735216647',
        http_imei: '3521664735216647',
        http_location_info: null,
        http_uli: null,
      },
      app_token: '',
      my_params: [],
    });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: isAssembly ? URL.handshake : URL.handshake_prod,
      url: url,
      headers: headers,
      data: data,
    };

    return axios
      .request(config)
      .then((response: AxiosResponse<handShakeResponseData>) => {
        const data = response?.data?.result;
        const filteredData = {
          status: data.status,
          msg: data.msg,
          data: {
            session_id: data.data.session_id,
          },
        };
        const cookieList = cookies();
        IS_USING_PRODUCTION === 'true'
          ? (cookieList.set('prod', '1', {
              path: '/',
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 60 * 60 * 24 * 7, // 1 week
            }),
            cookieList.set('staging', '0', {
              path: '/',
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 60 * 60 * 24 * 7, // 1 week
            }))
          : (cookieList.set('prod', '0', {
              path: '/',
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 60 * 60 * 24 * 7, // 1 week
            }),
            cookieList.set('staging', '1', {
              path: '/',
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 60 * 60 * 24 * 7, // 1 week
            }));
        cookieList.set('session_id', data.data.session_id, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        return NextResponse.json(filteredData);
      })
      .catch(error => {
        return NextResponse.json({
          message: error?.message,
          error: error?.response?.data ?? {},
        });
      });
  } catch (error) {
    return NextResponse.json(error?.data);
  }
}
