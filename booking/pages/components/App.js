import Head from 'next/head'
import React from 'react'
import AdminSidenav from './Admin/AdminSidenav'
import Layout from './Admin/Layout/Layout';
import NavbarUser from './NavbarUser';

export default function App(data) {
    console.log(data);
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
              
             
                    <div className='w-full border'>
                        <div className='body p-3'>
                            <h3>Content</h3>
                        </div>
                    </div>


        </Layout>
    )
}
