import React from 'react'
import NavbarUser from '../../NavbarUser'
import SideNav from '../Sidenav'

export default function Layout({ children }) {
    return (
        <>
            <div className='w-full'>
                <div className='nav w-full'>
                    <NavbarUser />
                </div>
                <div className='flex flex-col sm:flex-row'>
                    <SideNav />
                    <div className='w-full border'>
                        <div className='body p-3'>
                            <div className='p-3'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}