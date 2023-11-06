import React from 'react';
import Divider from './Divider';
import Link from 'next/link';
import { SIDE_NAV_CONFIG } from '../config';

type sideNavType = 'Studio' | 'Project' | 'Users'

interface SideNavProps {
    sideNavMenu: sideNavType;
    setSideNavMenu: (val: sideNavType) => void;
    sideBarOpen: 'open' | 'close';
    setSideBarOpen: (val: 'open' | 'close') => void;
}

const labelToTypeMap: { [label: string]: sideNavType } = {
    'Studio': 'Studio',
    'Project': 'Project',
    'Users': 'Users',
};

const SideNav: React.FC<SideNavProps> = ({ sideNavMenu, setSideNavMenu, sideBarOpen, setSideBarOpen }) => {
    return (
        <div className='p-4 pt-4 h-full flex flex-col gap-2 w-full'>
            {SIDE_NAV_CONFIG.menuItems.map((menuItem, index) => (
                <React.Fragment key={index}>
                    <Link
                        href={menuItem.route}
                        className={`link p-2 text-base text-gray-500 flex gap-2 items-center ${sideBarOpen === 'close' && 'justify-center'} ${sideNavMenu === menuItem.label && "bg-theme text-white rounded-lg"} relative`}
                        onClick={() => setSideNavMenu(labelToTypeMap[menuItem.label])}
                        onDoubleClick={() => setSideBarOpen(sideBarOpen === 'open' ? 'close' : 'open')}
                    >
                        {
                            React.createElement(menuItem.icon, { size: 16, color: '#000' })
                        }

                        {sideBarOpen === 'open' ?
                            <span>{menuItem.label}</span>
                            :
                            <div className='hidden hidden-tooltip absolute bg-black p-1 px-2 text-xs top-[80%] left-[80%] text-white border border-gray-300'>
                                {menuItem.label}
                            </div>
                        }
                    </Link>
                    {(index === 1) &&
                        <Divider type='tac' />
                    }
                </React.Fragment>
            ))}
        </div>
    );
}

export default SideNav;
