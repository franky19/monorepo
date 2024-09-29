import {NextRequest, NextResponse} from 'next/server';
import URL from '../config';
import axios, {AxiosResponse} from 'axios';
import {
  voucherCodeBody,
  voucherCodeResponseData,
  voucherCodeResponseResult,
} from '@/slices/adminSlice';
import {IS_USING_PRODUCTION} from '@/config/devconfig';

export async function POST(request: NextRequest) {
  const url =
    IS_USING_PRODUCTION === 'true' ? URL.voucherCode_prod : URL.voucherCode;
  try {
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const body: voucherCodeBody = await request.json();
    const data = JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'reloadVoucher',
      params: [body?.sessionID, 'web', '2.0.0', 'Indonesia', body?.voucherCode],
    });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      // url: isAssembly ? URL.voucherCode : URL.voucherCode_prod,
      headers: headers,
      data: data,
    };
    return axios
      .request(config)
      .then((response: AxiosResponse<voucherCodeResponseData>) => {
        if (
          response?.data?.result &&
          typeof response.data.result === 'string'
        ) {
          const resultResponse = {
            data: response.data.result,
          };

          const resultObject: voucherCodeResponseResult = JSON.parse(
            resultResponse.data,
          );
          return NextResponse.json(resultObject);
        } else {
          return NextResponse.json(response?.data);
        }
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
