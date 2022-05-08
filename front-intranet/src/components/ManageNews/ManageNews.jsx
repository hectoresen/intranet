import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {connect} from 'react-redux';
import { InputText } from 'primereact/inputtext';
import './ManageNews.scss';
import { findNews } from '../../redux/actions/news.actions';
import EditNewsModal from './EditNewsModal/EditNewsModal';

const ManageNews = ({dispatch, news, updatedNews}, ...restProps) => {
    const [manageNews, setManageNews] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedNew, setSelectedNew] = useState({});

    useEffect(() =>{
        dispatch(findNews());
    },[])

    const header = (
        <div className="panel__products-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                    <InputText type="search" placeholder="Buscar noticias..." />
            </span>
        </div>
    );

    const showEditModal = (selectNew) =>{
        setSelectedNew(selectNew);
        setShowModal(true);
    }

    const getNewDate = (selectNew) =>selectNew.dateNew.toLocaleString();
    const getLittleDescription = (selectNew) =><p>{`${selectNew.description.substring(0,30)}...`}</p>;
    const getBtnActions = (selectNew) =>{
        return <div className='icons'>
            <Button icon="pi pi-pencil" className='p-button-success' iconPos='right' onClick={() =>{showEditModal(selectNew)}}></Button>
            <Button icon="pi pi-trash" className='p-button-warning' iconPos='right'></Button>
        </div>
    }

    return (
        <div className='managenews'>
            {
                (showModal)
                ?
                <EditNewsModal newToEdit={selectedNew}/>
                :
                ''
            }
            <h2>Gestión de noticias</h2>
            {
                (updatedNews != null)
                ?
                <p className='managenews-error'>Debes cubrir todos los campos para modificar la noticia!</p>
                :
                ''
            }
            <div className='managenews__list'>
                <DataTable value={news} header={header} responsiveLayout="scroll">
                    <Column field ='title' header="Titulo" body={news.title}></Column>
                    <Column field ='date' header="Fecha" body={getNewDate}></Column>
                    <Column field ='description' header="Descripción" body={getLittleDescription}></Column>
                    <Column field ='actions' header="Acciones" body={getBtnActions}></Column>
                </DataTable>
            </div>
        </div>
    )
};

const mapStateToProps = (state) =>({
    news: state.news.news,
    updatedNews: state.news.updatedNews
})

export default connect(mapStateToProps)(ManageNews);