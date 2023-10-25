import React, { useRef, useState } from 'react';
import Input from './common/Input'
import Divider from './common/Divider';
import Button from './common/Button';



const ContactForm = () => {
    const [name, setName] = useState<boolean>(false)
    const [nameText, setNameText] = useState<string>('')
    const [email, setEmail] = useState<boolean>(false)
    const [emailText, setEmailText] = useState<string>('')
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    return (
        <div id='contact' className="p-10 lg:p-20 grid grid-cols-12  w-full bg-gradient-to-b from-lighest-theme to-white ">
            <div
                className="col-span-8 p-20 shadow-lg gap-6 lg:gap-8  rounded-lg bg-white  flex-col justify-center items-center border rounded-xl"
            >
                <form className=" flex-col justify-center items-center">
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
                            setTimeout(() => {
                                nameRef.current?.focus()
                            }, 0);
                        }} />
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
                            setTimeout(() => {
                                emailRef.current?.focus()
                            }, 0);
                        }} />
                    <Divider type="toe" />
                    <textarea className='w-full' placeholder='  message' >

                    </textarea>
                    <Button
                        type='primary'
                        className=' font-semibold text-lg px-6 py-2'
                        handleClick={() => { }}
                    >
                        Submit
                    </Button>
                </form>

            </div>
            <div className='col-span-4 flex justify-center items-center'>
                <h1 className=' text-center text-4xl lg:text-5xl font-semibold whitespace-nowrap'>
                    Contact <span className='text-theme'>Us</span>
                </h1>
            </div>
        </div>
    )
}

export default ContactForm