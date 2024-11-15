import React, { useContext, useState } from 'react';
import { Stepper } from 'react-form-stepper';
import "../../styles/Stepper.css";
import Button from 'react-bootstrap/Button';
import { EmailAndGst } from './RegisterStepper';
import { PasswordCreation } from './RegisterStepper';
import { OnboardingDashboard } from './RegisterStepper';
import * as formik from 'formik';
import * as yup from 'yup';
import { useFormikContext } from "formik";
import Form from 'react-bootstrap/Form';


const CustomStepper = () => {
    

    const { Formik } = formik;

    const [activeStep, setActiveStep] = useState(0);

    const handlePrevious = () => { setActiveStep(Math.max(activeStep - 1, 0)) }

    const handleNext = async (validateForm, isValid, dirty) => {
        const errors = await validateForm();
        if(Object.keys(errors).length === 0 && isValid && dirty){
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
            mobileNumber: yup.string().required("Mobile Number is required").matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
            emailID: yup.string().required("Email is required").email("Invalid Email Format"),
            GSTINNumber: yup.string().required("GSTIN is required to sell products on this application"),
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
        { label: "Email ID A& GST"},
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
                        {({ validateForm, setTouched, values, handleChange, handleBlur, touched, errors, setFieldTouched, validateField, isValid, dirty  }) => (
                            <Form noValidate>
                                {React.cloneElement(stepForms[activeStep], {
                                    validateForm,
                                    setTouched,
                                    values, handleChange, handleBlur, touched, errors, setFieldTouched, validateField, isValid, dirty
                                })}
                                <div className='stepper-navigation-container'>
                                    <div className='stepper-navigation'>
                                        <Button variant='secondary' disabled={activeStep === 0} onClick={() => handlePrevious()}>Back</Button>
                                        <Button variant={activeStep === steps.length ? 'info text-white' : 'primary'} disabled={!isValid || !dirty } onClick={() => handleNext(validateForm, isValid, dirty)}>  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}</Button>
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
