import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({user, component}) => {
    const location = useLocation();

    if(user === null) return <div>Cargando usuario</div>
    if(user === false) return <Navigate to='/' state={{prevRoute: location.pathname}} />
    if(user.name){
        return component;
    }

}

export default connect(({auth}) => ({user: auth.user}))(PrivateRoute);