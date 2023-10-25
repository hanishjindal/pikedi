import React, { ReactElement, ChangeEvent, RefObject } from 'react';
import SyncLoader from "react-spinners/SyncLoader";

interface InputProps {
    name: boolean;
    setName: (value: any) => void;
    label: string;
    nameText: string | number;
    setNameText: (value: any) => void;
    nameRef: RefObject<HTMLInputElement>;
    fieldType: 'text' | 'password' | 'email' | 'number';
    fieldRequired: boolean;
    placeholder?: string;
    fieldClick: (e: any) => void;
    isSubmitting?: boolean;
    max?: number;
    min?: number;
}

const Input: React.FC<InputProps> = ({
    name,
    setName,
    label,
    nameText,
    setNameText,
    nameRef,
    fieldType,
    fieldRequired,
    placeholder,
    fieldClick,
    isSubmitting,
    max,
    min
}: InputProps): ReactElement => {
    return (
        <div className="m-3 flex flex-col h-8 cursor-text justify-center duration-200 relative" onClick={fieldClick}>
            <label htmlFor="" className={`duration-200 ${(name || nameText) ? 'text-sm' : 'text-lg'} text-gray-500 cursor-text`}>
                {label}
            </label>
            <input
                type={fieldType}
                required={fieldRequired}
                placeholder={placeholder}
                className={`${!(name || nameText) ? 'h-0 duration-200' : ''} ${fieldType === 'password' && 'mr-6'}`}
                ref={nameRef}
                value={nameText}
                disabled={isSubmitting}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNameText(e.target.value)}
                min={min}
                max={max}
                onFocus={() => setName(true)}
                onBlur={() => setName(false)}
            />
            {fieldType === 'password' &&
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
                        <img className="w-5 rotate-180" src="/images/back.svg" alt="" />
                    }
                </button>
            }
        </div>
    );
};

export default Input;
