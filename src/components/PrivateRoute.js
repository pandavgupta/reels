import React, { useContext } from 'react';
import {Redirect} from 'react-router';
// import { Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function PrivateRouter({component:component,...rest}){
    const {user} = useContext(AuthContext);
    return {
        <Route {...rest}  render = {props=>{
            return user ? component {...props} /> :<Redirect to="login"/>
        }} />
    }

}