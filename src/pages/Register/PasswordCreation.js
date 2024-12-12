import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../../styles/Stepper.css";

const PasswordCreation = ({ setFieldValue, validateForm, setTouched, values, handleChange, handleBlur, touched, errors, setFieldTouched, validateField, isValid, dirty }) => {    
    
    const [validated, setValidated] = useState(false);

    const [showOtp, setShowOtp] = useState(false)

    const [loading, setLoading] = useState(false)
    
    return (
        <>
            <div className="form-parent">
                <div className="form-container">
                    <div className="mb-3 d-flex row-gap-4 flex-column">  
                        <div className="d-flex">
                            <Form.Group as={Col} md="8" controlId="validationFormik01" className="d-flex flex-fill">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        name="createPassword"
                                        value={values.createPassword}
                                        onChange={handleChange}
                                        onBlur={() => {
                                                setFieldTouched("createPassword", true);
                                                validateField("createPassword")
                                            }
                                        }
                                        isValid={touched.createPassword && !errors.createPassword}
                                        placeholder="Enter Password"
                                        isInvalid={!!errors.createPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.createPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group as={Col} md="8" controlId="validationFormik02" className="d-flex flex-fill">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Full Name"
                                        aria-describedby="inputGroupPrepend"
                                        name="fullName"
                                        value={values.fullName}
                                        onBlur={() => {
                                            setFieldTouched("fullName", true);
                                            validateField("fullName")
                                        }
                                        }
                                        onChange={handleChange}
                                        feedback={errors.fullName}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <div className='d-flex'>
                            <Form.Group as={Col} md="8" controlId="validationFormik02" className="d-flex flex-fill">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Display Name"
                                        aria-describedby="inputGroupPrepend"
                                        name="displayName"
                                        value={values.displayName}
                                        onBlur={() => {
                                                setFieldTouched("displayName", true);
                                                validateField("displayName")
                                            }
                                        }
                                        onChange={handleChange}
                                        feedback={errors.displayName}
                                        isInvalid={!!errors.displayName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.displayName}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </div>
                  
                </div>
            </div>
        </>
    )
}

export default PasswordCreation ;