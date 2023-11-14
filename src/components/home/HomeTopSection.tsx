'use client'
import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'
import { BRAND } from '../config'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slice/authSlice'

const HomeTopSection = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <div className='w-full h-full lg:h-[90vh] py-10 lg:py-2 px-6 md:px-16 lg:px-28 flex flex-col-reverse lg:flex-row items-center gap-10 relative'>
            <div className='flex flex-col gap-8 lg:gap-16 items-center'>
                <h1 className='text-3xl font-medium text-center lg:text-5xl tracking-wide'>{BRAND.intro}</h1>
                <img draggable={false} className='lg:hidden' src="/images/home.gif" alt="" />
                {isAuthenticated ?
                    <Link href={'/studio'}>
                        <Button type='button' buttonType='primary' className='w-48 h-16 font-medium text-2xl' handleClick={() => { }}>
                            Visit studio
                        </Button>
                    </Link>
                    :
                    <Link href={'/login'}>
                        <Button type='button' buttonType='primary' className='w-48 h-16 font-medium text-2xl' handleClick={() => { }}>
                            Get Started
                        </Button>
                    </Link>
                }
            </div>
            <img draggable={false} className='hidden lg:block lg:w-3/5' src="/images/home.gif" alt="" />
            <span id='about' className='absolute bottom-10'></span>
        </div>
    )
}

export default HomeTopSection