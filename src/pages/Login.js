import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import '../styles/Login.css';
import toast, { Toaster } from 'react-hot-toast';
import { OtpInput } from 'reactjs-otp-input';
import { CgSpinner } from 'react-icons/cg';
import { auth } from "../utils/firebase.config";
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { SignInLinkToEmail } from "firebase/auth";


const Login = () => {

    const [validated, setValidated] = useState(false);
    const [useEmail, setUseEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ph, setPh] = useState('');


    const [otp, setOtp] = useState('');
    const [user, setUser] = useState(null);

    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);

    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');

    const [emailEntered, setEmailEntered] = useState(false);


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        await signInWithEmailAndPassword(auth, emailID, password)
        window.location.href= "/sellerDashboard";
        console.log("signed In")
        setValidated(true);
    };


    const handleToggle = () => {
        setUseEmail(!useEmail);
    }

    // function onCaptchaVerify() {
    //     if (!window.RecaptchaVerifier) {
    //         window.RecaptchaVerifier = new RecaptchaVerifier(
    //             "recaptcha-container",
    //             {
    //                 size: "invisible",
    //                 callback: (response) => {
    //                     onSignup();
    //                 },
    //                 "expired-callback": () => {

    //                 },
    //             },
    //             auth
    //         )
    //     }
    // }

    // function onSignup() {

    //     setLoading(true);
    //     onCaptchaVerify();

    //     const appVerifier = window.RecaptchaVerifier;

    //     signInWithPhoneNumber(auth, ph, appVerifier)
    //         .then((confirmationResult) => {
    //             window.confirmationResult = confirmationResult;
    //             setLoading(false);
    //             setShowOtp(true);
    //             toast.success('OTP sended successfully!')
    //         }).catch((error) => {
    //             console.log(error)
    //             setLoading(false)
    //         });
    // }

    const sendOtp = async () => {

        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
            const formatPh = "+" + ph;
            console.log(formatPh)
            const confirmation = await signInWithPhoneNumber(auth, formatPh, recaptcha);
            setUser(confirmation);
            console.log(confirmation);
        } catch (err) {
            console.log(err);
        }

    }

    const verifyOtp = async () => {
        try {
            const data = await user.confirm(otp);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }



    // function onOTPVerify(){
    //     setLoading(true);
    //     window.confirmationResult.confirm(otp)
    //         .then(async(res) => {
    //             console.log(res);
    //             setUser(res.user);
    //             setLoading(false)
    //         })
    //         .className(err  => {
    //             console.log(err);
    //             setLoading(false);
    //         })
    // }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center min-vh-100"'>
                <Toaster toastOptions={{ duration: 4000 }} />

                <div className='m-3 w-50 w-md-50'>
                    <div className="heading">
                        <h3>Log in for the best experience</h3>
                        <h5>{useEmail ? "Enter your Email-ID to continue" : "Enter your Phone Number to continue"}</h5>
                    </div>
                    <div >
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <div>

                                {useEmail ?
                                    !emailEntered ? (
                                        <>
                                            <Form.Group controlId='emailID'>
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        className="custom-input"
                                                        type="email"
                                                        required
                                                        isInvalid={validated && !emailID}
                                                        // placeholder={useEmail ? "Email-ID" : "Phone Number"}
                                                        placeholder="Enter Email-ID"
                                                        value={emailID}
                                                        onChange={(e) => setEmailID(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please Enter Email.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </>) : (<>
                                            <Form.Group controlId='emailID'>
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        className="custom-input"
                                                        type="password"
                                                        required
                                                        isInvalid={validated && !password}
                                                        placeholder="Enter Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please Enter Password.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </>)
                                    : (<PhoneInput
                                        country={'in'}
                                        value={ph}
                                        // name="mobileNumber"
                                        onChange={setPh}
                                        required
                                        inputStyle={{
                                            width: 750,
                                            height: 45
                                        }}
                                        isInvalid={validated && !ph}
                                        placeholder='Enter Mobile Number'

                                    />)
                                }

                                {showOtp && (
                                    <div className='otp-container'>
                                        <h6>Enter Your OTP</h6>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            inputStyle={{
                                                width: 40,
                                                height: 40,
                                                fontSize: 18,
                                                textAlign: 'center',
                                                marginRight: 10,
                                            }}
                                            autoFocus
                                            isInputNum={true}
                                        />
                                        <Button variant='outline-info' onClick={verifyOtp}>
                                            {loading && <CgSpinner size={25} className="spinner me-2" />}
                                            <span>Verify OTP</span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Link onClick={handleToggle} className='text-decoration-none d-flex justify-content-end'>
                                    {useEmail ? "Use Phone number" : "Use Email-ID"}
                                </Link>
                            </div>
                            {useEmail ? emailEntered ? 
                                (<Button onClick={handleSubmit} className="w-100">Submit</Button>) :
                                (<Button onClick={() => setEmailEntered(true)} className="w-100">Next</Button>)
                                :
                                (<Button
                                    onClick={sendOtp}
                                    variant="primary"
                                    className="mt-3 w-100 text-white mb-5">
                                    {loading && <CgSpinner size={25} className="spinner me-2" />}
                                    <span>Request OTP</span>
                                </Button>
                                )
                            }
                        </Form>
                    </div>


                    <p>By continuing, you agree to Flipkart's <mark>Terms of Use</mark> and <mark>Privacy Policy</mark></p>
                </div >
            </div >
            <div id="recaptcha-container"></div>
        </>
    )
}

export default Login;