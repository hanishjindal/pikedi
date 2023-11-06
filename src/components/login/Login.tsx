import React, { useState } from 'react'
import LoginType from './common/LoginType'
import Divider from '../common/Divider'
import { LOGIN_DATA } from "../config"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useSearchParams, useRouter } from 'next/navigation'

const Login = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const page = searchParams.get("page")
    const type = searchParams.get("type")
    const handleLoginRoute = (paramPage?: string, paramType?: string) => {
        router.push(
            (!paramPage || !paramPage) ?
                '/login'
                :
                `/login?page=${paramPage}&type=${paramType}`
        )
    }
    return (
        <div className='w-full h-auto lg:h-[80vh]'>
            {!((page === 'signin' || page === 'signup') && (type === 'editor' || type === 'studio')) &&
                <div className="flex flex-col lg:flex-row gap-10 w-full min-h-full h-auto lg:h-full justify-around items-center py-10 px-6 sm:px-8 lg:px-10 overflow-hidden">
                    <LoginType
                        who={LOGIN_DATA.studioText}
                        content={LOGIN_DATA.studioContent}
                        loginButton={async () => handleLoginRoute('signin', 'studio')}
                        signupButton={async () => handleLoginRoute('signup', 'studio')}
                    />

                    {/* Divider */}
                    {/* <Divider type='tic' />

                    <LoginType
                        who={LOGIN_DATA.editorText}
                        content={LOGIN_DATA.editorContent}
                        loginButton={async () => handleLoginRoute('signin', 'editor')}
                        signupButton={async () => handleLoginRoute('signup', 'editor')}
                    /> */}
                </div>
            }

            {(page === 'signin' && type === 'editor') &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center py-10 px-8 lg:px-10 overflow-hidden">
                    <LoginForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='Editor'
                    />
                </div>
            }

            {(page === 'signup' && type === 'editor') &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center py-10 px-8 lg:px-10 overflow-hidden">
                    <SignUpForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='Editor'
                    />
                </div>
            }

            {(page === 'signin' && type === 'studio') &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center py-10 px-8 lg:px-10 overflow-hidden">
                    <LoginForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='Studio'
                    />
                </div>
            }

            {(page === 'signup' && type === 'studio') &&
                <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center py-10 px-8 lg:px-10 overflow-hidden">
                    <SignUpForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='Studio'
                    />
                </div>
            }
        </div>
    )
}

export default Login