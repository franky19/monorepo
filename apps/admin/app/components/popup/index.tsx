import {ImageAsset} from '../ImageAsset';

const PopupModalAlert = ({hidePopup, message, status}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white shadow-md relative flex flex-col w-[662px] h-[300px] p-8 rounded-lg mx-[24px]">
        <button className="absolute top-4 right-4" onClick={hidePopup}>
          <ImageAsset
            className="w-full cursor-pointer "
            src={'ic_x.svg'}
            width={348}
            height={149}
          />
        </button>
        <div className="popup-body flex flex-col items-center justify-center h-full">
          <div className="">
            {status !== '0' ? (
              <ImageAsset
                src={'icons/alert.svg'}
                width={60}
                height={60}
                className="mx-auto my-3"
              />
            ) : (
              <ImageAsset
                src={'icons/success.svg'}
                width={60}
                height={60}
                className="mx-auto my-3"
              />
            )}
            <h1 className="font-cardTitle text-[16px] text-black mx-auto text-center">
              {status !== '0'
                ? 'Pembelian Voucher Anda Gagal'
                : 'Pembelian Voucher Anda Berhasil'}
            </h1>
          </div>
          <p className="mt-4 font-secondary text-sm text-black flex mx-auto text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupModalAlert;
