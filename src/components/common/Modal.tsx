import React from 'react'

export default function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center backdrop-blur-[2px]'>
            <div className='bg-white border rounded-lg p-10 shadow-lg'>
                {children}
            </div>
        </div>
    )
}