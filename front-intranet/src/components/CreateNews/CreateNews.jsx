import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import { createNews } from '../../redux/actions/news.actions';
import './CreateNews.scss';

const INITIAL_STATE = {
  title: '',
  description: '',
  dateNew: '',
  user: ''
}

const CreateNews = ({dispatch, user}) => {
  const [noticeData, setNoticeData] = useState(INITIAL_STATE);
  const currentDate = new Date();

  let day = currentDate.getDate();
  let strDay = '';
  let month = currentDate.getMonth() +1;
  let strMonth = '';
  let year = currentDate.getFullYear();

  if(day.toLocaleString.length <2){
    strDay = `0${day}`
  }
  if(month.toLocaleString.length <2){
    strMonth = `0${month}`
  }
  let strDate = `${year}-${strMonth}-${strDay}`;

  const handdleNewsInfo = (ev) =>{
    const {name, value} = ev.target;
    setNoticeData({...noticeData, [name]: value, dateNew: strDate, user: user._id});
  }

  const submitNews = (ev) =>{
    ev.preventDefault();
    dispatch(createNews(noticeData));
  }


  return (
    <div className='create'>
      <div className='create__header'>
        <h3>CREAR NOTICIA</h3>
      </div>
      <div className='create__form'>
      <Container className='events__add-form' maxWidth="xs">
            <Box component="form" onSubmit={submitNews} noValidate sx={{mt:1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título de la noticia"
                name="title"
                type="text"
                onChange={handdleNewsInfo}
                autoFocus>
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descripción de la noticia"
                name="description"
                multiline
                rows={5}
                onChange={handdleNewsInfo}
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
      </div>

    </div>
  )
}
const mapStateToProps = (state) =>({
  user: state.auth.user
})

export default connect(mapStateToProps)(CreateNews);