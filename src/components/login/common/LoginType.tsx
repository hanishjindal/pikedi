import React from 'react';
import { LOGIN_DATA } from "../../config"
import Button from '../../common/Button';
import AuthSocialButton from '@/components/common/AuthSocialButton';
import { FcGoogle } from 'react-icons/fc';
import { socialLogin } from '@/components/utils';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

interface LoginTypeProps {
    who: string;
    content: string;
    loginButton: () => {};
    signupButton: () => {};
}

const LoginType: React.FC<LoginTypeProps> = ({ who, content, loginButton, signupButton }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    return (
        <div
            className='py-7 px-8 lg:py-16 lg:px-7 flex flex-col justify-center items-center shadow-lg gap-5 lg:gap-7 w-full lg:w-[45%] h-full rounded-lg bg-white overflow-hidden'
        >
            <h1 className='font-bold text-3xl lg:text-5xl'>
                <span className='text-theme'>
                    {who}
                </span>
            </h1>
            <span className='text-center lg:text-base font-medium text-xs text-gray-500 lg:px-16'>
                {content}
            </span>
            <Button
                type='button'
                buttonType='primary'
                className='font-semibold bg-theme text-xl rounded-lg cursor-pointer w-40 h-12 text-white whitespace-nowrap'
                handleClick={loginButton}
            >
                {LOGIN_DATA.signinText}
            </Button>

            <div className='flex justify-center items-center gap-1'>
                <span className='text-base font-normal'>
                    {LOGIN_DATA.accountText}
                </span>
                <span
                    className='text-base font-semibold cursor-pointer whitespace-nowrap'
                    onClick={signupButton}
                >
                    {LOGIN_DATA.signupText}
                </span>
            </div>
            <div className="flex flex-col gap-6 justify-center items-center w-full lg:w-[50%] relative">
                <span className='text-xs'>---OR---</span>
                <AuthSocialButton
                    icon={FcGoogle}
                    name='oogle'
                    onClick={() => socialLogin(dispatch, router)}
                />
            </div>
        </div>
    )
}

export default LoginType