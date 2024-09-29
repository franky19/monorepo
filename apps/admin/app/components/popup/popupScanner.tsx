import {Scanner} from '@yudiel/react-qr-scanner';

const PopupModalScanner = ({setShowScanner, handleScan}) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-100 z-10">
      <button
        className="absolute top-4 left-3 text-white "
        onClick={() => setShowScanner(false)}>
        X
      </button>
      <div className={`absolute w-full max-h-screen`}>
        <div className="relative  rounded-lg shadow dark:bg-gray-700 h-auto overflow-auto">
          <div className="w-full p-4 flex gap-4 flex-col">
            <Scanner
              onScan={result => handleScan(result)}
              components={{zoom: true, finder: true, torch: true}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModalScanner;
