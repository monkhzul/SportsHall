import React from 'react'
import NavbarUser from '../NavbarUser'
import Sidenav from '../User/Sidenav'
import Table from 'react-bootstrap/Table';

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
                <div className='border'>
                <Table bordered size="md" className=''>
                                <thead className='bg-gray-200'>
                                    <tr>
                                        <th className='border-8 w-[20%] text-center text-lg font-semibold'>
                                            Заал авсан цаг
                                        </th>
                                        <th className='border-8 w-[20%] text-center text-lg font-semibold'>
                                            Заалны төрөл
                                        </th>
                                        <th className='border-8 w-[20%] text-center text-lg font-semibold'>
                                            Заалны хэмжээ
                                        </th>
                                        <th className='border-8 w-[20%] text-center text-lg font-semibold'>
                                            Заал авсан огноо
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                        <tr>
                                            <td className='w-[30%] text-center'>1</td>
                                            <td className='text-center'>Mark</td>
                                            <td className='w-[30%] text-center'>1</td>
                                            <td className='text-center'>Mark</td>
                                        </tr>
                 
                                </tbody>
                            </Table>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
