'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { SyncLoader } from 'react-spinners'
import Divider from '../common/Divider'
import Modal from '../common/Modal'
import Button from '../common/Button'

const Project = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [images, setImages] = useState<any[]>([])
    const [deleteModal, setDeleteModal] = useState<number>(-1)
    const [threeDotMenu, setThreeDotMenu] = useState<number>(-1)

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

    const handleDeleteImage = async (idx: number) => {
        const imageId = images[idx].imageId
        try {
            setIsLoading(true)
            const res = await axios.post("/api/studio/delete-image", { imageId })
            if (!res.data.success) {
                toast.error(res.data.message ?? 'Somthing went wrong')
            }
            setImages(prevImages => prevImages.filter((image, index) => index !== idx));
            toast.success('Image moved to trash')
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div>nav</div>
            {isLoading ?
                <div className="flex gap-4 items-center">Loading <SyncLoader size={4} /></div>
                :
                <div className='grid grid-cols-12 gap-5'>
                    {images.length ?
                        images.map((item: { url: string, name: string }, idx: number) => {
                            return (
                                <div key={idx} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border-2 border-gray-700 rounded-lg flex flex-col bg-slate-200 relative'>
                                    <div className='flex justify-center items-center overflow-hidden h-40 md:h-48'>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={item?.url}
                                            alt=''
                                            className='max-h-full h-auto object-contain object-center'
                                        />
                                    </div>
                                    <div
                                        className='w-full text-sm font-medium bg-gray-700 text-white py-1 px-2 pl-4 flex justify-between items-center relative'
                                        onMouseLeave={() => setThreeDotMenu(-1)}
                                    >
                                        <span className='w-full overflow-hidden whitespace-nowrap'>
                                            {item?.name ?? `Untitled ${(idx) + 1}`}
                                        </span>
                                        <BiDotsVerticalRounded
                                            size={20}
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setThreeDotMenu(threeDotMenu === idx ? -1 : idx)
                                            }}
                                        />

                                        {threeDotMenu === idx &&
                                            <div
                                                className='py-2 shadow-lg absolute top-[80%] right-4 rounded-md bg-white flex flex-col gap-1 text-black font-medium w-32 z-[99]'
                                                onClick={() => setThreeDotMenu(-1)}
                                            >
                                                <span className='cursor-pointer mx-1 px-1 rounded-md hover:bg-lighest-theme'>Rename</span>
                                                <Divider type='tac' />
                                                <span
                                                    className='cursor-pointer mx-1 px-1 rounded-md hover:bg-lighest-theme'
                                                    onClick={() => setDeleteModal(idx)}
                                                >Delete</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className='col-span-12'>Upload some images...</div>
                    }
                </div>
            }
            {deleteModal > -1 &&
                <Modal>
                    <div className='w-full flex flex-col items-center gap-6'>
                        <span className='text-xl px-6 font-medium'>Do you want to delete</span>
                        <div className='w-full flex gap-2'>
                            <Button
                                type='button'
                                handleClick={() => {
                                    handleDeleteImage(deleteModal)
                                    setDeleteModal(-1)
                                }}
                                isSubmitting={false}
                                buttonType='primary'
                                className='lg:flex font-semibold text-lg w-full h-10'
                            >
                                Delete
                            </Button>
                            <Button
                                type='button'
                                handleClick={() => { setDeleteModal(-1) }}
                                isSubmitting={false}
                                buttonType='secondary'
                                className='lg:flex font-semibold text-lg w-full h-10'
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Project