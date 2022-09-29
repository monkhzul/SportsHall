import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import Layout from './Layout/Layout';

export default function List(props) {
    return (
        <Layout>
            <div className='border'>
               <h5>Хуваарь</h5>
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
