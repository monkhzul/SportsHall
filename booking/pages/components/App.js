import Head from 'next/head'
import React from 'react'
import Sidenav from '../components/Admin/Sidenav'
import "rsuite/dist/rsuite.css";
import NavbarUser from './NavbarUser';

export default function App() {
    return (
        <div className=''>
            <Head>
                <title>Login</title>
            </Head>

            <div className='w-full'>
                <div className='nav w-full'>
                    <NavbarUser />
                </div>
                <div className='flex flex-col sm:flex-row'>
                    <Sidenav />
                    <div className='w-full border'>
                        <div className='body p-3'>
                            <h3>Content</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
