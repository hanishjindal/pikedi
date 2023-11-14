'use client'
import Button from '@/components/common/Button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-full h-[80vh] py-10 px-6 md:px-16 lg:px-28 flex justify-center items-center select-none bg-gradient-to-b from-lighest-theme to-white">
            <div className='bg-white p-10 rounded-md flex flex-col gap-6'>
                <h2 className='text-[100px] sm:text-[150px] font-medium text-center text-theme'>404</h2>
                <span className='text-lg'>Page not found...🤷‍♂️</span>
                <Link href="/">
                    <Button
                        type='button'
                        buttonType={'primary'}
                        className={'lg:flex font-semibold text-xl w-full h-12'}
                        isSubmitting={false}
                        handleClick={() => { }}
                    >
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    )
}