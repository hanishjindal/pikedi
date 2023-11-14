import React, { useEffect, useState } from 'react'

interface ModalProps {
    children: React.ReactNode;
    reset: () => void
}

const Modal: React.FC<ModalProps> = ({
    children,
    reset
}) => {
    const scrollPosition = window.scrollY;

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        // Cleanup function to enable scrolling when the modal is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const calculateTopMargin = () => {
        const vhMargin = window.innerHeight * 0.3; // 30% of the viewport height
        return `${scrollPosition + vhMargin}px`;
    };
    return (
        <div
            className='absolute w-screen h-full top-0 left-0 flex justify-center backdrop-blur-[2px] z-[10]'
            onClick={reset}
        >
            <div className='bg-white border rounded-lg p-10 shadow-lg h-fit'
                style={{ marginTop: calculateTopMargin() }}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal