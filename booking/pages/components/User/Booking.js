import React from 'react'
import NavbarUser from '../NavbarUser'
import Sidenav from '../Admin/Sidenav'

export default function Booking() {
  return (
    <div className='w-full'>
    <div className='nav w-full'>
        <NavbarUser />
    </div>
    <div className='flex flex-col sm:flex-row'>
        <Sidenav />
        <div className='w-full border'>
            <div className='body p-3'>
                <h3>Booking</h3>
            </div>
        </div>
    </div>
</div>
  )
}
