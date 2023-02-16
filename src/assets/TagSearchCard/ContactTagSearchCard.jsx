import React from 'react';
import { Typography, Paper} from '@mui/material'

export default function TagSearchCard({tag, addTag}) {
    const clickHandleAddTag = (tag) => {
        addTag(tag);
    }


    return (
        <Paper sx={{ padding: 1, margin: .2, display: 'flex', width: 'fit-content' }}>
            <Typography sx={{width: 'fit-content'}} align="center" onClick={() => clickHandleAddTag(tag)}>
                {tag.name}
            </Typography>
        </Paper>
    )
}