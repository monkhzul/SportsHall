import React, { useEffect, useState, useLayoutEffect } from 'react'
import style from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';

export default function Login(users) {

    const router = useRouter();
    const [data, setData] = useState(users.data);
    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');
    const user = [];


    async function Login() {

        for (var i in data) {
            if (data[i].erp_code === username && data[i].password === password) {
                user.push({
                    erp_code: data[i].erp_code,
                    lastname: data[i].lastname,
                    firstname: data[i].firstname,
                    password: data[i].password
                })
            }
        }

        if (username === '' || password === '') {
            toast("Хоосон байна шдээ. Бөглөөчэээ")
        } else {
            if (user.length == 0) {
                toast("Аль нэг талбар буруу л байна даа")
            }
            else {
                if (user[0].erp_code === username && user[0].password === password) {
                    if (user[0].erp_code === '101869') {
                        toast("Амжилттай нэвтэрлээ. Түр хүлээж байгаарай!")
                        sessionStorage.setItem("user", user[0].firstname)
                        sessionStorage.setItem("userId", user[0].erp_code)
                        router.push({
                            pathname: '/components/Admin/RequestConfirm'
                        })
                    } else {
                        toast("Амжилттай нэвтэрлээ. Түр хүлээж байгаарай!")
                        sessionStorage.setItem("user", user[0].firstname)
                        sessionStorage.setItem("userId", user[0].erp_code)
                        router.push({
                            pathname: '/components/User/Booking'
                        })
                    }
                }
                else {
                    toast("Өөөө. Зөв бөглөөчээээ")
                }
            }
        }
    }

    return (
        <div className='w-full md:w-1/2 xl:w-[40%] login'>
            <ToastContainer
                position='top-center'
            />

            <form action="" className={`${style.login}`}>
                <div className='my-5 flex justify-center'>
                    <Image src={'/images/logoCola.png'} width={500} height={40} className={`${style.colalogo}`} />
                </div>
                <h1 className='text-gray-100 font-semibold mx-auto text-center mb-8 text-xl'>Нэвтрэх хэсэг</h1>
                <input type="number" name="" id="username" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="" id="password" placeholder='Password' onChange={(e) => setPassowrd(e.target.value)}/>
                <div className='w-full text-center flex justify-center'>
                    <div className='button' onClick={Login}>Нэвтрэх</div>
                </div>
            </form>
        </div>
    )
}
