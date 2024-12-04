import React, { useContext, useState } from 'react';
import { Stepper } from 'react-form-stepper';
import "../../styles/Stepper.css";
import Button from 'react-bootstrap/Button';
import  EmailAndGst  from './EmailAndGst';
import  PasswordCreation  from './PasswordCreation';
import  OnboardingDashboard from './OnboardingDashboard';
import * as formik from 'formik';
import * as yup from 'yup';
import { useFormikContext } from "formik";
import Form from 'react-bootstrap/Form';
import { auth } from '../../utils/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { TbRollercoaster } from 'react-icons/tb';


const CustomStepper = () => {    

    const { Formik } = formik;

    const [activeStep, setActiveStep] = useState(0);    

    const handlePrevious = () => { setActiveStep(Math.max(activeStep - 1, 0)) }

    const handleNext = async (validateForm, isValid, dirty, values) => {
        const errors = await validateForm();
        if(Object.keys(errors).length === 0 && isValid && dirty){
            if(activeStep === 1){
                const {emailID, createPassword} = values;
                try {
                    await createUserWithEmailAndPassword(auth, emailID, createPassword);
                    toast.success("Successfully Registered")
                    console.log("uid through auth", auth.currentUser.uid);
                    
                } catch (error) {
                    console.log(error);
                    if(error.code === "auth/email-already-in-use"){
                        toast.error("Email already registered, please enter a different email")
                    }else{
                        toast.error("Error registering the user, check formatting issues.")
                    }                    
                }
            }
            setActiveStep(activeStep + 1);  
        }
    }

    const stepForms = [
        <EmailAndGst />,
        <PasswordCreation />,
        <OnboardingDashboard />,
    ];

    const validationSchemas = [
        yup.object({
            mobileNumber: yup.string().required("Mobile Number is required")
                .transform((value) => value.replace(/^(\+[0-9]{1,3})\s?/, '')) 
                .matches(/^[0-9]{8,15}$/, 'Invalid Mobile Number'),                
            emailID: yup.string().required("Email is required").email("Invalid Email Format"),
            GSTIN: yup.string().required("GSTIN is required to sell products on this application"),
            terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
        }),
        yup.object({
            createPassword: yup.string().required("This field is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "Min 8, Max 10, One Uppercase, One lowercase, One Number, One Special Character"),
            fullName : yup.string().required("full name is required"),
            displayName : yup.string().required("display name is required")
        }),
        yup.object({})
    ]

    

    const steps = [
        { label: "Email ID & GST"},
        { label: "Password Creation" },
        { label: "Onboarding Dashboard"}
    ];

    const connectorStyleConfig = {
        disabledColor: '#bdbdbd',
        activeColor: '#639aeb',
        completedColor: '#0dcaf0',
        size: 4,
        style: 'solid',
    }

    const styleConfig = {

        activeBgColor: '#0a58ca',
        activeTextColor: '#fff',
        completedBgColor: '#0dcaf0',
        completedTextColor: '#fff',
        inactiveBgColor: '#D3D3D3',
        inactiveTextColor: '#888',
        size: '2em',
        circleFontSize: '1rem',
        labelFontSize: '0.875rem',

    };

    // const {  handleSubmit } = useFormikContext();

    return (
        <div className='stepper-container'>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div >
                <Stepper
                    steps={steps}
                    activeStep={activeStep}
                    styleConfig={styleConfig}
                    connectorStateColors={true}
                    connectorStyleConfig={connectorStyleConfig}
                />
            </div>

            <div className="stepper-form-container">
                <div className='stepper-form'>
                    <Formik
                        validationSchema={validationSchemas[activeStep] }
                        initialValues={{
                            mobileNumber: '',
                            emailID: '',
                            GSTINNumber: '',
                            terms: false,
                            createPassword: '',
                            fullName: '',
                            displayName: ''
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={(values) => console.log(values)}
                        validateOnMount={false}    
                        // validationSchema = {undefined}                    
                    >
                        {({ validateForm, setTouched, values, handleChange, handleBlur, touched, errors, setFieldTouched, validateField, isValid, dirty, setFieldValue  }) => (
                            <Form noValidate >
                                {React.cloneElement(stepForms[activeStep], {
                                    validateForm,
                                    setTouched,
                                    values, handleChange, handleBlur, touched, errors, setFieldTouched, validateField, isValid, dirty, setFieldValue
                                })}
                                <div className='stepper-navigation-container'>
                                    <div className='stepper-navigation'>
                                        <Button variant='secondary' hidden={activeStep === 0} disabled={!isValid || !dirty } onClick={() => handlePrevious()}>Back</Button>
                                        <Button variant={activeStep === steps.length ? 'info text-white' : 'primary'} disabled={!isValid || !dirty } onClick={() => handleNext(validateForm, isValid, dirty, values)}>  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}</Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default CustomStepper; 
