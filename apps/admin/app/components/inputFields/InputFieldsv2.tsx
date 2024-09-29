'use client';
import styles from './style.module.scss';
import {useEffect, useState} from 'react';
import {ImageAsset} from '../ImageAsset';
import '../../styles/RemoveIconInputFields.css';
import {useMobileWidth} from '@/helpers/useMobileWidth';

interface InputFieldsProps {
  inputUser?: string;
  setInputUser: (text: string) => void;
  onChangeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  htmlFor?: string;
  className?: string;
  messageUser?: string;
  onClear?: () => void;
  type?: string;
  showIconBarcode?: boolean;
  onScanClick?: () => void;
}

const InputFieldsV2 = ({
  inputUser,
  type = 'text',
  setInputUser,
  onChangeCallback,
  className,
  label,
  htmlFor,
  messageUser,
  onClear,
  showIconBarcode,
  onScanClick,
}: InputFieldsProps) => {
  // const [userInput, setInputLocalUser] = useState<string>(inputUser);
  const [message, setMessage] = useState<string>('');
  const handleClear = () => {
    setInputUser('');
    if (onClear) onClear();
  };

  useEffect(() => {
    setMessage(messageUser);
  }, [messageUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, value) => {
    setInputUser(value);
    onChangeCallback(e);
  };

  const mobile = useMobileWidth();

  return (
    <div
      className={`flex lg:space-x-2 md:space-x-0 xs:space-x-0 items-center w-full xs:px-3 md:p-0 flex-row ${className}`}>
      <div className="relative flex items-center w-full">
        <div className={`${className ?? 'w-full'}`}>
          <div className={`${className ?? ''}`}>
            <div
              className={
                message === ''
                  ? `${styles.inputgroupV2}  `
                  : `${styles.inputgroupV2} ${styles.error}  `
              }>
              <label
                className={`${styles.inputgroupV2__label} text-[#878787] `}
                htmlFor={htmlFor}>
                {label}
              </label>
              <input
                type={type}
                id="myInput"
                className={`${styles.inputgroupV2__input} bg-[#F9FAFB] border border-slate-200`}
                value={inputUser}
                onChange={e => handleChange(e, e.target.value)}
                autoComplete="off"
                name="inputUser"
              />
              {showIconBarcode && inputUser === '' ? (
                <button
                  onClick={onScanClick}
                  className={`${
                    mobile ? '' : 'hidden'
                  } absolute right-[20px] text-gray-500 hover:text-gray-700 top-[8px]`}>
                  <ImageAsset
                    src={`icons/scan-icon.svg`}
                    alt="clear-icon"
                    width={25}
                    height={25}
                    className="icon"
                  />
                </button>
              ) : (
                <button
                  onClick={handleClear}
                  className="absolute right-[20px] text-gray-500 hover:text-gray-700 top-[10px]">
                  <ImageAsset
                    src={`icons/x-icon.svg`}
                    alt="clear-icon"
                    width={25}
                    height={25}
                    className="icon"
                  />
                </button>
              )}
            </div>
          </div>
          <small className="text-xs text-[#dc3545]">{message}</small>
        </div>
      </div>
    </div>
  );
};

export default InputFieldsV2;
