import React, { useRef, useState } from 'react';
import Input from '../common/Input'
import Divider from '../common/Divider';
import Button from '../common/Button';
import { CONTACT_DATA } from '../config';
import { SyncLoader } from 'react-spinners';

const ContactForm = () => {
    const [name, setName] = useState<boolean>(false)
    const [nameText, setNameText] = useState<string>('')
    const nameRef = useRef<HTMLInputElement | null>(null);
    const [mobile, setMobile] = useState<boolean>(false)
    const [mobileNumber, setMobileNumber] = useState<number>()
    const mobileRef = useRef<HTMLInputElement | null>(null);
    const [email, setEmail] = useState<boolean>(false)
    const [emailText, setEmailText] = useState<string>('')
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    return (
        <div className="p-5 lg:p-20 flex flex-col-reverse gap-8 lg:gap-0 lg:grid lg:grid-cols-12  w-full">
            <div
                className="col-span-8 p-8 lg:p-20 shadow-lg gap-6 lg:gap-8 rounded-lg flex-col justify-center items-center border-2 bg-white border-theme"
            >
                <form className="flex flex-col gap-5">
                    <div className='border-2 rounded-lg bg-white'>
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
                                setEmail(false)
                                setMobile(false)
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
                            placeholder='email'
                            fieldClick={(e) => {
                                e.stopPropagation();
                                setEmail(true)
                                setName(false)
                                setMobile(false)
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
                                setName(false);
                                setEmail(false);
                                setTimeout(() => {
                                    mobileRef.current?.focus()
                                }, 0);
                            }}
                        />

                        <Divider type="toe" />

                        <textarea className='w-full p-3' rows={4} placeholder='Message' >

                        </textarea>
                    </div>
                    <Button
                        type='primary'
                        className='font-semibold w-40 h-12 text-lg px-6 py-2 flex gap-5'
                        handleClick={() => { }}
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