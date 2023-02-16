import * as React from 'react';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function tag(props){
  
    let tag = props.tag || {name:'tag not found'}

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event, tag) => {
        if(anchorEl === null){
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined; 


    return(
        <Button key={tag.id} variant='contained' size = 'small' sx={{backgroundColor: 'primary.main', color: '#fff', m: .5, textTransform: 'none', borderRadius: 4, paddingY: '2px'}} onClick={(event) => handleClick(event, tag)}>
        {tag.name}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    {tag.description}
                    <Button onClick= {() => props.removeTag(tag)}>
                        Remove
                    </Button>
                </Typography>
            </Popover>
        </Button>
    )
}