import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { getAllProjects } from '../../redux/actions/project.actions';
import { createComment, findComment } from '../../redux/actions/comments.actions';
import { FaRegCommentDots, FaCommentSlash } from 'react-icons/fa';
import './Projects.scss';

const Projects = ({dispatch, allProjects, user, comments}) => {

  const [newComment, setNewComment] = useState({comment: '', user: '', news: false, project: ''});
  const [selectedProject, setSelectedProject] = useState({});
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() =>{
    dispatch(getAllProjects());
  },[]);

  useEffect(() =>{
    setCommentsList(comments);
  },[comments])

  const getProjectComments = (project) =>{
    /* Consultar con la ID de proyecto si hay un comentario en la colección comments */
    setSelectedProject(project);
    dispatch(findComment(project));
  };

  const createProjectComment = (ev) =>{
    ev.preventDefault();
    dispatch(createComment(newComment));
    setNewComment({comment: '', user: '', news: false, project: ''});
  };

  const handleComment = (ev) =>{
    const {name, value} = ev.target;
    setNewComment({...newComment, [name]: value, user: user._id, project: selectedProject});
  };

  const getDateAndDateTime = (arg) =>{
    let time = arg.createdAt.toLocaleString();
    time.substring(1,3)
    let space = time.indexOf('T');
    let finalDate = time.substring(0, space);
    let finalDateTime = time.substring(space +1, 16);
    return <p className='dateProject'>{`${finalDate} a las ${finalDateTime}`}</p>
  };

  const getCommentDate = (comment) =>{
    if(comment){
        let dateString = comment.dateComment.toLocaleString();
        let space = dateString.indexOf('T');
        let finalDate = dateString.substring(0, space);
        let finalDateTime = dateString.substring(space +1, 16);
        return <p className='time-comment'>{`${finalDate} a las ${finalDateTime}`}</p>
    }else{
        return <p className='time-comment'>Hora y fecha inaccesible, comentario eliminado</p>
    }
}


  return (
    <div className='projects'>
      <div className='projects__navbar'>
        <Navbar />
      </div>
      <div className='projects__container'>
        {
          (allProjects.map(element =>{
            return <div onClick={() =>{getProjectComments(element._id)}} key={element.title}><Accordion className='projects__container__project' activeIndex={1} key={element._id}>
            <AccordionTab header={element.title}>
              <p>{element.description}</p>
              <p>{getDateAndDateTime(element)}</p>
              <div className='projects__container-comments-input'>
                  <Container maxWidth="xs">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="comment"
                        label="Escribe tu comentario"
                        name="comment"
                        type="text"
                        value={newComment.comment}
                        onChange={handleComment}
                        autoFocus>
                      </TextField>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={createProjectComment}
                      id="btn"
                      sx={{ mt: 1, mb: 2 }}
                      >
                      Enviar
                    </Button>
                  </Container>
                  <div className='projects__container-comments'>
                  {(commentsList.length >0)
                  ?
                  commentsList.map(element =>{
                    console.log(element);
                    return <div className='comments' key={element.id}>
                    <div className='comments__results'>
                        <div className='comments__results-icon'><FaRegCommentDots/></div>
                        <p>{element.comment}</p>
                        <h6 className='comments__results-comment'>Comentario realizado por: <span>{element.User.name || 'Usuario eliminado'}</span>{getCommentDate(element)}</h6>
                    </div>
                    <div className='comments__results-dv'></div>
                </div>

                  })
                  :
                  <div className='comments__results'>
                    <div className='comments__results-icon'>
                      <FaCommentSlash/>
                    </div>
                    <p>No hay comentarios recientes</p>
                  </div>
                  }
                  </div>
              </div>
            </AccordionTab>
          </Accordion></div>
          }))
        }
        </div>
      </div>
  )
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  allProjects: state.projects.projects,
  comments: state.comments.comments
})

export default connect(mapStateToProps)(Projects);