import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import Layout from './Layout/Layout';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

export default function List(props) {

    const { Column, HeaderCell, Cell } = Table;

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(props.hall);
    const [time, setTime] = useState(props.time);
    const router = useRouter();

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const waitingRequest = [];
    for(var i in data) {
       if (data[i].status === 2) {
            waitingRequest.push({
                id: data[i].id,
                time: data[i].time,
                type: data[i].type,
                date: data[i].date.slice(0,10),
                userId: data[i].userId,
                userName: data[i].userName,
                status: data[i].status,
            })
       }
    }

    const sortedDesc = waitingRequest.sort(
        (objA, objB) =>
            new Date(objA.date) - new Date(objB.date)
    );

    const datas = sortedDesc.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return (i >= start && i < end);
    });

    

    const [updateData, setupdateData] = useState([]);

    const updateConfirm = (id, times, date, type) => {

        axios.post('http://localhost:3000/api/updateBefore', {
            time: times,
            date: date
        })
        .then((res) => {
            if (type === 'Бүтэн') {
                if (res.data[0].leftStatus == 2 && res.data[0].rightStatus == 2) {
                    axios.post('/api/update/hallUpdate', {
                        date: date,
                        time: times,
                        leftStatus: 1,
                        rightStatus: 1
                    })
                }
            } else
            if (type === 'Хагас') {
                if (res.data[0].leftStatus == 2 && res.data[0].rightStatus == 0) {
                    axios.post('/api/update/hallUpdate', {
                        date: date,
                        time: times,
                        leftStatus: 1,
                        rightStatus: 0
                    })
                }
                if (res.data[0].leftStatus == 2 && res.data[0].rightStatus == 2) {
                    axios.post('/api/update/hallUpdate', {
                        date: date,
                        time: times,
                        leftStatus: 1,
                        rightStatus: 2
                    })
                }
                if (res.data[0].leftStatus == 1 && res.data[0].rightStatus == 2) {
                    axios.post('/api/update/hallUpdate', {
                        date: date,
                        time: times,
                        leftStatus: 1,
                        rightStatus: 1
                    })
                }
            }
        })
       
        for (let i = 0; i < waitingRequest.length; i++) {
            if (waitingRequest[i].id == id) {
                axios.post('/api/update/userUpdate', {
                    id: id
                })
            }
        }

        toast("Амжилттай баталгаажууллаа !!!")

        setTimeout(() => {
            router.push('/components/Admin/List')
        }, 2500);
    }


    function deleteRequest(id, times, date, type) {

        axios.post('/api/updateBefore', {
            time: times,
            date: date
        })
        .then((res) => {
            const data = res.data;

            if (type === 'Бүтэн') {      
                axios.post('/api/delete/deleteHall', {
                    id: data[0].id
                })
            } else 
            if (type === 'Хагас') {
                axios.post('/api/update/deleteUpdate', {
                    id: data[0].id
                })
            }
        })

        for (let i = 0; i < waitingRequest.length; i++) {
            if (waitingRequest[i].id == id) {
                axios.post('/api/delete/deleteUser', {
                    id: id
                })
            }
        }

        toast("Хүсэлт цуцлагдлаа !!!")
    }

    return (
        <Layout>
            <title>Хүлээгдэж буй хүсэлтүүд</title>
            <ToastContainer 
                position='top-center'
            />
            <div className='border'>
                <Table height={480} data={datas}>
                    <Column width={100} align="center" fixed>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={160} fixed className='font-semibold'>
                        <HeaderCell>Захиалагч</HeaderCell>
                        <Cell dataKey="userName" />
                    </Column>
                    <Column width={200} className='text-center font-semibold'>
                        <HeaderCell>Заал авах өдөр</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    <Column width={200} className='text-center font-semibold'>
                        <HeaderCell>Заал авах цаг</HeaderCell>
                        <Cell dataKey="time" />
                    </Column>
                    {/* <Column width={180} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны төрөл</HeaderCell>
                        <Cell dataKey="Цагаар" />
                    </Column> */}
                    <Column width={150} flexGrow={1} className='text-center'>
                        <HeaderCell>Бүтэн/Хагас</HeaderCell>
                        <Cell dataKey="type" />
                    </Column>
                    <Column width={100} fixed="right" className="text-center">
                        <HeaderCell>Зөвшөөрөх</HeaderCell>
                        <Cell>
                            {rowData => (
                                // function updateConfirm(id) {
                                //     console.log(id)
                                // }
                                // return (
                                <span>
                                    <CheckIcon className='cursor-pointer bg-green-800 text-gray-50 rounded-sm text-2xl hover:text-white hover:bg-green-500'
                                        onClick={() => updateConfirm(rowData.id, rowData.time, rowData.date, rowData.type)}></CheckIcon>
                                </span>
                                // )
                            )}
                        </Cell>
                    </Column>
                    <Column width={150} fixed="right" className="text-center">
                        <HeaderCell>Цуцлах</HeaderCell>
                        <Cell>
                            {rowData => (
                                <span>
                                    <CloseIcon className='cursor-pointer text-2xl bg-red-900 text-gray-50 rounded-sm hover:text-white hover:bg-red-500'
                                        onClick={() => deleteRequest(rowData.id, rowData.time, rowData.date, rowData.type)}></CloseIcon>
                                </span>
                            )}
                        </Cell>
                    </Column>
                </Table>
                <div style={{ padding: 20 }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="md"
                        layout={['total', '-', 'pager', 'skip']}
                        total={waitingRequest.length}
                        limitOptions={[10, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
            </div>
        </Layout>
    )
}

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] });

export const getServerSideProps = async (context) => {

    const hall = await prisma.userReq.findMany();
    const res = await fetch('http://localhost:3000/api/hall')
    const time = await res.json()

    return {
        props: {
            hall: JSON.parse(JSON.stringify(hall)),
            time: time
        }
    }
}
