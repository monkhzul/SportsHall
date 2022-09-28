import React from 'react'
import NavbarUser from '../NavbarUser'
import AdminSidenav from '../Admin/AdminSidenav'
import Table from 'react-bootstrap/Table';

export default function RequestConfirm() {
  return (
    <div className='w-full'>
    <div className='nav w-full'>
        <NavbarUser />
    </div>
    <div className='flex flex-col sm:flex-row'>
        <AdminSidenav />
        <div className='w-full border'>
            <div className='body p-3'>
                <div className='border'>
                Confirm
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
