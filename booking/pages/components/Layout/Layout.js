import Link from 'next/link'
import React from 'react'

export default function Layout({children}) {
  return (
    <div>
      <Link href='/components/User/Booking'><a>Tsag zahialah</a></Link>
      <Link href='/components/User/Schedule'><a className='text-black'>Test2</a></Link>
      <Link href='/'><a className='text-black'>Test</a></Link>
      {children}
    </div>
  )
}
