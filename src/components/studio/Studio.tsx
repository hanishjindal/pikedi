import React, { useEffect } from 'react';
import SideNav from '../common/SideNav';
import Divider from '../common/Divider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Studio = () => {
    const searchParam = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const sideBarOpen = searchParam.get('nav')

    useEffect(() => {
        if (!sideBarOpen) {
            router.push(`${pathname}/?nav=open`)
        }
    }, [])

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex relative">
                <div className="bg-white rounded-lg w-full flex">
                    <div className={`h-full relative flex flex-col ${sideBarOpen === 'close' && 'items-center'} ${sideBarOpen === 'open' ? 'w-[15%]' : 'w-[5%]'}`}>
                        <SideNav
                            sideBarOpen={sideBarOpen}
                            pathname={pathname}
                        />
                    </div>

                    <Divider type='tic' />

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
