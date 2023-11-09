import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { MENU_DATA } from '../config'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from './Button'
import { TfiMenu } from 'react-icons/tfi'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@/redux/slice/authSlice'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signIn } from '@/redux/slice/authSlice';
import Divider from './Divider'
import { BiSolidUserCircle } from 'react-icons/bi'
import { logout } from '../utils'

interface NavbarProps {
    mobileMenu: boolean;
    setMobileMenu: (value: boolean) => void;
    setUserData?: (value: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    mobileMenu,
    setMobileMenu,
    setUserData
}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const profilePic = useSelector(selectUser)?.profilePic;
    const [userIcon, setUserIcon] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.post('/api/users/active', {});
                if (setUserData) {
                    setUserData(res.data.data)
                }
                if (res.data.active) {
                    dispatch(signIn(res.data.data))
                }
            } catch (error: any) {
                if (error?.response?.data?.error) {
                    await logout(setIsLoading, dispatch, router);
                }
                toast.error(error?.response?.data.data ?? error.message);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <nav
            className='sticky top-0 select-none w-full h-16 bg-white shadow-lg z-[9]'
            onClick={e => e.stopPropagation()}
            onMouseLeave={() => setUserIcon(false)}
            onTouchEnd={() => setUserIcon(false)}
        >
            <div className='w-full h-full py-2 px-8 lg:px-10 flex items-center justify-between relative'>
                <Link href='/' className='text-2xl font-bold'>
                    <Image
                        src="/images/logo.svg"
                        alt=""
                        width="0"
                        height="0"
                        sizes="30px"
                        style={{ width: '30px', height: 'auto' }}
                        priority
                    />
                </Link>
                <div className='hidden lg:inline-flex gap-8 text-lg font-medium h-full items-center'>
                    {
                        MENU_DATA.map((item, index) => {
                            if (!item.protected || isAuthenticated) {
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
                            } else {
                                return (
                                    <Fragment key={index}>
                                    </Fragment>
                                )
                            }
                        })
                    }
                </div>

                {isAuthenticated ?
                    <div className='hidden h-12 w-auto relative lg:flex flex-col items-center justify-center'>
                        {profilePic ?
                            <Image
                                src={profilePic}
                                alt=''
                                width={100}
                                height={100}
                                priority
                                className='h-12 w-12 rounded-full border-2 cursor-pointer'
                                onClick={() => setUserIcon(e => !e)}
                            />
                            :
                            <BiSolidUserCircle
                                size={48}
                                className="border rounded-full text-gray-600 cursor-pointer"
                                onClick={() => setUserIcon(e => !e)}
                            />
                        }
                        {userIcon &&
                            <div
                                className='absolute top-full right-0 rounded-lg bg-white shadow-lg z-[9999] w-40 flex flex-col gap-1 py-2 border'
                                onMouseLeave={() => setUserIcon(false)}
                                onClick={() => setUserIcon(false)}

                            >
                                <Link
                                    href={'/studio?nav=open'}
                                    className='cursor-pointer font-medium mx-4'
                                >
                                    Studio
                                </Link>

                                <Divider type='tac' />

                                <Link
                                    href={'/profile'}
                                    className='cursor-pointer font-medium mx-4'
                                >
                                    Profile
                                </Link>

                                <Divider type='tac' />

                                <div
                                    className='cursor-pointer font-medium mx-4'
                                    onClick={() => logout(setIsLoading, dispatch, router)}
                                >
                                    Sign Out
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <Button
                        type='button'
                        handleClick={() => {
                            router.push('/login')
                        }}
                        isSubmitting={isLoading}
                        buttonType='primary'
                        className='hidden lg:flex font-semibold text-lg w-40 h-12'
                    >
                        Sign In
                    </Button>
                }

                {/* For Mobile */}
                {isAuthenticated ?
                    (profilePic ?
                        <Image
                            src={profilePic}
                            alt=''
                            width={100}
                            height={100}
                            priority
                            className='h-12 w-12 object-cover rounded-full border-2 cursor-pointer lg:hidden'
                            onClick={() => { setMobileMenu(!mobileMenu) }}
                        />
                        :
                        <BiSolidUserCircle
                            size={48}
                            className="border rounded-full text-gray-600 cursor-pointer lg:hidden"
                            onClick={() => { setMobileMenu(!mobileMenu) }}
                        />
                    )
                    :
                    <TfiMenu
                        className='lg:hidden cursor-pointer'
                        onClick={() => { setMobileMenu(!mobileMenu) }}
                        size={25}
                    />
                }

                {
                    mobileMenu &&
                    <div className='lg:hidden absolute w-full top-full left-0 bg-white px-10 shadow-lg flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 text-lg font-medium'>
                            {
                                MENU_DATA.map((item, index) => {
                                    if (!item.protected || isAuthenticated) {
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
                                    } else {
                                        return (
                                            <Fragment key={index}>
                                            </Fragment>
                                        )
                                    }
                                })
                            }
                            {isAuthenticated &&
                                <Link
                                    key={'studio'}
                                    href={'/studio?nav=close'}
                                    className={`cursor-pointer hover:text-theme`}
                                    onClick={() => { setMobileMenu(false) }}
                                >
                                    Studio
                                </Link>
                            }
                            {isAuthenticated &&
                                <Link
                                    key={'profile'}
                                    href={'/profile'}
                                    className={`cursor-pointer hover:text-theme`}
                                    onClick={() => { setMobileMenu(false) }}
                                >
                                    Profile
                                </Link>
                            }
                        </div>

                        <Button
                            type='button'
                            handleClick={() => {
                                if (isAuthenticated) {
                                    logout(setIsLoading, dispatch, router)
                                } else {
                                    router.push('/login')
                                }
                                setMobileMenu(false)
                            }}
                            isSubmitting={isLoading}
                            buttonType='primary'
                            className='font-semibold text-lg mb-4 py-2 w-full h-12'
                        >
                            Sign {isAuthenticated ? 'Out' : 'In'}
                        </Button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar