import React from 'react';
import { SyncLoader } from 'react-spinners';

interface ButtonProps {
    children: React.ReactNode;
    buttonType: 'primary' | 'secondary';
    className: string;
    handleClick: () => void;
    isSubmitting?: boolean;
    type: 'button' | 'submit' | 'reset';
}
const Button: React.FC<ButtonProps> = ({
    children,
    type,
    buttonType,
    className,
    handleClick,
    isSubmitting
}) => {
    return (
        <button
            className={`${className} flex justify-center items-center rounded-lg ${buttonType === 'primary' ? 'text-white bg-theme' : 'text-black bg-white border-2'} disabled:cursor-not-allowed disabled:opacity-60`}
            onClick={handleClick}
            disabled={isSubmitting}
            type={type}
        >
            {(type !== 'reset' && isSubmitting) ?
                <SyncLoader size={4} color='#fff' />
                :
                children
            }
        </button>
    );
};

export default Button;