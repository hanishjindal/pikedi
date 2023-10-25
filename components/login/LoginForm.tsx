import React, { useEffect, useRef, useState } from 'react';
import Divider from '../common/Divider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import SyncLoader from "react-spinners/SyncLoader";
import Input from '../common/Input';

interface LoginFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: 'Editor' | 'Studio';
}

const LoginForm: React.FC<LoginFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [email, setEmail] = useState<boolean>(false);
    const [emailText, setEmailText] = useState<string>('');
    const [password, setPassword] = useState<boolean>(false);
    const [passwordText, setPasswordText] = useState<string>('');
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        toast.success('Success')
        setIsSubmitting(true)
        e.preventDefault()
        setTimeout(() => {
            router.push('/')
        }, 1000);
    }

    useEffect(() => {
        setEmail(true)
        setTimeout(() => {
            emailRef.current?.focus()
        }, 0);
    }, [])


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
                <Input
                    name={email}
                    setName={setEmail}
                    label='Email'
                    nameText={emailText}
                    nameRef={emailRef}
                    setNameText={setEmailText}
                    fieldRequired={true}
                    fieldType='email'
                    placeholder='enter email'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setEmail(true);
                        setPassword(false);
                        emailRef.current?.focus()
                        setTimeout(() => {
                            emailRef.current?.focus()
                        }, 0);
                    }}
                />

                <Divider type="toe" />

                <Input
                    name={password}
                    setName={setPassword}
                    label='Password'
                    nameText={passwordText}
                    nameRef={passwordRef}
                    setNameText={setPasswordText}
                    fieldRequired={true}
                    fieldType='password'
                    placeholder='enter password'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setEmail(false);
                        setPassword(true);
                        passwordRef.current?.focus()
                        setTimeout(() => {
                            passwordRef.current?.focus()
                        }, 0);
                    }}
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
};

export default LoginForm;
