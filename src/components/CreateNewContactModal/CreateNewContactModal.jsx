import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ListTags from '../ListTags/ListTags';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
};
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Email } from '@mui/icons-material';

export default function CreateNewContactModal(){
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({type: "GET_ALL_TAGS"});
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // contact info values
    // page 1
    const [name, setName] = React.useState('');
    const [pronouns, setPronouns] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [expertise, setExpertise] = React.useState('');
    const [tagsArray, setTagsArray] = React.useState([]);
    const [location, setLocation] = React.useState('');
    const [notes, setNotes] = React.useState('')
    // page 2
    const [address, setAddress] = React.useState('');
    const [billingAddress, setBillingAddress] = React.useState('');
    const [mailingAddress, setMailingAddress] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [twitter, setTwitter] = React.useState('');
    const [facebook, setFacebook] = React.useState('');
    const [instagram, setInstagram] = React.useState('');
    const [linkedIn, setLinkedIn] = React.useState('');

    // add contact tag actions

    const dbTagsArray = useSelector(store => store.tags.allTags);
    
    const [searchTag, setSearchTag] = React.useState('');
    const [foundTag, setFoundTag] = React.useState('');

    const setSearchTagValue = (tag) => {
        setSearchTag(tag);
        // search of filter method
        console.log('db array',dbTagsArray);
        console.log('found tag:', dbTagsArray.filter(function(dbTag) {if(dbTag.name?.includes(tag)){return dbTag;}})[0]);

        // sets found tag to a tag containing searchTagValue && is the shorted in array.
        setFoundTag(dbTagsArray.filter(function(dbTag) {if(dbTag.name.toLowerCase().includes(tag.toLowerCase())){return dbTag;}}).reduce(function(a, b) {return a.name.length <= b.name.length ? a : b;}))
        
    }

    const createNewTag = (searchTag) => {
        console.log('Create new tag:', searchTag);
        // dispatch({type: "INSERT_TAG", payload: {tag: tag}});
        console.log('Insert new tag into tagsArray');
        setTagsArray([...tagsArray, {id: -1, name: searchTag, description: ''}]);
        
        setSearchTag('')
        // console.log(tagsArray);
    }

    // create contact modal pages
    const [createContactPage, setCreateContactPage] = React.useState(1);

    // submit new contact
    const submitContact = () => {
        // construct contact object
            /* EXAMPLE: 
            {
                name: 'Folasade Adesanya',
                pronouns: 'she/her',
                expertise: 'da bomb',
                photo: 'https://xsgames.co/randomusers/assets/images/favicon.png',
                email: 'email@email.com',
                phone: '(999) 999-9999',
                billing_address: '1234 Main St, Minneapolis, MN 55403',
                mailing_address: '1234 Main St, Minneapolis, MN 55403',
                location: 'Minneapolis, MN',
                bio: `Folasade Adesanya is a queer agender writer and scholar living in Minneapolis. Their writing consists of historical fiction, creative nonfiction, essays, and poetry (you can find writing samples here). Folasade is additionally the founder of The Black Syllabus, an organization that promotes literacy and alternative education in the Black community, and is working toward a PhD in Media Studies.`,
                note: '',
                linkedIn: '',
                twitter: '',
                instagram: '',
                facebook: '',
                ...
                tags: [
                    {
                    id: 1,
                    name: 'books',
                    description: '',
                    },
                    {
                    id: 2,
                    name: 'front page',
                    description: '',
                    },
                ],
            }
            */
        let newContact = {
            name: name,
            pronouns: pronouns,
            expertise: expertise,
            email: email,
            phone: phone,
            billingAddress: billingAddress,
            mailingAddress: mailingAddress,
            location: location,
            bio: bio,
            note: notes,
            linkedIn: linkedIn,
            twitter: twitter,
            instagram: instagram,
            facebook: facebook,
            tags: tagsArray,
        }
        console.log('Send new contact: ', newContact);
        dispatch({type: 'CREATE_NEW_CONTACT', payload: newContact});
    }

    const ModalPages = () => {
        switch(createContactPage){
            case 1:
                return(
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            New Contact
                        </Typography>
                        <TextField sx={{width: .70}} id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(event)=> setName(event.target.value)} />
                        <TextField sx={{ width: .30}} id="outlined-basic" label="Pronouns" variant="outlined" value={pronouns} onChange={(event)=> setPronouns(event.target.value)}/>
                        <TextField sx={{ width: 1}} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(event)=> setEmail(event.target.value)}/>
                        <TextField sx={{ width: 1 }} id="outlined-basic" label="Expertise" variant="outlined" value={expertise} onChange={(event)=> setExpertise(event.target.value)}/>
                        <Box sx={{ display: 'flex' }}>
                            <TextField sx={{ width: .75}} id="outlined-basic" label="Search For Tag" variant="outlined" value={searchTag} onChange={(event) => setSearchTagValue(event.target.value)} />
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                {foundTag.name}
                            </Typography>                            
                            <Button onClick={() => createNewTag(searchTag)}>
                                <AddCircleOutlineIcon/>
                            </Button>
                        </Box>
                        <ListTags tags={tagsArray} numOfDisplay={tagsArray.length}/>
                        <TextField sx={{ width: 1}} id="outlined-basic" label="City, St." variant="outlined" value={location} onChange={(event)=> setLocation(event.target.value)}/>
                        <TextField sx={{ width: 1 }} id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(event)=> setNotes(event.target.value)}/>
                        <Box>
                            <Button onClick={() => submitContact()}>
                                save and submit
                            </Button>
                            <Button onClick={() => setCreateContactPage(2)}>
                                additional info <ArrowForwardIcon/>
                            </Button>
                        </Box>
                    </Box>
                )
            case 2:
                return(
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            New Contact - additional
                        </Typography>
                        <TextField sx={{width: 1}} id="outlined-basic" label="Billing Address" variant="outlined" value={billingAddress} onChange={(event)=> setBillingAddress(event.target.value)}/>
                        <TextField sx={{width: 1}} id="outlined-basic" label="Mailing Address" variant="outlined" value={mailingAddress} onChange={(event)=> setMailingAddress(event.target.value)}/>
                        <TextField sx={{ width: 1}} id="outlined-basic" label="Bio" variant="outlined" value={bio} onChange={(event)=> setBio(event.target.value)}/>
                        <TextField sx={{ width: 1 }} id="outlined-basic" label="Website" variant="outlined" value={website} onChange={(event)=> setWebsite(event.target.value)}/>
                        <TextField sx={{ width: .5}} id="outlined-basic" label="Twitter" variant="outlined" value={twitter} onChange={(event)=> setTwitter(event.target.value)}/>
                        <TextField sx={{ width: .5}} id="outlined-basic" label="Instagram" variant="outlined" value={instagram} onChange={(event)=> setInstagram(event.target.value)}/>
                        <TextField sx={{ width: .5}} id="outlined-basic" label="Facebook" variant="outlined" value={facebook} onChange={(event)=> setFacebook(event.target.value)}/>
                        <TextField sx={{ width: .5}} id="outlined-basic" label="LinkedIn" variant="outlined" value={linkedIn} onChange={(event)=> setLinkedIn(event.target.value)}/>
                        <Box>
                            <Button onClick={() => setCreateContactPage(1)}>
                                <ArrowBackIcon/> general info 
                            </Button>
                            <Button onClick={() => submitContact()}>
                                save and submit
                            </Button>
                        </Box>
                    </Box>
                )
        }
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
                
                    {ModalPages()}
                
            </Modal>
        </div>
    );
}