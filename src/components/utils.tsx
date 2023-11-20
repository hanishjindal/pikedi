import { FcHome, FcOldTimeCamera, FcOpenedFolder, FcPortraitMode, FcFullTrash } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi';
import { signOut, signIn } from '@/redux/slice/authSlice';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Dispatch } from 'redux';
import { IconType } from 'react-icons';

export type roleType = 'STUDIO' | 'EDITOR'
export type sideNavType = 'Main' | 'Studio' | 'Project' | 'Users' | 'Profile' | 'Trash' | 'Sign Out';
export type openCloseTyee = 'open' | 'close';
export type fieldType = 'name' | 'mobile' | 'email' | 'password'
export type passFieldType = 'old' | 'new' | 'confirm'

interface MenuItem {
    label: sideNavType;
    icon: IconType;
    route: string;
    onClick?: (setIsLoading: (value: boolean) => void, dispatch: Dispatch, router: any) => void;
}

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
    {
        label: 'Trash',
        icon: FcFullTrash,
        route: '/studio/trash',
    },
    {
        label: 'Profile',
        icon: FcPortraitMode,
        route: '/studio/profile',
    },
    {
        label: 'Sign Out',
        icon: BiLogOut,
        route: '',
        onClick: logout
    }
    // {
    //   label: 'Users',
    //   icon: FaUserFriends,
    //   route: '/studio',
    // },
];

export const checkActive = async (setUserData: any, dispatch: Dispatch, router: any, setIsLoading: (value: boolean) => void) => {
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