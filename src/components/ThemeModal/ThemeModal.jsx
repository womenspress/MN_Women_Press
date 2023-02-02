import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ThemeModal(props) {
    const dispatch = useDispatch();

    let theme = props.theme;
    let id = props.id ||  -1;
    let name = props.name || "undefined";
    let description = props.description || "undefined description";
    let month = props.month || "month undefined";
    let year =props.year || -1;
    let stories = props.stories || [{id: -1, title: "title not found"}];
    let contacts = props.contacts || [{id: -1, name: "contact not found"}];

    // modal open function
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // secondary theme stow edited values
    const [editName, setEditName] = React.useState(name);
    const [editDescription, setEditDescription] = React.useState(description);
    const [editTheme, setEditTheme] = React.useState({id: id, name: editName, description: editDescription});
    

    // edit, save, cancel function
    const [edit, setEdit] = React.useState(false);
    const [cancel, setCancel] = React.useState(false);

    // sends current_theme to reducer
    const activateEdit = () => {
        console.log('active edit');
        dispatch({type: 'SET_CURRENT_THEME', payload:{editTheme}})
        setEdit(true);
    }

    // cancels edits and resets current theme reducer to original value
    const cancelEdit = () =>{
        console.log('active cancel');
        setEdit(false);
        setEditName(name);
        setEditDescription(description);
        setEditTheme({id: id, name: editName, description: editDescription});
        dispatch({type: 'SET_CURRENT_THEME', payload:{theme}})
        
    }

    // dispatches edited theme to current theme reducer
    const activateSave = () => {
        console.log('activate save');
        console.log('Dispatch information to save');
        dispatch({type: 'EDIT_CURRENT_THEME', payload: {id: id, name: editName, description: editDescription}})
        dispatch({type: 'EDIT_THEME', payload: {id: id, name: editName, description: editDescription}})
        console.log('close edit mode');
        setEdit(false);
        
        // dispatch {id: id, name: name, month: month, year: year, description: description}
    }

    return (
        <div>
        <Button onClick={handleOpen}>View Move</Button>
    
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {month} {year}
                </Typography>
                {edit == false ?
                    <Typography id="modal-modal-title" variant="h2" component="h2">
                        {name}
                    </Typography>
                    :
                    <TextField 
                        sx={{ mt: 2, width: 1}}
                        id="outlined-basic" 
                        label="Theme Name" 
                        variant="outlined" 
                        onChange={(event) => setEditName(event.target.value)}
                        defaultValue={editName}
                        />
                }
                {edit == false ?
                    <Typography id="modal-modal-description" sx={{ mt: 2, width: 1 }}>
                        {description}
                    </Typography>
                :
                    <TextField
                        sx={{ mt: 2, width: 1 }}
                        id="outlined-textarea"
                        label="Theme Description"
                        placeholder="Description"
                        onChange={(event) => setEditDescription(event.target.value)}
                        value={editDescription}
                        multiline
                        />
                }
                <div>
                {edit === false ?
                        <Button onClick={activateEdit}>Edit</Button>
                    :
                    <>
                        <Button onClick={activateSave}>Save</Button>
                        <Button onClick={cancelEdit}>Cancel</Button>
                    </>
                }
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Stories:
                    {JSON.stringify(stories)}
                    {stories.map((story, index) => {
                        {JSON.stringify(index)}
                    })}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Contacts:
                    {JSON.stringify(contacts)}
                </Typography>
            </Box>
        </Modal>
        </div>
    );
}