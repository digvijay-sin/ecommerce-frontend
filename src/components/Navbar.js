import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLogo from "../assets/logos/react-logo.png"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch, FaBell, FaHeadphones, FaBook } from 'react-icons/fa';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';


const NavbarComp = () => {
    return (
        <Fragment>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand >
                        <Link to="/">
                            <img
                                src={AppLogo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Form className="d-flex ms-auto w-25 me-3">
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1" className='input-icon-container'>
                                <FaSearch className='search-icon' />
                                <Form.Control
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                    className='search-input'
                                />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto w-100 d-flex justify-content-around">
                            <Link to="/Login" className='w-50'>
                                <Button variant="outline-info w-50">Login</Button>
                            </Link>
                            <Link className="text-decoration-none align-self-center text-secondary" to='/Register'>Become a Seller</Link>
                            <NavDropdown title="More" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" className="nav-dropdown-item">
                                    <FaHeadphones className="icon" /> 24X7 Customer service
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" className="nav-dropdown-item">
                                    <FaBell className="icon" /> Manage Notification
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" className="nav-dropdown-item">
                                    <FaBook className="icon" /> About
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
}

export default NavbarComp;