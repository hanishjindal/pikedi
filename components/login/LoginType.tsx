import React from 'react'

const LoginType = () => {
    return (
        <div className="flex flex-col md:flex-row gap-10 w-full h-full justify-around items-center bg-[#F6F6F6] p-10">
            <div
                className='p-7 flex flex-col justify-center items-center shadow-lg bg-white gap-10 w-full md:w-[45%] h-full rounded-lg'
            >
                <div className='font-bold text-3xl'> Sign in as Editor </div>
                <button
                    className='font-semibold text-xl mt-5 rounded-lg border-black cursor-pointer  border-2 p-4 px-8 hover:bg-lightGray'
                >Sign In
                </button>
            </div>

            {/* Divider */}
            <div className="w-full md:w-[1px] h-[1px] md:h-full bg-gray-300"></div>

            <div
                className='p-7 flex flex-col justify-center items-center shadow-lg bg-white gap-10 w-full md:w-[45%] h-full rounded-lg'
            >
                <p className='font-bold text-3xl'> Sign in as Studio </p>
                <button className='font-semibold text-xl mt-5 rounded-lg border-black cursor-pointer border-2 p-4 px-8 hover:bg-lightGray'>Sign In </button>
            </div>
        </div>
    )
}

export default LoginType