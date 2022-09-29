import React, { useEffect, useState } from 'react'
import NavbarUser from '../NavbarUser'
import AdminSidenav from './AdminSidenav'
import { Table, Pagination } from 'rsuite';

export default function List(props) {

    // console.log(props.db.products);

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
                                    <Column width={80} align="center" fixed>
                                        <HeaderCell>Id</HeaderCell>
                                        <Cell dataKey="id" />
                                    </Column>
                                    <Column width={250} fixed>
                                        <HeaderCell>Захиалагч</HeaderCell>
                                        <Cell dataKey="title" />
                                    </Column>
                                    <Column width={150} className='text-center'>
                                        <HeaderCell>Заал авсан өдөр</HeaderCell>
                                        <Cell dataKey="price" />
                                    </Column>
                                    <Column width={200} className='text-center'>
                                        <HeaderCell>Заал авсан цаг</HeaderCell>
                                        <Cell dataKey="stock" />
                                    </Column>
                                    <Column width={150} flexGrow={1} className='text-center'>
                                        <HeaderCell>Заалны төрөл</HeaderCell>
                                        <Cell dataKey="category" />
                                    </Column>
                                    <Column width={150} flexGrow={1} className='text-center'>
                                        <HeaderCell>Заалны хэмжээ</HeaderCell>
                                        <Cell dataKey="rating" />
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
// import Layout from './Layout/Layout';

// export default function List(props) {

//     // console.log(props.db.products);

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
//         <Layout>
//                             <div className='border'>
//                                 <Table height={750} data={datas}>
//                                     <Column width={80} align="center" fixed>
//                                         <HeaderCell>Id</HeaderCell>
//                                         <Cell dataKey="id" />
//                                     </Column>
//                                     <Column width={250} fixed>
//                                         <HeaderCell>Захиалагч</HeaderCell>
//                                         <Cell dataKey="title" />
//                                     </Column>
//                                     <Column width={150} className='text-center'>
//                                         <HeaderCell>Заал авсан өдөр</HeaderCell>
//                                         <Cell dataKey="price" />
//                                     </Column>
//                                     <Column width={200} className='text-center'>
//                                         <HeaderCell>Заал авсан цаг</HeaderCell>
//                                         <Cell dataKey="stock" />
//                                     </Column>
//                                     <Column width={150} flexGrow={1} className='text-center'>
//                                         <HeaderCell>Заалны төрөл</HeaderCell>
//                                         <Cell dataKey="category" />
//                                     </Column>
//                                     <Column width={150} flexGrow={1} className='text-center'>
//                                         <HeaderCell>Заалны хэмжээ</HeaderCell>
//                                         <Cell dataKey="rating" />
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



