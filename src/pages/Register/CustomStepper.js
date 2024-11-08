import React, { useState } from 'react';
import { Stepper } from 'react-form-stepper';
import "../../styles/Stepper.css";
import Button from 'react-bootstrap/Button';
import { EmailAndGst } from './RegisterStepper';

const CustomStepper = () => {

    const [activeStep, setActiveStep] = useState(0);

    const handlePrevious = () => { setActiveStep(Math.max(activeStep - 1, 0)) }

    const handleNext = () => { setActiveStep(Math.min(activeStep + 1, steps.length)) }

    const steps = [
        1, 2, 3
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
            <div>
                <EmailAndGst/>
            </div>     
            <div className='stepper-navigation-container'>              
                <div className='stepper-navigation'>
                    <Button variant='secondary' disabled = {activeStep === 0} onClick={() => handlePrevious()}>Back</Button>
                    <Button variant={activeStep === steps.length ? 'info text-white' : 'primary'} onClick={() => handleNext()}>  {activeStep === steps.length ? 'Submit' : 'Next'}</Button>
                </div>
            </div>
        </div>
    );
};

export default CustomStepper; 
