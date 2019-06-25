import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Stepper({numPages, activeStep, handleNext, handleBack}) {
 const theme = useTheme();
 return(
     <MobileStepper
      variant="dots"
      steps={numPages}
      position="static"
      activeStep={activeStep}
      //add scrollTop when changing pages
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
 )}