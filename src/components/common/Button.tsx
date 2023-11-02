import React from 'react';
import { SyncLoader } from 'react-spinners';

interface ButtonProps {
    children: React.ReactNode;
    type: 'primary' | 'secondary';
    className: string;
    handleClick: () => void;
    isSubmitting?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, type, className, handleClick, isSubmitting }) => {
    return (
        <button
            className={`${className} flex justify-center items-center rounded-lg ${type === 'primary' ? 'text-white bg-theme' : 'text-black bg-white'} disabled:cursor-not-allowed disabled:opacity-60`}
            onClick={handleClick}
            disabled={isSubmitting}
        >
            {isSubmitting ?
                <SyncLoader size={4} color='#fff' />
                :
                children
            }
        </button>
    );
};

export default Button;