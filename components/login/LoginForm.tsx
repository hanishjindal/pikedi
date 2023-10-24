import React, { useRef, useState } from 'react';
import Divider from '../common/Divider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import SyncLoader from "react-spinners/SyncLoader";

interface LoginFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: 'Editor' | 'Studio';
}

const LoginForm: React.FC<LoginFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [email, setEmail] = useState<Boolean>(false);
    const [emailText, setEmailText] = useState<string>('');
    const [password, setPassword] = useState<Boolean>(false);
    const [passwordText, setPasswordText] = useState<string>('');
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<Boolean>(false)
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        toast.success('Success')
        setIsSubmitting(true)
        e.preventDefault()
        setTimeout(() => {
            router.push('/')
        }, 1000);
    }

    return (
        <div
            className="py-7 px-8 lg:py-5 lg:px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[45%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
            onClick={() => {
                setEmail(false);
                setPassword(false);
            }}
        >
            {/* https://www.iconfinder.com/icons/9004799/arrow_direction_left_back_icon */}
            <img
                className="w-8 cursor-pointer absolute top-5 left-5"
                src="/images/back.svg"
                alt="Back-icon"
                onClick={back}
            />

            <h1 className="text-2xl lg:text-4xl font-semibold">
                Login <span className="whitespace-nowrap">&#40;As <span className="text-theme">{WhoIsLogin}</span>&#41;</span>
            </h1>

            <form className="border rounded-xl w-full lg:w-1/2" onSubmit={(e) => handleSubmit(e)}>
                <div
                    className="m-3 flex flex-col h-8 cursor-text justify-center duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEmail(true);
                        setPassword(false);
                        emailRef.current?.focus()
                        setTimeout(() => {
                            emailRef.current?.focus()
                        }, 0);
                    }}
                >
                    <label
                        htmlFor=""
                        className={`duration-200 w-14 ${(email || emailText.length) ? 'text-sm' : 'text-lg'} text-gray-500 cursor-text`}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="enter email"
                        className={`${!(email || emailText.length) && 'hidden duration-200'}`}
                        ref={emailRef}
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                    />
                </div>
                <Divider type="toe" />
                <div
                    className="m-3 flex flex-col h-8 cursor-text  justify-center duration-200 relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEmail(false);
                        setPassword(true);
                        passwordRef.current?.focus()
                        setTimeout(() => {
                            passwordRef.current?.focus()
                        }, 0);
                    }}
                >
                    <label
                        htmlFor=""
                        className={`duration-200 w-14 ${(password || passwordText.length) ? 'text-sm' : 'text-lg'} text-gray-500 cursor-text`}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="enter password"
                        className={`${!(password || passwordText.length) && 'hidden duration-200'} mr-6`}
                        ref={passwordRef}
                        value={passwordText}
                        onChange={(e) => setPasswordText(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='absolute right-0 cursor-pointer !opacity-100 h-full'
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        {isSubmitting
                            ?
                            <SyncLoader size={4} />
                            :
                            <img className="w-5 rotate-180" src="/images/back.svg" alt="" />
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
