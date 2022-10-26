import Head from 'next/head'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from './Layout/Layout'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";

export default function Calendar(props) {

  const [hall, setHall] = useState(props.hall)

  const [eventColor, setEventColor] = useState('');

  const events = []

  for (let i = 0; i < hall.length; i++) {
    events.push({
       title: hall[i].leftStatus == 1 && hall[i].rightStatus == 1
       ? 'Захиалсан' 
       : hall[i].leftStatus == 2 && hall[i].rightStatus == 2
       ? 'Хүлээгдэж буй' 
       : hall[i].leftStatus == 1 && (hall[i].rightStatus == 0 || hall[i].rightStatus == 2) 
       ? '1 тал захиалсан'
       : hall[i].leftStatus == 2 && hall[i].rightStatus == 0 
       ? '1 тал хүлээгдэж буй' : '',
       start: `${hall[i].date.slice(0,10)}T${hall[i].time < 10 ? `0${hall[i].time}` : hall[i].time}:00:00`,
       end: `${hall[i].date.slice(0,10)}T${hall[i].time < 10 ? `0${hall[i].time}` : hall[i].time}:00:00`
    })
  }

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
          eventBorderColor={'#eee'}
          eventTextColor={'black'}
          eventColor={'#dcdce9'}
        />
      </div>
      
    </Layout>
  )
}

export const getServerSideProps = async (context) => {

  const res1 = await fetch('http://localhost:3000/api/hall')
  const hall = await res1.json()

  return {
      props: { hall }
  }
}
