import React, { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FormBox from './common/FormBox';
import { fieldType, roleType } from '../utils'

interface SignupFormProps {
    back: () => {}; // Use React.Dispatch to accept setState
    WhoIsLogin: roleType;
}

const SignUpForm: React.FC<SignupFormProps> = ({ back, WhoIsLogin }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: {
            label: false,
            value: '',
            ref: useRef<HTMLInputElement | null>(null),
            labelText: 'Name',
            type: 'text',
            placeholder: 'Full Name',
            required: true,
            name: 'name'
        },
        mobile: {
            label: false,
            value: '',
            labelText: 'Mobile Number',
            type: 'number',
            placeholder: '+91 00000 00000',
            required: true,
            name: 'mobile'
        },
        email: {
            label: false,
            value: '',
            labelText: 'Email',
            type: 'email',
            placeholder: 'john@xyz.in',
            required: true,
            name: 'email'
        },
        password: {
            label: false,
            value: '',
            labelText: 'Password',
            type: 'password',
            placeholder: 'enter password',
            required: true,
            name: 'password'
        },
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        formData.name.ref.current?.focus()
    }, [])

    const handleInput = (type: fieldType, val: string) => {
        setFormData({
            ...formData,
            [type]: { ...formData[type], value: val }
        })
    }

    const handleFieldClick = (type: fieldType) => {
        setFormData({
            ...formData,
            name: { ...formData.name, label: (type === 'name') },
            mobile: { ...formData.mobile, label: (type === 'mobile') },
            email: { ...formData.email, label: (type === 'email') },
            password: { ...formData.password, label: (type === 'password') },
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            await axios.post("/api/users/signup", {
                name: formData.name.value,
                mobile: formData.mobile.value,
                email: formData.email.value,
                password: formData.password.value,
                role: WhoIsLogin
            })
            toast.success('Success')
            router.push(`/login?page=signin&type=${WhoIsLogin.toLocaleLowerCase()}`)
        } catch (error: any) {
            console.log(error.response)
            toast.error(error?.response?.data?.message ?? 'Somthing went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResetFocus = () => {
        setFormData({
            ...formData,
            name: { ...formData.name, label: false },
            mobile: { ...formData.mobile, label: false },
            email: { ...formData.email, label: false },
            password: { ...formData.password, label: false },
        })
    }

    return (
        <FormBox
            back={back}
            WhoIsLogin={WhoIsLogin}
            heading='Signup'
            handleResetFocus={() => handleResetFocus()}
            handleInput={handleInput}
            handleFieldClick={handleFieldClick}
            handleSubmit={(e) => handleSubmit(e)}
            isSubmitting={isSubmitting}
            formData={formData}
        />
    )
}

export default SignUpForm