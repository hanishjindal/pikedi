import { FcHome, FcOldTimeCamera, FcOpenedFolder } from 'react-icons/fc';
import { signOut } from '@/redux/slice/authSlice';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Dispatch } from 'redux';
import { FaUserFriends } from 'react-icons/fa'
import { IconType } from 'react-icons';

export type sideNavType = 'Main' | 'Studio' | 'Project' | 'Users';
export type openCloseTyee = 'open' | 'close';
export type fieldType = 'fullName' | 'mobile' | 'email' | 'password'
export type passFieldType = 'old' | 'new' | 'confirm'

interface MenuItem {
    label: sideNavType;
    icon: IconType;
    route: string;
}

export const SIDE_NAV_CONFIG: MenuItem[] = [
    {
        label: 'Main',
        icon: FcHome,
        route: '/studio',
    },
    {
        label: 'Studio',
        icon: FcOldTimeCamera,
        route: '/studio/new',
    },
    {
        label: 'Project',
        icon: FcOpenedFolder,
        route: '/studio/project',
    },
    // {
    //   label: 'Users',
    //   icon: FaUserFriends,
    //   route: '/studio',
    // },
];

export const logout = async (setIsLoading: (value: boolean) => void, dispatch: Dispatch, router: any) => {
    try {
        setIsLoading(true)
        await axios.post('/api/users/logout', {})
        dispatch(signOut())
        toast.success('Logout successful')
        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        setIsLoading(false)
    }
}