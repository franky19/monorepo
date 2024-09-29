import {formatRupiah} from '../helpers';
import {ImageAsset} from './ImageAsset';

const CardNominalPulsa = ({defaultNominal, handleCardClick, selectedIndex}) => {
  return (
    <>
      <div className="p-4 grid grid-cols-2 gap-4 ">
        {defaultNominal.map((nominal, index) => (
          <div className="col-span-1" key={index}>
            <button
              className={`w-full py-4 xs:px-[16px]  lg:px-[45px] border rounded-lg flex justify-between items-center ${
                selectedIndex === index
                  ? 'border-[#ff1659] scale-105'
                  : 'border-[#e9e9e9]'
              } h-[64px] border-[1px] bg-[#fff]`}
              onClick={() => handleCardClick(index, nominal[0])}>
              <div className="text-gray-700 flex items-center justify-center whitespace-nowrap">
                <ImageAsset
                  src={'icons/icon-rupiah.svg'}
                  width={32}
                  height={32}
                  className="mr-[2px]"
                />{' '}
                <p className="text-[16px] font-semibold leading-[28px]">
                  {formatRupiah(nominal[0])}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardNominalPulsa;
