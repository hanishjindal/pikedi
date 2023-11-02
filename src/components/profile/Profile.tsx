import React, { useState } from 'react'
import Divider from '../common/Divider'
import { BiSolidUserRectangle } from 'react-icons/bi'
import Input from '../common/Input'
import Button from '../common/Button'
import { BsUpload } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

type fieldType = 'fullName' | 'mobile' | 'email' | 'password'

const Profile = () => {
    // const auth = useSelector(state=>state.auth)
    // console.log(auth)
    const router = useRouter()
    const [formData, setFormData] = useState<any>({
        fullName: {
            label: false,
            value: '',
            labelText: 'Name',
            type: 'text',
            placeholder: 'Full Name',
            required: true,
            name: 'fullName'
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

    const handleInput = (type: fieldType, val: string) => {
        setFormData({
            ...formData,
            [type]: { ...formData[type], value: val }
        })
    }

    const handleFieldClick = (type: fieldType) => {
        setFormData({
            ...formData,
            fullName: { ...formData.fullName, label: (type === 'fullName') },
            mobile: { ...formData.mobile, label: (type === 'mobile') },
            email: { ...formData.email, label: (type === 'email') },
            password: { ...formData.password, label: (type === 'password') },
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // try {
        //     setIsSubmitting(true)
        //     await axios.post("/api/users/signup", {
        //         fullName: formData.fullName.value,
        //         mobile: formData.mobile.value,
        //         email: formData.email.value,
        //         password: formData.password.value,
        //         role: WhoIsLogin.toLocaleLowerCase()
        //     })
        //     toast.success('Success')
        //     router.push(`/login?page=signin&type=${WhoIsLogin.toLocaleLowerCase()}`)
        // } catch (error: any) {
        //     toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        // } finally {
        //     setIsSubmitting(false)
        // }
    }

    const handleResetFocus = () => {
        setFormData({
            ...formData,
            fullName: { ...formData.fullName, label: false },
            mobile: { ...formData.mobile, label: false },
            email: { ...formData.email, label: false },
            password: { ...formData.password, label: false },
        })
    }


    return (
        <div className='w-full h-auto' onClick={handleResetFocus}>
            <div className='w-full h-full py-10 px-6 md:px-16 lg:px-28 flex flex-col gap-10 relative'>
                <div className='grid grid-cols-12 bg-white rounded-lg shadow-lg'>
                    <div className='sm:col-span-3 w-full h-auto lg:h-[80vh] col-span-12'>
                        <div className='flex flex-col gap-5 py-10 justify-center items-center'>
                            <BiSolidUserRectangle size={200} className="border-2 rounded-xl shadow" />
                            <div
                                className='w-40 h-12 relative gap-3 flex justify-center items-center rounded-lg text-black bg-white border-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer overflow-hidden'
                            >
                                <span className='cursor-pointer'>Upload</span>
                                <BsUpload size={15} />
                                <input
                                    className='absolute top-[50%] left-1/2 w-[500%] h-[200%] opacity-0 bg-transparent text-transparent cursor-pointer'
                                    type="file"
                                    accept='image/*'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='hidden col-span-1 w-full h-auto lg:h-[80vh] sm:flex justify-start items-start '>
                        <Divider type="tic" />
                    </div>
                    <div className='sm:hidden col-span-12 w-full h-auto lg:h-[80vh] '>
                        <Divider type="toe" />
                    </div>

                    <div className='sm:col-span-7 sm:px-0 px-5 col-span-12 w-full h-auto lg:h-auto py-10 flex flex-col justify-center '>
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
                                                isSubmitting={field === 'email' || isSubmitting}
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
                        </div>
                        <div className='flex w-full gap-5 sm:mt-10 mt-5'>
                            <Button
                                type='primary'
                                className='font-semibold w-1/2 h-12 text-lg px-6 py-2 flex gap-5'
                                handleClick={() => { }}
                            >
                                Save
                            </Button>
                            <Button
                                type='primary'
                                className='font-semibold w-1/2 h-12 text-lg px-6 py-2 flex gap-5'
                                handleClick={() => { }}
                            >
                                Discard
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile