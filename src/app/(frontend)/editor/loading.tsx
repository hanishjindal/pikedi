import React from 'react'
import { SyncLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="flex flex-col relative select-none">
            <div className="min-h-[90vh] flex gap-4 text-lg">Loading <SyncLoader size={4} /></div>
        </div>
    )
}

export default Loading