import React, { useState, useEffect } from 'react'
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import HistoryIcon from '@rsuite/icons/History';
import CalendarIcon from '@rsuite/icons/Calendar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SideNav() {
    const [activeKey, setActiveKey] = useState('1');
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (window.location.pathname === '/components/User/Booking') {
            setActiveKey('2')
        }
        else if (window.location.pathname === '/components/User/History') {
            setActiveKey('3')
        }
        else if (window.location.pathname === '/components/User/Request') {
            setActiveKey('4')
        }
    }, [])

    const NavLink = React.forwardRef((props, ref) => {
        const { href, as, ...rest } = props;
        return (
            <Link href={href} as={as}>
                <a ref={ref} {...rest} />
            </Link>
        );
    });


    return (
        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} className={``}>
            <Sidenav.Header>
                <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
            </Sidenav.Header>
            <Sidenav.Body className=''>
                <Nav activeKey={activeKey} onSelect={setActiveKey}>

                    <Nav.Item eventKey="1" icon={<DashboardIcon />} as={NavLink} href='/components/User/Calendar'>
                        7 хоног календар
                    </Nav.Item>
                    <Nav.Item eventKey="2" icon={<CalendarIcon />} as={NavLink} href='/components/User/Booking'>
                        Заалны цаг захиалах
                    </Nav.Item>
                    <Nav.Item eventKey="3" icon={<HistoryIcon />} as={NavLink} href='/components/User/History'>
                        Заал авсан түүх
                    </Nav.Item>
                    <Nav.Item eventKey="4" icon={<GroupIcon />} as={NavLink} href='/components/User/Request'>
                        Хүлээгдэж буй хүсэлт
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    )
}
