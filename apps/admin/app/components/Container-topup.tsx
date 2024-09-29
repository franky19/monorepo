import InputFields from './inputFields/InputFields';
import {useCallback, useEffect, useState} from 'react';
import '../styles/ContainerTopup.css';
import {useRouter, useSearchParams} from 'next/navigation';
import {useVoucherTopup} from '@/hooks/useVoucherTopup';
import {useSelector} from 'react-redux';
import {ReduxState} from '@/store';
import Tabs from './Tabs';
import {voucherCodeResponseResult} from '@/slices/voucherTopupSlice';
import {isNumeric, validationInputVoucherData} from '@/helpers/mdnFormatter';
import NominalComponent from './NominalComponent';
import VoucherDataComponent from './KodeVoucherComponent';
import PopupModalScanner from './popup/popupScanner';
import PopupModalAlert from './popup';
import ButtonTopup from './Buttons/buttonTopup';

const useTabItems = (
  listTopupResponse,
  isLoadingFetchNominal,
  getNominalTopupAndConvertToArray,
  selectedIndex,
  handleCardClick,
  setVoucherCode,
  voucherCode,
  handleOnVoucherCodeChange,
  messageErrorVoucherCode,
  setShowScanner,
  showScanner,
  handleOnClearVoucherData,
) => {
  const tabsItems = [
    {
      label: 'Nominal',
      content: (
        <NominalComponent
          isLoadingFetchNominal={isLoadingFetchNominal}
          listTopupResponse={listTopupResponse}
          getNominalTopupAndConvertToArray={getNominalTopupAndConvertToArray}
          selectedIndex={selectedIndex}
          handleCardClick={handleCardClick}
        />
      ),
    },
    {
      label: 'Kode Voucher',
      content: (
        <VoucherDataComponent
          setVoucherCode={setVoucherCode}
          voucherCode={voucherCode}
          handleOnVoucherCodeChange={handleOnVoucherCodeChange}
          messageErrorVoucherData={messageErrorVoucherCode}
          setShowScanner={setShowScanner}
          showScanner={showScanner}
          handleOnClearVoucherData={handleOnClearVoucherData}
        />
      ),
    },
  ];

  const defaultTabItems = [
    {
      label: 'Nominal',
      content: <></>,
    },
    {
      label: 'Kode Voucher',
      content: <></>,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabsItems[0].label);

  return {activeTab, setActiveTab, tabsItems, defaultTabItems};
};

const useVoucherTopupState = () => {
  const [mdn, setMDN] = useState<string>('');
  const [messageErrorMDN, setMessageErrorMDN] = useState<string>('');
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedTopup, setSelectedTopup] = useState<number | null>(null);
  const [messageErrorVoucherCode, setMessageErrorVoucherCode] =
    useState<string>('');
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [dataSubmitVoucherData, setDataSubmitVoucherData] =
    useState<voucherCodeResponseResult>(null);
  return {
    mdn,
    setMDN,
    messageErrorMDN,
    setMessageErrorMDN,
    voucherCode,
    setVoucherCode,
    selectedIndex,
    setSelectedIndex,
    selectedTopup,
    setSelectedTopup,
    messageErrorVoucherCode,
    setMessageErrorVoucherCode,
    showScanner,
    setShowScanner,
    showPopup,
    setShowPopup,
    dataSubmitVoucherData,
    setDataSubmitVoucherData,
  };
};

const useReduxState = () => {
  const listTopupResponse = useSelector(
    (state: ReduxState) =>
      state?.voucherTopup?.topupResponse?.response?.data?.defaultNominal,
  );

  const isLoadingFetchNominal = useSelector(
    (state: ReduxState) =>
      state?.voucherTopup?.topupResponse?.loading ||
      state?.voucherTopup?.authUcmsResponse?.loading,
  );

  const isLoadingSubmitData = useSelector(
    (state: ReduxState) =>
      state?.voucherTopup?.handShakeResponse?.loading ||
      state?.voucherTopup?.VoucherCodeResponse?.loading ||
      state?.voucherTopup?.submitTopup?.loading ||
      state?.voucherTopup?.helloResponse?.loading,
  );
  return {
    isLoadingSubmitData,
    isLoadingFetchNominal,
    listTopupResponse,
  };
};

const ContainerTopup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {submitVoucherDataAndSessionID, submitTopup, fetchNominalTopupFromAPI} =
    useVoucherTopup();

  const {
    mdn,
    setMDN,
    messageErrorMDN,
    setMessageErrorMDN,
    voucherCode,
    setVoucherCode,
    selectedIndex,
    setSelectedIndex,
    selectedTopup,
    setSelectedTopup,
    messageErrorVoucherCode,
    setMessageErrorVoucherCode,
    showScanner,
    setShowScanner,
    showPopup,
    setShowPopup,
    dataSubmitVoucherData,
    setDataSubmitVoucherData,
  } = useVoucherTopupState();

  const {isLoadingSubmitData, isLoadingFetchNominal, listTopupResponse} =
    useReduxState();

  const ValidationInputMaxLengthVoucherCode = useCallback(
    (voucherValue?: string) => {
      const voucherValueImplemented = voucherValue.replace(/[^0-9]/g, '');
      const trimmedValue = voucherValueImplemented.slice(0, 18);
      const messageValidationVoucherData =
        validationInputVoucherData(trimmedValue);
      setMessageErrorVoucherCode(messageValidationVoucherData);
      setVoucherCode(trimmedValue);
    },
    [setVoucherCode, setMessageErrorVoucherCode],
  );

  const handleOnVoucherCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const voucherValue = e.target.value;
      ValidationInputMaxLengthVoucherCode(voucherValue);
    },
    [ValidationInputMaxLengthVoucherCode],
  );

  const handleOnClearMdn = useCallback(() => {
    setMDN('');
    setMessageErrorMDN('');
  }, [setMDN, setMessageErrorMDN]);

  const handleOnClearVoucherData = useCallback(() => {
    setVoucherCode('');
    setMessageErrorVoucherCode('');
  }, [setVoucherCode, setMessageErrorVoucherCode]);

  const validationInputMaxlengthMDN = useCallback(
    (mdnValue?: string, maxLength?: number, testResult?: boolean) => {
      const trimmedValue = mdnValue.slice(0, maxLength);
      setMDN(trimmedValue);
      if (mdnValue.length <= maxLength) {
        if (!testResult && mdnValue.length > 0)
          setMessageErrorMDN('Maaf, nomor Kamu tidak valid. Coba lagi ya.');
        else setMessageErrorMDN('');
      }
    },
    [setMDN, setMessageErrorMDN],
  );

  const handleOnMdnInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const mdnValue = e.target.value;
      const testResult =
        /^(\+6288|6288|6288|088|88)\d{7,30}/.test(mdnValue) &&
        mdnValue.length >= 11 &&
        mdnValue.length <= 14;
      validationInputMaxlengthMDN(mdnValue, 14, testResult);
    },
    [validationInputMaxlengthMDN],
  );

  const ValidateGetVoucherCodeFromScanner = useCallback(
    (isVoucher, voucherDataScan, isNumeric) => {
      if (isVoucher) {
        window.location.href = voucherDataScan;
      } else if (!isNumeric) {
        setMessageErrorVoucherCode(
          `Format Kode Voucher Salah ${voucherDataScan}`,
        );
        setVoucherCode('');
      } else {
        setVoucherCode(voucherDataScan);
        setMessageErrorVoucherCode('');
      }
    },
    [setVoucherCode, setMessageErrorVoucherCode],
  );

  const handleScan = useCallback(
    result => {
      result.map(resultDataScanner => {
        const voucherDataScan = resultDataScanner?.rawValue.replace(/\s+/g, '');
        const isVoucher = resultDataScanner?.rawValue.includes('voucher');
        const numericValidate = isNumeric(voucherDataScan);
        ValidateGetVoucherCodeFromScanner(
          isVoucher,
          voucherDataScan,
          numericValidate,
        );
        setShowScanner(prev => !prev);
      });
    },
    [setShowScanner, ValidateGetVoucherCodeFromScanner],
  );

  const disabledButton =
    !mdn ||
    (selectedIndex === null && !voucherCode) ||
    (messageErrorMDN === '' ? false : true) ||
    (messageErrorVoucherCode === '' ? false : true) ||
    isLoadingSubmitData;

  const onClickButton = useCallback(
    async (mdn?: string, voucherCode?: string, nominalTopup?: number) => {
      if (nominalTopup === null && voucherCode !== '') {
        const responseData: voucherCodeResponseResult =
          await submitVoucherDataAndSessionID(voucherCode, mdn);
        setDataSubmitVoucherData(responseData);
        setShowPopup(true);
      } else {
        submitTopup(nominalTopup, mdn);
      }
    },
    [
      submitVoucherDataAndSessionID,
      submitTopup,
      setDataSubmitVoucherData,
      setShowPopup,
    ],
  );

  const handleCardClick = useCallback(
    (index, nominal: number) => {
      if (selectedIndex === index) {
        setSelectedIndex(null);
        setSelectedTopup(null);
      } else {
        setSelectedIndex(index);
        setSelectedTopup(nominal);
      }
    },
    [setSelectedIndex, setSelectedTopup, selectedIndex],
  );

  const getNominalTopupAndConvertToArray = useCallback(() => {
    if (typeof listTopupResponse === 'string') {
      const nominalArray = listTopupResponse.split(';');
      const formattedNominalArray = nominalArray.map(value => [
        parseFloat(value),
      ]);
      return formattedNominalArray;
    }
  }, [listTopupResponse]);

  const {tabsItems, setActiveTab, activeTab, defaultTabItems} = useTabItems(
    listTopupResponse,
    isLoadingFetchNominal,
    getNominalTopupAndConvertToArray,
    selectedIndex,
    handleCardClick,
    setVoucherCode,
    voucherCode,
    handleOnVoucherCodeChange,
    messageErrorVoucherCode,
    setShowScanner,
    showScanner,
    handleOnClearVoucherData,
  );

  const getDataTopupFromQueryStringParams = useCallback(() => {
    const mdnParams = searchParams.get('val');
    const voucherCodeParams = searchParams.get('voucher');
    const trimmedValue = mdnParams?.slice(0, 14);
    if (voucherCodeParams) {
      setActiveTab(tabsItems[1].label);
      setVoucherCode(voucherCodeParams);
    }
    if (trimmedValue) {
      setMDN(trimmedValue);
    }
  }, [setMDN, setActiveTab, setVoucherCode, searchParams, tabsItems]);

  const resetAndFetchDefaultData = useCallback(() => {
    getDataTopupFromQueryStringParams();
    fetchNominalTopupFromAPI();
  }, [fetchNominalTopupFromAPI, getDataTopupFromQueryStringParams]);

  useEffect(() => {
    resetAndFetchDefaultData();
  }, [resetAndFetchDefaultData]);

  const hidePopup = useCallback(() => {
    setShowPopup(false);
    if (dataSubmitVoucherData?.status === '0') setVoucherCode('');
  }, [setVoucherCode, dataSubmitVoucherData?.status, setShowPopup]);

  const onSelectTabs = useCallback(
    activeTab => {
      setActiveTab(activeTab);
      setVoucherCode('');
      setSelectedIndex(null);
      setSelectedTopup(null);
    },
    [setActiveTab, setVoucherCode, setSelectedIndex, setSelectedTopup],
  );

  return (
    <div className="xs:px-[20px] lg:px-[72px] sm:mx-auto py-[25px] ">
      <div className="mb-4 flex gap-2 items-center">
        <div onClick={() => router.back()} className="flex">
          <i className="fas fa-arrow-left"></i>
        </div>
        <p className="text-base font-semibold leading-6 text-[#262626]">
          Top Up
        </p>
      </div>
      <div className="bg-white  xs:w-full sm:w-1/2 sm:mx-auto">
        <div className="mb-[20px] mt-[35px]">
          <InputFields
            type="number"
            inputUser={mdn}
            setInputUser={setMDN}
            onChangeCallback={handleOnMdnInputChange}
            messageUser={messageErrorMDN}
            label="Nomor Smartfren Kamu"
            onClear={handleOnClearMdn}
            classNameInput={`border ${
              messageErrorMDN !== ''
                ? 'border-[#dc3545] focus:border-[#dc3545]'
                : 'border-slate-200 focus:outline-none focus:border-slate-200'
            }   p-2 rounded  h-[calc(1.5em + 1.5rem + 2px)]`}
          />
          <p className="text-xs text-[#555] leading-4 font-light xs:px-3 sm:px-0 pt-1">
            Kamu bisa masukkan nomor Smartfren lain.
          </p>
        </div>
        <div className="mb-[20px] mt-[35px]">
          <Tabs
            tabItems={tabsItems ?? defaultTabItems}
            setActiveTabs={onSelectTabs}
            activeTabs={activeTab}
          />
        </div>
        <div className="mb-[20px] mt-[40px]">
          <div
            className={`flex lg:space-x-2 md:space-x-0 xs:space-x-0 items-center w-full xs:px-3 md:p-0 flex-row `}>
            <div className="relative flex items-center w-full">
              <div className={`w-full`}>
                <ButtonTopup
                  disabledButton={disabledButton}
                  onClickButton={() =>
                    onClickButton(mdn, voucherCode, selectedTopup)
                  }
                  isLoading={isLoadingSubmitData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showScanner ? (
        <PopupModalScanner
          setShowScanner={setShowScanner}
          handleScan={handleScan}
        />
      ) : (
        ''
      )}
      {showPopup && !isLoadingSubmitData ? (
        <PopupModalAlert
          hidePopup={hidePopup}
          message={dataSubmitVoucherData?.msg}
          status={dataSubmitVoucherData?.status}
        />
      ) : null}
    </div>
  );
};

export default ContainerTopup;
