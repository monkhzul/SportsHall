import React, { useEffect, useState } from 'react'
import style from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';

export default function Login(users) {

    const router = useRouter();
    const [data, setData] = useState(users.data);
    const user = [];


    async function Login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;


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
                        router.push({
                            pathname: '/components/Admin/RequestConfirm',
                        })
                    } else {
                        toast("Амжилттай нэвтэрлээ. Түр хүлээж байгаарай!")
                        router.push({
                            pathname: '/components/User/Booking',
                        })
                    }
                    const storage = globalThis?.sessionStorage;

                    storage.setItem('user', JSON.stringify(user[0]));
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
                <input type="text" name="" id="username" placeholder='Username' />
                <input type="password" name="" id="password" placeholder='Password' />
                <div className='w-full text-center flex justify-center'>
                    <div className='button' onClick={Login}>Нэвтрэх</div>
                </div>
            </form>
        </div>
    )
}
