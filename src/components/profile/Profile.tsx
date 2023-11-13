import React, { useEffect, useState } from 'react'
import Divider from '../common/Divider'
import { BiSolidUserRectangle } from 'react-icons/bi'
import Input from '../common/Input'
import Button from '../common/Button'
import { BsArrowRightShort, BsUpload } from 'react-icons/bs'
import Image from 'next/image'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signIn } from '@/redux/slice/authSlice';
import { CldUploadButton } from 'next-cloudinary'
import { fieldType, passFieldType } from '../utils'
const Profile = () => {
    const dispatch = useDispatch()
    const userRedux = useSelector(selectUser)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isPassChange, setisPassChange] = useState<boolean>(false)
    const [resetState, setResetState] = useState<boolean>(false)
    const [userData, setUserData] = useState<any>({})
    useEffect(() => {
        setUserData(userRedux)
    }, [userRedux])

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
    })
    const [passData, setPassData] = useState<any>({
        old: {
            label: false,
            value: '',
            labelText: 'Current Password',
            type: 'password',
            placeholder: 'old password',
            required: true,
            name: 'old'
        },
        new: {
            label: false,
            value: '',
            labelText: 'New Password',
            type: 'password',
            placeholder: 'new password',
            required: true,
            name: 'new'
        },
        confirm: {
            label: false,
            value: '',
            labelText: 'Confirm Password',
            type: 'password',
            placeholder: 'confirm new password',
            required: true,
            name: 'confirm'
        },
    })

    const handleResetFormDataFromRedux = () => {
        setFormData({
            ...formData,
            fullName: { ...formData.fullName, value: userData?.fullName ?? '' },
            mobile: { ...formData.mobile, value: userData?.mobile ?? '' },
            email: { ...formData.email, value: userData?.email ?? '' },
        })
        setPassData({
            ...passData,
            old: { ...passData.old, value: '' },
            new: { ...passData.new, value: '' },
            confirm: { ...passData.confirm, value: '' },
        })
    }

    useEffect(() => {
        handleResetFormDataFromRedux()
    }, [userData, resetState])


    const handleInput = (type: fieldType | passFieldType, val: string, formType?: string) => {
        if (formType === 'pass') {
            setPassData({
                ...passData,
                [type]: { ...passData[type], value: val }
            })
        } else {
            setFormData({
                ...formData,
                [type]: { ...formData[type], value: val }
            })
        }
    }

    const handleFieldClick = (type: fieldType | passFieldType, formType?: string) => {
        if (formType === 'pass') {
            setPassData({
                ...passData,
                old: { ...passData.old, label: (type === 'old') },
                new: { ...passData.new, label: (type === 'new') },
                confirm: { ...passData.confirm, label: (type === 'confirm') },
            })
        } else {
            setFormData({
                ...formData,
                fullName: { ...formData.fullName, label: (type === 'fullName') },
                mobile: { ...formData.mobile, label: (type === 'mobile') },
                email: { ...formData.email, label: (type === 'email') },
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            const payload = {
                fullName: formData.fullName.value,
                mobile: formData.mobile.value,
                email: formData.email.value,
                password: {
                    update: isPassChange,
                    data: {
                        old: passData.old.value,
                        new: passData.new.value,
                        confirm: passData.confirm.value,
                    }
                },
                role: userData?.role
            }
            const res = await axios.post("/api/users/update", payload)
            if (setUserData) {
                setUserData(res.data.data)
            }
            dispatch(signIn(res.data.data))
            toast.success('Updated successfully')
            //     router.push(`/login?page=signin&type=${WhoIsLogin.toLocaleLowerCase()}`)
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUpload = async (result: any) => {
        try {
            setIsSubmitting(true)
            const payload = {
                email: formData.email.value,
                profilePic: result?.info?.url,
                role: userData?.role
            }
            const res = await axios.post("/api/users/update", payload)
            if (setUserData) {
                setUserData(res.data.data)
            }
            dispatch(signIn(res.data.data))
            toast.success('Uploaded successfully')
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResetFocus = () => {
        setFormData({
            ...formData,
            fullName: { ...formData.fullName, label: false },
            mobile: { ...formData.mobile, label: false },
            email: { ...formData.email, label: false },
        })
        setPassData({
            ...passData,
            old: { ...passData.old, label: false },
            new: { ...passData.new, label: false },
            confirm: { ...passData.confirm, label: false },
        })
    }


    return (
        <div className='w-full h-auto' onClick={handleResetFocus}>
            {/* <div className='w-full h-full py-10 px-6 md:px-16 lg:px-28 flex flex-col gap-10 relative'> */}
            <div className='grid grid-cols-12'>

                <div className='col-span-12 lg:col-span-3 w-full h-auto lg:h-[80vh]'>
                    <div className='flex flex-col gap-5 py-8 lg:py-10 justify-center items-center'>
                        {userData?.profilePic ?
                            <div className='border rounded-xl flex justify-center items-center w-[180px] h-[180px] p-4'>
                                <Image
                                    src={userData?.profilePic}
                                    alt=''
                                    width={200}
                                    height={200}
                                    priority
                                    className='h-full max-w-full w-auto rounded-lg object-cover'
                                />
                            </div>
                            :
                            <BiSolidUserRectangle
                                size={180}
                                className="border rounded-xl text-gray-600"
                            />
                        }
                        <CldUploadButton
                            options={{ maxFiles: 1, folder: 'pikediProfilePic', sources: ['local', 'google_drive', 'camera'], showPoweredBy: false, cropping: true, croppingAspectRatio: 1, showSkipCropButton: false }}
                            onUpload={handleUpload}
                            uploadPreset="pikedi"
                        >
                            <div
                                className='w-40 h-12 relative gap-3 flex justify-center items-center rounded-lg text-black bg-white border-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer overflow-hidden'
                            >
                                <span className='cursor-pointer'>Upload</span>
                                <BsUpload size={15} />
                                {/* <input
                                    className='absolute top-[50%] left-1/2 w-[500%] h-[200%] opacity-0 bg-transparent text-transparent cursor-pointer'
                                    type="file"
                                    accept='image/*'
                                /> */}
                            </div>
                        </CldUploadButton>
                    </div>
                </div>

                <div className='hidden col-span-1 w-full h-auto lg:h-[80vh] lg:flex justify-start items-start '>
                    <Divider type="tic" />
                </div>
                <div className='lg:hidden col-span-12 w-full h-auto lg:h-[80vh] '>
                    <Divider type="toe" />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='lg:col-span-7 lg:px-0 px-5 col-span-12 w-full h-auto py-10 flex flex-col justify-between gap-5'
                >
                    <div className='flex flex-col gap-5'>
                        <h1 className='font-bold text-3xl'>
                            Profile -&nbsp;
                            <span className='text-theme'>
                                {userData?.role}
                            </span>
                        </h1>
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

                        <div className='flex flex-col gap-2'>
                            <div
                                className='flex items-center gap-2 cursor-pointer bg-gray-300 w-fit px-2 rounded-xl'
                                onClick={() => {
                                    setPassData({
                                        ...passData,
                                        old: { ...passData.old, value: '' },
                                        new: { ...passData.new, value: '' },
                                        confirm: { ...passData.confirm, value: '' },
                                    })
                                    setisPassChange(e => !e)
                                }
                                }
                            >
                                <span className='text-sm'>Change password</span>
                                <BsArrowRightShort size={25} className={`${isPassChange && 'rotate-90'}`} />
                            </div>
                            {
                                isPassChange &&
                                <div className='border-2 rounded-lg bg-white'>
                                    {
                                        Object.keys(passData)?.map((field, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Input
                                                        name={passData[field].label}
                                                        setName={(val) => handleFieldClick(passData[field].name, 'pass')}
                                                        label={passData[field].labelText}
                                                        inputValue={passData[field].value}
                                                        nameRef={passData[field].ref ?? null}
                                                        setInputValue={(val) => handleInput(passData[field].name, val, 'pass')}
                                                        fieldRequired={true}
                                                        fieldType={passData[field].type}
                                                        isSubmitting={isSubmitting}
                                                        placeholder={passData[field].placeholder}
                                                        hidePassPointer={true}
                                                        fieldClick={(e) => {
                                                            e.stopPropagation();
                                                            handleFieldClick(passData[field].name, 'pass');
                                                        }}
                                                    />

                                                    {index < Object.keys(passData).length - 1 && <Divider type="toe" />}
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex w-full gap-5'>
                        <Button
                            type='submit'
                            buttonType='primary'
                            isSubmitting={isSubmitting}
                            className='font-semibold w-1/2 h-12 text-lg px-6 py-2 flex gap-5'
                            handleClick={() => { }}
                        >
                            Update

                        </Button>
                        <Button
                            type='reset'
                            buttonType='secondary'
                            isSubmitting={isSubmitting}
                            className='font-semibold w-1/2 h-12 text-lg px-6 py-2 flex gap-5'
                            handleClick={() => {
                                setResetState(e => !e)
                                setisPassChange(false)
                            }}
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </div>

            {/* </div>   */}
        </div>
    )
}

export default Profile