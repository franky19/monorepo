import axios, {AxiosResponse} from 'axios';
import {NextRequest, NextResponse} from 'next/server';

const databaseSecret = 'JN5ep511HjzycXISjnCEXyyDOJ7kX0PUDNUTHWCk';

export type LogsResponse = {
  [keyof: string]: {
    config: {
      data: {
        [keyof: string]: string | number;
      };
      headers: {
        [keyof: string]: string | number;
      };
      method: string;
      url: string;
    };
    functionName: string;
    id: string;
    response: {[keyof: string]: string | number};
  };
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    let endpoint =
      'https://mysmartfren-1049.firebaseio.com/do-logs.json?auth=' +
      databaseSecret +
      '&orderBy=%22$key%22&limitToLast=50';

    if (payload?.lastItemKey) {
      endpoint += '&endAt=%22' + payload?.lastItemKey + '%22';
    }

    return axios
      .request({
        method: 'GET',
        url: endpoint,
      })
      .then((response: AxiosResponse<LogsResponse>) => {
        return NextResponse.json(response.data);
      })
      .catch(error => {
        return NextResponse.json({
          message: error?.message,
          retry: error?.response?.data?.status === 6,
          error: error?.response?.data ?? {},
        });
      });
  } catch (err) {
    return NextResponse.json({status: 500, message: 'SERVER ERROR'});
  }
}
