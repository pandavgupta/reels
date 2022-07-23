import React, { useContext } from 'react';
import {Navigate} from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Feed from './Feed';
export default function PrivateRouter(){
    const {user} = useContext(AuthContext);
    return (
        <>
        {
        user ? <Feed></Feed>: <Navigate replace to= "/login"/>
        }
        </>
    )

}