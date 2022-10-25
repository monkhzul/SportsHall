import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'rsuite';
import Layout from './Layout/Layout';
import CloseIcon from '@rsuite/icons/Close';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';

export default function Booking(props) {
    const { Column, HeaderCell, Cell } = Table;

    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(sessionStorage.getItem('user'))
    }, [])
    
    const router = useRouter();
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(props.hall);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const List = [];
    for(var i in data) {
       if (data[i].userName === username && data[i].status == 2) {
            List.push({
                id: data[i].id,
                time: data[i].time,
                type: data[i].type,
                date: data[i].date.slice(0,10),
                userId: data[i].userId,
                userName: data[i].userName,
                status: data[i].status,
                sysDate: data[i].sysDate
            })
       }
    }

    const sortedDesc = List.sort(
        (objA, objB) =>
            new Date(objB.sysDate) - new Date(objA.sysDate)
    );

    const datas = sortedDesc.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return (i >= start && i < end);
    });

    async function deleteRequest(id, times, date, type) {

        await axios.post('/api/updateBefore', {
            time: times,
            date: date
        })
        .then((res) => {
            const data = res.data;

            if (type === 'Бүтэн') {      
                axios.post('/api/delete/deleteHall', {
                    id: data[0].id
                })
            } 

            if (type === 'Хагас') {
                    if (data[0].leftStatus != 0 && data[0].rightStatus != 0) {
                        axios.post('/api/update/deleteUpdate', {
                            id: data[0].id
                        })
                    } else {
                        axios.post('/api/delete/deleteHall', {
                            id: data[0].id
                        })
                    }
            }
        })

        for (let i = 0; i < List.length; i++) {
            if (List[i].id == id) {
                axios.post('/api/delete/deleteUser', {
                    id: id
                })
            }
        }

        toast("Хүсэлт цуцлагдлаа !!!")
        setTimeout(() => {
            router.reload()
        }, 1500);
    }

    return (
        <Layout>
            <div className='border'>
                <ToastContainer 
                    position='top-center'
                />
                <Table height={750} data={datas} locale={{emptyMessage: "Хүсэлт байхгүй байна"}}>
                    <Column width={80} align="center" fixed>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={150} fixed className='font-semibold'>
                        <HeaderCell>Захиалагч</HeaderCell>
                        <Cell dataKey="userName" />
                    </Column>
                    <Column width={150} className='text-center font-semibold'>
                        <HeaderCell>Заал авсан өдөр</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    <Column width={200} className='text-center font-semibold'>
                        <HeaderCell>Заал авсан цаг</HeaderCell>
                        <Cell dataKey="time" />
                    </Column>
                    {/* <Column width={150} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны төрөл</HeaderCell>
                        <Cell dataKey="category" />
                    </Column> */}
                    <Column width={150} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны хэмжээ</HeaderCell>
                        <Cell dataKey="type" />
                    </Column>
                    <Column width={150} fixed="right" className="text-center">
                        <HeaderCell>Устгах</HeaderCell>
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
                        total={List.length}
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

    return {
        props: {
            hall: JSON.parse(JSON.stringify(hall))
        }
    }
}
