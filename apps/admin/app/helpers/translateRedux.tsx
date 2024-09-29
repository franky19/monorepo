'use client';

import {useSelector} from 'react-redux';
import withReduxTranslation from '@/helpers/withReduxTranslation';

const translateRedux = withReduxTranslation(
  (props: {id: string; en: string}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const language = useSelector((state: any) => state?.language?.language);
    if (language === 'en') {
      return props.en;
    }
    return props.id;
  },
);

export default translateRedux;
