import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../../styles/Stepper.css";
import { OtpInput } from 'reactjs-otp-input';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'


const EmailAndGst = ({ setFieldValue, validateForm, setTouched, values, handleChange, handleBlur, touched, errors, setFieldTouched, validateField, isValid, dirty }) => {

    const [validated, setValidated] = useState(false);

    // recheck why we used it
    const [otp, setOtp] = useState('');

    const [showOtp, setShowOtp] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleOtp = (otp) => setOtp(otp);

    const sendOtp = () => {
        setShowOtp(true);
    }

    return (
        <>
            <div className="form-parent">
                <div className="form-container">
                    <div className="mb-3 d-flex row-gap-4 flex-column">
                        <div>
                            <div className='mobile-container'>
                                <Form.Group as={Col} md="8" controlId="validationFormik01" className="d-flex flex-fill">
                                    <PhoneInput
                                        country={'in'}
                                        name="mobileNumber"
                                        value={values.mobileNumber}
                                        onChange={(phone) => setFieldValue("mobileNumber", phone)}
                                        onBlur={() => {
                                            setFieldTouched("mobileNumber", true);
                                            validateField("mobileNumber")
                                        }
                                        }
                                        inputStyle={{
                                            width: 500,
                                            boxShadow: 'none',
                                            border: 'none',
                                            background: 'white',
                                            // '&:focus' : {
                                            //     boxShadow:'none',
                                            //     outline:'none'
                                            // }
                                        }}
                                        isValid={(phone) => touched.mobileNumber && !errors.mobileNumber && phone.length >= 8 && phone.length <= 15}
                                        placeholder='Enter Mobile Number'
                                        className="border-0"
                                        isInvalid={!!errors.mobileNumber}
                                    />
                                </Form.Group>
                                <div className='send-otp'>
                                    <a onClick={sendOtp} className={!dirty || !isValid ? "unclickable" : ""} >Send OTP</a>
                                </div>
                            </div>
                            <span className='text-danger'>{errors.mobileNumber}</span>
                        </div>
                        {showOtp && (
                            <div className='otp-container'>
                                <h6>Verify your phone number</h6>
                                <OtpInput
                                    value={otp}
                                    onChange={handleOtp}
                                    numInputs={6}
                                    inputStyle={{
                                        width: 40,
                                        height: 40,
                                        borderBottom: '1px solid #666',
                                        fontSize: 18,
                                        textAlign: 'center',
                                        marginRight: 10,
                                    }}
                                    focusStyle={{
                                        borderBottom: '2px solid #007bff',
                                    }}
                                    isInputNum={true}
                                />
                                <Button variant='outline-info' onClick={() => setLoading(true)}>
                                    {loading && <CgSpinner size={25} className="spinner me-2" />}
                                    <span>Verify OTP</span>
                                </Button>
                            </div>
                        )}


                        <div className="d-flex">
                            <Form.Group as={Col} md="8" controlId="validationFormik02" className="d-flex flex-fill">
                                <InputGroup hasValidation>

                                    <Form.Control
                                        type="text"
                                        name="emailID"
                                        value={values.emailID}
                                        onChange={handleChange}
                                        onBlur={() => {
                                            setFieldTouched("emailID", true);
                                            validateField("emailID")
                                        }
                                        }
                                        isValid={touched.emailID && !errors.emailID}
                                        placeholder="Enter Email ID"
                                        isInvalid={!!errors.emailID}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.emailID}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group as={Col} md="8" controlId="validationFormik03" className="d-flex flex-fill">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter GSTIN"
                                        aria-describedby="inputGroupPrepend"
                                        name="GSTIN"
                                        value={values.GSTIN}
                                        onBlur={() => {
                                            setFieldTouched("GSTIN", true);
                                            validateField("GSTIN")
                                        }
                                        }
                                        onChange={handleChange}
                                        feedback={errors.terms}
                                        isInvalid={!!errors.GSTIN}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.GSTIN}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            name="terms"
                            label="Agree to terms and conditions"
                            onChange={handleChange}
                            onBlur={() => {
                                setFieldTouched("terms", true);
                                validateField("terms")
                            }
                            }
                            checked={values.terms}
                            isInvalid={!!errors.terms}
                            feedback={errors.terms}
                            feedbackType="invalid"
                            id="validationFormik04"
                        />
                    </Form.Group>
                </div>
            </div>
        </>
    )
}

export default EmailAndGst;