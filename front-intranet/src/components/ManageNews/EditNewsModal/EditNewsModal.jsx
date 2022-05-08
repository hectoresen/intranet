import React, { useState } from "react";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { InputText } from "primereact/inputtext";
import TextField from '@mui/material/TextField';
import {connect} from 'react-redux';
import "./EditNewsModal.scss";
import { editNew } from "../../../redux/actions/news.actions";

const EditNewsModal = ({dispatch, ...props}) => {
    const { newToEdit } = props;
    const { setVisible, bindings } = useModal(true);
    const modalActions = () => setVisible(false);

    const [updatedNew, setUpdatedNew] = useState({});

    const handdleNewInfoNotice = (ev) =>{
        const {name, value} = ev.target;
        setUpdatedNew({...updatedNew, [name]: value})
    };

    const submitUpdatedNew = (ev) =>{
        ev.preventDefault();
        modalActions();
        dispatch(editNew(updatedNew, newToEdit.id))
    }
    return (
        <div className="news__modal">
            <Modal
                scroll
                fullScreen
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <h2>
                            Editando noticia:{" "}
                            <span className="title-edit">{newToEdit.title}</span>
                        </h2>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text id="modal-description">
                        <div className="form">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Nuevo título de la noticia"
                                name="title"
                                type="text"
                                onChange={handdleNewInfoNotice}
                                autoFocus>
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Nueva descripción de la noticia"
                                name="description"
                                multiline
                                rows={5}
                                onChange={handdleNewInfoNotice}
                                autoFocus>
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                id="dateNew"
                                name="dateNew"
                                type="datetime-local"
                                onChange={handdleNewInfoNotice}
                                autoFocus>
                            </TextField>
                        </div>
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button flat auto color="error" onClick={modalActions}>
                        Cerrar
                    </Button>
                    <Button onClick={submitUpdatedNew}>Modificar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
const mapStateToProps = (state) =>({
    updatedNews: state.news.updatedNews
  })

export default connect(mapStateToProps)(EditNewsModal);
