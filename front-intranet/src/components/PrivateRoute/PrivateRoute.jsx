import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Access } from '../../pages';

const PrivateRoute = ({user, component}) => {
    const location = useLocation();

    if(!component) throw new Error('Componente no encontrado');

    if(user === false) <Navigate to='/' state={{prevRoute: location.pathname}} />;
    if(user === null) {
        return <div>
                <Access Denied={true}/>
            </div>
    }
    if(user.name){
        return component;
    }

}


export default connect(({auth}) => ({user: auth.user}))(PrivateRoute);