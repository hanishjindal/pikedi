import React, { useState } from 'react';
import SideNav from '../common/SideNav';
import Divider from '../common/Divider';
import { openCloseTyee } from '../utils'
import { usePathname } from 'next/navigation';

const Studio = () => {
    const [sideBarOpen, setSideBarOpen] = useState<openCloseTyee>('open')
    const pathname = usePathname()
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex relative">
                <div className="bg-white rounded-lg w-full flex">
                    <div className={`h-full relative flex flex-col ${sideBarOpen === 'close' && 'items-center'} ${sideBarOpen === 'open' ? 'w-[15%]' : 'w-[5%]'}`}>
                        <SideNav
                            sideBarOpen={sideBarOpen}
                            setSideBarOpen={setSideBarOpen}
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
