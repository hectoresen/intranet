import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { findNews } from '../../redux/actions/news.actions';
import { createComment, findComment } from '../../redux/actions/comments.actions';
import './News.scss';

const News = ({dispatch, user, news, comments}) => {

    const currentDate = new Date();
    const navigate = useNavigate();
    const [showNotice, setShowNotice] = useState(false);
    const [selectNotice, setSelectNotice] = useState({});
    const [newComment, setNewComment] = useState({comment: '', user: '', news: '', project: ''});
    const [commentsList, setCommentsList] = useState([]);


    useEffect(() =>{
        dispatch(findNews());
    },[])

    const createNewsletter = (ev) =>{
        ev.preventDefault();
        navigate('/home/news/post');
    }

    const getDateNew = (date) =>{
        setCommentsList([])
        setShowNotice(false);
        news.map(element =>{
            if(element.dateNew === date){
                dispatch(findComment(element.id))
                setSelectNotice(element);
                setShowNotice(true)
            }
        })
        if(comments.length >0){
            setCommentsList(comments);
            console.log('Hay comentarios');
        }else{
            console.log('No hay comentarios');
        }
    }

    const handleComment = (ev) => {
        const {name, value} = ev.target;
        setNewComment({...newComment, [name]: value, user: selectNotice.user._id, news: selectNotice.id})
    };

    const sendComment = (ev) =>{
        ev.preventDefault();
        dispatch(createComment(newComment));
    }


    return (
        <div className='news'>
            <div className='news__navbar'>
                <Navbar />
            </div>
            <div className='news__container'>
                <div className='news__container__dates'>
                {news.map(element =>{
                        return <div className='news__container__dates-card'
                                tabIndex={0}
                                key={element.title}
                                onClick={() =>{getDateNew(element.dateNew)}}
                                >
                                    <p>Noticias</p>
                                    <span>{element.dateNew}</span>
                                </div>
                })}
                </div>
                <div className='news__container__news'>
                    <div className='news__container__news-text'>
                        <h3>Bienvenido al boletín de noticias</h3>

                    </div>
                    {(user.role === "admin")
                    ?
                    <Button
                        type="submit"
                        margin="10px"
                        variant="contained"
                        onClick={createNewsletter}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Crear noticia
                    </Button>
                    :
                    ''
                    }
                <div className='news__container__news-new'>

                    {(showNotice)
                    ?
                    <div>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardHeader
                                title={selectNotice.title}
                                subheader={selectNotice.dateNew}
                            />
                            <CardContent>
                                <Typography variant="body4" color="text.primary">
                                    {selectNotice.description}
                                </Typography>
                            </CardContent>
                            <Typography variant="body2" color="text.secondary">
                                    Noticia creada por {selectNotice.user.name}
                            </Typography>
                        </Card>
                        <div className='news__container__news-new-comments'>
                            <div className='news__container__news-new-comments-input'>
                                <Container maxWidth="xs">
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="comment"
                                        label="Escribe tu comentario"
                                        name="comment"
                                        type="text"
                                        onChange={handleComment}
                                        autoFocus>
                                    </TextField>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={sendComment}
                                        id="btn"
                                        sx={{ mt: 1, mb: 2 }}
                                    >
                                        Enviar
                                    </Button>
                                </Container>
                            </div>
                            {(commentsList.length >0)
                            ?
                            commentsList.map(element =>{
                                console.log(element);
                                return <div>
                                    <h4>{element.User.name}</h4>
                                    <p>{element.comment}</p>
                                </div>
                            })
                            :
                            <p>No hay comentarios recientes</p>
                            }

                        </div>
                    </div>
                    :
                    <p>Puedes navegar en el panel de la izquierda para ver más noticias</p>
                    }
                </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({
    user:state.auth.user,
    news: state.news.news,
    comments: state.comments.comments,
})

export default connect(mapStateToProps)(News);