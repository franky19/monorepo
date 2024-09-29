// import {NextRequest, NextResponse} from 'next/server';
// import URL from '../config';
// import axios, {AxiosResponse} from 'axios';
// import {
//   topupBody,
//   topupResponseDataAPIResult,
// } from '@/slices/adminPanelSlice';
// import {IS_USING_PRODUCTION} from '@/config/devconfig';

// export async function POST(request: NextRequest) {
//   const url = IS_USING_PRODUCTION === 'true' ? URL.topup_prod : URL.topup;
//   try {
//     const headers = {
//       accept: 'application/json',
//       'Content-Type': 'application/json',
//     };

//     const body: topupBody = await request.json();

//     const data = JSON.stringify({
//       id: 0,
//       jsonrpc: '2.0',
//       method: 'getStaticContent',
//       params: [
//         body?.sessionID,
//         'iOS',
//         'Apple',
//         'iPhone 15 Pro',
//         '17.5',
//         'MySmartfren',
//         '7.32.0',
//         '1',
//         '393',
//         'Indonesia',
//         '2935',
//         'NYC',
//       ],
//     });
//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: url,
//       headers: headers,
//       data: data,
//     };
//     return axios
//       .request(config)
//       .then((response: AxiosResponse<topupResponseDataAPIResult>) => {
//         const data = response?.data?.result;
// if (typeof data?.data?.topup?.defaultNominal === 'string') {
//   // Split the string into an array
//   const nominalArray = data?.data?.topup?.defaultNominal.split(';');
//   // Step 2: Format each value as Rupiah
//   const formattedTitle = nominalArray.map(value => {
//     const number = parseFloat(value).toLocaleString('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     });
//     return [number]; // Return as an array of one element
//   });
//   const formattedNominal = nominalArray.map(value => [
//     parseFloat(value),
//   ]);

//   const filteredData = {
//     status: data.status,
//     msg: data.msg,
//     data: {
//       topup: {
//         defaultTitle: formattedTitle,
//         defaultNominal: formattedNominal,
//       },
//     },
//   };
//           return NextResponse.json(filteredData);
//         }
//         // const nominalArray = data?.data?.topup?.defaultNominal.split(';');
//       })
//       .catch(error => {
//         return NextResponse.json({
//           message: error?.message,
//           error: error?.response?.data ?? {},
//         });
//       });
//   } catch (error) {
//     return NextResponse.json(error?.data);
//   }
// }

import {NextRequest, NextResponse} from 'next/server';
import URL, {IS_MOCK} from '../config';
import {IS_USING_PRODUCTION} from '@/config/devconfig';
import {topupResponseDataAPIResult} from '@/slices/adminSlice';
import axios, {AxiosResponse} from 'axios';
import {topupMock} from './mock';

export async function POST(request: NextRequest) {
  try {
    if (IS_MOCK) {
      return NextResponse.json(topupMock);
    }

    const url = IS_USING_PRODUCTION === 'true' ? URL.topup_prod : URL.topup;

    const headersValues = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.headers.get('tokenucms')}`,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: headersValues,
      data: JSON.stringify({code: 'voucher_topup'}),
    };

    return axios
      .request(config)
      .then((response: AxiosResponse<topupResponseDataAPIResult>) => {
        return NextResponse.json(response.data);
      })
      .catch(error => {
        return NextResponse.json({
          message: error.message,
          error: error?.response?.data ?? {},
        });
      });
  } catch (error) {
    return NextResponse.json(error?.data);
  }
}
