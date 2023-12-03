import React, { ReactElement, ChangeEvent, RefObject } from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import { BsArrowRightCircleFill } from 'react-icons/bs'

interface InputProps {
    name: boolean;
    setName: (value: boolean) => void;
    label: string;
    inputValue: string | number | undefined;
    setInputValue: (value: any) => void;
    nameRef?: RefObject<HTMLInputElement>;
    fieldType: 'text' | 'password' | 'email' | 'number';
    fieldRequired: boolean;
    placeholder?: string;
    fieldClick: (e: any) => void;
    isSubmitting?: boolean;
    hidePassPointer?: boolean;
    max?: number;
    min?: number;
}

const Input: React.FC<InputProps> = ({
    name,
    setName,
    label,
    inputValue,
    setInputValue,
    nameRef,
    fieldType,
    fieldRequired,
    placeholder,
    fieldClick,
    isSubmitting,
    hidePassPointer,
    max,
    min
}: InputProps): ReactElement => {
    return (
        <div className="m-3 flex flex-col h-8 cursor-text justify-center duration-200 relative" onClick={fieldClick}>
            <label htmlFor={label} className={`duration-200 w-full ${(name || inputValue) ? 'text-sm' : 'text-lg'} text-gray-500 cursor-text`}>
                {label}
            </label>
            <input
                type={fieldType}
                id={label}
                required={fieldRequired}
                placeholder={placeholder}
                className={`${!(name || inputValue) ? 'h-0 duration-200' : ''} ${isSubmitting && 'cursor-not-allowed'} focus-visible:outline-none ${fieldType === 'password' && 'mr-6'}`}
                ref={nameRef}
                value={inputValue}
                disabled={isSubmitting}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                minLength={min}
                maxLength={max}
                onFocus={() => setName(true)}
            />
            {(!hidePassPointer && fieldType === 'password') &&
                <button
                    type='submit'
                    className='absolute right-0 cursor-pointer !opacity-100 h-full disabled:cursor-default'
                    onClick={(e) => { e.stopPropagation() }}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ?
                        <SyncLoader size={4} />
                        :
                        <BsArrowRightCircleFill className="w-5" size={20} />
                    }
                </button>
            }
        </div>
    );
};

export default Input;
