import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout';
import Head from 'next/head';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRef } from 'react';

export default function List(props) {
    const calendarRef = useRef();
    
    return (
        <Layout>
            <Head>
                <title>Хуваарь</title>
                <link href='https://cdn.syncfusion.com/ej2/material.css' rel='stylesheet' type='text/css' />
            </Head>
            <div className=''>
               <h5>Хуваарь</h5>
               <FullCalendar
                    innerRef={calendarRef}
                    plugins={[timeGridPlugin]}
                    editable
                    selectable
                />
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
