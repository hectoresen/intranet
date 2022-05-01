import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Events.scss';

const Events = () => {
  const [eventData, setEventData] = useState({eventTitle: '', eventDate: ''});

  const currentDate = new Date();
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const thirdDay = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
  const fourthDay = new Date(new Date().getTime() + 72 * 60 * 60 * 1000);
  console.log(fourthDay);


  const mapToDate = (date) =>(
    {
      dd: date.getDate(),
      ddStr: date.toDateString().substring(0, 3),
      mm: date.toLocaleString('default', {month: 'long'}),
      yy: date.getFullYear()
    }
  )

  const inputEvents = (ev) =>{
    const {name, value} = ev.target;
    setEventData({...eventData, [name]: value});
  }
  const submitEvents = (ev) =>{
    ev.preventDefault();
    console.log(eventData);
  };

  return (
    <div className='events'>
      <div className='events__month'>
        <p>Mes de {mapToDate(currentDate).mm}, {mapToDate(currentDate).yy}</p>
      </div>
      <div className='events__calendar'>
        <div className='events__calendar__cards'>
          <div className='events__calendar__cards-card'>
            <p>{mapToDate(currentDate).ddStr}</p>
            <p>{mapToDate(currentDate).dd}</p>
          </div>
          <div className='events__calendar__cards-card'>
            <p>{mapToDate(tomorrowDate).ddStr}</p>
            <p>{mapToDate(tomorrowDate).dd}</p>
          </div>
          <div className='events__calendar__cards-card'>
            <p>Dia 3</p>
          </div>
          <div className='events__calendar__cards-card'>
            Día 4
          </div>
          <div className='events__calendar__cards-card'>
            Día 5
          </div>
        </div>

        <div className='events__add'>
          <Container className='events__add-form' maxWidth="xs">
            <Box component="form" onSubmit={submitEvents} noValidate sx={{mt:1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="eventTitle"
                label="Título de evento"
                name="eventTitle"
                type="text"
                onChange={inputEvents}
                autoFocus>
              </TextField>
              <TextField
                margin="normal"
                required
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                onChange={inputEvents}
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
    </div>
  )
}

export default Events;