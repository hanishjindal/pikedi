'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SyncLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '../common/Button'
import { MdContentCopy } from 'react-icons/md'
import { copyData, handleDownloadImage } from '../utils'
import { CldUploadButton } from 'next-cloudinary'
import { FaDownload } from 'react-icons/fa'
import { BiReset } from 'react-icons/bi'

const Assigned = () => {
    const router = useRouter()
    const searchParam = useSearchParams()
    const sideBarOpen = searchParam.get('nav')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [imageData, setImageData] = useState<any>({})
    const [uploadedImage, setUploadedImage] = useState<string>('')

    useEffect(() => {
        handleLoadImageAssigned();
    }, [])

    const handleLoadImageAssigned = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/editor/get-assigned-image", {})
            if (!res.data.success) {
                toast.error(res.data.message ?? 'Something went wrong')
                router.push(`/editor/project?nav=${sideBarOpen}`)
            }
            setImageData(res.data.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Something went wrong')
            router.push(`/editor/project?nav=${sideBarOpen}`)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUnassign = async (imageId: string) => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/editor/unassign", {
                imageId
            })
            if (!res.data.success) {
                toast.error(res.data.message ?? 'Something went wrong')
            } else {
                toast.success('Unassigned...')
                router.push(`/editor/project?nav=${sideBarOpen}`)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleUrl = (result: any) => {
        setUploadedImage(result?.info?.url)
    }

    return (
        <>
            {isLoading ?
                <div className="flex gap-4 items-center">Loading <SyncLoader size={4} /></div>
                :
                <div className='w-full h-full flex flex-col gap-8'>
                    <div className='bg-lighest-theme border border-theme p-3 md:p-2 md:px-4 rounded-xl flex flex-col md:flex-row gap-2 justify-between w-full'>
                        <div className='grid grid-cols-10 items-stretch border-2 border-gray-700 rounded-md whitespace-nowrap overflow-hidden'>
                            <span className='text-sm text-right font-medium bg-gray-600 text-white border-r-2 border-gray-700 p-1 px-2 col-span-3 sm:col-span-2'>
                                Image Id:
                            </span>
                            <span className='text-xs flex items-center bg-gray-200 w-full p-1 col-span-6 sm:col-span-7 overflow-x-hidden'>
                                {imageData?.imageId}
                            </span>
                            <span className='cursor-pointer bg-gray-200 p-1 col-span-1 w-full flex justify-center items-center'>
                                <MdContentCopy size={15} onClick={() => { copyData(imageData?.imageId) }} />
                            </span>
                        </div>
                        <div className='flex items-center border-2 border-gray-700 rounded-md whitespace-nowrap w-fit overflow-hidden'>
                            <span
                                className='text-sm text-right font-medium bg-gray-600 text-white border-r-2 border-gray-700 p-1 px-2 cursor-pointer'
                                onClick={() => handleUnassign(imageData?.imageId)}
                            >
                                Unassign
                            </span>
                            <span
                                className='text-sm flex items-center bg-gray-200 h-full p-1 overflow-x-hidden px-2 cursor-pointer'
                            >
                                Submit
                            </span>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-5'>
                        <div className='grid grid-cols-12 gap-4 h-[50vh]'>
                            <div className='col-span-12 lg:col-span-6 border-2 border-gray-400 rounded-md flex flex-col items-center overflow-hidden bg-slate-200'>
                                <span className='w-full text-sm bg-gray-700 text-white text-center py-[1px]'>
                                    INPUT
                                </span>
                                <div className='flex justify-center items-center h-full w-full relative'>
                                    <Image
                                        src={imageData?.url ?? ''}
                                        alt=''
                                        width={500}
                                        height={500}
                                        className='h-full w-full object-contain object-center p-2'
                                    />
                                    <span
                                        className='absolute right-2 top-2 z-10 bg-white p-2 border-2 border-gray-400 cursor-pointer rounded-md'
                                        onClick={() => handleDownloadImage(imageData?.url, imageData?.name)}
                                    >
                                        <FaDownload />
                                    </span>
                                </div>
                            </div>
                            <div className='col-span-12 lg:col-span-6 border-2 border-gray-400 rounded-md flex flex-col items-center overflow-hidden bg-slate-200'>
                                <span className='w-full text-sm bg-gray-700 text-white text-center py-[1px]'>
                                    EDITED
                                </span>
                                {!uploadedImage ?
                                    <CldUploadButton
                                        options={{ folder: 'pikediNewPicEdited', sources: ['local', 'google_drive', 'camera'], showPoweredBy: false, showSkipCropButton: true, maxFiles: 1 }}
                                        onUpload={handleUrl}
                                        uploadPreset="pikedi"
                                        className='h-full w-full p-4'
                                    >
                                        <div className='flex justify-center items-center h-full w-full border-2 border-dashed border-theme text-theme font-semibold text-lg'>
                                            Click to upload
                                        </div>
                                    </CldUploadButton>
                                    :
                                    <div className='flex justify-center items-center h-full w-full relative'>
                                        <Image
                                            src={uploadedImage ?? ''}
                                            alt=''
                                            width={500}
                                            height={500}
                                            className='h-full w-full object-contain object-center p-2'
                                        />
                                        <span
                                            className='absolute right-2 top-2 z-10 bg-white p-2 border-2 border-gray-400 cursor-pointer rounded-md'
                                            onClick={() => setUploadedImage('')}
                                        >
                                            <BiReset />
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Assigned