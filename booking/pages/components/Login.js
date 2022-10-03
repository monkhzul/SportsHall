import React from 'react'
import style from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Login(data) {
    const router = useRouter();
    function Login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        router.push({
            pathname: '/components/User/Calendar',
            state: {
                data
            }
        })
    }
    // db connect : DATABASE_URL="sqlserver://localhost:1434;database=sporthall_order;username=sa;password=test;integratedSecurity=false;trustServerCertificate=true;"
  return (
    <div className='w-full md:w-1/2 xl:w-1/3 login'>
        <form action="" className={`${style.login}`}>
            <h1 className='text-gray-100 font-semibold mx-auto text-center mb-8 text-xl'>Нэвтрэх хэсэг</h1>
            <input type="text" name="" id="username" placeholder='Username'/>
            <input type="password" name="" id="password" placeholder='Password'/>
            <div className='w-full text-center flex justify-center'>
                <div className='button' onClick={Login}>Нэвтрэх</div>
            </div>
        </form>
    </div>
  )
}
