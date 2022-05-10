import React, { useEffect, useState } from 'react';
import { CreateNews, CreateProjects, ManageNews } from '../../components';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser, editPass, findUsers } from '../../redux/actions/admin.actions';
import { Row, Text, Input, Modal, Checkbox, Avatar } from '@nextui-org/react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dropdown } from 'primereact/dropdown';
import { registerUser } from '../../redux/actions/auth.actions';
import './Admin.scss';

const Admin = ({ dispatch, adminUsers }) => {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [newPass, setNewPass] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [registerNewUserData, setRegisterNewUserData] = useState({name: '', password: '', role: ''});

    useEffect(() => {
        dispatch(findUsers());
    }, [])

    useEffect(() => {
        setUsersList(adminUsers);
    }, [adminUsers])

    const [showPanel, setShowPanel] = useState({
        news: false,
        manageNews: false,
        projects: false,
        users: false,
    });

    const displayItems = (item) => {
        if (item === 'news') setShowPanel({ news: true });
        if (item === 'projects') setShowPanel({ projects: true });
        if (item === 'users') setShowPanel({ users: true });
        if (item === 'home') navigate('/home');
    }

    const header = (
        <div className="panel__products-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Buscar usuarios..." />
            </span>
        </div>
    );

    const editUserModal = (user) => {
        setSelectedUser(user);
        setShowEditModal(!showEditModal);
    }

    const handdlePassValue = (ev) => setNewPass(ev.target.value);

    const editUserPass = (ev) => {
        setShowEditModal(!showEditModal);
        dispatch(editPass(selectedUser._id, newPass));
    }

    const deleteUserSelected = (user) => {
        dispatch(deleteUser(user._id))
    }

    const getUserDate = (user) => user.createdAt.toLocaleString().substring(0, 10);

    const editPassBtn = (user) => {
        return <div className='icons'>
            <Button icon="pi pi-pencil" className='p-button-success' iconPos='right' onClick={() => { editUserModal(user) }}></Button>
            <Button icon="pi pi-trash" className='p-button-warning' iconPos='left' onClick={() => { deleteUserSelected(user) }}></Button>
        </div>
    };

    const userRoles = [{label: 'Rol de usuario', value: 'user'}, {label: 'Rol de administrador', value: 'admin'}];

    const handleRegisterInput = (ev) =>{
        const {name, value} = ev.target;
        setRegisterNewUserData({...registerNewUserData, [name]: value});
    };

    const registerSubmit = (ev) =>{
        ev.preventDefault();
        dispatch(registerUser(registerNewUserData));
    };


    return (
        <div className='adminpanel'>
            <div className='adminpanel__menu'>
                <div className='adminpanel__menu-item-home' onClick={() => { displayItems('home') }}>Inicio</div>
                <div className='adminpanel__menu-item-news' onClick={() => { displayItems('news') }}>Gestionar boletines</div>
                <div className='adminpanel__menu-item-projects' onClick={() => { displayItems('projects') }}>Crear proyecto</div>
                <div className='adminpanel__menu-item-users' onClick={() => { displayItems('users') }}>Gestionar usuarios</div>
            </div>
            <div className='adminpanel__container'>

                {/* NEWS */}

                {(showPanel.news)
                    ?
                    <div className='manage-news'>
                        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                            <TabPanel header="Crear noticia" leftIcon='pi pi-cloud-upload'>
                                <CreateNews />
                            </TabPanel>
                            <TabPanel header="Gestionar noticias" leftIcon='pi pi-cog'>
                                <ManageNews />
                            </TabPanel>
                        </TabView>
                    </div>
                    :
                    ''
                }

                {/* PROJECTS */}

                {(showPanel.projects)
                    ?
                    <CreateProjects />
                    :
                    ''}

                {/* USERS */}

                {(showPanel.users)
                    ?
                    <div className='adminpanel__container-users'>
                        <DataTable value={usersList} header={header} responsiveLayout="scroll">
                            <Column field='name' header='Nombre' body={usersList.name}></Column>
                            <Column field='role' header='Permisos' body={usersList.role}></Column>
                            <Column field='date' header='Fecha de registro' body={getUserDate}></Column>
                            <Column field='password' header='Acciones' body={editPassBtn}></Column>
                        </DataTable>

                        {(showEditModal)
                            ?
                            <div>
                                <p>SAD</p>
                                <Modal
                                    closeButton
                                    preventClose
                                    aria-labelledby="modal-title"
                                    open={showEditModal}
                                    onClose={() => { setShowEditModal(!showEditModal) }}
                                >
                                    <Modal.Header>
                                        <Text id="modal-title" size={18}>
                                            <Text b size={18}>
                                                Panel de cambio de contraseña
                                            </Text>
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input
                                            clearable
                                            bordered
                                            color="primary"
                                            size="lg"
                                            labelPlaceholder="Introduce el nuevo stock de este artículo"
                                            type="text"
                                            name="stock"
                                            value={newPass}
                                            onChange={handdlePassValue}
                                        />
                                        <Row justify="space-between">
                                            <Text color="error" size={14}>
                                                Esta acción es irreversible
                                            </Text>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button auto onClick={(editUserPass)}>
                                            Editar usuario
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            :
                            ''
                        }
                        <div className='create__user'>
                            <div className='create__user-form'>
                                <Container className="access__form" component="main" maxWidth="xs">
                                    <CssBaseline />
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography component="h1" variant="h5">
                                            Crear usuario
                                        </Typography>
                                        <Box component="form" onSubmit={registerSubmit} noValidate sx={{ mt: 1 }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                id="name"
                                                label="Nombre de usuario"
                                                name="name"
                                                type='text'
                                                autoFocus
                                                onChange={handleRegisterInput}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                name="password"
                                                label="Contraseña"
                                                type="password"
                                                id="password"
                                                onChange={handleRegisterInput}
                                            />
                                            <Dropdown options={userRoles} value={registerNewUserData.role} onChange={(ev) =>{setRegisterNewUserData({...registerNewUserData,role:ev.value})}} placeholder="Selecciona un rol"></Dropdown>
                                            <div>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Registrarme
                                            </Button>
                                            </div>

                                        </Box>
                                    </Box>
                                </Container>
                            </div>
                        </div>
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