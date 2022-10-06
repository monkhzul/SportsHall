import Head from 'next/head'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from './Layout/Layout'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";

export default function Booking() {

  const [eventColor, setEventColor] = useState('');

  const events = [
    {
      "id": 0,
      "title": "Event title",
      "start": "2022-10-06T08:00:00.00",
      "end": "2022-10-06T09:00:00.00"
    },
    {
      "id": 1,
      "title": "Long Event",
      "start": "2022-10-04T15:00:00.00",
      "end": "2022-10-04T16:00:00.00"
    },
    {
      "id": 2,
      "title": "DTS STARTS",
      "start": "2022-10-07T16:00:00.00",
      "end": "2022-10-07T17:00:00.00"
    },
    {
      "id": 3,
      "title": "DTS ENDS",
      "start": "2022-10-07T17:00:00.00",
      "end": "2022-10-07T18:00:00.00"
    },
    {
      "id": 4,
      "title": "Some Event",
      "start": "2022-10-07T11:00:00.00",
      "end": "2022-10-07T12:00:00.00"
    },
    {
      "id": 11,
      "title": "Захиалсан",
      "start": "2022-10-03T10:00:00.00",
      "end": "2022-10-03T11:00:00.00",
      "url": "http://localhost:3000/components/User/Booking"
    },
    {
      "id": 11.1,
      "title": "Sul",
      "start": "2022-10-03T10:00:00.00",
      "end": "2022-10-03T11:00:00.00",
      "url": "http://localhost:3000/components/User/Booking"
    },
    {
      "id": 14,
      "title": "Today",
      "start": "2022-09-28T18:00:00.00",
      "end": "2022-09-28T20:00:00.00"
    },
    {
      "id": 15,
      "title": "Point in Time Event",
      "start": "2022-09-29T08:00:00",
      "end": "2022-09-29T09:00:00"
    },
    {
      "id": 16,
      "title": "Захиалсан",
      "start": "2022-10-08T12:00:00",
      "end": "2022-10-08T15:00:00"
    }
  ]

  // title, startdate, enddate, starttime, endtime, right, left, 

  useEffect(() => {
    events.map((title) => title.title === 'Захиалсан' ? setEventColor('#bbf7d0') : setEventColor('#eee'))
  },[])

  const calendarRef = useRef(null);

  return (
    <Layout>
      <Head>
        <title>Calendar</title>
        <link href='fullcalendar/main.css' rel='stylesheet' />
        <script src='fullcalendar/main.js'></script>
      </Head>

      <div className='body p-3'>
        <FullCalendar 
          innerRef = {calendarRef}
          plugins = {[timeGridPlugin, interactionPlugin]}
          events={events}
          slotMinTime={'08:00:00'}
          slotMaxTime={'21:00:00'}
          slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
          allDaySlot={false}
          eventBackgroundColor={eventColor}
          eventBorderColor={'#eee'}
          eventTextColor={'black'}
        />
      </div>
      
    </Layout>
  )
}
