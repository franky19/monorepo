import {BASE_PATH} from '@/config/devconfig';

const ApiList: {[key: string]: string} = {
  handShake: BASE_PATH + '/api/hand-shake',
  voucherCode: BASE_PATH + '/api/voucher-code',
  topup: BASE_PATH + '/api/topup',
  hello: BASE_PATH + '/api/hello',
  authucms: BASE_PATH + '/api/authucms',
};

export default ApiList;
