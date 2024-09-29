export type PaymentData = {
  type: string;
  partner: string;
  isProd: boolean;
  isStaging: boolean;
  isDevelopment: boolean;
  sessionId: string;
  sessionType: string;
  url: {
    fallbackUrl: string;
    homeUrl: string;
  };
  goods: [
    {
      id: string;
      productCode: string;
      partnerCode: string;
      typeItem: string;
      name: string;
      price: number;
      promoPrice: number;
      extendData: {
        mdn: string;
      };
    },
  ];
  totalPrice: number;
  contactInfo: {mdn: string};
  summary: {
    title: string;
    imgIcon: string;
    detailPayment: [
      {title: string; info: string},
      {title: string; info: string},
    ];
    titleSummary: string;
    totalSummary: string;
    tnc: '';
    privacy: '';
  };
  targetUrl: string;
};

const createHash = () => {
  const hashIdRaw = new Date().getTime();
  try {
    const hash64 = Buffer.from(String(hashIdRaw)).toString('base64');
    return hash64;
  } catch (error) {
    return String(hashIdRaw);
  }
};

/**
 * encodeRequirement
 * ---
 * ---
 * Parse data to local storage with generated key name
 *
 * @param payload
 * string: PaymentData
 *
 */
export const encodeRequirement = async (payload: PaymentData) => {
  try {
    const dataToString = JSON.stringify(payload);
    const hashKey = createHash();
    const hashValue = Buffer.from(String(dataToString)).toString('base64');
    localStorage.setItem(hashKey, hashValue);

    // to /payment/pay?id=hash
    return hashKey;
  } catch (err) {
    return Promise.reject();
  }
};

export const moveToPayment = async (payload: PaymentData) => {
  try {
    if (payload.goods && payload.sessionId) {
      const encodedRef = await encodeRequirement(payload);
      if (encodedRef) {
        window.location.href = `${payload.targetUrl}?ref=${encodedRef}`;
      }
    } else {
      throw true;
    }
  } catch (error) {
    if (payload?.isStaging) {
      alert('Please input correct payload');
    }
    return;
  }
};
