'use client';
import styles from './style.module.scss';
import {useEffect, useState} from 'react';
import {ImageAsset} from '../ImageAsset';
import '../../styles/RemoveIconInputFields.css';

interface InputFieldsProps {
  inputUser?: string;
  setInputUser: (text: string) => void;
  onChangeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  htmlFor?: string;
  classNameInput?: string;
  messageUser?: string;
  onClear?: () => void;
  type?: string;
  placeholder?: string;
}

const InputFields = ({
  inputUser,
  type = 'text',
  setInputUser,
  onChangeCallback,
  classNameInput,
  label,
  htmlFor,
  messageUser,
  onClear,
  placeholder,
}: InputFieldsProps) => {
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

  return (
    <div
      className={`flex lg:space-x-2 md:space-x-0 xs:space-x-0 items-center w-full xs:px-3 md:p-0 flex-row`}>
      <div className="relative flex items-center w-full">
        <div className={`   w-full`}>
          <div className={``}>
            <div
              className={
                message === ''
                  ? `${styles.inputgroup}  `
                  : `${styles.inputgroup} ${styles.error}  `
              }>
              <label
                className={`${styles.inputgroup__label} ${
                  messageUser === '' ? 'text-[#878787]' : 'text-[#dc3545]'
                } text-xs`}
                htmlFor={htmlFor}>
                {label}
              </label>
              <input
                type={type}
                id="myInput"
                className={`${styles.inputgroup__input}  ${classNameInput} `}
                value={inputUser}
                onChange={e => handleChange(e, e.target.value)}
                autoComplete="off"
                placeholder={placeholder}
                name="input-user"
              />
              {inputUser && (
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
        {/* <input
          className={`rounded px-4 py-2 pr-10 border-[1px   ] border-[#0000003B] w-full ${
            showButton ? 'mr-[12px]' : ''
          }`}
          type={type}
          value={value}
          maxLength={maxLength}
          onChange={e => onMdnInputChange(e.target.value)}
          placeholder={placeholder}
        /> */}
      </div>
      {/* {showButton && (
        <button
          className={`px-4 py-2 rounded ${
            isButtonDisabled ? 'bg-[#FFE5EB]' : 'bg-[#FF1659]'
          } text-white w-[124px] mt-[0] transform active:scale-[0.96]`}
          disabled={isButtonDisabled}
          onClick={() => onClickButton(value)}>
          {buttonLabel}
        </button>
      )} */}
    </div>
  );
};

export default InputFields;
