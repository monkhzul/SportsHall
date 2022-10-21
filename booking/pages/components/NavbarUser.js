import React, { useEffect } from 'react';
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';

export default function NavbarUser() {
    const storage = globalThis?.sessionStorage;
    const user = JSON.parse(storage.getItem('user'));

    return (
        <Navbar bg="dark" variant="dark" className='w-full'>
            <Container fluid>
                <Navbar.Brand href="#home" className='mx-16'>
                    <Image 
                        src='/images/logoCola.png'
                        width={250}
                        height={30}
                        className="rounded-l-full"
                    />
                </Navbar.Brand>
                <Navbar.Collapse className='flex justify-end mx-16 text-xl'>
                    <NavDropdown title={`${user.firstname}`} id="collasible-nav-dropdown">
                        {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider /> */}
                        <NavDropdown.Item href="/">
                            Log Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
