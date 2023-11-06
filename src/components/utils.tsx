import { FcHome, FcOldTimeCamera, FcOpenedFolder } from 'react-icons/fc';
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
