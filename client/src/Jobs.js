import React from 'react';
import Typography from '@material-ui/core/Typography';

import Job from './Job';
import JobModal from './jobModal';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles = makeStyles({
    root: {
      maxWidth: 1490,
      flexGrow: 1,
    },
  });


export default function Jobs({jobs}) {
    const classes = useStyles();
    const theme = useTheme();
    

    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs/50);

    // for pagenation
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    const handleNext = () => {
        setActiveStep(prevActiveStep => (prevActiveStep + 1));
      };
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // for modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



    return(
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose}/>

            <Typography variant="h3" >
                My Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} Jobs
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        handleClickOpen()
                        selectJob(job)
                    }} 
                        />
                )
            }
            <Typography >
                Page {activeStep+1} of {numPages}
            </Typography>
            
            <MobileStepper
            variant="dots"
            steps={numPages}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep + 1 === numPages}>
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
        </div>
    )
}