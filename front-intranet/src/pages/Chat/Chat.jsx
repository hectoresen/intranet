import React, { useEffect, useState } from 'react';
import { Messages, Navbar } from '../../components';
import {connect} from 'react-redux';
import { createGroup, findAllUsers } from '../../redux/actions/chat.actions';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './Chat.scss';

const Chat = ({dispatch, activeUser, allUsers}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [groupMembers, setGroupMembers] = useState({});

    useEffect(() =>{
        dispatch(findAllUsers());
    },[]);

    const header = (
        <div className="panel__products-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                    <InputText type="search" placeholder="Buscar usuarios..." />
            </span>
        </div>
    );

    const chatBtn = (user) =>{
        return <div>
            <Button icon="pi pi-comments" iconPos='left' onClick={() =>{startChat(user)}}></Button>
        </div>
    }
    const startChat = (user) =>{
        setActiveIndex(1);
        dispatch(createGroup(activeUser._id, user._id))
    }

    return (
    <div className='chat'>
        <div className='chat__navbar'>
            <Navbar />
        </div>
        <div className='chat__container'>
            <div className='chat__container-header'>
                Puedes crear chats fácilmente con otros usuarios de la aplicación
            </div>
            <div className='chat__container-select'>
            <TabView activeIndex={activeIndex} onTabChange={(e) =>setActiveIndex(e.index)}>
                <TabPanel header="Iniciar un chat" leftIcon='pi pi-user'>
                    <div className='users'>
                    <DataTable value={allUsers}  header={header} responsiveLayout="scroll">
                        <Column field='name' header='Nombre' body={allUsers.name}></Column>
                        <Column field='role' header='Permisos' body={allUsers.role}></Column>
                    <Column field='password' header='Acciones' body={chatBtn}></Column>
                    </DataTable>
                    </div>
                </TabPanel>
                <TabPanel header="Chats activos" leftIcon='pi pi-comments'>
                    <div className='chats'>
                        <Messages/>
                    </div>
                </TabPanel>
            </TabView>
            </div>
        </div>
    </div>
    )
};

const mapStateToProps = (state) =>({
    allUsers: state.chat.allUsers,
    activeUser: state.auth.user
})

export default connect(mapStateToProps)(Chat);