import React from 'react'
import LoginType from './LoginType'
import Divider from '../common/Divider'
import { LOGIN_DATA } from "../config"

const Login = () => {
    return (
        <div className='w-full h-full pt-16'>
            <div className="flex flex-col lg:flex-row gap-10 w-full min-h-full h-auto lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white">
                <LoginType
                    who={LOGIN_DATA.editorText}
                    content={LOGIN_DATA.editorContent}
                />

                {/* Divider */}
                <Divider type='tic' />

                <LoginType
                    who={LOGIN_DATA.studioText}
                    content={LOGIN_DATA.studioContent}
                />
            </div>

        </div>
    )
}

export default Login