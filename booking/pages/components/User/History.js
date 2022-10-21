import React, { useState } from 'react'
import Layout from './Layout/Layout';
import { Table, Pagination } from 'rsuite';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';

export default function Booking(props) {
    const { Column, HeaderCell, Cell } = Table;

    const storage = globalThis?.sessionStorage;
    const user = JSON.parse(storage.getItem('user'));

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(props.hall);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const List = [];
    for(var i in data) {
       if (data[i].userName === user.firstname && data[i].status == 1) {
            List.push({
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

    const sortedDesc = List.sort(
        (objA, objB) =>
            new Date(objB.date) - new Date(objA.date)
    );

    const datas = sortedDesc.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return (i >= start && i < end);
    });
    return (
        <Layout>
            <div className='border'>
                <Table height={500} data={datas}>
                    <Column width={80} align="center" fixed>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={250} fixed className='font-semibold'>
                        <HeaderCell>Захиалагч</HeaderCell>
                        <Cell dataKey="userName" />
                    </Column>
                    <Column width={200} className='text-center font-semibold'>
                        <HeaderCell>Заал авсан өдөр</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    <Column width={200} flexGrow={1} className='text-center font-semibold'>
                        <HeaderCell>Заал авсан цаг</HeaderCell>
                        <Cell dataKey="time" />
                    </Column>
                    {/* <Column width={150} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны төрөл</HeaderCell>
                        <Cell dataKey="category" />
                    </Column> */}
                    <Column width={200} flexGrow={1} className='text-center'>
                        <HeaderCell>Бүтэн/Хагас</HeaderCell>
                        <Cell dataKey="type" />
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
