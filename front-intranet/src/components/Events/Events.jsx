import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Card, Grid, Text, Divider, Row } from "@nextui-org/react";
import { createEvent, findEvent } from '../../redux/actions/events.actions';
import {connect} from 'react-redux';
import './Events.scss';

const Events = ({dispatch, user, eventsError, events}) => {

  const currentDate = new Date();
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const thirdDay = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
  const fourthDay = new Date(new Date().getTime() + 72 * 60 * 60 * 1000);
  const fiveDay = new Date(new Date().getTime() + 96 * 60 * 60 * 1000);
  const [eventData, setEventData] = useState({eventTitle: '', eventDate: '', user: user._id});
  const [showDayEvent, setShowDayEvent] = useState(false);
  const [dayEvent, setDayEvent] = useState({});

  let day = currentDate.getDate();
  let strDay = '';
  let month = currentDate.getMonth() +1;
  let strMonth = '';
  let year = currentDate.getFullYear();

  useEffect(() =>{

    if(day.toLocaleString.length <2){
        strDay = `0${day}`
    }
    if(month.toLocaleString.length <2){
      strMonth = `0${month}`
    }
    dispatch(findEvent(`${year}-${strMonth}-${strDay}`, user._id))
  },[])

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
    dispatch(createEvent(eventData));
  };

  return (
    <div className='events'>
      <div className='events__month'>
        <p>Mes de {mapToDate(currentDate).mm}, {mapToDate(currentDate).yy}</p>
      </div>

      <div className='events__calendar'>
        <div className='events__calendar__cards'>
          <div className={(events.length >0) ? 'events__calendar__cards-card-active' : 'events__calendar__cards-card'}>
            <p>{mapToDate(currentDate).ddStr}</p>
            <p>{mapToDate(currentDate).dd}</p>
          </div>
          <div className='events__calendar__cards-card'>
            <p>{mapToDate(tomorrowDate).ddStr}</p>
            <p>{mapToDate(tomorrowDate).dd}</p>
          </div>
          <div className='events__calendar__cards-card'>
            <p>{mapToDate(thirdDay).ddStr}</p>
            <p>{mapToDate(thirdDay).dd}</p>
          </div>
          <div className='events__calendar__cards-card'>
            <p>{mapToDate(fourthDay).ddStr}</p>
            <p>{mapToDate(fourthDay).dd}</p>
          </div>
          <div className='events__calendar__cards-card'>
            <p>{mapToDate(fiveDay).ddStr}</p>
            <p>{mapToDate(fiveDay).dd}</p>
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
      <div className='events__info'>
        <div>
                    {
            (events.length >0)
            ?
            events.map(element =>{
              return <div className='events__info-events' key={element.DateTime}>
                <Grid.Container gap={2}>
                  <Grid sm={12} md={5}>
                    <Card css={{ mw: "330px" }}>
                      <Card.Header>
                        <Text b>{element.Title}</Text>
                      </Card.Header>
                      <Divider />
                      <Card.Body css={{ py: "$10" }}>
                        <Text>
                          Hoy a las <span>{element.DateTime}</span>, creado por el usuario, <span>{element.User}</span>
                        </Text>
                      </Card.Body>
                      <Divider />
                    </Card>
                  </Grid>
                </Grid.Container>
              </div>
            })
            :
            <div className='events__info-nevents'>
            <h3>Eventos de hoy:</h3>
            <p>¡Vaya! Hoy no hay ningún evento programado</p>
          </div>
          }
        </div>

      </div>
    </div>
  )
}
const mapStateToProps = (state) =>({
  user: state.auth.user,
  eventsError: state.events.eventErrors,
  events: state.events.event
})

export default connect(mapStateToProps)(Events);