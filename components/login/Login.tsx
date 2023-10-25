import React, { useState } from 'react'
import LoginType from './LoginType'
import Divider from '../common/Divider'
import { LOGIN_DATA } from "../config"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

type loginType = 'who' | 'loginEditor' | 'signupEditor' | 'loginStudio' | 'signupStudio';

const Login = () => {
    const [loginFlow, setLoginFlow] = useState<loginType>('who')
    return (
        <div className='w-full h-full'>
            {loginFlow === 'who' &&
                <div className="flex flex-col lg:flex-row gap-10 w-full min-h-full h-auto lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white overflow-hidden">
                    <LoginType
                        who={LOGIN_DATA.editorText}
                        content={LOGIN_DATA.editorContent}
                        loginButton={async () => setLoginFlow('loginEditor')}
                        signupButton={async () => setLoginFlow('signupEditor')}
                    />

                    {/* Divider */}
                    <Divider type='tic' />

                    <LoginType
                        who={LOGIN_DATA.studioText}
                        content={LOGIN_DATA.studioContent}
                        loginButton={async () => setLoginFlow('loginStudio')}
                        signupButton={async () => setLoginFlow('signupStudio')}
                    />
                </div>
            }

            {loginFlow === 'loginEditor' &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white overflow-hidden">
                    <LoginForm
                        back={async () => setLoginFlow('who')}
                        WhoIsLogin='Editor'
                    />
                </div>
            }

            {loginFlow === 'signupEditor' &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white overflow-hidden">
                    <SignUpForm
                        back={async () => setLoginFlow('who')}
                        WhoIsLogin='Editor'
                    />
                </div>
            }

            {loginFlow === 'loginStudio' &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white overflow-hidden">
                    <LoginForm
                        back={async () => setLoginFlow('who')}
                        WhoIsLogin='Studio'
                    />
                </div>
            }

            {loginFlow === 'signupStudio' &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center bg-[#F6F6F6] p-10 bg-gradient-to-b from-lighest-theme to-white overflow-hidden">
                    <SignUpForm
                        back={async () => setLoginFlow('who')}
                        WhoIsLogin='Studio'
                    />
                </div>
            }
        </div>
    )
}

export default Login