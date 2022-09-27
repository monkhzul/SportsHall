import React, { useState } from 'react'
import NavbarUser from '../NavbarUser'
import Sidenav from '../Admin/Sidenav'
import { DatePicker } from 'rsuite'
import moment from 'moment';
import addDays from "date-fns/addDays";
import Table from 'react-bootstrap/Table';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";

export default function Booking() {

    const [modalShow, setModalShow] = useState(false);
    const [textarea, setTextArea] = useState('')

    const date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const [startdate, setStartDate] = useState(today);

    const currentDate = moment().set({ hours: 0, minute: 59, second: 59 });
    const disabledDate = (date) => {
        return currentDate.isAfter(date);
    };

    var timeArray = [];

    for (var i = 8; i <= 24; i++) {
        if (i >= 12) {
            timeArray.push(i + ':00 PM');
        } else {
            timeArray.push(i + ':00 AM');
        }
    }

    function Request() {
        toast("Хүсэлт амжилттай илгээгдлээ")
        setModalShow(false)
    }

    return (
        <div className='w-full'>
            <div className='nav w-full'>
                <NavbarUser />
            </div>
            <div className='flex flex-col sm:flex-row'>
                <Sidenav />
                <div className='w-full border'>
                    <div className='text-center'>
                <DatePicker
                            size="lg"
                            value={startdate}
                            oneTap
                            disabledDate={disabledDate}
                            onChange={(date) => { setStartDate(date); }}
                            startdate={startdate}
                            className='h-[5%] my-2 w-1/6 mx-auto'
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
                    <div className='body p-3 flex justify-evenly'>
                        <div className='w-[40%]'>
                            <Table bordered size="md" className=''>
                                <thead className='bg-gray-200'>
                                    <tr>
                                        <th colSpan={2} className='border-8 w-[20%] text-center text-lg font-semibold'>
                                            {startdate.getFullYear() + '-' + (startdate.getMonth()+1) + '-' + startdate.getDate()}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeArray.map((time, i) => 
                                        <tr key={i}>
                                            <td className='w-[30%] text-center'>{time}</td>
                                            <td className='text-center'>Mark</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <div className='w-[40%] bg-slate-100 p-2 text-center flex flex-col justify-start'>
                            <h4 className='w-full my-4'>Цаг захиалах</h4>
                            <div className='w-full'>
                                <div className='flex w-full'>
                                    {/* <Select
                                        className='w-1/2 mx-2'
                                        placeholder='Эхлэх цаг...'
                                    /> */}
                                    {/* <Select
                                        className='w-1/2 mx-2'
                                        placeholder='Дуусах цаг...'
                                    /> */}
                                    
                                    <DatePicker 
                                        format="HH:mm" 
                                        ranges={[]} 
                                        className='w-1/2 mx-2' 
                                        disabledMinutes={minute => minute !== 0}
                                    />
                                    <DatePicker 
                                        format="HH:mm" 
                                        ranges={[]} 
                                        className='w-1/2 mx-2' 
                                        disabledMinutes={minute => minute !== 0}
                                    />
                                </div>
                                <div className='my-2 flex'>
                                        <Select 
                                            className='w-1/2 my-2 mx-2'
                                            placeholder='Заал авах төрөл...'
                                        />
                                        <Select 
                                            className='w-1/2 my-2 mx-2'
                                            placeholder='Заалны хамрах хүрээ...'
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
                                            <p>{startdate.getFullYear()}</p>
                                        </div>
                                </div>
                                <div className='mx-2'>
                                        <div className='cursor-pointer bg-gray-800 text-gray-200 py-2 rounded-md mx-20 my-5 hover:bg-gray-900' 
                                             onClick={() => setModalShow(true)}>
                                                Хүсэлт илгээх
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer closeOnClick autoClose={1500} />
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
                <Modal.Body className='p-5 flex justify-center'>
                   <div className='bg-gray-800 text-gray-100 p-2 w-1/3 rounded-md text-center'
                    onClick={Request}>
                        Үргэлжлүүлэх
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setModalShow(false)} className='bg-gray-800 text-gray-100 p-2 rounded-md'>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
