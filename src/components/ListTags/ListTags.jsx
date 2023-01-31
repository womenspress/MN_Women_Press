import * as React from 'react';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ListTags(props){
    let defaultTags = [
        {id: 0, name: 'tag0', description: 'first tag'},
        {id: 1, name: 'tag1', description: 'second tag'},
        {id: 2, name: 'tag2', description: 'third tag'},
        {id: 3, name: 'tag3', description: 'fourth tag'},
        {id: 4, name: 'tag4', description: 'fifth tag'},
        {id: 5, name: 'tag5', description: 'sixth tag'},
    ]

    // props
    let tagsArray = props.tags || defaultTags;
    let numToDisplay = props.numOfDisplay || 3;

    const [anchorEl, setAnchorEl] = useState();

    const handleClick = (event, tag) => {
        console.log('tag clicked, display description', tag.description);
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;  

    return(
        <div>
            {
                tagsArray.slice(0,numToDisplay).map((tag, index) => {
                    return(
                            <Button key={tag.id} onClick={(event) => handleClick(event, tag)}>
                                {tag.name}
                                <Popover
                                    id={id}
                                    open={open}
                                    onClose={handleClose}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>
                                        {tag.description}
                                    </Typography>
                                </Popover>
                            </Button>
                    )
                })
            }
        </div>
    )
}