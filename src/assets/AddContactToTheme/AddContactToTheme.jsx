import * as React from 'react';


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

export default function AddContactToTheme({theme}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
            {`Do you want to add a contact to ${theme.name}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Search using contact name or bio
                </DialogContentText>
            </DialogContent>
            <Box>
                <Box sx={{ display: 'flex' }}>
                </Box>
            </Box>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus>
                    Add Contact
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}