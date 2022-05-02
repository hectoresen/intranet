import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({user, component}) => {
    const location = useLocation();

    if(user === null) return <div>Cargando usuario</div>
    if(user === false) return <Navigate to='/' state={{prevRoute: location.pathname}} />
    if(user.role === "admin"){
        return component;
    }
    if(user.role === "user"){
        return <Navigate to='/' state={{prevRoute: location.pathname}} />
    }
}

export default connect(({auth}) => ({user: auth.user}))(PrivateRouteAdmin);