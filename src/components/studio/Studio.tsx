import React, { useEffect } from 'react';
import SideNav from '../common/SideNav';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Studio = () => {
    const searchParam = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const sideBarOpen = searchParam.get('nav')
    const isMobileOrTablet = window.innerWidth <= 768;

    useEffect(() => {
        if (!sideBarOpen) {
            router.push(`${pathname}/?nav=${isMobileOrTablet ? "close" : "open"}`)
        }
    }, [])

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex relative">
                <div className="bg-white rounded-lg w-full flex">
                    <div className={`h-full relative flex flex-col min-w-[60px] border-r-2 ${sideBarOpen === 'close' && 'items-center'} ${sideBarOpen === 'open' ? 'w-[15%]' : 'w-[60px] md:w-[80px]'}`}>
                        <SideNav
                            sideBarOpen={sideBarOpen}
                            pathname={pathname}
                        />
                    </div>

                    <div className={`col-span-8 overflow-auto ${sideBarOpen === 'open' ? 'w-[85%]' : 'w-[95%]'}]`}>
                        <div className='p-8'>
                            {pathname}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studio;
