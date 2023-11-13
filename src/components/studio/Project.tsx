'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiDotsVerticalRounded } from 'react-icons/bi'

const Project = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [images, setImages] = useState<[]>([])
    useEffect(() => {
        const handleLoadImages = async () => {
            try {
                setIsLoading(true)
                const res = await axios.post("/api/studio/get-images", {})
                if (!res.data.success) {
                    toast.error(res.data.message ?? 'Somthing went wrong')
                }
                setImages(res.data.data)
            } catch (error: any) {
                toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
            } finally {
                setIsLoading(false)
            }
        }
        handleLoadImages();
    }, [])
    return (
        <div className='w-full h-full px-4 md:px-8 flex flex-col gap-8'>
            <div>nav</div>
            {isLoading ?
                <div>Loading...</div>
                :
                <div className='grid grid-cols-12 gap-5'>
                    {images.length ?
                        images.map((item: { url: string, name: string }, idx: number) => {
                            return (
                                <div key={idx} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border-2 border-gray-700 rounded-lg flex flex-col overflow-hidden bg-slate-200'>
                                    <div className='flex justify-center items-center overflow-hidden h-40 md:h-48'>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={item?.url}
                                            alt=''
                                            className='max-h-full h-auto object-contain object-center'
                                        />
                                    </div>
                                    <div className='w-full text-sm font-medium bg-gray-700 text-white py-1 px-2 pl-4 flex justify-between items-center'>
                                        <span className='w-full overflow-hidden whitespace-nowrap'>
                                            {item?.name ?? `Untitled ${(idx) + 1}`}
                                        </span>
                                        <BiDotsVerticalRounded size={20} className='cursor-pointer' />
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className='col-span-12'>Upload some images...</div>
                    }
                </div>
            }
        </div>
    )
}

export default Project