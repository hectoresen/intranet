import React, { useEffect, useState } from 'react';
import { CreateNews } from '../../components';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { deleteUser, findUsers } from '../../redux/actions/admin.actions';
import { Row, Text, Input, Modal, Checkbox, Avatar } from '@nextui-org/react';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './Admin.scss';

const Admin = ({dispatch, adminUsers}) => {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);

    useEffect(() =>{
        dispatch(findUsers());
    },[])

    useEffect(() =>{
        setUsersList(adminUsers);
    },[adminUsers])

    const [showPanel, setShowPanel] = useState({
        news: false,
        projects: false,
        users: false
    });

    const displayItems = (item) =>{
        if(item === 'news') setShowPanel({news: true});
        if(item === 'projects') setShowPanel({projects: true});
        if(item === 'users') setShowPanel({users: true});
        if(item === 'home') navigate('/home');
    }

        /* PANEL HEADER */
    const header = (
        <div className="panel__products-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                    <InputText type="search" placeholder="Buscar usuarios..." />
            </span>
        </div>
    );

    /* DELETE & EDIT USERS */
    const editUser = (ev, user) =>{
        ev.preventDefault()
        console.log('Usuario a editar ->',user);
    }

    const deleteUserSelected = (user) =>{
        dispatch(deleteUser(user._id))
    }
    /////

    const getUserDate = (user) => user.createdAt.toLocaleString().substring(0,10);

    const editPassBtn = (user) => {
        return <div className='icons'>
                <Button icon="pi pi-pencil" className='p-button-success' iconPos='right' onClick={() =>{editUser(user)}}></Button>
                <Button icon="pi pi-trash" className='p-button-warning' iconPos='left' onClick={() =>{deleteUserSelected(user)}}></Button>
            </div>
    }

    return (
        <div className='adminpanel'>
            <div className='adminpanel__menu'>
                <div className='adminpanel__menu-item-home' onClick={() =>{displayItems('home')}}>Inicio</div>
                <div className='adminpanel__menu-item-news' onClick={() =>{displayItems('news')}}>Crear noticia</div>
                <div className='adminpanel__menu-item-projects' onClick={() =>{displayItems('projects')}}>Crear proyecto</div>
                <div className='adminpanel__menu-item-users' onClick={() =>{displayItems('users')}}>Gestionar usuarios</div>
            </div>
            <div className='adminpanel__container'>

                {/* NEWS */}

                {(showPanel.news)
                ?
                <CreateNews/>
                :
                ''
                }

                {/* PROJECTS */}

                {(showPanel.projects)
                ?
                <p>Creación de proyecto</p>
                :
                ''}

                {/* USERS */}

                {(showPanel.users)
                ?
                <div className='adminpanel__container-users'>
                <DataTable value={adminUsers}  header={header} responsiveLayout="scroll">
                    <Column field='name' header='Nombre' body={adminUsers.name}></Column>
                    <Column field='role' header='Permisos' body={adminUsers.role}></Column>
                    <Column field='date' header='Fecha de registro' body={getUserDate}></Column>
                    <Column field='password' header='Acciones' body={editPassBtn}></Column>
                </DataTable>
                    {/* DELETE MODAL CONDITIONAL */}
                </div>
                :
                ''}

            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    adminUsers: state.admin.users
})

export default connect(mapStateToProps)(Admin);