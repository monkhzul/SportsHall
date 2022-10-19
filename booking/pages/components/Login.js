import React, { useEffect, useState } from 'react'
import style from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify';

export default function Login(users) {

    const router = useRouter();
    const [data, setData] = useState(users.data);

    async function Login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = [];

        for(var i in data) {
            if (data[i].erp_code === username && data[i].password === password) {
                user.push({
                    erp_code: data[i].erp_code,
                    lastname: data[i].lastname,
                    firstname: data[i].firstname,
                    password: data[i].password
                })
            }
        }

        if (user.length == 0) {     
            toast("Оруулахгүйэээ")
        }
        else {
            if (user[0].erp_code === username && user[0].password === password) {
                toast("Амжилттай")
                router.push('/components/User/Booking')
                globalThis?.sessionStorage.setItem('user', JSON.stringify(user[0]))
            }
            else {
                toast("Оруулахгүйэээ")
            }
        }
    }

  return (
    <div className='w-full md:w-1/2 xl:w-1/3 login'>
        <ToastContainer
            position='top-center'
        />
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
