import React from 'react'
import LoginType from './LoginType'

const Login = () => {
    return (
        <div className='w-full h-full pt-16'>
            <div className="flex flex-col lg:flex-row gap-10 w-full min-h-full h-auto lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white">
                <LoginType
                    who="Editor"
                    content="Elevate your editing skills and creativity as a Photo Editing Specialist. Join our community and start enhancing stunning photos."
                />

                {/* Divider */}
                <div className="w-full lg:w-[1px] h-[1px] lg:h-full bg-gray-400"></div>

                <LoginType
                    who="Studio"
                    content="Find the perfect Photo Editor for your studio. Join our platform to connect with talented editing professionals."
                />
            </div>

        </div>
    )
}

export default Login