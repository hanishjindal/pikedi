'use client'

import React, { ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signIn } from '@/redux/slice/authSlice';
import { logout } from '@/components/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextProps {
    children: ReactNode;
}

const ApiDataFetcher: React.FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('/api/users/active', {});
                if (res.data.success) {
                    dispatch(signIn(res.data.data))
                }
            } catch (error: any) {
                if (error?.response?.data?.error) {
                    await logout(() => { }, dispatch, router);
                }
                toast.error(error?.response?.data.data ?? error.message);
            }
        };

        fetchData();
    }, []);

    return null;
};

const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
    return (
        <>
            <ApiDataFetcher />
            {children}
        </>
    );
};

export default AuthContext;