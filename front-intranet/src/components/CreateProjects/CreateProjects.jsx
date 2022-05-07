import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import './CreateProjects.scss';
import { createProject } from '../../redux/actions/project.actions';

const CreateProjects = ({dispatch, createdProject}) => {
    const [projectData, setProjectData] = useState({});
    console.log(createdProject);


    const handleProjectInfo = (ev) =>{
        const {name, value} = ev.target;
        setProjectData({...projectData, [name] : value});
        console.log(projectData);
    }

    const submitProject = (ev) =>{
        ev.preventDefault();
        console.table('Info a enviar', projectData);
        dispatch(createProject(projectData));
        setProjectData({});
    };



    return (
        <div className='create_project'>
            <h2>Creación de proyecto</h2>

            <Container className='events__add-form' maxWidth="xs">
            <Box component="form" onSubmit={submitProject} noValidate sx={{mt:1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título del proyecto"
                name="title"
                type="text"
                onChange={handleProjectInfo}
                autoFocus>
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descripción del proyecto"
                name="description"
                multiline
                rows={5}
                onChange={handleProjectInfo}
                autoFocus>
              </TextField>
              <div>
              <Button
                type="submit"
                margin="10px"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Crear
              </Button>
              </div>
            </Box>
          </Container>
          {
            (createdProject === false)
            ?
            <p className='created_error'>Debes rellenar todos los campos para crear un proyecto</p>
            :
            ''
            }
            {
            (createdProject === true)
            ?
            <p className='created_true'>Proyecto creado</p>
            :
            ''
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    createdProject: state.projects.createdProject
})

export default connect(mapStateToProps)(CreateProjects);