'use client'
import React, { useRef, useState } from 'react';
import Input from '../common/Input'
import Divider from '../common/Divider';
import Button from '../common/Button';
import { CONTACT_DATA } from '../config';
import { SyncLoader } from 'react-spinners';
import { fieldType } from '../utils';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const [formData, setFormData] = useState<any>({
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
    })
    const [contactMessage, setContactMessage] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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
        })
    }

    const handleFieldInputData = () => {
        setFormData({
            ...formData,
            name: { ...formData.name, value: '', label: false },
            mobile: { ...formData.mobile, value: '', label: false },
            email: { ...formData.email, value: '', label: false },
        })
        setContactMessage('')
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            await axios.post("/api/contact", {
                name: formData.name.value,
                mobile: formData.mobile.value,
                email: formData.email.value,
                message: contactMessage
            })
            handleFieldInputData()
            toast.success('Success submitted, We will contact you soon...')
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message ?? 'Something went wrong')
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
        })
    }
    return (
        <div
            className="p-5 lg:p-20 flex flex-col-reverse gap-8 lg:gap-0 lg:grid lg:grid-cols-12 w-full"
            onMouseLeave={handleResetFocus}
        >
            <div
                className="col-span-8 p-8 lg:p-20 shadow-lg gap-6 lg:gap-8 rounded-lg flex-col justify-center items-center border-2 bg-white border-theme"
            >
                <form className="flex flex-col gap-5">
                    <div className='border-2 rounded-lg bg-white'>
                        {
                            Object.keys(formData)?.map((field, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Input
                                            name={formData[field].label}
                                            setName={(val) => handleFieldClick(formData[field].name)}
                                            label={formData[field].labelText}
                                            inputValue={formData[field].value}
                                            nameRef={formData[field].ref ?? null}
                                            setInputValue={(val) => handleInput(formData[field].name, val)}
                                            fieldRequired={true}
                                            fieldType={formData[field].type}
                                            isSubmitting={isSubmitting}
                                            placeholder={formData[field].placeholder}
                                            fieldClick={(e) => {
                                                e.stopPropagation();
                                                handleFieldClick(formData[field].name);
                                            }}
                                        />

                                        {index < Object.keys(formData).length - 1 && <Divider type="toe" />}
                                    </React.Fragment>
                                )
                            })
                        }

                        <Divider type="toe" />

                        <textarea
                            className='w-full p-3'
                            rows={4}
                            placeholder='Message'
                            required
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleResetFocus();
                            }}
                        >

                        </textarea>
                    </div>
                    <Button
                        type='submit'
                        buttonType='primary'
                        className='font-semibold w-40 h-12 text-lg px-6 py-2 flex gap-5'
                        isSubmitting={isSubmitting}
                        handleClick={() => handleSubmit()}
                    >
                        {isSubmitting ?
                            <SyncLoader size={4} color='#fff' />
                            :
                            'Submit'
                        }
                    </Button>
                </form>
            </div>
            <div className='col-span-4 flex flex-col justify-center items-center lg:p-10 gap-10'>
                <h1 className=' text-center text-4xl lg:text-5xl font-semibold whitespace-nowrap'>
                    Contact <span className='text-theme'>Us</span>
                </h1>

                <div className='hidden lg:block text-gray-500 text-justify text-base font-medium'>{CONTACT_DATA.text}</div>
            </div>
        </div>
    )
}

export default ContactForm