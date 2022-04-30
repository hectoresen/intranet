import React from 'react';
import './Events.scss';

const Events = () => {
  const date = new Date();
  const mapDate = {
    dd: date.getDate(),
    mm: date.toLocaleString('default', {month: 'long'}),
    yy: date.getFullYear()
  }

  return (
    <div className='events'>
      <div className='events__month'>
        <p>{mapDate.mm}</p>
      </div>
      <div className='events__calendar'>
        <div className='events__calendar-card'>
          Dia 1
        </div>
        <div className='events__calendar-card'>
          Dia 2
        </div>
        <div className='events__calendar-card'>
          Día 3
        </div>
        <div className='events__calendar-card'>
          Día 4
        </div>
        <div className='events__calendar-card'>
          Día 5
        </div>
      </div>
    </div>
  )
}

export default Events;