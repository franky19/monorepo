'use client';

import {IS_SEND_ANALYTICS} from '@/config/devconfig';

export const analyticsTrackEvent = async (
  AF: (
    typeEvent: string,
    typeTrack: string,
    eventParam: {
      eventType: string;
      eventName: string;
      eventValue: {[key: string]: string};
    },
  ) => void,
  event: string,
  params: {[key: string]: string},
) => {
  // console.log(event, params);

  if (!IS_SEND_ANALYTICS) {
    return;
  }

  const encryptParam = params;
  AF('pba', 'event', {
    eventType: 'EVENT',
    eventName: event,
    eventValue: encryptParam,
  });
};
