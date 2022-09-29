import React, { useEffect, useState } from 'react'
import NavbarUser from '../NavbarUser'
import AdminSidenav from './AdminSidenav'
import { Table, Pagination } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

export default function List(props) {

    console.log(props);

    const { Column, HeaderCell, Cell } = Table;

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

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
        <div className='w-full'>
            <div className='nav w-full'>
                <NavbarUser />
            </div>
            <div className='flex flex-col sm:flex-row'>
                <AdminSidenav />
                <div className='w-full border'>
                    <div className='body p-3'>
                        <div className='border'>
                            <div className='border'>
                                <Table height={750} data={datas}>
                                    <Column width={50} align="center" fixed>
                                        <HeaderCell>Id</HeaderCell>
                                        <Cell dataKey="id" />
                                    </Column>
                                    <Column width={150} fixed>
                                        <HeaderCell>Захиалагч</HeaderCell>
                                        <Cell dataKey="firstName" />
                                    </Column>
                                    <Column width={150}>
                                        <HeaderCell>Заал авах өдөр</HeaderCell>
                                        <Cell dataKey="lastName" />
                                    </Column>
                                    <Column width={180}>
                                        <HeaderCell>Заал авах цаг</HeaderCell>
                                        <Cell dataKey="city" />
                                    </Column>
                                    <Column width={150} flexGrow={1}>
                                        <HeaderCell>Заалны төрөл</HeaderCell>
                                        <Cell dataKey="email" />
                                    </Column>
                                    <Column width={150} flexGrow={1}>
                                        <HeaderCell>Заалны хэмжээ</HeaderCell>
                                        <Cell dataKey="email" />
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
                                    <Column width={80} fixed="right" className="text-center">
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
                                        size="xs"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// import React, { useEffect, useState } from 'react'
// import NavbarUser from '../NavbarUser'
// import AdminSidenav from './AdminSidenav'
// import { Table, Pagination } from 'rsuite';
// import CheckIcon from '@rsuite/icons/Check';
// import CloseIcon from '@rsuite/icons/Close';
// import Layout from './Layout/Layout';

// export default function List(props) {

//     console.log(props);

//     const { Column, HeaderCell, Cell } = Table;

//     const [limit, setLimit] = useState(15);
//     const [page, setPage] = useState(1);
//     const [data, setData] = useState([]);

//     const handleChangeLimit = dataKey => {
//         setPage(1);
//         setLimit(dataKey);
//     };

//         const datas = data.filter((v, i) => {
//             const start = limit * (page - 1);
//             const end = start + limit;
//             return (i >= start && i < end);
//         });
//     return (
// <Layout>
//                             <div className='border'>
//                                 <Table height={750} data={datas}>
//                                     <Column width={50} align="center" fixed>
//                                         <HeaderCell>Id</HeaderCell>
//                                         <Cell dataKey="id" />
//                                     </Column>
//                                     <Column width={150} fixed>
//                                         <HeaderCell>Захиалагч</HeaderCell>
//                                         <Cell dataKey="firstName" />
//                                     </Column>
//                                     <Column width={150}>
//                                         <HeaderCell>Заал авах өдөр</HeaderCell>
//                                         <Cell dataKey="lastName" />
//                                     </Column>
//                                     <Column width={180}>
//                                         <HeaderCell>Заал авах цаг</HeaderCell>
//                                         <Cell dataKey="city" />
//                                     </Column>
//                                     <Column width={150} flexGrow={1}>
//                                         <HeaderCell>Заалны төрөл</HeaderCell>
//                                         <Cell dataKey="email" />
//                                     </Column>
//                                     <Column width={150} flexGrow={1}>
//                                         <HeaderCell>Заалны хэмжээ</HeaderCell>
//                                         <Cell dataKey="email" />
//                                     </Column>
//                                     <Column width={100} fixed="right" className="text-center">
//                                         <HeaderCell>Зөвшөөрөх</HeaderCell>
//                                         <Cell>
//                                             {rowData => (
//                                                 <span>
//                                                     <CheckIcon className='cursor-pointer bg-green-800 text-gray-50 rounded-sm text-xl hover:text-white hover:text-2xl'
//                                                         onClick={() => alert(`id:${rowData.id}`)}></CheckIcon>
//                                                 </span>
//                                             )}
//                                         </Cell>
//                                     </Column>
//                                     <Column width={80} fixed="right" className="text-center">
//                                         <HeaderCell>Цуцлах</HeaderCell>
//                                         <Cell>
//                                             {rowData => (
//                                                 <span>
//                                                     <CloseIcon className='cursor-pointer text-xl bg-red-900 text-gray-50 rounded-sm hover:text-white hover:text-2xl'
//                                                         onClick={() => alert(`id:${rowData.id}`)}></CloseIcon>
//                                                 </span>
//                                             )}
//                                         </Cell>
//                                     </Column>
//                                 </Table>
//                                 <div style={{ padding: 20 }}>
//                                     <Pagination
//                                         prev
//                                         next
//                                         first
//                                         last
//                                         ellipsis
//                                         boundaryLinks
//                                         maxButtons={5}
//                                         size="xs"
//                                         layout={['total', '-', 'pager', 'skip']}
//                                         total={data.length}
//                                         limitOptions={[10, 30, 50]}
//                                         limit={limit}
//                                         activePage={page}
//                                         onChangePage={setPage}
//                                         onChangeLimit={handleChangeLimit}
//                                     />
//                                 </div>
//                             </div>
//                             </Layout>
//     )
// }
