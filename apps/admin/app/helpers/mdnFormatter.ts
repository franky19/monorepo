/**
 * mdnFormatter
 * ---
 *
 * ---
 *
 * Convert phone numbers from '6285621017923' to '+62-856-210-179-23'.
 *
 * @param mdn
 * The phone number in string.
 */

export default function formatMdn(mdn: string, isLeadingZero = true) {
  if (!mdn) {
    return mdn;
  }
  const parsedMDN =
    mdn.substring(0, 2) === '62'
      ? mdn.substr(2)
      : mdn.substring(0, 1) === '0'
      ? mdn.substr(1)
      : mdn;

  let newStr = '';

  let i: number;
  for (i = 0; i < Math.floor(parsedMDN.length / 3) - 1; i++) {
    newStr = newStr + parsedMDN.substr(i * 3, 3) + '-';
  }
  let lastStr = parsedMDN.substr(i * 3);
  if (lastStr.length > 4) {
    newStr = newStr.substr(0, newStr.length - 1);
    newStr = newStr + lastStr.substr(0, 1) + '-';
    lastStr = lastStr.substr(1);
  }
  return (isLeadingZero ? '0' : '+62-') + newStr + lastStr;
}

/**
 * convertTo62to0
 * ---
 *
 * ---
 *
 * Convert phone numbers from '62xxx' to '0xxx'.
 *
 * @param mdn
 * The phone number in string.
 */
export const convert62to0 = (mdn: string) => {
  return mdn.replace(/^62/, '0');
};

/**
 * convertTo62
 * ---
 *
 * ---
 *
 * Convert phone numbers from '0xxx' to '62xxx'.
 *
 * @param mdn
 * The phone number in string.
 */
export function convertTo62(mdn: string) {
  const newMdn = mdn.replace(/^0/, '62');
  return newMdn;
}

/**
 * mdnFormatter08xx
 * ---
 *
 * ---
 *
 * default: ' '
 * Convert phone numbers from '6285621017923' to '0856 2101 7923'.
 * ext: sparator '-'
 * Convert phone numbers from '6285621017923' to '0856-2101-7923'.
 *
 * @param mdn
 * The phone number in string.
 */

export function formatMdnZeroWithSeparator(mdn: string, separator = ' ') {
  if (!mdn) {
    return mdn;
  }
  const parsedMDN =
    mdn.substring(0, 2) === '62'
      ? mdn.substr(2)
      : mdn.substring(0, 1) === '0'
      ? mdn.substr(1)
      : mdn;

  let newStr = '';

  let i;
  for (i = 0; i < Math.floor(parsedMDN.length / 3) - 1; i++) {
    newStr = newStr + parsedMDN.substr(i * 3, 3) + separator;
  }
  let lastStr = parsedMDN.substr(i * 3);
  if (lastStr.length > 4) {
    newStr = newStr.substr(0, newStr.length - 1);
    newStr = newStr + lastStr.substr(0, 1) + separator;
    lastStr = lastStr.substr(1);
  }
  return '0' + newStr + lastStr;
}

export function formatMdnWithSpace(mdn: string) {
  mdn = mdn.replace(/\s/g, '');
  return mdn.toString().replace(/\d{4}(?=.)/g, '$& ');
}

export function removeSpaceAndDash(mdn: string) {
  return mdn.replace(/\s/g, '').replace(/\\-/g, '');
}

export function numberOnly(mdn: string) {
  return mdn.replace(/[^0-9\s]/g, '');
}

export const validationInputVoucherData = (voucherValue: string) => {
  if (/^\d*$/.test(voucherValue) && voucherValue.length <= 18) {
    if (
      voucherValue.length < 1 ||
      voucherValue.length === 16 ||
      voucherValue.length === 18
    )
      return '';
    else return 'Silakan isi 16 atau 18 digit kode';
  }
};

/**
 * isNumeric will check the data numeric or no
 * ---
 *
 * ---
 *
 * the return will boolean true or false,
 * @param data
 * the data will string. you can used mdn, voucher code, etc
 */
export const isNumeric = (data: string) => {
  return /^\d+$/.test(data);
};
