import { useState } from 'react'
import { MENU_DATA } from './config'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from './common/Button'
const Navbar = () => {
    const router = useRouter()
    const [mobileMenu, setMobileMenu] = useState(false)
    return (
        <nav className='select-none fixed top-0 left-0 w-full h-16 bg-white shadow-lg z-[9999]'>
            <div className='w-full h-full py-2 px-10 flex items-center justify-between relative'>
                <div className='flex gap-8 items-center relative h-full'>
                    <Link href='/' className='text-2xl font-bold'>
                        <img className='h-10' src="/images/logo.svg" alt="" />
                    </Link>
                    <div className='hidden lg:inline-flex gap-8 text-lg font-medium '>
                        {
                            MENU_DATA.map((item, index) => {
                                return (
                                    <Link href={item.link} key={index} className='cursor-pointer hover:text-theme'>
                                        {item.text}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='hidden lg:flex lg:items-center gap-6 bg-red'>
                    <div className='py-3 px-5 flex items-center gap-3 bg-lightGray w-[336px] rounded-xl'>
                        <img src="/images/searchIcon.svg" alt="searchIcon" className='w-5 h-5' />
                        <input
                            type='text'
                            className='font-normal bg-transparent outline-none bottom-0 w-full'
                            placeholder='Search for anything'
                        />
                    </div>
                    <Button
                        handleClick={() => router.push('/login')}
                        type='primary'
                        className='font-semibold text-lg px-6 py-2'
                    >
                        Sign In
                    </Button>
                </div>

                {/* For Mobile */}
                <img
                    className='lg:hidden cursor-pointer'
                    src="/images/menu-icon.svg"
                    alt=""
                    onClick={() => { setMobileMenu(!mobileMenu) }}
                />

                {
                    mobileMenu &&
                    <div className='lg:hidden absolute w-full top-full left-0 bg-white px-10 shadow-lg flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 text-lg font-medium'>
                            {
                                MENU_DATA.map((item, index) => {
                                    return (
                                        <Link href={item.link} key={index} className='cursor-pointer hover:text-theme'>
                                            {item.text}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className='py-3 px-5 flex items-center gap-3 bg-[#F6F6F6] w-full'>
                            <img src="/images/searchIcon.svg" alt="searchIcon" className='w-5 h-5' />
                            <input
                                type='text'
                                className='font-normal bg-transparent outline-none bottom-0 w-full'
                                placeholder='Search for anything'
                            />
                        </div>

                        <Button
                            handleClick={() => router.push('/login')}
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