import {NextResponse} from 'next/server';
import URL from '../config';
import {
  IS_USING_PRODUCTION,
  PASSWORD_AUTH_UCMS_PRD,
  PASSWORD_AUTH_UCMS_STG,
  USERNAME_AUTH_UCMS_PRD,
  USERNAME_AUTH_UCMS_STG,
} from '@/config/devconfig';
import axios, {AxiosResponse} from 'axios';

export type AuthUcmsResponse = {
  token: string;
};

export async function POST() {
  const url = IS_USING_PRODUCTION === 'true' ? URL.authUcms_prod : URL.authUcms;

  const USERNAME =
    IS_USING_PRODUCTION === 'true'
      ? USERNAME_AUTH_UCMS_PRD
      : USERNAME_AUTH_UCMS_STG;

  const PASSWORD =
    IS_USING_PRODUCTION === 'true'
      ? PASSWORD_AUTH_UCMS_PRD
      : PASSWORD_AUTH_UCMS_STG;

  try {
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic dWNtczpTbTRydGZyZW5XMHc=',
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: headers,
      data: {username: USERNAME, password: PASSWORD},
    };

    return axios
      .request(config)
      .then((response: AxiosResponse<AuthUcmsResponse>) => {
        return NextResponse.json(response?.data);
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
