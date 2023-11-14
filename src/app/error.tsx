'use client' // Error components must be Client Components

import Button from '@/components/common/Button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="w-full h-[80vh] py-10 px-6 md:px-16 lg:px-28 flex justify-center items-center select-none bg-gradient-to-b from-lighest-theme to-white">
            <div className='bg-white p-10 rounded-md flex flex-col gap-6 items-center'>
                <h1 className='text-5xl text-red-500 font-semibold'>Error</h1>
                <h2 className='text-xl'>Something went wrong!</h2>
                <Button
                    type='submit'
                    buttonType='primary'
                    className='font-semibold w-40 h-12 text-lg px-6 py-2 flex gap-5'
                    isSubmitting={false}
                    handleClick={() => reset()}
                >
                    Try again
                </Button>
            </div>
        </div>
    )
}