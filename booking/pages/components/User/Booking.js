import React, { useEffect, useState } from 'react'
import { DatePicker } from 'rsuite'
import moment from 'moment';
import addDays from "date-fns/addDays";
import Table from 'react-bootstrap/Table';
import Select, { components } from 'react-select';
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
    const [modalShow2, setModalShow2] = useState(false);
    const [timeName, setTimeName] = useState(props.time);
    const [hall, setHall] = useState(props.hall);
    const [username, setUsername] = useState('');
    const [erp, setErp] = useState('');
    const [explanation, setExplanation] = useState('');

    useEffect(() => {
        setUsername(sessionStorage.getItem('user'))
        setErp(sessionStorage.getItem('userId'))
    }, [])


    const currentDate = moment().set({ hours: 1, minute: 59, seconds: 59 });
    const disabledDate = (date) => {
        return currentDate.isAfter(date);
    };

    const date = new Date();
    const [startTime, setStartTime] = useState(date.getHours())
    const [startTime2, setStartTime2] = useState(date.getHours())
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
        { value: '????????????', label: '????????????' },
        // { value: '????????????', label: '????????????' }
    ]

    const hallSize = [
        { value: '??????????', label: '??????????' },
        { value: '??????????', label: '??????????' }
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
        if (moment(today).format("YYYY-MM-DD") <= moment(startdate).format("YYYY-MM-DD")) {
            if (startTime == '' || endTime == '' || hallsize == '') {
                toast('???????????????????????? ?????????????????????? ?????????????? ????!')
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
                                toast("???????????? ?????????? ?????? ?????????????? ????!")
                            }
                            else {

                                if (data.length == 0) {
                                    setModalShow(true)
                                }
                                else {
                                    let count = 0;
                                    for (let i = 0; i < data.length; i++) {
                                        if (hallsize === '??????????') {
                                            if (data[i].leftStatus == 1 && data[i].rightStatus == 1 ||
                                                data[i].leftStatus == 2 && data[i].rightStatus == 2 ||
                                                data[i].leftStatus == 1 && data[i].rightStatus == 0 ||
                                                data[i].leftStatus == 2 && data[i].rightStatus == 0) {
                                                count++
                                                // toast(`Zahialah bolomjgui. ${data[i].time} tsag zahialagdsan bn`)
                                            }
                                        } else
                                            if (hallsize === '??????????') {

                                                if (data[i].leftStatus == 1 && data[i].rightStatus == 1 ||
                                                    data[i].leftStatus == 2 && data[i].rightStatus == 2) {
                                                    // toast(`Zahialah bolomjgui. ${data[i].time} tsag zahialagdsan bn`)
                                                    count++
                                                }

                                                // else if (data[i].leftStatus == 1 && data[i].rightStatus == 0) {
                                                //     // setModalShow(true)
                                                // }
                                                // else if (data[i].leftStatus == 2 && data[i].rightStatus == 2) {
                                                //     // toast(`Zahialah bolomjgui. ${data[i].time} tsag huleegdej bn`)
                                                // }
                                                // else if (data[i].leftStatus == 2 && data[i].rightStatus == 0) {
                                                //     // setModalShow(true)
                                                // }

                                            }
                                    }
                                    if (count == 0) {
                                        setModalShow(true)
                                    }
                                    else {
                                        toast("???????????????? ?????????????????? ?????? ???????????????? !!!")
                                    }
                                }
                            }
                        })
                    })

            }
        } else {
            toast(`${moment(startdate).format("YYYY-MM-DD")} ???????? ???????????????? ?????????? ?????? ??????????`)
        }
    }

    async function Request() {

        if (hallsize === '??????????') {
            for (let i = startTime; i < endTime; i++) {
                axios.post('/api/insert/insert', {
                    time: i,
                    leftStatus: 2,
                    rightStatus: 2,
                    date: moment(startdate).format("YYYY-MM-DD")
                })

                axios.post('/api/insert/insertUser', {
                    time: i,
                    type: '??????????',
                    date: moment(startdate).format("YYYY-MM-DD"),
                    userid: erp,
                    username: username,
                    status: 2,
                    sysDate: new Date(),
                    explanation: explanation
                })
            }
        } else if (hallsize === '??????????') {

            await axios.post('/api/select/selectInsert', {
                time: startTime,
                time2: endTime,
                date: moment(startdate).format("YYYY-MM-DD")
            })
                .then((res) => {
                    const data = res.data;

                    var time = []

                    for (var i in data) {
                        if (data[i].date.slice(0, 10) === moment(startdate).format("YYYY-MM-DD")) {
                            time.push(data[i].time)
                        }
                    }

                    for (let i = startTime; i < endTime; i++) {

                        if (time.includes(i)) {
                            axios.post('/api/updateBefore', {
                                time: i,
                                date: moment(startdate).format('YYYY-MM-DD')
                            })
                                .then((res) => {
                                    const data1 = res.data;

                                    if (data1[0].leftStatus != 0) {
                                        axios.post('/api/update/inserUpdate', {
                                            id: data1[0].id
                                        })
                                    }
                                })

                        } else {
                            axios.post('/api/insert/insert', {
                                time: i,
                                leftStatus: 2,
                                rightStatus: 0,
                                date: moment(startdate).format("YYYY-MM-DD")
                            })
                        }

                        axios.post('/api/insert/insertUser', {
                            time: i,
                            type: '??????????',
                            date: moment(startdate).format("YYYY-MM-DD"),
                            userid: erp,
                            username: username,
                            status: 2,
                            sysDate: new Date(),
                            explanation: explanation
                        })
                    }
                })
        }

        toast("???????????? ?????????????????? ????????????????????. ?????????? ?????????????????? ?????????????????????? ?????????? ???????? ???????????? ???????????????????????? ????????!!!")
        setModalShow(false)

        setTimeout(() => {
            router.push('/components/User/Request')
        }, 2200);
    }

    async function RequestOne() {
        if (moment(today).format("YYYY-MM-DD") <= moment(startdate).format("YYYY-MM-DD")) {

            fetch('/api/check', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    date: moment(startdate).format('YYYY-MM-DD'),
                    time: startTime2,
                    endtime: startTime2 + 1
                })
            })
                .then((res) => {
                    const data = res.json()
                    data.then((data) => {
                        setcheckData(data)

                        if (data.length == 0) {
                            //dfgh
                            if (hallsize != '') {
                                if (hallsize === '??????????') {
                                    for (let i = startTime2; i < startTime2 + 1; i++) {
                                        axios.post('/api/insert/insert', {
                                            time: i,
                                            leftStatus: 2,
                                            rightStatus: 2,
                                            date: moment(startdate).format("YYYY-MM-DD")
                                        })

                                        axios.post('/api/insert/insertUser', {
                                            time: i,
                                            type: '??????????',
                                            date: moment(startdate).format("YYYY-MM-DD"),
                                            userid: erp,
                                            username: username,
                                            status: 2,
                                            sysDate: new Date(),
                                            explanation: explanation
                                        })
                                    }
                                } else if (hallsize === '??????????') {

                                    axios.post('/api/select/selectInsert', {
                                        time: startTime2,
                                        time2: startTime2 + 1,
                                        date: moment(startdate).format("YYYY-MM-DD")
                                    })
                                        .then((res) => {
                                            const data = res.data;

                                            var time = []

                                            for (var i in data) {
                                                if (data[i].date.slice(0, 10) === moment(startdate).format("YYYY-MM-DD")) {
                                                    time.push(data[i].time)
                                                }
                                            }

                                            for (let i = startTime2; i < startTime2 + 1; i++) {

                                                if (time.includes(i)) {
                                                    axios.post('/api/updateBefore', {
                                                        time: i,
                                                        date: moment(startdate).format('YYYY-MM-DD')
                                                    })
                                                        .then((res) => {
                                                            const data1 = res.data;

                                                            if (data1[0].leftStatus != 0) {
                                                                axios.post('/api/update/inserUpdate', {
                                                                    id: data1[0].id
                                                                })
                                                            }
                                                        })

                                                } else {
                                                    axios.post('/api/insert/insert', {
                                                        time: i,
                                                        leftStatus: 2,
                                                        rightStatus: 0,
                                                        date: moment(startdate).format("YYYY-MM-DD")
                                                    })
                                                }

                                                axios.post('/api/insert/insertUser', {
                                                    time: i,
                                                    type: '??????????',
                                                    date: moment(startdate).format("YYYY-MM-DD"),
                                                    userid: erp,
                                                    username: username,
                                                    status: 2,
                                                    sysDate: new Date(),
                                                    explanation: explanation
                                                })
                                            }
                                        })
                                }

                                toast("???????????? ?????????????????? ????????????????????. ?????????? ?????????????????? ?????????????????????? ?????????? ???????? ???????????? ???????????????????????? ????????!!!")
                                setModalShow2(false)

                                setTimeout(() => {
                                    router.push('/components/User/Request')
                                }, 2200);
                            } else {
                                toast("???????????? ?????????????? ?????????????? ????!")
                            }
                        }
                        else {
                            let count = 0;
                            for (let i = 0; i < data.length; i++) {
                                if (hallsize === '??????????') {
                                    if (data[i].leftStatus == 1 && data[i].rightStatus == 1 ||
                                        data[i].leftStatus == 2 && data[i].rightStatus == 2 ||
                                        data[i].leftStatus == 1 && data[i].rightStatus == 0 ||
                                        data[i].leftStatus == 2 && data[i].rightStatus == 0) {
                                        count++
                                    }
                                } else
                                    if (hallsize === '??????????') {

                                        if (data[i].leftStatus == 1 && data[i].rightStatus == 1 ||
                                            data[i].leftStatus == 2 && data[i].rightStatus == 2) {
                                            count++
                                        }

                                    }
                            }
                            if (count == 0) {
                                //dfgh
                                if (hallsize != '') {
                                    if (hallsize === '??????????') {
                                        for (let i = startTime2; i < startTime2 + 1; i++) {
                                            axios.post('/api/insert/insert', {
                                                time: i,
                                                leftStatus: 2,
                                                rightStatus: 2,
                                                date: moment(startdate).format("YYYY-MM-DD")
                                            })

                                            axios.post('/api/insert/insertUser', {
                                                time: i,
                                                type: '??????????',
                                                date: moment(startdate).format("YYYY-MM-DD"),
                                                userid: erp,
                                                username: username,
                                                status: 2,
                                                sysDate: new Date(),
                                                explanation: explanation
                                            })
                                        }
                                    } else if (hallsize === '??????????') {

                                        axios.post('/api/select/selectInsert', {
                                            time: startTime2,
                                            time2: startTime2 + 1,
                                            date: moment(startdate).format("YYYY-MM-DD")
                                        })
                                            .then((res) => {
                                                const data = res.data;

                                                var time = []

                                                for (var i in data) {
                                                    if (data[i].date.slice(0, 10) === moment(startdate).format("YYYY-MM-DD")) {
                                                        time.push(data[i].time)
                                                    }
                                                }

                                                for (let i = startTime2; i < startTime2 + 1; i++) {

                                                    if (time.includes(i)) {
                                                        axios.post('/api/updateBefore', {
                                                            time: i,
                                                            date: moment(startdate).format('YYYY-MM-DD')
                                                        })
                                                            .then((res) => {
                                                                const data1 = res.data;

                                                                if (data1[0].leftStatus != 0) {
                                                                    axios.post('/api/update/inserUpdate', {
                                                                        id: data1[0].id
                                                                    })
                                                                }
                                                            })

                                                    } else {
                                                        axios.post('/api/insert/insert', {
                                                            time: i,
                                                            leftStatus: 2,
                                                            rightStatus: 0,
                                                            date: moment(startdate).format("YYYY-MM-DD")
                                                        })
                                                    }

                                                    axios.post('/api/insert/insertUser', {
                                                        time: i,
                                                        type: '??????????',
                                                        date: moment(startdate).format("YYYY-MM-DD"),
                                                        userid: erp,
                                                        username: username,
                                                        status: 2,
                                                        sysDate: new Date(),
                                                        explanation: explanation
                                                    })
                                                }
                                            })
                                    }

                                    toast("???????????? ?????????????????? ????????????????????. ?????????? ?????????????????? ?????????????????????? ?????????? ???????? ???????????? ???????????????????????? ????????!!!")
                                    setModalShow2(false)

                                    setTimeout(() => {
                                        router.push('/components/User/Request')
                                    }, 2200);
                                } else {
                                    toast("???????????? ?????????????? ?????????????? ????!")
                                }
                            }
                            else {
                                toast("?????????????? ???????????????? ?????????????????? ?????????? !!!")
                            }
                        }

                    })
                })

        } else {
            toast(`${moment(startdate).format("YYYY-MM-DD")} ???????? ???????????????? ?????????? ?????? ??????????`)
        }

    }

    const Requester = (time) => {
        setStartTime2(time)
        setModalShow2(true)
    }

    return (
        <Layout>
            <Head>
                <title>???????????? ?????? ????????????????</title>
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
                                                        data.leftstatus == 1 ? <p className='bg-green-200'>??????????????????</p>
                                                            : data.leftstatus == 2 ? <p className='bg-yellow-200'>?????????????????? ??????????</p> : <p className='bg-gray-200'>??????</p>
                                                        : <div className='bg-gray-200 cursor-pointer hover:bg-gray-500 hover:text-white' onClick={() => Requester(time.time)} >??????</div> : ''
                                                ) : <p className='bg-gray-200 cursor-pointer hover:bg-gray-500 hover:text-white' onClick={() => Requester(time.time)}>??????</p>
                                        }
                                    </td>
                                    <td className={`text-center bg-green-400`}>
                                        {
                                            halltimetest.includes(time.time) ?
                                                hallinfo.map((data) =>
                                                    data.time == time.time ? data.rightstatus != 0 ?
                                                        data.rightstatus == 1 ? <p className='bg-green-200 order'>??????????????????</p>
                                                            : data.rightstatus == 2 ? <p className='bg-yellow-200 wait'>?????????????????? ??????????</p> : ''
                                                        : <p className='bg-gray-200 empty cursor-pointer hover:bg-gray-500 hover:text-white' onClick={() => Requester(time.time)}>??????</p> : ''
                                                ) : <p className='bg-gray-200 cursor-pointer hover:bg-gray-500 hover:text-white' onClick={() => Requester(time.time)}>??????</p>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='w-full flex justify-between text-xs'>
                        <div className='flex w-1/3'>
                            <div className='bg-green-200 w-10 mr-2'></div>
                            <p className='my-auto'>???????????????? ??????????????????</p>
                        </div>
                        <div className='flex w-1/3'>
                            <div className='bg-gray-200 w-10 mr-2'></div>
                            <p className='my-auto'>???????????????? ??????????????????</p>
                        </div>
                        <div className='flex w-1/3'>
                            <div className='bg-yellow-200 w-10 mr-2'></div>
                            <p className='my-auto'>?????????????????? ????????????</p>
                        </div>
                    </div>
                </div>

                <div className={`${book.booking} w-[100%] md:w-[80%] lg:w-[40%] md:mx-auto lg:mx-0 bg-slate-100 p-2 text-center flex flex-col justify-start rounded-md`}>
                    <h4 className='w-full my-4'>?????? ????????????????</h4>
                    <div className='w-full'>
                        <div className='my-2 flex'>
                            <div className='w-1/2 mx-2 flex text-gray-400'>?????????? ??????</div>
                            <div className='w-1/2 mx-2 flex text-gray-400'>???????????? ??????</div>
                        </div>
                        <div className='flex w-full'>
                            <Select
                                className='w-1/2 mx-2'
                                placeholder='?????????? ??????...'
                                options={selectHours}
                                onChange={selectFirstHour}
                            />
                            <Select
                                className='w-1/2 mx-2'
                                id='firstHour'
                                placeholder='???????????? ??????...'
                                options={selectHoursLast}
                                onChange={selectLastHour}
                            />

                        </div>
                        <div className='mt-4 flex'>
                            {/* <div className='w-1/2 mx-2 flex text-gray-400'>??????????</div> */}
                            <div className='mx-auto flex text-gray-400'>????????????</div>
                        </div>
                        <div className='my-2 flex mx-auto'>
                            {/* <Select
                                className='w-1/2 mb-2 mx-2'
                                placeholder='???????? ???????? ??????????...'
                                options={hallType}
                                onChange={HallType}
                            // defaultValue={{ label: "????????????", value: "????????????" }}
                            /> */}
                            <Select
                                className='mb-2 mx-auto w-1/2'
                                placeholder='???????????? ??????????...'
                                options={hallSize}
                                onChange={HallSize}
                            />
                        </div>
                        <div className='my-2 py-2 mx-2'>
                            <label className='flex my-1 font-semibold'>??????????????</label>
                            <textarea
                                id="textarea"
                                className='border w-full p-2'
                                type='text'
                                placeholder={'Ta??????????...'}
                                onChange={(e) => setExplanation(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className='flex'>
                            <div className='w-1/2 bg-white py-1 text-base mx-2 rounded-md font-semibold'>
                                <p>??????????????????</p>
                            </div>
                            <div className='w-1/2 mx-2 py-1 font-semibold text-base'>
                                <p>{username}</p>
                            </div>
                        </div>
                        <div className='flex my-2'>
                            <div className='w-1/2 bg-white py-1 text-base mx-2 rounded-md font-semibold'>
                                <p>???????? ???????? ????????</p>
                            </div>
                            <div className='w-1/2 mx-2 py-1 font-semibold text-base'>
                                <p>{startdate.toLocaleString().slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className='mx-2'>
                            <div className='cursor-pointer bg-gray-800 text-gray-200 py-2 rounded-md mx-20 my-5 hover:bg-gray-900'
                                onClick={SentRequest}>
                                ???????????? ????????????
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position='top-center'
                autoClose="1000"
                closeOnClick />
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow} onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='flex justify-center w-full'>
                        ?????????????????? ??????????????????????
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-5 flex flex-col justify-center'>
                    <div className='my-3'>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>?????????????????? ??????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{`${startTime}:00 - ${endTime}:00`}</p>
                        </div>
                        {/* <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>???????????? ??????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{halltype}</p>
                        </div> */}
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>???????????? ????????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{hallsize}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>??????????????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{username}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>O????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{startdate.toLocaleString().slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className='bg-gray-800 text-gray-100 p-2 w-1/3 rounded-md text-center mx-auto my-3 cursor-pointer'
                        onClick={Request}>
                        ????????????????????????
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setModalShow(false)} className='bg-gray-800 text-gray-100 p-2 rounded-md'>??????????</button>
                </Modal.Footer>
            </Modal>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow2} onHide={() => setModalShow2(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='flex justify-center w-full'>
                        ?????????????????? ??????????????????????
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-5 flex flex-col justify-center'>
                    <div className='flex flex-col'>
                        <p className='w-1/2 mx-auto'>???????????? ????????????</p>
                        <Select
                            className='mb-2 mx-auto w-1/2'
                            placeholder='???????????? ??????????...'
                            options={hallSize}
                            onChange={HallSize}
                        />
                    </div>
                    <div className='my-3'>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>?????????????????? ??????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{`${startTime2}:00 - ${startTime2 + 1}:00`}</p>
                        </div>
                        {/* <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>???????????? ??????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{halltype}</p>
                        </div> */}
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>???????????? ????????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{hallsize}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>??????????????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{username}</p>
                        </div>
                        <div className='flex my-2'>
                            <h5 className='w-1/3 text-center'>O????????: </h5>
                            <p className='w-1/2 text-xl flex items-center font-bold'>{startdate.toLocaleString().slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className='bg-gray-800 text-gray-100 p-2 w-1/3 rounded-md text-center mx-auto my-3 cursor-pointer'
                        onClick={RequestOne}>
                        ????????????????????????
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setModalShow2(false)} className='bg-gray-800 text-gray-100 p-2 rounded-md'>??????????</button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] });

export const getServerSideProps = async (context) => {

    const time = await prisma.time.findMany();
    const hall = await prisma.hall.findMany();

    return {
        props: {
            time: time,
            hall: JSON.parse(JSON.stringify(hall))
        }
    }
}
