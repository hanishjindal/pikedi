import React from 'react'
import LoginType from './LoginType'

const Login = () => {
    return (
        <div className='w-full h-full pt-16'>
            <div className="flex flex-col lg:flex-row gap-10 w-full h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white">
                <LoginType who="Editor" />

                {/* Divider */}
                <div className="w-full lg:w-[1px] h-[1px] lg:h-full bg-gray-300"></div>

                <LoginType who="Studio" />
            </div>
        </div>
    )
}

export default Login