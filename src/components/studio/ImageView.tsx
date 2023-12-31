'use client'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { MdContentCopy } from "react-icons/md";
import { copyData } from '../utils';
import Select, { MultiValue } from "react-select";
import Image from 'next/image';
import { EDIT_REASONS } from '../config';
import { assign } from '@prisma/client';

interface imageProps {
    imageId: string;
}

const ImageView: React.FC<imageProps> = ({ imageId }) => {
    const [isLoading, IetisLoading] = useState<boolean>(true)
    const router = useRouter()
    const searchParam = useSearchParams()
    const sideBarOpen = searchParam.get('nav')
    let isMobileOrTablet: boolean = false;
    const [imageData, setImageData] = useState<any>(null)
    const [selectReason, setSelectReason] = useState<MultiValue<typeof EDIT_REASONS[0]>>([])
    const searchImage = async () => {
        try {
            IetisLoading(true)
            const payload = {
                imageId
            }
            const res = await axios.post("/api/studio/get-image-data", payload)
            if (!res?.data?.success) {
                throw Error(res?.data?.message)
            }
            setImageData(res?.data?.data)
        } catch (error: any) {
            toast.error(error?.message ?? error?.response?.data?.message ?? 'Something went wrong')
            router.push(`/studio/project?nav=${sideBarOpen ? sideBarOpen : (isMobileOrTablet ? 'close' : 'open')}`)
        } finally {
            IetisLoading(false)
        }
    }
    useEffect(() => {
        isMobileOrTablet = document.documentElement.clientWidth <= 870;
        searchImage()
    }, [])

    const handleChange = (selections: MultiValue<typeof EDIT_REASONS[0]>) => {
        setSelectReason(selections);
    };

    const handleStatus = (status: assign) => {
        try {
            if (status === 'ASSIGNED' || status === 'REASSIGNED') {
                return (<>In Progress</>)
            } else if (status === 'UNASSIGNED') {
                return (<>Awaited</>)
            } else {
                return (<>Ready</>)
            }
        } catch (error) {
            return (<></>)
        }
    }

    return (
        <div>
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
                                {imageId}
                            </span>
                            <span className='cursor-pointer bg-gray-200 p-1 col-span-1 w-full flex justify-center items-center'>
                                <MdContentCopy size={15} onClick={() => { copyData(imageId) }} />
                            </span>
                        </div>
                        <div className='flex items-center border-2 border-gray-700 rounded-md whitespace-nowrap w-fit overflow-hidden'>
                            <span className='text-sm text-right font-medium bg-gray-600 text-white border-r-2 border-gray-700 p-1 px-2'>
                                Status:
                            </span>
                            <span className='text-xs flex items-center bg-gray-200 h-full p-1 overflow-x-hidden px-2'>
                                {handleStatus(imageData?.assigned)}
                            </span>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='grid grid-cols-12 gap-4 h-[50vh]'>
                            <div className='col-span-12 lg:col-span-6 border-2 border-gray-400 rounded-md flex flex-col items-center overflow-hidden bg-slate-200'>
                                <span className='w-full text-sm bg-gray-700 text-white text-center py-[1px]'>
                                    INPUT
                                </span>
                                <div className='flex justify-center items-center h-full w-full'>
                                    <Image
                                        src={imageData?.url ?? ''}
                                        alt=''
                                        width={500}
                                        height={500}
                                        className='max-h-full h-auto w-full object-contain object-center'
                                    />
                                </div>
                            </div>
                            <div className='col-span-12 lg:col-span-6 border-2 border-gray-400 rounded-md flex flex-col items-center overflow-hidden bg-slate-200'>
                                <span className='w-full text-sm bg-gray-700 text-white text-center py-[1px]'>
                                    EDITED
                                </span>
                                <div className='flex justify-center items-center h-full w-full'>
                                    {imageData?.editedUrl ?
                                        <Image
                                            src={imageData?.editedUrl ?? ''}
                                            alt=''
                                            width={500}
                                            height={500}
                                            className='max-h-full h-auto w-full object-contain object-center'
                                        />
                                        :
                                        <span className='font-medium uppercase'>Pending</span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='w-full border-2 border-gray-400 bg-gray-200 rounded-md p-8'>
                            <table className='w-full'>
                                <tbody className='w-full border-2 flex flex-col gap-4'>
                                    <tr className='w-full grid grid-cols-12'>
                                        <td className='col-span-6 px-2'>Name</td>
                                        <td className='col-span-6 px-2'>{imageData?.name}</td>
                                    </tr>
                                    <tr className='w-full grid grid-cols-12'>
                                        <td className='col-span-6 px-2'>Reason</td>
                                        <td className='col-span-6 px-2'>
                                            <Select
                                                isMulti
                                                onChange={handleChange}
                                                options={EDIT_REASONS}
                                            />
                                        </td>
                                    </tr>
                                    <tr className='w-full grid grid-cols-12'>
                                        <td className='col-span-6 px-2'>Summary</td>
                                        <td className='col-span-6 px-2'>{imageData?.summary}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ImageView