import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ThemeModal(props) {
    let id = props.id ||  -1;
    let name = props.name || "undefined";
    let description = props.description || "undefined description";
    let month = props.month || "month undefined";
    let year =props.year || -1;
    let stories = props.stories || [{id: -1, title: "title not found"}];
    let contacts = props.contacts || [{id: -1, name: "contact not found"}];



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const activateEdit = () => {
        console.log('activate edit');
    }

    return (
        <div>
        <Button onClick={handleOpen}>View More</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Button onClick={() => activateEdit()}>
                    Edit
                </Button>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {month} {year}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>
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