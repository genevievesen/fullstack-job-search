import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


export default function Job({job, onClick}) {
    return(
        <Paper onClick={onClick} className='job'>
            <div>
                <Typography variant='h5'> {job.title}</Typography>
                <Typography variant='h6'>{job.company}</Typography>
                <Typography>{job.location}</Typography>
            </div>
            <div>
                <Typography>{job.created_at.split(' ').slice(0,3).join(" ")}</Typography>
            </div>
        </Paper>
    )
}