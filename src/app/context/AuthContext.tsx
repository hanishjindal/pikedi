'use client'

import React, { ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signIn } from '@/redux/slice/authSlice';

interface AuthContextProps {
    children: ReactNode;
}

const ApiDataFetcher: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('/api/users/active', {});
                dispatch(signIn(res.data.data))
            } catch (error) {
                console.error('Error fetching data:', error);
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