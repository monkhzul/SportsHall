import React from 'react'
import NavbarUser from '../NavbarUser'
import Sidenav from '../User/Sidenav'
import Head from 'next/head'
import $ from 'jquery'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function Booking() {

    const date = new Date();
    const calendarDate = date.toLocaleDateString().slice(0, 4);

    const events = [
        {
          "id": 0,
          "title": "All Day Event very long title",
          "allDay": true,
          "start": "2015-03-30T15:00:00.000Z",
          "end": "2015-03-31T15:00:00.000Z"
        },
        {
          "id": 1,
          "title": "Long Event",
          "start": "2015-04-06T15:00:00.000Z",
          "end": "2015-04-09T15:00:00.000Z"
        },
        {
          "id": 2,
          "title": "DTS STARTS",
          "start": "2016-03-12T16:00:00.000Z",
          "end": "2016-03-19T16:00:00.000Z"
        },
        {
          "id": 3,
          "title": "DTS ENDS",
          "start": "2016-11-05T16:00:00.000Z",
          "end": "2016-11-12T16:00:00.000Z"
        },
        {
          "id": 4,
          "title": "Some Event",
          "start": "2015-04-08T15:00:00.000Z",
          "end": "2015-04-09T15:00:00.000Z"
        },
        {
          "id": 5,
          "title": "Conference",
          "start": "2015-04-10T15:00:00.000Z",
          "end": "2015-04-12T15:00:00.000Z",
          "desc": "Big conference for important people"
        },
        {
          "id": 6,
          "title": "Meeting",
          "start": "2015-04-12T01:30:00.000Z",
          "end": "2015-04-12T03:30:00.000Z",
          "desc": "Pre-meeting meeting, to prepare for the meeting"
        },
        {
          "id": 7,
          "title": "Lunch",
          "start": "2015-04-12T03:00:00.000Z",
          "end": "2015-04-12T04:00:00.000Z",
          "desc": "Power lunch"
        },
        {
          "id": 8,
          "title": "Meeting",
          "start": "2015-04-12T05:00:00.000Z",
          "end": "2015-04-12T06:00:00.000Z"
        },
        {
          "id": 9,
          "title": "Happy Hour",
          "start": "2015-04-12T08:00:00.000Z",
          "end": "2015-04-12T08:30:00.000Z",
          "desc": "Most important meal of the day"
        },
        {
          "id": 10,
          "title": "Dinner",
          "start": "2015-04-12T11:00:00.000Z",
          "end": "2015-04-12T12:00:00.000Z"
        },
        {
          "id": 11,
          "title": "Planning Meeting with Paige",
          "start": "2015-04-12T23:00:00.000Z",
          "end": "2015-04-13T01:30:00.000Z"
        },
        {
          "id": 11.1,
          "title": "Inconvenient Conference Call",
          "start": "2015-04-13T00:30:00.000Z",
          "end": "2015-04-13T03:00:00.000Z"
        },
        {
          "id": 11.2,
          "title": "Project Kickoff - Lou's Shoes",
          "start": "2015-04-13T02:30:00.000Z",
          "end": "2015-04-13T05:00:00.000Z"
        },
        {
          "id": 11.3,
          "title": "Quote Follow-up - Tea by Tina",
          "start": "2015-04-13T06:30:00.000Z",
          "end": "2015-04-13T07:00:00.000Z"
        },
        {
          "id": 12,
          "title": "Late Night Event",
          "start": "2015-04-17T10:30:00.000Z",
          "end": "2015-04-17T17:00:00.000Z"
        },
        {
          "id": 12.5,
          "title": "Late Same Night Event",
          "start": "2015-04-17T10:30:00.000Z",
          "end": "2015-04-17T14:30:00.000Z"
        },
        {
          "id": 13,
          "title": "Multi-day Event",
          "start": "2015-04-20T10:30:00.000Z",
          "end": "2015-04-21T17:00:00.000Z"
        },
        {
          "id": 14,
          "title": "Today",
          "start": "2022-09-28T04:46:04.929Z",
          "end": "2022-09-28T10:46:04.929Z"
        },
        {
          "id": 15,
          "title": "Point in Time Event",
          "start": "2022-09-28T07:46:04.928Z",
          "end": "2022-09-28T07:46:04.928Z"
        },
        {
          "id": 16,
          "title": "Video Record",
          "start": "2015-04-14T06:30:00.000Z",
          "end": "2015-04-14T10:00:00.000Z"
        },
        {
          "id": 17,
          "title": "Dutch Song Producing",
          "start": "2015-04-14T07:30:00.000Z",
          "end": "2015-04-14T11:00:00.000Z"
        },
        {
          "id": 18,
          "title": "Itaewon Halloween Meeting",
          "start": "2015-04-14T07:30:00.000Z",
          "end": "2015-04-14T08:30:00.000Z"
        },
        {
          "id": 19,
          "title": "Online Coding Test",
          "start": "2015-04-14T08:30:00.000Z",
          "end": "2015-04-14T11:30:00.000Z"
        },
        {
          "id": 20,
          "title": "An overlapped Event",
          "start": "2015-04-14T08:00:00.000Z",
          "end": "2015-04-14T09:30:00.000Z"
        },
        {
          "id": 21,
          "title": "Phone Interview",
          "start": "2015-04-14T08:00:00.000Z",
          "end": "2015-04-14T09:30:00.000Z"
        },
        {
          "id": 22,
          "title": "Cooking Class",
          "start": "2015-04-14T08:30:00.000Z",
          "end": "2015-04-14T10:00:00.000Z"
        },
        {
          "id": 23,
          "title": "Go to the gym",
          "start": "2015-04-14T09:30:00.000Z",
          "end": "2015-04-14T11:00:00.000Z"
        }
      ]
    const localizer = momentLocalizer(moment)

    return (
        <div className='w-full'>
            <Head>
                <title>Calendar</title>
                <link href='fullcalendar/main.css' rel='stylesheet' />
                <script src='fullcalendar/main.js'></script>
            </Head>
            <div className='nav w-full'>
                <NavbarUser />
            </div>
            <div className='flex flex-col sm:flex-row'>
                <Sidenav />
                <div className='w-full border'>
                    <div className='body p-3'>
                        <Calendar
                             events={events}
                             startAccessor="start"
                             endAccessor="end"
                             defaultDate={moment().toDate()}
                             localizer={localizer}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
