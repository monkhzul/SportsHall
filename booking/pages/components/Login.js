import React from 'react'
import style from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import App from './App';

export default function Login(props) {
    const router = useRouter();
    function Login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        router.push({
            pathname: 'components/App',
            state: {
                props
            }
        })
    }
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
