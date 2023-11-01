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

type fieldType = 'email' | 'password'

const LoginForm: React.FC<LoginFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: {
            label: false,
            value: '',
            ref: useRef<HTMLInputElement | null>(null)
        },
        password: {
            label: false,
            value: '',
        },
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        formData.email.ref.current?.focus()
    }, [])

    const handleLableFocus = (type: fieldType, val: boolean) => {
        setFormData({
            ...formData,
            [type]: { ...formData[type], label: val }
        })
    }

    const handleInput = (type: fieldType, val: string) => {
        setFormData({
            ...formData,
            [type]: { ...formData[type], value: val }
        })
    }

    const handleFieldClick = (type: fieldType) => {
        setFormData({
            ...formData,
            email: { ...formData.email, label: (type === 'email') },
            password: { ...formData.password, label: (type === 'password') },
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            const user = {
                email: formData.email.value,
                password: formData.password.value
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

    return (
        <div
            className="py-20 px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[45%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
            onClick={() => {
                setFormData({
                    ...formData,
                    email: { ...formData.email, label: false },
                    password: { ...formData.password, label: false },
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
                    name={formData.email.label}
                    setName={(val) => handleLableFocus('email', val)}
                    label='Email'
                    inputValue={formData.email.value}
                    nameRef={formData.email.ref}
                    setInputValue={(val) => handleInput('email', val)}
                    fieldRequired={true}
                    fieldType='email'
                    placeholder='enter email'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        handleFieldClick('email')
                    }}
                />

                <Divider type="toe" />

                <Input
                    name={formData.password.label}
                    setName={(val) => handleLableFocus('password', val)}
                    label='Password'
                    inputValue={formData.password.value}
                    setInputValue={(val) => handleInput('password', val)}
                    fieldRequired={true}
                    fieldType='password'
                    placeholder='enter password'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        handleFieldClick('password')
                    }}
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
};

export default LoginForm;
