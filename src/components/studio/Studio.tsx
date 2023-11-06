import React, { useState } from 'react';
import SideNav from '../common/SideNav';
import Divider from '../common/Divider';
// import { AiOutlineMenuUnfold } from 'react-icons/ai'

type sideNavType = 'Studio' | 'Project' | 'Users'
type sideBarOpenType = 'open' | 'close'

const Studio = () => {
    const [sideNavMenu, setSideNavMenu] = useState<sideNavType>('Studio')
    const [sideBarOpen, setSideBarOpen] = useState<sideBarOpenType>('close')
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex relative">
                <div className="bg-white rounded-lg w-full flex">
                    <div className={`h-full relative flex flex-col ${sideBarOpen === 'close' && 'items-center'} ${sideBarOpen === 'open' ? 'w-[15%]' : 'w-[5%]'}`}>
                        {/* <AiOutlineMenuUnfold
                            className={`m-2 absolute top-0 cursor-pointer ${sideBarOpen === 'open' && 'left-4'}`}
                            onClick={() => setSideBarOpen(sideBarOpen === 'open' ? 'close' : 'open')}
                        /> */}
                        <SideNav
                            sideNavMenu={sideNavMenu}
                            setSideNavMenu={setSideNavMenu}
                            sideBarOpen={sideBarOpen}
                            setSideBarOpen={setSideBarOpen}
                        />
                    </div>
                    <Divider type='tic' />
                    <div className={`col-span-8 overflow-auto ${sideBarOpen === 'open' ? 'w-[85%]' : 'w-[95%]'}]`}>
                        Home
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studio;
