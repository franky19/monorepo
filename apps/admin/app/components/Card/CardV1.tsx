'use client';

import {ImageAsset} from '../ImageAsset';

type CardV1Type = {
  total?: number;
  cardTitle?: string;
  srcIcon: string;
};

const CardV1 = ({total, cardTitle, srcIcon}: CardV1Type) => {
  return (
    <div className="w-full px-6 sm:w-1/2 xl:w-1/3 xs:mb-4">
      <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
          {/*  */}
          <ImageAsset src={srcIcon} width={20} height={20} />
        </div>

        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">{total}</h4>
          <div className="text-gray-500">{cardTitle}</div>
        </div>
      </div>
    </div>
  );
};

export default CardV1;
