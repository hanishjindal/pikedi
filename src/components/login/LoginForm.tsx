import React, { useEffect, useRef, useState } from 'react';
import Divider from '../common/Divider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '../common/Input';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import axios from "axios"

interface LoginFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: 'Editor' | 'Studio';
}

const LoginForm: React.FC<LoginFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [formLabel, setFormLabel] = useState({
        email: false,
        password: false
    })
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            const user = {
                email: formData.email,
                password: formData.password
            }
            const res = await axios.post("/api/users/login", user)
            toast.success('Success')
            router.push('/')
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        emailRef.current?.focus()
    }, [])


    return (
        <div
            className="py-20 px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[45%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
            onClick={() => {
                setFormLabel({
                    email: false,
                    password: false
                })
            }}
        >
            <BsArrowLeftCircleFill
                className="w-8 cursor-pointer absolute top-5 left-5"
                onClick={back}
                size={30}
            />

            <h1 className="text-2xl lg:text-4xl font-semibold">
                Login <span className="whitespace-nowrap">&#40;As <span className="text-theme">{WhoIsLogin}</span>&#41;</span>
            </h1>

            <form className="border rounded-xl w-full lg:w-1/2" onSubmit={(e) => handleSubmit(e)}>
                <Input
                    name={formLabel.email}
                    setName={(name) => setFormLabel({ ...formLabel, email: name })}
                    label='Email'
                    inputValue={formData.email}
                    nameRef={emailRef}
                    setInputValue={(nameText) => setFormData({ ...formData, email: nameText })}
                    fieldRequired={true}
                    fieldType='email'
                    placeholder='enter email'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setFormLabel({
                            email: true,
                            password: false
                        })
                        setTimeout(() => {
                            emailRef.current?.focus()
                        }, 0);
                    }}
                />

                <Divider type="toe" />

                <Input
                    name={formLabel.password}
                    setName={(name) => setFormLabel({ ...formLabel, password: name })}
                    label='Password'
                    inputValue={formData.password}
                    nameRef={passwordRef}
                    setInputValue={(nameText) => setFormData({ ...formData, password: nameText })}
                    fieldRequired={true}
                    fieldType='password'
                    placeholder='enter password'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setFormLabel({
                            email: false,
                            password: true
                        })
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
