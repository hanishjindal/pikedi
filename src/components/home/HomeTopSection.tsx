import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'
import Image from 'next/image'
import { BRAND } from '../config'

const HomeTopSection = () => {
    return (
        <div className='w-full h-full lg:h-[90vh] py-10 lg:py-2 px-6 md:px-16 lg:px-28 flex flex-col-reverse lg:flex-row items-center gap-10 relative'>
            <div className='flex flex-col gap-8 lg:gap-16 items-center'>
                <h1 className='text-3xl font-medium text-center lg:text-5xl tracking-wide'>{BRAND.intro}</h1>
                <Image
                    src="/images/home.gif"
                    alt=""
                    width={400}
                    height={48}
                    priority
                    draggable={false}
                    className='lg:hidden w-auto'
                />
                <Link href={'/login'}>
                    <Button type='primary' className='w-48 h-16 font-medium text-2xl' handleClick={() => { }}>
                        Get Started
                    </Button>
                </Link>
            </div>
            <Image
                src="/images/home.gif"
                alt=""
                width={400}
                height={48}
                priority
                draggable={false}
                className='hidden lg:block lg:w-3/5 w-auto'
            />
            <span id='about' className='absolute bottom-10'></span>
        </div>
    )
}

export default HomeTopSection