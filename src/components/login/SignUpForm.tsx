import Divider from '@/components/common/Divider';
import React, { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '../common/Input';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import axios from 'axios';
interface SignupFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: 'Editor' | 'Studio';
}

const SignUpForm: React.FC<SignupFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        password: ''
    })
    const [formLabel, setFormLabel] = useState({
        fullName: false,
        mobile: false,
        email: false,
        password: false
    })
    const nameRef = useRef<HTMLInputElement | null>(null);
    const mobileRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            const res = await axios.post("/api/users/signup", formData)
            toast.success('Success')
            router.push('/login')
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        nameRef.current?.focus();
    }, [])


    return (
        <div
            className="py-20 px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[50%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
            onClick={() => {
                setFormLabel({
                    fullName: false,
                    mobile: false,
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
                Signup <span className="whitespace-nowrap">&#40;As <span className="text-theme">{WhoIsLogin}</span>&#41;</span>
            </h1>

            <form className="border rounded-xl w-full lg:w-1/2" onSubmit={handleSubmit}>
                <Input
                    name={formLabel.fullName}
                    setName={(name) => setFormLabel({ ...formLabel, fullName: name })}
                    label='Name'
                    nameText={formData.fullName}
                    nameRef={nameRef}
                    setNameText={(nameText) => setFormData({ ...formData, fullName: nameText })}
                    fieldRequired={true}
                    fieldType='text'
                    placeholder='Full Name'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setFormLabel({
                            fullName: true,
                            mobile: false,
                            email: false,
                            password: false
                        })
                        setTimeout(() => {
                            nameRef.current?.focus()
                        }, 0);
                    }}
                />

                <Divider type="toe" />

                <Input
                    name={formLabel.mobile}
                    setName={(name) => setFormLabel({ ...formLabel, mobile: name })}
                    label='Mobile Number'
                    nameText={formData.mobile}
                    nameRef={mobileRef}
                    setNameText={(nameText) => setFormData({ ...formData, mobile: nameText })}
                    fieldRequired={true}
                    fieldType='number'
                    placeholder='+91 00000 00000'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setFormLabel({
                            fullName: false,
                            mobile: true,
                            email: false,
                            password: false
                        })
                        setTimeout(() => {
                            mobileRef.current?.focus()
                        }, 0);
                    }}
                />

                <Divider type="toe" />

                <Input
                    name={formLabel.email}
                    setName={(name) => setFormLabel({ ...formLabel, email: name })}
                    label='Email'
                    nameText={formData.email}
                    nameRef={emailRef}
                    setNameText={(nameText) => setFormData({ ...formData, email: nameText })}
                    fieldRequired={true}
                    fieldType='email'
                    placeholder='john@xyz.in'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setFormLabel({
                            fullName: false,
                            mobile: false,
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
                    nameText={formData.password}
                    nameRef={passwordRef}
                    setNameText={(nameText) => setFormData({ ...formData, password: nameText })}
                    fieldRequired={true}
                    fieldType='password'
                    placeholder='enter password'
                    fieldClick={(e) => {
                        e.stopPropagation();
                        setFormLabel({
                            fullName: false,
                            mobile: false,
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
    )
}

export default SignUpForm