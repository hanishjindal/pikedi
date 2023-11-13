import Login from '@/components/login/Login'

const Page = () => {
    return (
        <div className='min-h-[90vh] flex flex-col justify-between overflow-y-auto select-none bg-gradient-to-b from-lighest-theme to-white relative'>
            <Login />
        </div>
    )
}

export default Page