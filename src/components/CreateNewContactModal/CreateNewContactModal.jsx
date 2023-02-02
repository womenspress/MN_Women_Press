import * as React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ListTags from '../ListTags/ListTags';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function CreateNewContactModal(){
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // tag actions
    let [tagsArray, setTagsArray] = React.useState([]);
    const [searchTag, setSearchTag] = React.useState('');

    const setSearchTagValue = (tag) => {
        setSearchTag(tag);
        // search of filter method
        console.log(tag);
    }

    const createNewTag = (searchTag) => {
        console.log('Create new tag:', searchTag);
        // dispatch({type: "INSERT_TAG", payload: {tag: tag}});
        console.log('Insert new tag into tagsArray');
        setTagsArray([...tagsArray, {id: -1, name: searchTag, description: ''}]);
        console.log(tagsArray);
    }

    return (
        <div id='create-contact-module'>
            <Button onClick={handleOpen}>
                <AddCircleOutlineIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Contact
                    </Typography>
                    <TextField sx={{width: .70}} id="outlined-basic" label="Name" variant="outlined" />
                    <TextField sx={{ width: .30}} id="outlined-basic" label="Pronouns" variant="outlined" />
                    <TextField sx={{ width: 1}} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField sx={{ width: 1 }} id="outlined-basic" label="Expertise" variant="outlined" />
                    <Box sx={{ display: 'flex' }}>
                        <TextField sx={{ width: .75}} id="outlined-basic" label="Search For Tag" variant="outlined" value={searchTag} onChange={(event) => setSearchTagValue(event.target.value)} />
                        <Button onClick={() => createNewTag(searchTag)}>
                            <AddCircleOutlineIcon/>
                        </Button>
                    </Box>
                    <ListTags tags={tagsArray} numOfDisplay={tagsArray.length}/>
                    <TextField sx={{ width: 1}} id="outlined-basic" label="Location" variant="outlined" />
                    <Box>
                        <Button>
                            save and submit
                        </Button>
                        <Button>
                            additional info <ArrowForwardIcon/>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}