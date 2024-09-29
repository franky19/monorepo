import LoadingV2 from '../Loading/LoadingV2';

type buttonProps = {
  disabledButton: boolean;
  onClickButton: (
    mdn?: string,
    voucherCode?: string,
    selectedTopup?: number | null,
  ) => void;
  mdn?: string;
  voucherCode?: string;
  selectedTopup?: number | null;
  isLoading?: boolean;
};

const ButtonTopup = ({
  disabledButton,
  onClickButton,
  mdn,
  voucherCode,
  selectedTopup,
  isLoading,
}: buttonProps) => {
  return (
    <button
      className={`${
        disabledButton
          ? 'bg-[#ff6792] hover:cursor-not-allowed'
          : 'bg-[#ff1659]'
      } xs:px-3 sm:px-0 w-full py-2 rounded mx-auto text-white`}
      disabled={disabledButton}
      onClick={() => onClickButton(mdn, voucherCode, selectedTopup)}>
      {isLoading ? <LoadingV2 /> : 'Submit'}
    </button>
  );
};

export default ButtonTopup;
