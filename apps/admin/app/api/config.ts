import {IS_USING_MOCK} from '@/config/devconfig';
export const IS_MOCK = IS_USING_MOCK;

const ASSEMBLY_CUSTINFO_API = 'https://custinfo.smartfren.com/assembly';
const PROD_CUSTINFO_API = 'https://custinfo.smartfren.com';
const ENGINE_ASSEMBLY = 'https://custinfo.smartfren.com/assembly/engine';
const ENGINE_PROD = 'https://custinfo.smartfren.com/engine';
const UCMS_STG = 'https://ucms-api-stg.smartfren.com';
const UCMS_PROD = 'https://ucms-api.smartfren.com';

const URL = {
  // ASSEMBLY ENDPOINT
  hello: `${ENGINE_ASSEMBLY}/v5/hello`,
  handshake: `${ASSEMBLY_CUSTINFO_API}/api/index.php/hot7api?getProfileMdn`,
  voucherCode: `${ASSEMBLY_CUSTINFO_API}/api/index.php/hot7api`,
  topup: `${UCMS_STG}/ucms/api/v1/marketplace/remoteconfig`,
  authUcms: `${UCMS_STG}/ucms/api/v1/login`,
  // topup: `${ASSEMBLY_CUSTINFO_API}/api/index.php/hot7api?getStaticContent`,

  // PROD ENDPOINT
  hello_prod: `${ENGINE_PROD}/v5/hello`,
  handshake_prod: `${PROD_CUSTINFO_API}/api/index.php/hot7api?getProfileMdn`,
  voucherCode_prod: `${PROD_CUSTINFO_API}/api/index.php/hot7api`,
  topup_prod: `${UCMS_PROD}/ucms/api/v1/marketplace/remoteconfig`,
  authUcms_prod: `${UCMS_PROD}/ucms/api/v1/login`,
  // topup_prod: `${PROD_CUSTINFO_API}/api/index.php/hot7api?getStaticContent`,
};

export default URL;
