'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SyncLoader } from 'react-spinners'
import SearchBar from '../common/SearchBar'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '../common/Button'

const Project = () => {
    const router = useRouter()
    const searchParam = useSearchParams()
    const sideBarOpen = searchParam.get('nav')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [images, setImages] = useState<any[]>([])
    const [originalList, setOriginalList] = useState<any[]>([]);

    useEffect(() => {
        handleLoadImages();
    }, [])

    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [deleteModal]);

    // const handleKeyDown = (event: KeyboardEvent) => {
    //     if (event.key === 'Enter' && deleteModal > -1) {
    //         event.preventDefault();
    //         handleDeleteImage(deleteModal);
    //         setDeleteModal(-1);
    //     } else if (event.key === 'Escape' && deleteModal > -1) {
    //         event.preventDefault();
    //         setDeleteModal(-1);
    //     }
    // };

    const handleLoadImages = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/editor/get-available-images", {})
            if (!res.data.success) {
                toast.error(res.data.message ?? 'Something went wrong')
            } else {
                setImages(res.data.data)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleAssign = async (imageId: string) => {
        try {
            setIsLoading(true)
            const res = await axios.post("/api/editor/assign", {
                imageId
            })
            if (!res.data.success) {
                toast.error(res.data.message ?? 'Something went wrong')
            } else {
                toast.success('Assigned...')
                router.push(`/editor/assigned?nav=${sideBarOpen}`)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div>
                <SearchBar
                    list={images}
                    setList={setImages}
                    originalList={originalList}
                    setOriginalList={setOriginalList}
                />
            </div>
            {isLoading ?
                <div className="flex gap-4 items-center">Loading <SyncLoader size={4} /></div>
                :
                <div className='w-full flex flex-col gap-5'>
                    <div className='w-full grid grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-solid divide-gray-400 border-2 border-gray-400 rounded-md p-1 bg-gray-300'>
                        <div className="col-span-12 lg:col-span-5 flex justify-center items-center">Image</div>
                        <div className="col-span-12 lg:col-span-2 flex justify-center items-center">Reason</div>
                        <div className="col-span-12 lg:col-span-3 flex justify-center items-center">Summary</div>
                        <div className="col-span-12 lg:col-span-2 flex justify-center items-center"></div>
                    </div>
                    {
                        images?.map((data, index) => {
                            return (
                                <div key={index} className='w-full grid grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-solid divide-gray-400 border-2 border-gray-400 rounded-md p-1 overflow-hidden'>
                                    <div className="h-[300px] col-span-12 lg:col-span-5 p-2 flex justify-center items-center">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={data?.url}
                                            alt=''
                                            className='h-full w-full object-contain object-center'
                                        />
                                    </div>
                                    <div className="col-span-12 lg:col-span-2 p-2 flex flex-col gap-1 justify-center items-center">
                                        {data?.reasons && data?.reasons.map((itm: string, idx: number) => {
                                            return (
                                                <span key={idx}>{itm}</span>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className="col-span-12 lg:col-span-3 p-2 flex justify-center items-center">{data?.summary}</div>
                                    <div className="col-span-12 lg:col-span-2 p-2 flex justify-center items-center">
                                        <Button
                                            buttonType='primary'
                                            type='submit'
                                            className='w-36 h-16 font-medium text-lg'
                                            handleClick={() => handleAssign(data?.imageId)}
                                            isSubmitting={isSubmitting}
                                        >
                                            Assign
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Project