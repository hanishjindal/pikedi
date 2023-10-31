import { useState } from 'react'
import { MENU_DATA } from '../config'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from './Button'
import { TfiMenu } from 'react-icons/tfi'

interface NavbarProps {
    mobileMenu: boolean;
    setMobileMenu: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    mobileMenu,
    setMobileMenu,
}) => {
    const router = useRouter()
    return (
        <nav
            className='sticky top-0 select-none w-full h-16 bg-white shadow-lg z-[9]'
            onClick={e => e.stopPropagation()}
        >
            <div className='w-full h-full py-2 px-10 flex items-center justify-between relative'>
                <Link href='/' className='text-2xl font-bold'>
                    <img className='h-10' src="/images/logo.svg" alt="" />
                </Link>
                <div className='hidden lg:inline-flex gap-8 text-lg font-medium h-full items-center'>
                    {
                        MENU_DATA.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className={`cursor-pointer h-7 hover:text-theme hover:border-b-2 border-theme`}
                                    onClick={() => { setMobileMenu(false) }}
                                >
                                    {item.text}
                                </Link>
                            )
                        })
                    }
                </div>
                <Button
                    handleClick={() => router.push('/login')}
                    type='primary'
                    className='hidden lg:flex font-semibold text-lg w-40 h-12'
                >
                    Sign In
                </Button>

                {/* For Mobile */}
                <TfiMenu
                    className='lg:hidden cursor-pointer'
                    onClick={() => { setMobileMenu(!mobileMenu) }}
                    size={25}
                />

                {
                    mobileMenu &&
                    <div className='lg:hidden absolute w-full top-full left-0 bg-white px-10 shadow-lg flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 text-lg font-medium'>
                            {
                                MENU_DATA.map((item, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={item.link}
                                            className={`cursor-pointer hover:text-theme`}
                                            onClick={() => { setMobileMenu(false) }}
                                        >
                                            {item.text}
                                        </Link>
                                    )
                                })
                            }
                        </div>

                        <Button
                            handleClick={() => {
                                router.push('/login')
                                setMobileMenu(false)
                            }}
                            type='primary'
                            className='font-semibold text-lg mb-4 py-2 w-full'
                        >
                            Sign In
                        </Button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar