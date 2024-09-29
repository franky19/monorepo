import InputFieldsV2 from './InputFieldsv2';

interface InputFieldVoucherProps {
  setVoucherCode?: (value?: string) => void;
  inputVoucherCode?: string;
  onChangeVoucherCode?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messageErrorVoucher?: string;
  setShowScanner?: (showScanner?: boolean) => void;
  showScanner?: boolean;
  onClearVoucherCode?: () => void;
}

const InputFieldVoucher = ({
  setVoucherCode,
  inputVoucherCode,
  onChangeVoucherCode,
  messageErrorVoucher,
  setShowScanner,
  showScanner,
  onClearVoucherCode,
}: InputFieldVoucherProps) => {
  return (
    <>
      <InputFieldsV2
        type="number"
        setInputUser={setVoucherCode}
        onChangeCallback={onChangeVoucherCode}
        messageUser={messageErrorVoucher}
        label="Kode Voucer"
        showIconBarcode={!inputVoucherCode}
        inputUser={inputVoucherCode}
        onScanClick={() => setShowScanner(!showScanner)}
        onClear={onClearVoucherCode}
      />
      <p className="text-xs text-[#555] leading-4 font-light xs:px-3 sm:px-0 pt-1">
        Gosok voucer untuk lihat 16 atau 18 digit kode angka. Pastikan voucernya
        sudah sesuai ya.
      </p>
    </>
  );
};

export default InputFieldVoucher;
