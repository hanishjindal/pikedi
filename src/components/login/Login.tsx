'use client'
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
        <div className='w-full'>
            <div className="flex flex-col lg:flex-row gap-10 w-full min-h-full lg:justify-around py-10 px-6 sm:px-8 lg:px-10 overflow-hidden">
                {!((page === 'signin' || page === 'signup') && (type === 'editor' || type === 'studio')) &&
                    <LoginType
                        who={LOGIN_DATA.studioText}
                        content={LOGIN_DATA.studioContent}
                        loginButton={async () => handleLoginRoute('signin', 'studio')}
                        signupButton={async () => handleLoginRoute('signup', 'studio')}
                    />
                }

                {/* Divider */}
                {/* <Divider type='tic' />
                
                                    <LoginType
                                        who={LOGIN_DATA.editorText}
                                        content={LOGIN_DATA.editorContent}
                                        loginButton={async () => handleLoginRoute('signin', 'editor')}
                                        signupButton={async () => handleLoginRoute('signup', 'editor')}
                                    /> */}

                {/* <div className="flex gap-10 w-full h-full lg:h-full justify-around items-center py-10 px-8 lg:px-10 overflow-hidden">*/}
                {(page === 'signin' && type === 'editor') &&
                    <LoginForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='EDITOR'
                    />
                }
                {/* </div> */}
                {(page === 'signup' && type === 'editor') &&
                    <SignUpForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='EDITOR'
                    />
                }

                {(page === 'signin' && type === 'studio') &&
                    <LoginForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='STUDIO'
                    />
                }

                {(page === 'signup' && type === 'studio') &&
                    <SignUpForm
                        back={async () => handleLoginRoute()}
                        WhoIsLogin='STUDIO'
                    />
                }
            </div>
        </div>
    )
}

export default Login