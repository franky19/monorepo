/**
 * dateFormatter
 * ---
 *
 * ---
 *
 * Convert "dd/mm/yyyy" format into "dd Mon yyyy" date format. May also include time.
 *
 * @param date
 * The date to be formatted.
 *
 * @param showHour
 * Whether to include time in the formatted date.
 *
 */

import moment from 'moment';

type Content = {en: string; id: string};

export default function dateFormatter(
  date: string,
  showHour = false,
  fullMonth = false,
) {
  const EXPECTED_DATE_FORMAT = /^\d{2}\/\d{2}\/\d{4}/;
  const EXPECTED_COMPLETE_DATE_FORMAT = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/;
  const MONTH_MAP = fullMonth ? MAPPED_MONTH_FULL : MAPPED_MONTH;
  if (date && EXPECTED_DATE_FORMAT.test(date)) {
    const [dd, month, year] = date.toString().split('/');
    let hourMinute = '';
    if (EXPECTED_COMPLETE_DATE_FORMAT.test(date)) {
      hourMinute = showHour ? date.substring(11, 16) : '';
    }
    const idConvertedDate = `${dd} ${MONTH_MAP[month].id} ${year.substr(0, 4)}${
      showHour ? ' ' : ''
    }${hourMinute}`;
    const enConvertedDate = `${dd} ${MONTH_MAP[month].en} ${year.substr(0, 4)}${
      showHour ? ' ' : ''
    }${hourMinute}`;

    return {
      en: enConvertedDate,
      id: idConvertedDate,
    };
  }
  return {en: '', id: ''};
}

const MAPPED_MONTH: {[key: string]: Content} = {
  '01': {
    en: 'Jan',
    id: 'Jan',
  },
  '02': {
    en: 'Feb',
    id: 'Feb',
  },
  '03': {
    en: 'Mar',
    id: 'Mar',
  },
  '04': {
    en: 'Apr',
    id: 'Apr',
  },
  '05': {
    en: 'May',
    id: 'Mei',
  },
  '06': {
    en: 'Jun',
    id: 'Jun',
  },
  '07': {
    en: 'Jul',
    id: 'Jul',
  },
  '08': {
    en: 'Aug',
    id: 'Agu',
  },
  '09': {
    en: 'Sep',
    id: 'Sep',
  },
  '10': {
    en: 'Oct',
    id: 'Okt',
  },
  '11': {
    en: 'Nov',
    id: 'Nov',
  },
  '12': {
    en: 'Dec',
    id: 'Des',
  },
};

/**
 * promoDtlsDateFormatter
 * ---
 *
 * ---
 * 2020-11-01 00:00:00
 * Convert "yyyy-mm-dd hh:mm:ss" format into "mmm dd" date format. May also include year.
 *
 * @param dateStr
 * The date to be formatted.
 *
 * @param showYear
 * Whether to include year in the formatted date.
 *
 */

export function promoDtlsDateFormatter(dateStr: string, showYear = false) {
  if (dateStr) {
    const dateAndTimeSplit = dateStr.toString().split(' ');
    const [year, month, dd] = dateAndTimeSplit[0].toString().split('-');

    const idConvertedDate = `${MAPPED_MONTH[month].id} ${dd}${
      showYear ? `, ${year}` : ''
    }`;
    const enConvertedDate = `${MAPPED_MONTH[month].en} ${dd}${
      showYear ? `, ${year}` : ''
    }`;

    return {
      en: enConvertedDate,
      id: idConvertedDate,
    };
  }
  return {en: '', id: ''};
}

/**
 * purchaseDateFormatter
 * ---
 *
 * ---
 * 13-02-2021 10:14
 * Convert "dd-mm-yyyy hh:mm" format into "dd mmm yyyy, hh:mm" date format. May also include time.
 *
 * @param dateStr
 * The date to be formatted.
 *
 * @param showTime
 * Whether to include time in the formatted date.
 *
 */

export function purchaseDateFormatter(dateStr: string, showTime = false) {
  if (dateStr) {
    const dateAndTimeSplit = dateStr.toString().split(' ');
    const [dd, month, year] = dateAndTimeSplit[0].toString().split('-');

    const idConvertedDate = `${dd} ${MAPPED_MONTH[month].id} ${year}${
      showTime ? `, ${dateAndTimeSplit[1].substring(0, 8)}` : ''
    }`;
    const enConvertedDate = `${dd} ${MAPPED_MONTH[month].en} ${year}${
      showTime ? `, ${dateAndTimeSplit[1].substring(0, 8)}` : ''
    }`;

    return {
      en: enConvertedDate,
      id: idConvertedDate,
    };
  }
  return {en: '', id: ''};
}

export const LOCAL_MONTH = {
  id: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ],
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Des',
  ],
};

/**
 * voucherDateFormatter
 * ---
 *
 * ---
 * 2020-11-01 00:00:00 15 May 2021, 15:59
 * Convert "yyyy-mm-dd hh:mm:ss" format into "dd mmm yyyy, hh:mm" date format. May also include time.
 *
 * @param dateStr
 * The date to be formatted.
 *
 * @param showHour
 * Whether to include time in the formatted date.
 *
 */

export function voucherDateFormatter(dateStr: string, showHour = false) {
  if (dateStr) {
    const dateAndTimeSplit = dateStr.toString().split(' ');
    const [year, month, dd] = dateAndTimeSplit[0].toString().split('-');

    const idConvertedDate = `${dd} ${MAPPED_MONTH[month].id} ${year}${
      showHour ? `, ${dateAndTimeSplit[1].substr(0, 5)}` : ''
    }`;
    const enConvertedDate = `${dd} ${MAPPED_MONTH[month].en} ${year}${
      showHour ? `, ${dateAndTimeSplit[1].substr(0, 5)}` : ''
    }`;

    return {
      en: enConvertedDate,
      id: idConvertedDate,
    };
  }
  return {en: '', id: ''};
}

/**
 * wlcmBonusDateFormatter
 * ---
 *
 * ---
 * 2021-01-04 00:00:00
 * Convert "yyyy-mm-dd hh:mm:ss" format into "dd month yyyy" date format.
 *
 * @param dateStr
 * The date to be formatted.
 *
 */

export function wlcmBonusDateFormatter(dateStr: string) {
  if (dateStr) {
    const dateAndTimeSplit = dateStr.toString().split(' ');
    const [year, month, dd] = dateAndTimeSplit[0].toString().split('-');

    const idConvertedDate = `${dd} ${MAPPED_MONTH_FULL[month].id} ${year}`;
    const enConvertedDate = `${dd} ${MAPPED_MONTH_FULL[month].en} ${year}`;

    return {
      en: enConvertedDate,
      id: idConvertedDate,
    };
  }
  return {en: '', id: ''};
}

const MAPPED_MONTH_FULL: {[key: string]: Content} = {
  '01': {
    en: 'January',
    id: 'Januari',
  },
  '02': {
    en: 'February',
    id: 'Februari',
  },
  '03': {
    en: 'March',
    id: 'Maret',
  },
  '04': {
    en: 'April',
    id: 'April',
  },
  '05': {
    en: 'May',
    id: 'Mei',
  },
  '06': {
    en: 'June',
    id: 'Juni',
  },
  '07': {
    en: 'July',
    id: 'Juli',
  },
  '08': {
    en: 'August',
    id: 'Agustus',
  },
  '09': {
    en: 'September',
    id: 'September',
  },
  '10': {
    en: 'October',
    id: 'Oktober',
  },
  '11': {
    en: 'November',
    id: 'November',
  },
  '12': {
    en: 'December',
    id: 'Desember',
  },
};

/**
 * wlcmBnsClaimDateFormatter
 * ---
 *
 * ---
 * 02/09/2021 09:36:28
 * Convert "dd/mm/yyyy hh:mm:ss" format into "dd mmm yyyy, hh:mm" date format. May also include time.
 *
 * @param dateStr
 * The date to be formatted.
 *
 * @param showHour
 * Whether to include time in the formatted date.
 *
 */

export function wlcmBnsClaimDateFormatter(dateStr: string, showHour = false) {
  if (dateStr) {
    try {
      const dateAndTimeSplit = dateStr.toString().split(' ');
      const [dd, month, year] = dateAndTimeSplit[0].toString().split('/');
      const idConvertedDate = `${dd} ${MAPPED_MONTH[month].id} ${year}${
        showHour ? `, ${dateAndTimeSplit[1].substr(0, 5)}` : ''
      }`;
      const enConvertedDate = `${dd} ${MAPPED_MONTH[month].en} ${year}${
        showHour ? `, ${dateAndTimeSplit[1].substr(0, 5)}` : ''
      }`;
      return {
        en: enConvertedDate,
        id: idConvertedDate,
      };
    } catch (error) {
      return {en: '', id: ''};
    }
  }
  return {en: '', id: ''};
}

/**
 * cacheDataFormatDate
 * ---
 *
 * ---
 * 2020-11-01 00:00:00 15 May 2021, 15:59
 * Convert "moment date & time integer" format into locale format
 * en: "dd mmm yyyy, h:mm A"
 * id: "dd mmm yyyy, pukul HH:mm"
 *
 * @param dateInt
 * The date to be formatted. from moment date & time integer
 *
 * @param languageCode
 * Language to format
 *
 */

export function cacheDataFormatDate(
  dateInt: string,
  languageCode: 'id' | 'en',
) {
  if (dateInt) {
    const momentDate = moment(dateInt);
    if (languageCode === 'en') {
      const enConvertedDate = momentDate
        .locale('en')
        .format('MMM D yyyy, h:mm A');
      return enConvertedDate;
    }
    if (languageCode === 'id') {
      const idConvertedDate = momentDate
        .locale('id')
        .format('D MMM yyyy, [pukul] HH:mm');
      return idConvertedDate;
    }
  }
  return '';
}
