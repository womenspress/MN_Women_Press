import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Box, Collapse, Button, Typography, Paper, Modal, IconButton, Tooltip } from '@mui/material';

import StatusDropdown from '../../assets/StatusDropdown/StatusDropdown';
import CreateStory from '../CreateStory/CreateStory';
import ColorStatusHover from '../../assets/ColorStatusHover/ColorStatusHover';

import { largeModal, smallModal } from '../../__style';
import { makeStatusColor } from '../../modules/makeStatusColor';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/* 
elements to display in the 


*/

export default function ThemeStoryListItem({story}) {
    const history = useHistory();

    const [collapseOpen, setCollapseOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // function to determine color of the status circle
    /* 
    */

    // const statusColor = makeStatusColor(story)

    // const statusStyle = {
    //     bgcolor: statusColor.color,
    //     width: 16,
    //     height: 16,
    //     borderRadius: '50%'
    // }

    const getTransform = (position) => {
        // mousePos: [x,y]
        // bottom right corner
        if (position.x > 1200 && position.y > 900) return 'translate(-5%,-5%)';
        // bottom
        if (position.x > 1200) return 'translate(-95%,-105%)';
        // right
        if (position.y > 750) return 'translate(-5%,-105%)';
        // else
        return 'translate(-5%,5%)'
    }

    // const author = story.contacts?.filter(contact => contact.role === 'author');

    const handleDeleteOpen = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY })
        setDeleteOpen(true);
    }

    const handleEditOpen = () => {
        setEditOpen(true);
    }

    return (
        <Paper sx={{ paddingX: 1, marginY: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <Tooltip title = {statusColor.notes}>
                <Box sx={statusStyle}></Box>
                </Tooltip> */}
                <IconButton
                    size='small'
                    onClick={() => setCollapseOpen(!collapseOpen)}>
                    {collapseOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Typography>{story?.title}</Typography>
            </Box>
            {/* <Typography>{author[0]? author[0].name : 'Author Not Found'}</Typography> */}
            {/* <StatusDropdown story={story} /> */}
        </Box>
        {/* --------------- collapse ---------------- */}
        <Collapse in={collapseOpen}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
                <Typography>
                    {story?.subtitle}
                </Typography>
                <Typography>
                    {story?.notes}
                </Typography>
            </Box>
            <a href={story?.article_link}><Typography>{story?.article_link}</Typography></a>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                onClick={() => history.push(`/storydetails/${story.id}`)}
                size='small'
                color='inherit'
                endIcon={<ArrowForwardIcon />}>
                to story page
                </Button>
            </Box>
            </Box>
        </Collapse>
        </Paper>
    )
}