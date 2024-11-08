import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import '../styles/Login.css';



const Login = () => {

    const [validated, setValidated] = useState(false);
    const [useEmail, setUseEmail] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleToggle = () => {
        setUseEmail(!useEmail);
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center min-vh-100"'>
                <div className='m-3 w-50 w-md-50'>
                    <div className="heading">
                        <h3>Log in for the best experience</h3>
                        <h5>{useEmail ? "Enter your Email-ID to continue" : "Enter your Phone Number to continue"}</h5>
                    </div>
                    <div >
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <div>
                                <InputGroup hasValidation>
                                    {useEmail ? null : <InputGroup.Text>+91</InputGroup.Text>}
                                    <Form.Control
                                        className="custom-input"
                                        type={useEmail ? "email" : "text"}
                                        required
                                        isInvalid={validated && !inputValue}
                                        placeholder={useEmail ? "Email-ID" : "Phone Number"}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {useEmail ? 'Please enter a valid email' : 'Please enter a valid phone number'}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </div>
                        </Form>
                    </div>
                    <div>
                        <Link onClick={handleToggle} className='text-decoration-none d-flex justify-content-end'>
                            {useEmail ? "Use Phone number" : "Use Email-ID"}
                        </Link>
                    </div>
                    <Button variant="primary"  className="mt-3 w-100 text-white mb-5">Request OTP</Button>

                    <p>By continuing, you agree to Flipkart's <mark>Terms of Use</mark> and <mark>Privacy Policy</mark></p>
                </div>
            </div>
        </>
    )
}

export default Login;