import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'rsuite';
import Layout from './Layout/Layout';
import { PrismaClient } from '@prisma/client';
import DateRangePicker from "rsuite/DateRangePicker";
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import moment from 'moment';

export default function List(props) {
    const { Column, HeaderCell, Cell } = Table;

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(props.hall);
    const [chosenDate, setChosenDate] = useState([]);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const List = [];
    for(var i in data) {
       if (data[i].status === 1) {
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

    if (chosenDate === undefined || chosenDate === null) { } else { 
        var result = datas.filter(itemInArray => 
            itemInArray.date >= moment(chosenDate == '' ? '' : chosenDate[0]).format('YYYY-MM-DD') &&
            itemInArray.date <= moment(chosenDate == '' ? '' : chosenDate[1]).format('YYYY-MM-DD')
        );
    }

    console.log(chosenDate == '');

    return (
        <Layout>
            <title>Захиалгын лист</title>
            <div className=''>
            <DateRangePicker
                    size="lg"
                    value={chosenDate}
                    onChange={setChosenDate}
                    className='w-full'
                    ranges={[
                      {
                        label: 'Today',
                        value: [new Date(), new Date()],
                        placement: 'bottom'
                      },
                      {
                        label: 'Yesterday',
                        value: [addDays(new Date(), -1), addDays(new Date(), -1)],
                        placement: 'bottom'
                      },
                      {
                        label: 'This week',
                        value: [startOfWeek(new Date()), endOfWeek(new Date())],
                        placement: 'bottom'
                      },
                      {
                        label: 'Last week',
                        closeOverlay: false,
                        value: value => {
                          const [start = new Date()] = value || [];
                          return [
                            addDays(startOfWeek(start, { weekStartsOn: 1 }), -7),
                            addDays(endOfWeek(start, { weekStartsOn: 1 }), -7)
                          ];
                        },
                        placement: 'bottom'
                      }
                    ]}
                  />
            </div>
            <div className='border'>
                <Table height={750} data={chosenDate == '' || result == null ? datas : result}>
                    <Column width={120} align="center" fixed >
                        <HeaderCell>ERP код</HeaderCell>
                        <Cell dataKey="userId" />
                    </Column>
                    <Column width={150} fixed className='font-semibold'>
                        <HeaderCell>Захиалагч</HeaderCell>
                        <Cell dataKey="userName" />
                    </Column>
                    <Column width={150} className='text-center font-semibold'>
                        <HeaderCell>Заал авсан өдөр</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    <Column width={120} flexGrow={1} className='text-center font-semibold'>
                        <HeaderCell>Заал авсан цаг</HeaderCell>
                        {/* <Cell dataKey="time" /> */}
                        <Cell>{rowData => rowData.time}</Cell>
                    </Column>
                    {/* <Column width={150} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны төрөл</HeaderCell>
                        <Cell dataKey="category" />
                    </Column> */}
                    <Column width={150} flexGrow={1} className='text-center'>
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
                        total={chosenDate == '' || result == null ? List?.length : result?.length}
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
