import * as React from 'react';
import { useDispatch } from 'react-redux';

// mui components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Autocomplete, TextField } from '@mui/material';

export default function AddStoryToTheme({ theme, options }) {
  const [open, setOpen] = React.useState(false);
  const [storyChoice, setStoryChoice] = React.useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const addStoryToTheme = () => {
    dispatch({ type: 'THEME_STORY_ADD', payload: { story_id: storyChoice.id, theme_id: theme.id } });
    dispatch({ type: 'GET_ALL_THEMES' });
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({ type: 'GET_ALL_STORIES' });
    dispatch({ type: 'GET_ALL_TAGS' });
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
          {`Add a story to ${theme.name}`}
        </DialogTitle>
        <Autocomplete
          onChange={(newValue) => { setStoryChoice(newValue) }}
          value={storyChoice}
          options={options}
          sx={{ width: 600 }}
          renderInput={(params) => <TextField {...params} label="Stories" />}
        />
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