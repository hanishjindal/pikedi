import Divider from '@/components/common/Divider';
import React, { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import SyncLoader from "react-spinners/SyncLoader";
import Input from '../common/Input';

interface SignupFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: 'Editor' | 'Studio';
}

const SignUpForm: React.FC<SignupFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [name, setName] = useState<boolean>(false)
    const [nameText, setNameText] = useState<string>('')
    const nameRef = useRef<HTMLInputElement | null>(null);
    const [email, setEmail] = useState<boolean>(false);
    const [emailText, setEmailText] = useState<string>('');
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [mobile, setMobile] = useState<boolean>(false)
    const [mobileNumber, setMobileNumber] = useState<number>(NaN)
    const mobileRef = useRef<HTMLInputElement | null>(null);
    const [password, setPassword] = useState<boolean>(false);
    const [passwordText, setPasswordText] = useState<string>('');
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        toast.success('Success')
        setIsSubmitting(true)
        e.preventDefault()
        setTimeout(() => {
            router.push('/')
        }, 1000);
    }

    useEffect(() => {
        nameRef.current?.focus();
    }, [])


    return (
        <div
            className="py-20 px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[50%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
            onClick={() => {
                setName(false);
                setEmail(false);
                setPassword(false);
                setMobile(false);
            }}
        >
            <img
                className="w-8 cursor-pointer absolute top-5 left-5"
                src="/images/back.svg"
                alt="Back-icon"
                onClick={back}
            />

            <h1 className="text-2xl lg:text-4xl font-semibold">
                Signup <span className="whitespace-nowrap">&#40;As <span className="text-theme">{WhoIsLogin}</span>&#41;</span>
            </h1>

            <form className="border rounded-xl w-full lg:w-1/2" onSubmit={handleSubmit}>
                <Input
                    name={name}
                    setName={setName}
                    label='Name'
                    nameText={nameText}
                    nameRef={nameRef}
                    setNameText={setNameText}
                    fieldRequired={true}
                    fieldType='text'
                    placeholder='Full Name'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setName(true)
                        setEmail(false);
                        setMobile(false)
                        setPassword(false);
                        setTimeout(() => {
                            nameRef.current?.focus()
                        }, 0);
                    }}
                />

                <Divider type="toe" />
                <Input
                    name={email}
                    setName={setEmail}
                    label='Email'
                    nameText={emailText}
                    nameRef={emailRef}
                    setNameText={setEmailText}
                    fieldRequired={true}
                    fieldType='email'
                    placeholder='john@xyz.in'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setEmail(true);
                        setPassword(false);
                        setTimeout(() => {
                            emailRef.current?.focus()
                        }, 0);
                    }}
                />

                <Divider type="toe" />

                <Input
                    name={mobile}
                    setName={setMobile}
                    label='Mobile Number'
                    nameText={mobileNumber}
                    nameRef={mobileRef}
                    setNameText={setMobileNumber}
                    fieldRequired={true}
                    fieldType='number'
                    placeholder='+91 00000 00000'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setMobile(true)
                        setEmail(false);
                        setPassword(false);
                        setTimeout(() => {
                            mobileRef.current?.focus()
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
                        setTimeout(() => {
                            passwordRef.current?.focus()
                        }, 0);
                    }}
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    )
}

export default SignUpForm