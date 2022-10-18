import React, { useEffect, useState } from 'react'
import { DatePicker } from 'rsuite'
import moment from 'moment';
import addDays from "date-fns/addDays";
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import book from '../../../styles/Booking.module.css'
import Layout from './Layout/Layout';
import { useRouter } from 'next/router'
import Head from 'next/head';
import { PrismaClient } from '@prisma/client';
import axios from 'axios'

export default function Booking(props) {
    const router = useRouter();
    const [modalShow, setModalShow] = useState(false);
    const [timeName, setTimeName] = useState(props.time)
    const [hall, setHall] = useState(props.hall)


    const currentDate = moment().set({ hours: 1, minute: 59, seconds: 59 });
    const disabledDate = (date) => {
        return currentDate.isAfter(date);
    };

    const date = new Date();
    const [startTime, setStartTime] = useState(date.getHours())
    const [endTime, setEndTime] = useState(date.getHours())
    const [halltype, setHalltype] = useState('')
    const [hallsize, setHallsize] = useState('')

    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const [startdate, setStartDate] = useState(today);

    var halldate = [];

    for (var i = 0; i < hall.length; i++) {
        halldate.push(hall[i].date.slice(0, 10));
    }

    var timeArray = [];

    for (var i = 0; i < timeName.length; i++) {
        if (timeName[i].time >= 12) {
            timeArray.push({
                name: timeName[i].name + ' PM',
                time: timeName[i].time
            });
        } else {
            timeArray.push({
                name: timeName[i].name + ' AM',
                time: timeName[i].time
            });
        }
    }

    const timetest = []

    for (let i = 0; i < timeArray.length; i++) {
        timetest.push(timeArray[i].time)
    }

    var hallinfo = []

    for (let i = 0; i < hall.length; i++) {
        if (hall[i].date.slice(0, 10) == moment(startdate).format('YYYY-MM-DD')) {
            hallinfo.push({
                id: hall[i].id,
                date: hall[i].date.slice(0, 10),
                leftstatus: hall[i].leftStatus,
                rightstatus: hall[i].rightStatus,
                time: hall[i].time,
                userid: hall[i].userId
            })
        }
    }

    const halltimetest = []
    const halldatetest = []

    for (let i = 0; i < hallinfo.length; i++) {
        halltimetest.push(hallinfo[i].time)
        halldatetest.push(hallinfo[i].date.slice(0, 10))
    }

    // Select first and last time
    const selectHours = []
    const selectHoursLast = []

    for (var i in timeArray) {
        selectHours.push({
            value: timeArray[i].time,
            label: timeArray[i].name
        })
    }

    for (var i in timeArray) {
        if (timeArray[i].time > startTime && timeArray[i].time <= startTime + 3) {
            selectHoursLast.push({
                value: timeArray[i].time,
                label: timeArray[i].name
            })
        }
    }

    const hallType = [
        { value: 'Цагаар', label: 'Цагаар' },
        // { value: 'Өдрөөр', label: 'Өдрөөр' }
    ]

    const hallSize = [
        { value: 'Бүтэн', label: 'Бүтэн' },
        { value: 'Хагас', label: 'Хагас' }
    ]

    const HallType = (selectedOption) => {
        setHalltype(selectedOption.value)
    }
    const HallSize = (selectedOption) => {
        setHallsize(selectedOption.value)
    }
    const selectFirstHour = (selectedOption) => {
        setStartTime(selectedOption.value)
    }
    const selectLastHour = (selectedOption) => {
        setEndTime(selectedOption.value)
    }

    const [checkData, setcheckData] = useState([]);
    // const [count, setCount] = useState(0);

    function SentRequest() {
        if (startTime == '' || endTime == '' || halltype == '' || hallsize == '') {
            toast('Шаардлагатай талбаруудыг бөглөнө үү!')
        }
        else {
            fetch('/api/check', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    date: moment(startdate).format('YYYY-MM-DD'),
                    time: startTime,
                    endtime: endTime
                })
            })
                .then((res) => {
                    const data = res.json()
                    data.then((data) => {
                        setcheckData(data)

                        if (endTime > startTime + 3 || endTime < startTime || endTime == startTime) {
                            toast("Duusah tsagaa zuv songono uu!")
                        }
                        else {

                            if (data.length == 0) {
                                setModalShow(true)
                            }
                            else {

                                for (let i = 0; i < data.length; i++) {
                                    if (hallsize === 'Бүтэн') {
                                        if (data[i].leftStatus == 1 && data[i].rightStatus == 1) {
                                            toast(`Zahialah bolomjgui. ${data[i].time} tsag zahialagdsan bn`)
                                        }
                                        else if (data[i].leftStatus == 1 && data[i].rightStatus == 0) {
                                            toast(`Butneer zahialah bolomjgui. ${data[i].time} tsag talaar zahialagdsan bn`)
                                        }
                                        else if (data[i].leftStatus == 2 && data[i].rightStatus == 2) {
                                            toast(`Zahialah bolomjgui. ${data[i].time} tsag huleegdej bn`)
                                        }
                                        else if (data[i].leftStatus == 2 && data[i].rightStatus == 0) {
                                            toast(`Butneer zahialah bolomjgui. ${data[i].time} tsag talaar zahialagdsan bn`)
                                        }
                                    } else
                                        if (hallsize === 'Хагас') {
                                            if (data[i].leftStatus == 1 && data[i].rightStatus == 1) {
                                                toast(`Zahialah bolomjgui. ${data[i].time} tsag zahialagdsan bn`)
                                            }
                                            else if (data[i].leftStatus == 1 && data[i].rightStatus == 0) {
                                                setModalShow(true)
                                            }
                                            else if (data[i].leftStatus == 2 && data[i].rightStatus == 2) {
                                                toast(`Zahialah bolomjgui. ${data[i].time} tsag huleegdej bn`)
                                            }
                                            else if (data[i].leftStatus == 2 && data[i].rightStatus == 0) {
                                                setModalShow(true)
                                            }
                                        }
                                }
                            }
                        }
                    })
                })

        }
    }
    useEffect(() => {
        console.log()
    },[])

    function Request() {

        if (hallsize === 'Бүтэн') {
            for (let i = startTime; i < endTime; i++) {
                axios.post('/api/insert/insert', {
                    time: i,
                    leftStatus: 2,
                    rightStatus: 2,
                    date: moment(startdate).format("YYYY-MM-DD")
                })

                axios.post('/api/insert/insertUser', {
                    time: i,
                    type: 'Бүтэн',
                    date: moment(startdate).format("YYYY-MM-DD"),
                    userid: 100,
                    username: 'Zulaa',
                    status: 2
                })
            }
        } else 
        if (hallsize === 'Хагас') {
            for (let i = startTime; i < endTime; i++) {
                axios.post('/api/insert/insert', {
                    time: i,
                    leftStatus: 2,
                    rightStatus: 0,
                    date: moment(startdate).format("YYYY-MM-DD")
                })

                axios.post('/api/insert/insertUser', {
                    time: i,
                    type: 'Хагас',
                    date: moment(startdate).format("YYYY-MM-DD"),
                    userid: 100,
                    username: 'Zulaa',
                    status: 2
                })
            }
        }



        toast("Хүсэлт амжилттай илгээгдлээ. Админ хүсэлтийг зөвшөөрсний дараа таны хүсэлт баталгаажихыг анхаарна уу!!!")
        setModalShow(false)
    }

    return (
        <Layout>
            <Head>
                <title>Заалны цаг захиалах</title>
            </Head>
            <div className='text-center datepicker'>
                <DatePicker
                    size="lg"
                    value={startdate}
                    oneTap
                    onChange={setStartDate}
                    cleanable={false}
                    className='h-[5%] my-2 mx-auto'
                    ranges={[
                        {
                            label: 'Today',
                            value: new Date()
                        },
                        {
                            label: 'Tomorrow',
                            value: addDays(new Date(), 1)
                        },
                        {
                            label: '7 days later',
                            value: addDays(new Date(), 7)
                        }
                    ]}
                />
            </div>
            <div className='flex flex-col lg:flex-row body p-3 justify-evenly'>
                <div className='w-[100%] md:w-[80%] lg:w-[40%] md:mx-auto lg:mx-0 mb-5'>
                    <Table bordered size="md" className='border'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th colSpan={3} className='border-8 w-[20%] text-center text-lg font-semibold'>
                                    {startdate.toDateString()}
                                </th>
                            </tr>
                            <tr>
                                <th className='border-8 w-[20%] text-center text-lg font-semibold'>
                                </th>
                                <th className='border-8 w-[30%] text-center text-lg font-semibold'>
                                    Left
                                </th>
                                <th className='border-8 w-[30%] text-center text-lg font-semibold'>
                                    Right
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeArray.map((time, i) =>

                                <tr key={i}>
                                    <td className='text-center'>
                                        {time.name}
                                    </td>
                                    <td className='text-center'>
                                        {
                                            halltimetest.includes(time.time) ?
                                                hallinfo.map((data) =>
                                                    data.time == time.time ? data.leftstatus != 0 ?
                                                        data.leftstatus == 1 ? <p className='bg-green-200'>Захиалсан</p>
                                                            : data.leftstatus == 2 ? <p className='bg-yellow-200'>Хүлээгдэж байна</p> : <p className='bg-gray-200'>Сул</p>
                                                        : <p className='bg-gray-200'>Сул</p> : ''
                                                ) : <p className='bg-gray-200'>Сул</p>
                                        }
                                    </td>
                                    <td className={`text-center bg-green-400`}>
                                        {
                                            halltimetest.includes(time.time) ?
                                                hallinfo.map((data) =>
                                                    data.time == time.time ? data.rightstatus != 0 ?
                                                        data.rightstatus == 1 ? <p className='bg-green-200 order'>Захиалсан</p>
                                                            : data.rightstatus == 2 ? <p className='bg-yellow-200 wait'>Хүлээгдэж байна</p> : ''
                                                        : <p className='bg-gray-200 empty'>Сул</p> : ''
                                                ) : <p className='bg-gray-200'>Сул</p>
                                        }
                                    </td>
                                </tr>
                            )}


                        </tbody>
                    </Table>
                    <div className='w-full flex justify-between text-xs'>
                        <div className='flex w-1/3'>
                            <div className='bg-green-200 w-10 mr-2'></div>
                            <p className='my-auto'>Захиалах боломжгүй</p>
                        </div>
                        <div className='flex w-1/3'>
                            <div className='bg-gray-200 w-10 mr-2'></div>
                            <p className='my-auto'>Захиалах боломжтой</p>
                        </div>
                        <div className='flex w-1/3'>
                            <div className='bg-yellow-200 w-10 mr-2'></div>
                            <p className='my-auto'>Хүлээгдэж байгаа</p>
                        </div>
                    </div>
                </div>

                <div className={`${book.booking} w-[100%] md:w-[80%] lg:w-[40%] md:mx-auto lg:mx-0 bg-slate-100 p-2 text-center flex flex-col justify-start rounded-md`}>
                    <h4 className='w-full my-4'>Цаг захиалах</h4>
                    <div className='w-full'>
                        <div className='my-2 flex'>
                            <div className='w-1/2 mx-2 flex text-gray-400'>Эхлэх цаг</div>
                            <div className='w-1/2 mx-2 flex text-gray-400'>Дуусах цаг</div>
                        </div>
                        <div className='flex w-full'>
                            <Select
                                className='w-1/2 mx-2'
                                placeholder='Эхлэх цаг...'
                                options={selectHours}
                                onChange={selectFirstHour}
                            />
                            <Select
                                className='w-1/2 mx-2'
                                id='firstHour'
                                placeholder='Дуусах цаг...'
                                options={selectHoursLast}
                                onChange={selectLastHour}
                            />

                        </div>
                        <div className='mt-4 flex'>
                            <div className='w-1/2 mx-2 flex text-gray-400'>Төрөл</div>
                            <div className='w-1/2 mx-2 flex text-gray-400'>Хэмжээ</div>
                        </div>
                        <div className='my-2 flex'>
                            <Select
                                className='w-1/2 mb-2 mx-2'
                                placeholder='Заал авах төрөл...'
                                options={hallType}
                                onChange={HallType}
                            // defaultValue={{ label: "Цагаар", value: "Цагаар" }}
                            />
                            <Select
                                className='w-1/2 mb-2 mx-2'
                                placeholder='Хамрах хүрээ...'
                                options={hallSize}
                                onChange={HallSize}
                            />
                        </div>
                        <div className='my-2 py-2 mx-2'>
                            <label className='flex my-1 font-semibold'>Тайлбар</label>
                            <textarea
                                id="textarea"
                                className='border w-full p-2'
                                type='text'
                                placeholder={'Taйлбар...'}
                            >
                            </textarea>
                        </div>
                        <div className='flex'>
                            <div className='w-1/2 bg-white py-1 text-base mx-2 rounded-md font-semibold'>
                                <p>Захиалагч</p>
                            </div>
                            <div className='w-1/2 mx-2 py-1 font-semibold text-base'>
                                <p>Хэрэглэгчийн нэр</p>
                            </div>
                        </div>
                        <div className='flex my-2'>
                            <div className='w-1/2 bg-white py-1 text-base mx-2 rounded-md font-semibold'>
                                <p>Заал авах өдөр</p>
                            </div>
                            <div className='w-1/2 mx-2 py-1 font-semibold text-base'>
                                <p>{startdate.toLocaleString().slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className='mx-2'>
                            <div className='cursor-pointer bg-gray-800 text-gray-200 py-2 rounded-md mx-20 my-5 hover:bg-gray-900'
                                onClick={SentRequest}>
                                Хүсэлт илгээх
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer closeOnClick />
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow} onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='flex justify-center w-full'>
                        Хүсэлтийн дэлгэрэнгүй
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-5 flex flex-col justify-center'>
                    <div className='my-3'>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>Захиалсан цаг: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{`${startTime}:00 - ${endTime}:00`}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>Заалны төрөл: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{halltype}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>Заалны хэмжээ: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{hallsize}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>Захиалагч: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{'Username'}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>Oгноо: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{startdate.toLocaleString().slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className='bg-gray-800 text-gray-100 p-2 w-1/3 rounded-md text-center mx-auto my-3'
                        onClick={Request}>
                        Үргэлжлүүлэх
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setModalShow(false)} className='bg-gray-800 text-gray-100 p-2 rounded-md'>Close</button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] });

export const getServerSideProps = async (context) => {

    const time = await prisma.time.findMany();
    const hall = await prisma.time2.findMany();

    // const res = await fetch('http://localhost:3000/api/time')
    // const time = await res.json()

    // const res1 = await fetch('http://localhost:3000/api/hall')
    // const hall = await res1.json()

    return {
        props: {
            time: time,
            hall: JSON.parse(JSON.stringify(hall))
        }
    }
}
