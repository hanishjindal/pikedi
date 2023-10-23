import React from 'react';

interface LoginTypeProps {
    who: string;
}

const LoginType: React.FC<LoginTypeProps> = ({ who }) => {
    return (
        <div
            className='p-7 flex flex-col justify-center items-center shadow-lg gap-10 w-full lg:w-[45%] h-full rounded-lg bg-white'
        >
            <div className='font-bold text-3xl'> For <span className='text-theme'>{who}</span> </div>
            <button
                className='font-semibold bg-theme text-xl mt-5 rounded-lg cursor-pointer p-4 px-8 text-white'
            >Sign In
            </button>
        </div>
    )
}

export default LoginType