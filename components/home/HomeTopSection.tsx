import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'

const HomeTopSection = () => {
    return (
        <div className='w-full h-full py-10 px-6 md:px-16 lg:px-28 flex flex-col-reverse lg:flex-row items-center gap-10 relative'>
            <div className='flex flex-col gap-8 items-center'>
                <h1 className='text-2xl font-medium text-center lg:text-3xl'>Wanna get images deleted from professionals !</h1>
                <img draggable={false} className='lg:hidden lg:w-2/3' src="/images/home.gif" alt="" />
                <Link href={'/login'}>
                    <Button type='primary' className='w-40 h-12 font-medium text-lg' handleClick={() => { }}>
                        Get Started
                    </Button>
                </Link>
            </div>
            <img draggable={false} className='hidden lg:block lg:w-2/3' src="/images/home.gif" alt="" />
            <span id='about' className='absolute bottom-10'></span>
        </div>
    )
}

export default HomeTopSection