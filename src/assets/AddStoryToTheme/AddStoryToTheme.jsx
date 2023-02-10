import * as React from 'react';
import { useDispatch } from 'react-redux';

// mui components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function AddStoryToTheme({theme, options}) {
    const [open, setOpen] = React.useState(false);
    const [storyChoice, setStoryChoice] = React.useState('');

    const dispatch = useDispatch();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStoryChange = (event) => {
        const story = event.target.value;
        setStoryChoice(story);
        console.log('story id: ',story);
    };

    const addStoryToTheme = () => {
        console.log(`Convert to DISPATCH. story_id:${storyChoice}, theme_id:${theme.id}`);
        dispatch({ type: 'THEME_STORY_ADD', payload: {story_id: storyChoice, theme_id: theme.id} })
        setOpen(false);
    };

    return (
        <div>
        <IconButton onClick={() => handleClickOpen()}>
            <ControlPointIcon />
        </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {`Do you want to add a story to ${theme.name}`}
            </DialogTitle>
            <DialogTitle id="alert-dialog-title">
            {`ID: ${theme.id}`}{`story to add:${storyChoice}`}
            </DialogTitle>
            {/* <DialogTitle id="alert-dialog-title">
            {JSON.stringify(options)}
            </DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Search using title, subtitle, author, ...
                </DialogContentText>
            </DialogContent>
            <FormControl fullWidth>
                <InputLabel placeholder="theme-story-select">Find a Story</InputLabel>
                <Select
                    id="theme-story-select"
                    value={storyChoice.id}
                    //label=""
                    onChange={handleStoryChange}
                >
                    {/* <MenuItem>Placeholder</MenuItem> */}
                    {options.map((option) => (
                        <MenuItem value={option.id}>
                            {option.label}
                        </MenuItem>

                    ))}
                    
                </Select>
            </FormControl>
            <Box>
                <Box sx={{ display: 'flex' }}>
                    {/* <Autocomplete
                    size='small'
                    sx={{ width: 200 }}
                    options={storyOptions}
                    renderInput={(params) => <TextField {...params} size='small' label='story' />}
                    value={contactToAdd}
                    /> */}
                </Box>
            </Box>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addStoryToTheme} autoFocus>
                    Add Story
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}