import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hook/useAuth';
import Loading from '../Loading/Loading';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = useAuth();
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;