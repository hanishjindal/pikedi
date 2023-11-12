'use client';
import React, { useEffect, useState } from 'react';
import SideNav from '../common/SideNav';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { sideNavType } from '@/components/utils'
import Profile from '../profile/Profile';
import NewUpload from './NewUpload';
import Project from './Project';

interface studioProps {
    page: sideNavType;
}

const Studio: React.FC<studioProps> = ({ page }) => {
    const searchParam = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const sideBarOpen = searchParam.get('nav')
    let isMobileOrTablet: boolean = false;

    useEffect(() => {
        isMobileOrTablet = document.documentElement.clientWidth <= 768;
        if (!sideBarOpen) {
            router.push(`${pathname}/?nav=${isMobileOrTablet ? "close" : "open"}`)
        } else if (sideBarOpen === 'open' && isMobileOrTablet) {
            router.push(`${pathname}/?nav=close`)
        }
    }, [sideBarOpen])

    const renderStudio = () => {
        if (page === 'Profile') {
            return <Profile />
        } else if (page === 'Studio') {
            return <NewUpload />
        } else if (page === 'Project') {
            return <Project />
        } else {
            return <div className='mx-8'>
                {pathname}
            </div>
        }
    }

    return (
        <div className="w-full min-h-[90vh] h-auto flex relative">
            <div className="bg-white rounded-lg w-full flex">
                <div className={`h-full relative flex flex-col min-w-[60px] ${sideBarOpen === 'close' && 'items-center'} ${sideBarOpen === 'open' ? 'w-[15%]' : 'w-[60px] md:w-[80px]'}`}>
                    <SideNav
                        sideBarOpen={sideBarOpen}
                        pathname={pathname}
                        isMobileOrTablet={isMobileOrTablet}
                    />
                </div>

                <div className={`w-full h-auto overflow-y-scroll ${sideBarOpen === 'open' ? 'w-[85%]' : 'w-[95%]'}] py-8`}>
                    {
                        renderStudio()
                    }
                </div>
            </div>
        </div>
    );
};

export default Studio;
