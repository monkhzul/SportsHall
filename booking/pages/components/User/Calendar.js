import Head from 'next/head'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from './Layout/Layout'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";

export default function Booking() {

  const date = new Date();
  const calendarDate = date.toLocaleDateString().slice(0, 4);

  const events = [
    {
      "id": 0,
      "title": "All Day Event very long title",
      "start": "2022-10-06T01:00:00.00",
      "end": "2022-10-06T03:00:00.00"
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
      "id": 5,
      "title": "Conference",
      "start": "2015-04-10T15:00:00.00",
      "end": "2015-04-12T15:00:00.00",
      "desc": "Big conference for important people"
    },
    {
      "id": 6,
      "title": "Meeting",
      "start": "2015-04-12T01:30:00.00",
      "end": "2015-04-12T03:30:00.00",
      "desc": "Pre-meeting meeting, to prepare for the meeting"
    },
    {
      "id": 7,
      "title": "Lunch",
      "start": "2015-04-12T03:00:00.00",
      "end": "2015-04-12T04:00:00.00",
      "desc": "Power lunch"
    },
    {
      "id": 8,
      "title": "Meeting",
      "start": "2015-04-12T05:00:00.00",
      "end": "2015-04-12T06:00:00.00"
    },
    {
      "id": 9,
      "title": "Happy Hour",
      "start": "2015-04-12T08:00:00.00",
      "end": "2015-04-12T08:30:00.00",
      "desc": "Most important meal of the day"
    },
    {
      "id": 10,
      "title": "Dinner",
      "start": "2015-04-12T11:00:00.00",
      "end": "2015-04-12T12:00:00.00"
    },
    {
      "id": 11,
      "title": "Planning Meeting with Paige",
      "start": "2022-10-03T10:00:00.00",
      "end": "2022-10-03T15:00:00.00"
    },
    {
      "id": 12,
      "title": "Late Night Event",
      "start": "2015-04-17T10:30:00.00",
      "end": "2015-04-17T17:00:00.00"
    },
    {
      "id": 13,
      "title": "Multi-day Event",
      "start": "2015-04-20T10:30:00.00",
      "end": "2015-04-21T17:00:00.00"
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
      "title": "Go to the gym",
      "start": "2022-10-08T12:00:00",
      "end": "2022-10-08T13:00:00"
    }
  ]
  // const localizer = momentLocalizer(moment)

  const calendarRef = useRef(null);
  console.log()
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
        selectable
        events={events}
        slotMinTime={'08:00:00'}
        slotMaxTime={'21:00:00'}
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit" }}
        allDaySlot={false}
        
      />
      </div>
      
    </Layout>

  )
}
