import { useState } from 'react'
import { MENU_DATA } from './config'
import { useRouter } from 'next/router'
const Navbar = () => {
    const router = useRouter()
    const [mobileMenu, setMobileMenu] = useState(false)
    return (
        <nav className='select-none fixed top-0 left-0 w-full h-16 bg-white shadow-lg'>
            <div className='w-full h-full py-2 px-10 flex items-center justify-between relative'>
                <div className='flex gap-8 items-center relative h-full'>
                    <a href='/' className='text-2xl font-bold'>
                        <img className='h-10' src="/images/logo.png" alt="" />
                    </a>
                    <div className='hidden md:inline-flex gap-8 text-lg font-medium '>
                        {
                            MENU_DATA.map((item, index) => {
                                return (
                                    <a href={item.link} key={index} className='cursor-pointer'>
                                        {item.text}
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-6'>
                    <div className='py-3 px-5 flex items-center gap-3 bg-lightGray w-[336px] rounded-xl'>
                        <img src="/images/searchIcon.svg" alt="searchIcon" className='w-5 h-5' />
                        <input
                            type='text'
                            className='font-normal bg-transparent outline-none bottom-0 w-full'
                            placeholder='Search for anything'
                        />
                    </div>
                    <button onClick={() => router.push('/login')} className='cursor-pointer font-medium text-lg'>
                        Sign In
                    </button>
                </div>

                {/* For Mobile */}
                <button
                    className='md:hidden'
                    onClick={() => { setMobileMenu(!mobileMenu) }}
                >
                    <img
                        src="/images/menu-icon.svg"
                        alt=""
                    />
                </button>

                {
                    mobileMenu &&
                    <div className='md:hidden absolute w-full top-full left-0 bg-white px-10 shadow-lg flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 text-lg font-medium'>
                            {
                                MENU_DATA.map((item, index) => {
                                    return (
                                        <a href={item.link} key={index} className='cursor-pointer'>
                                            {item.text}
                                        </a>
                                    )
                                })
                            }
                        </div>
                        {/* <div className='py-3 px-10 flex items-center gap-3 bg-[#F6F6F6] w-full'>
                        <img src="/images/searchIcon.svg" alt="searchIcon" className='w-5 h-5' />
                        <div className='font-normal text-sm'>Search for anything</div>
                    </div> */}

                        <button onClick={() => router.push('/login')} className='cursor-pointer font-semibold text-lg mb-4 py-2 w-full bg-theme rounded-lg'>
                            Sign In
                        </button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar