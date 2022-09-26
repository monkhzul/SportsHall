import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "rsuite/dist/rsuite.css";

export default function NavbarUser() {
    return (
        <Navbar bg="dark" variant="dark" className='w-full'>
            <Container>
                <Navbar.Brand href="#home">
                    React Bootstrap
                </Navbar.Brand>
                <Navbar.Collapse className='justify-end w-full'>
                    <NavDropdown title={`UserName`} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
