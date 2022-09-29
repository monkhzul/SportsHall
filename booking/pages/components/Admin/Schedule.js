import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout';
// import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import Head from 'next/head';

export default function List(props) {
    return (
        <Layout>
            <Head>
                <link href='https://cdn.syncfusion.com/ej2/material.css' rel='stylesheet' type='text/css' />
            </Head>
            <div className='border'>
               <h5>Хуваарь</h5>
               {/* <ScheduleComponent>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
               </ScheduleComponent> */}
               <CalendarComponent id="calendar" start='Decade' depth='Year'/>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {

    const res = await fetch('https://dummyjson.com/products')
    const db = await res.json()

    return {
        props: {
            db
        }
    }
}
