import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsUpload } from 'react-icons/bs'
import Button from '../common/Button'
import Select, { MultiValue } from "react-select";
import Image from 'next/image'
import { EDIT_REASONS } from '../config'

const NewUpload = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [uploadedImage, setUploadedImage] = useState<string>('')
    const [selectReason, setSelectReason] = useState<MultiValue<typeof EDIT_REASONS[0]>>([])
    const [imageName, setImageName] = useState<string>('')
    const [summary, setSummary] = useState<string>('')

    const handleUpload = async () => {
        if (selectReason.length === 0) {
            toast.error('Select editing reason')
            return;
        }
        try {
            setIsSubmitting(true)
            const payload = {
                url: uploadedImage,
                reasons: selectReason.map((item) => { return item.label }),
                name: imageName,
                summary
            }
            const res = await axios.post("/api/studio/update-new-image", payload)
            if (!res.data.success) {
                throw new Error(res.data.message)
            }
            handleReset()
            toast.success('Uploaded successfully')
        } catch (error: any) {
            toast.error(error?.response?.data?.error ?? 'Somthing went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        setSelectReason([])
        setUploadedImage('')
        setImageName('')
        setSummary('')
    }

    const handleUrl = (result: any) => {
        setUploadedImage(result?.info?.url)
    }

    const handleChange = (selections: MultiValue<typeof EDIT_REASONS[0]>) => {
        setSelectReason(selections);
    };

    return (
        <div className='w-full h-full px-4 md:px-8 flex flex-col gap-8'>

            <h1 className='text-xl md:text-4xl font-semibold'>Upload New Images</h1>

            {uploadedImage ?
                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className='w-full lg:w-1/2 h-[250px] lg:h-[400px] border-2 flex justify-center items-center rounded-lg overflow-hidden'>
                        <Image
                            src={uploadedImage}
                            alt=""
                            width={1600}
                            height={1000}
                            priority
                            className='object-cover object-center shadow-md max-w-full w-auto max-h-full h-auto'
                        />
                    </div>
                    <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                        <div>
                            <span className='text-sm'>Reasons:-</span>
                            <Select
                                isMulti
                                onChange={handleChange}
                                options={EDIT_REASONS}
                            />
                        </div>
                        <div>
                            <span className='text-sm'>Image Name:-</span>
                            <input
                                type="text"
                                className='w-full text-black border-2 p-[6px] rounded-sm text-base px-2'
                                placeholder='Enter image name'
                                value={imageName}
                                onChange={(e) => { setImageName(e.target.value) }}
                            />
                        </div>
                        <div>
                            <span className='text-sm'>Enter editing summary:-</span>
                            <textarea
                                rows={4}
                                className='w-full text-black border-2 p-[6px] rounded-sm text-base px-2'
                            />
                        </div>
                    </div>
                </div>
                :
                <div className='h-4/5 w-full border-2 border-dashed border-theme rounded-xl flex justify-center items-center overflow-hidden'>
                    <CldUploadButton
                        options={{ folder: 'pikediNewPic', sources: ['local', 'google_drive', 'camera'], showPoweredBy: false, showSkipCropButton: true, maxFiles: 1 }}
                        onUpload={handleUrl}
                        uploadPreset="pikedi"
                        className='h-full w-full'
                    >
                        <div
                            className='w-full h-full relative gap-3 flex flex-col justify-center items-center rounded-lg text-black bg-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer overflow-hidden'
                        >
                            <div className='flex items-center gap-3 text-theme font-semibold'>
                                <span className='cursor-pointer text-2xl'>Upload</span>
                                <BsUpload size={22} />
                            </div>
                            <span className='text-xs'>Drag and Drop  | Click to Upload</span>
                            {/* <input
                        className='absolute top-[0%] -left-1/2 w-[500%] h-[200%] opacity-0 bg-transparent text-transparent cursor-pointer'
                        type="file"
                        accept='image/*'
                    /> */}
                        </div>
                    </CldUploadButton>
                </div>
            }


            <div className={`${!uploadedImage && 'hidden'} flex w-auto gap-5`}>
                <Button
                    type='submit'
                    buttonType='primary'
                    isSubmitting={isSubmitting}
                    className='font-semibold w-40 h-12 text-lg px-6 py-2 flex gap-5'
                    handleClick={handleUpload}
                >
                    Submit
                </Button>

                <Button
                    type='reset'
                    buttonType='secondary'
                    isSubmitting={isSubmitting}
                    className='font-semibold w-40 h-12 text-lg px-6 py-2 flex gap-5'
                    handleClick={handleReset}
                >
                    Reset
                </Button>
            </div>

        </div>
    )
}

export default NewUpload