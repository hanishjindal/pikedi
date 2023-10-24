import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    type: 'primary' | 'secondary';
    className: string;
    handleClick: () => {}
}
const Button: React.FC<ButtonProps> = ({ children, type, className, handleClick }) => {
    return (
        <button
            className={`${className} flex justify-center items-center rounded-lg ${type === 'primary' ? 'text-white bg-theme' : 'text-black bg-white'
                }`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Button;