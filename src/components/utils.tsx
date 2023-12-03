import { FcHome, FcOldTimeCamera, FcOpenedFolder, FcPortraitMode, FcFullTrash } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi';
import { signOut, signIn } from '@/redux/slice/authSlice';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Dispatch } from 'redux';
import { IconType } from 'react-icons';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/libs/firebase'

export type roleType = 'STUDIO' | 'EDITOR'
export type sideNavType = 'Main' | 'Studio' | 'Project' | 'Users' | 'Profile' | 'Trash' | 'Sign Out' | 'Assigned';
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

export const socialLogin = (dispatch: Dispatch, router: any, role: roleType) => {
    const provider = new GoogleAuthProvider();
    toast.loading('Authenticating...')
    signInWithPopup(auth, provider)
        .then(async (result: any) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const data = {
                name: result?._tokenResponse?.fullName,
                email: result?._tokenResponse?.email,
                image: result?._tokenResponse?.photoUrl,
                role: role
            }

            const resp = await axios.post('/api/users/google-auth', data)
            if (resp?.data?.success) {
                toast.dismiss()
                dispatch(signIn(resp.data.data))
                toast.success('Success')
                if (resp.data?.data?.role === 'STUDIO') {
                    router.push('/studio')
                } else {
                    router.push('/editor')
                }
            }

        }).catch((error) => {
            toast.dismiss()
            const credential = GoogleAuthProvider.credentialFromError(error);
            toast.error('Something went wrong')
            // logout(() => { }, dispatch, router)
        });

}

export const STUDIO_SIDE_NAV_CONFIG: MenuItem[] = [
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

export const EDITOR_SIDE_NAV_CONFIG: MenuItem[] = [
    {
        label: 'Main',
        icon: FcHome,
        route: '/editor',
    },
    {
        label: 'Project',
        icon: FcOpenedFolder,
        route: '/editor/project',
    },
    {
        label: 'Assigned',
        icon: FcFullTrash,
        route: '/editor/assigned',
    },
    {
        label: 'Profile',
        icon: FcPortraitMode,
        route: '/editor/profile',
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

export const copyData = (data: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = data;
    document.body.appendChild(textArea);

    try {
        textArea.select();
        document.execCommand('copy');
        toast.success('Copied!');
    } catch (error: any) {
        toast.error(error.message ?? 'Something went wrong!');
    } finally {
        document.body.removeChild(textArea);
    }
}

export const handleDownloadImage = async (link: string, name: string) => {
    try {
        toast.loading('Downloading started...')
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data]);
        const url = URL.createObjectURL(blob);
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.download = `${name ?? 'untitled'}.png`;
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
        URL.revokeObjectURL(url);
        toast.dismiss()
        toast.success('Image downloaded successfully');
    } catch (error: any) {
        toast.dismiss()
        toast.error(error?.response?.data?.error ?? 'Something went wrong')
    }
}
