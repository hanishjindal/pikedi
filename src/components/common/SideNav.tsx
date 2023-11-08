import React from 'react';
import Divider from './Divider';
import { SIDE_NAV_CONFIG } from '../utils';
import { useRouter } from 'next/navigation';

interface SideNavProps {
    sideBarOpen: string | null;
    pathname: string;
}

const SideNav: React.FC<SideNavProps> = ({ sideBarOpen, pathname }) => {
    const router = useRouter()
    const isMobileOrTablet = window.innerWidth <= 768;

    return (
        <div className='p-2 md:p-4 pt-4 h-full flex flex-col gap-2 w-full'>
            {SIDE_NAV_CONFIG.map((menuItem, index) => (
                <React.Fragment key={index}>
                    <div
                        className={`link p-2 text-base text-gray-500 flex gap-2 items-center ${sideBarOpen === 'close' && 'justify-center'} ${pathname === menuItem.route && "bg-theme text-white rounded-lg"} relative cursor-pointer`}
                        onClick={(event) => {
                            if (event.detail === 2 && !isMobileOrTablet) {
                                const nav = (!sideBarOpen || sideBarOpen === 'close') ? 'open' : 'close'
                                router.push(`${menuItem.route}/?nav=${nav}`)
                            } else {
                                router.push(`${menuItem.route}/?nav=${sideBarOpen}`)
                            }
                        }}
                    >
                        {
                            React.createElement(menuItem.icon, { size: 16, color: '#000' })
                        }

                        {sideBarOpen === 'open' ?
                            <span className='text-xs lg:text-base hidden md:block'>{menuItem.label}</span>
                            :
                            <div className='hidden hidden-tooltip absolute bg-black p-1 px-2 text-xs top-[80%] left-[80%] text-white border border-gray-300'>
                                {menuItem.label}
                            </div>
                        }
                    </div>
                    {(index === 1) &&
                        <Divider type='toe' />
                    }
                </React.Fragment>
            ))}
        </div>
    );
}

export default SideNav;
