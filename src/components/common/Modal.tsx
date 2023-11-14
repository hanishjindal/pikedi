import React from 'react'

interface ModalProps {
    children: React.ReactNode;
    reset: () => void
}

const Modal: React.FC<ModalProps> = ({
    children,
    reset
}) => {
    return (
        <div
            className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center backdrop-blur-[2px]'
            onClick={reset}
        >
            <div className='bg-white border rounded-lg p-10 shadow-lg'
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal