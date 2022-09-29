import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import Layout from './Layout/Layout';

export default function List(props) {

    const { Column, HeaderCell, Cell } = Table;

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(props.db.products);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const datas = data.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return (i >= start && i < end);
    });
    return (
        <Layout>
            <div className='border'>
                <Table height={750} data={datas}>
                    <Column width={80} align="center" fixed>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={200} fixed>
                        <HeaderCell>Захиалагч</HeaderCell>
                        <Cell dataKey="title" />
                    </Column>
                    <Column width={200} className='text-center'>
                        <HeaderCell>Заал авах өдөр</HeaderCell>
                        <Cell dataKey="price" />
                    </Column>
                    <Column width={200} className='text-center'>
                        <HeaderCell>Заал авах цаг</HeaderCell>
                        <Cell dataKey="stock" />
                    </Column>
                    <Column width={200} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны төрөл</HeaderCell>
                        <Cell dataKey="category" />
                    </Column>
                    <Column width={150} flexGrow={1} className='text-center'>
                        <HeaderCell>Заалны хэмжээ</HeaderCell>
                        <Cell dataKey="rating" />
                    </Column>
                    <Column width={100} fixed="right" className="text-center">
                        <HeaderCell>Зөвшөөрөх</HeaderCell>
                        <Cell>
                            {rowData => (
                                <span>
                                    <CheckIcon className='cursor-pointer bg-green-800 text-gray-50 rounded-sm text-xl hover:text-white hover:text-2xl'
                                        onClick={() => alert(`id:${rowData.id}`)}></CheckIcon>
                                </span>
                            )}
                        </Cell>
                    </Column>
                    <Column width={100} fixed="right" className="text-center">
                        <HeaderCell>Цуцлах</HeaderCell>
                        <Cell>
                            {rowData => (
                                <span>
                                    <CloseIcon className='cursor-pointer text-xl bg-red-900 text-gray-50 rounded-sm hover:text-white hover:text-2xl'
                                        onClick={() => alert(`id:${rowData.id}`)}></CloseIcon>
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
                        total={data.length}
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

export const getServerSideProps = async (context) => {

    const res = await fetch('https://dummyjson.com/products')
    const db = await res.json()

    return {
        props: {
            db
        }
    }
}
