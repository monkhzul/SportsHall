import React, { useState } from 'react'
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import HistoryIcon from '@rsuite/icons/History';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import styles from '../../../styles/Home.module.css';
import CalendarIcon from '@rsuite/icons/Calendar';
import Link from 'next/link';

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
        else if (window.location.pathname === '/components/User/Schedule') {
            setActiveKey('4')
        }
    },[])

    const NavLink = React.forwardRef((props, ref) => {
        const { href, as, ...rest } = props;
        return (
          <Link href={href} as={as}>
            <a ref={ref} {...rest} />
          </Link>
        );
    });

    return (
        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} className={`h-screen`}>
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
                    <Nav.Item eventKey="4" icon={<GroupIcon />} as={NavLink} href='/components/User/Schedule'>
                        Test
                    </Nav.Item>

                    {/* <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
                        <Nav.Item eventKey="3-1" href='/components/Admin/AddUser'>Хэрэглэгч нэмэх</Nav.Item>
                        <Nav.Item eventKey="3-2">Devices</Nav.Item>
                        <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                        <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
                    </Nav.Menu> */}
                    {/* <Nav.Menu
                        placement="rightStart"
                        eventKey="4"
                        title="Settings"
                        icon={<GearCircleIcon />}
                    >
                        <Nav.Item eventKey="4-1">Applications</Nav.Item>
                        <Nav.Item eventKey="4-2">Channels</Nav.Item>
                        <Nav.Item eventKey="4-3">Versions</Nav.Item>
                        <Nav.Menu eventKey="4-5" title="Custom Action">
                            <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                            <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                        </Nav.Menu>
                    </Nav.Menu> */}
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    )
}
