import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { auth } from "../utils/firebase.config"
import toast, { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {

    const { Formik } = formik;

    const createUserInFirebase = async (values) => {
        const { emailID, createPassword } = values;
        try {
            await createUserWithEmailAndPassword(auth, emailID, createPassword);
            toast.success("Successfully Signed up")
            console.log(auth.currentUser);
        } catch (error) {
            console.log(error);
        }
    }

    const schema = yup.object().shape({
        emailID: yup.string().required("Email is required").email("Invalid Email Format"),
        createPassword: yup.string().required("Please Create Password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "Min 8, Max 10, One Uppercase, One lowercase, One Number, One Special Character", "Min 8, Max 10, One Uppercase, One lowercase, One Number, One Special Character"),
    });

    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className='m-3 w-50 w-md-50'>
                <div className="heading">
                    <h4>Signup & enjoy your shopping</h4>
                    <mark>Enter your Email and Create Password to continue</mark>
                </div>
                <div>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            emailID: '',
                            createPassword: '',
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors, dirty, isValid, setFieldTouched, validateField }) => (
                            <Form noValidate onSubmit={handleSubmit} className='mt-4'>
                                <div className=''>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="8" controlId="validationFormik01">
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
                                                    placeholder='Enter Email ID'
                                                    isInvalid={!!errors.emailID}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.emailID}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3 ">
                                        <Form.Group as={Col} md="8" controlId="validationFormik02">
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
                                                    isInvalid={!!errors.createPassword}
                                                    isValid={touched.createPassword && !errors.createPassword}
                                                    placeholder='Create Password'
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.createPassword}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                    <div className='d-flex'>
                                        <Button disabled={
                                            !isValid ||
                                            !dirty ||
                                            !touched ||
                                            !values.emailID ||
                                            !values.createPassword} onClick={() => createUserInFirebase(values)} type="submit">Sign up</Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Signup;