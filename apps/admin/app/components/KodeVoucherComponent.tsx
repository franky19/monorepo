import InputFieldVoucher from './inputFields/InputFieldVoucher';

const VoucherDataComponent = ({
  setVoucherCode,
  voucherCode,
  handleOnVoucherCodeChange,
  messageErrorVoucherData,
  setShowScanner,
  showScanner,
  handleOnClearVoucherData,
}) => {
  return (
    <div className="px-4">
      <InputFieldVoucher
        setVoucherCode={setVoucherCode}
        inputVoucherCode={voucherCode}
        onChangeVoucherCode={handleOnVoucherCodeChange}
        messageErrorVoucher={messageErrorVoucherData}
        setShowScanner={setShowScanner}
        showScanner={showScanner}
        onClearVoucherCode={handleOnClearVoucherData}
      />
    </div>
  );
};

export default VoucherDataComponent;
