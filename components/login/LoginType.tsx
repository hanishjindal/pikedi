import React from 'react';

interface LoginTypeProps {
    who: string;
    content: string;
}

const LoginType: React.FC<LoginTypeProps> = ({ who, content }) => {
    return (
        <div
            className='py-7 px-8 lg:py-5 lg:px-7 flex flex-col justify-center items-center shadow-lg gap-5 lg:gap-7 w-full lg:w-[45%] h-full rounded-lg bg-white'
        >
            <h1 className='font-bold text-5xl'> For <span className='text-theme'>{who}</span> </h1>
            <span className='text-center lg:text-base font-medium text-sm lg:px-16'>{content}</span>
            <button
                className='font-semibold bg-theme text-xl rounded-lg cursor-pointer p-4 px-8 text-white'
            >Sign In
            </button>

            <div className='flex justify-center items-center gap-1'>
                <span className='text-base font-normal'>Don&apos;t have an account?</span>
                <span className='text-base font-semibold cursor-pointer'>Sign up</span></div>
        </div>
    )
}

export default LoginType