import React from 'react';
import {Box, Typography, Paper} from '@mui/material'

export default function TagSearchCard({tag, addTag}) {
    const clickHandleAddTag = (tag) => {
        addTag(tag);
    }


    return (
        <Paper sx={{ padding: 1, margin: .2, display: 'flex', width: 'fit-content' }}>
            <Typography onClick={() => clickHandleAddTag(tag)}>
                {tag.name}
            </Typography>
        </Paper>
    )
}