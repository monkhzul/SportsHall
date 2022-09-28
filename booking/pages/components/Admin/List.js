import React, {useState} from 'react'
import NavbarUser from '../NavbarUser'
import AdminSidenav from '../Admin/AdminSidenav'
import { Table, Pagination } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const defaultData = mockUsers(100);

export default function List() {

   /* https://rsuitejs.com/components/table/ */

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });


    return (
        <div className='w-full'>
            <div className='nav w-full'>
                <NavbarUser />
            </div>
            <div className='flex flex-col sm:flex-row'>
                <AdminSidenav />
                <div className='w-full border'>
                    <div className='body p-3'>
                        <div className='border'>
                            <div>
                                <Table height={420} data={data}>
                                    <Column width={50} align="center" fixed>
                                        <HeaderCell>Id</HeaderCell>
                                        <Cell dataKey="id" />
                                    </Column>

                                    <Column width={100} fixed>
                                        <HeaderCell>First Name</HeaderCell>
                                        <Cell dataKey="firstName" />
                                    </Column>

                                    <Column width={100}>
                                        <HeaderCell>Last Name</HeaderCell>
                                        <Cell dataKey="lastName" />
                                    </Column>

                                    <Column width={200}>
                                        <HeaderCell>City</HeaderCell>
                                        <Cell dataKey="city" />
                                    </Column>
                                    <Column width={200} flexGrow={1}>
                                        <HeaderCell>Email</HeaderCell>
                                        <Cell dataKey="email" />
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
                                        size="xs"
                                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                                        total={defaultData.length}
                                        limitOptions={[10, 30, 50]}
                                        limit={limit}
                                        activePage={page}
                                        onChangePage={setPage}
                                        onChangeLimit={handleChangeLimit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
