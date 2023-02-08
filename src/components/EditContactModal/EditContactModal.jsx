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
import { Switch } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContactTagSearchCard from '../../assets/TagSearchCard/ContactTagSearchCard';




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

const smallStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: "fit-content",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
};

export default function EditContactModal({contact}){

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({type: "GET_ALL_TAGS"});
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // contact info values
    // page 1
    const [name, setName] = React.useState(contact.name|| '');
    const [pronouns, setPronouns] = React.useState(contact.pronouns|| '')
    const [email, setEmail] = React.useState(contact.email|| '');
    const [phone, setPhone] = React.useState(contact.phone || '');
    const [expertise, setExpertise] = React.useState(contact.expertise || '');
    const [tagsArray, setTagsArray] = React.useState(!contact.tags.includes(null) ? contact.tags : []);
    // const [location, setLocation] = React.useState(contact.location);
    const [notes, setNotes] = React.useState(contact.note || '')
    const [rolesArray, setRolesArray] = React.useState(!contact.roles.includes(null) ? contact.roles : []);
    
    // page 2
    const [billingAddress, setBillingAddress] = React.useState(contact.billing_address || '');
    const [mailingAddress, setMailingAddress] = React.useState(contact.mailing_address || '');
    const [bio, setBio] = React.useState(contact.bio || '');
    const [website, setWebsite] = React.useState(contact.website || '');
    const [twitter, setTwitter] = React.useState(contact.twitter || '');
    const [facebook, setFacebook] = React.useState(contact.facebook || '');
    const [instagram, setInstagram] = React.useState(contact.instagram || '');
    const [linkedIn, setLinkedIn] = React.useState(contact.linkedIn || '');

    // add contact tag actions

    const dbTagsArray = useSelector(store => store.tags.allTags) || [];
    const [searchTag, setSearchTag] = React.useState('');
    const [newTagDescription, setNewTagDescription] = React.useState('');
    const [foundTag, setFoundTag] = React.useState([]);

    const setSearchTagValue = (tagName) => {
        setSearchTag(tagName);
        // search of filter method
        console.log('db array',dbTagsArray);
        console.log('found tag:', dbTagsArray.filter(function(dbTag) {if(dbTag.name?.includes(tagName)){return dbTag;}})[0]);

        // sets found tag to a tag containing searchTagValue && is the shorted in array.
        setFoundTag([...dbTagsArray.filter(function(dbTag) {if(dbTag.name.toLowerCase().includes(tagName.toLowerCase())){return dbTag;}})])
        if(tagName === ""){
            setFoundTag([]);
        }
    }

    const createNewTag = (tagName, tagDescription) => {
        console.log('Create new tag{ name:', tagName, 'description: ', tagDescription,'}');
        dispatch({type: "CREATE_NEW_TAG", payload: {name: tagName, description: tagDescription}});
        handleCloseCreateTag();
    }

    const addExistingTag = (tag) => {
        console.log('Add existing tag');
        setTagsArray([...tagsArray, tag]);
    }

    const removeTag = (tag) => {
        console.log('Remove existing tag');
        setTagsArray(tagsArray.filter(x => x.id !== tag.id));
    }

    // create new tag modal
    const [openCreateTag, setOpenCreateTag] = React.useState(false);
    const handleOpenCreateTag = () => setOpenCreateTag(true);
    const handleCloseCreateTag = () => setOpenCreateTag(false);

    // Roles
    let availableRoles = [
        {id: 1, name: 'Photographer'},
        {id: 2, name: 'Illustrator'},
        {id: 3, name: 'Editor'},
        {id: 4, name: 'Expert'},
        {id: 5, name: 'Fact checker'},
        {id: 6, name: "Printer"}
    ]

    console.log();
    const [check1, setCheck1] = React.useState(contact.roles.filter(e =>  e?.name == 'Photographer').length>0);
    const [check2, setCheck2] = React.useState(contact.roles.filter(e =>  e?.name == 'Illustrator').length>0);
    const [check3, setCheck3] = React.useState(contact.roles.filter(e =>  e?.name == 'Editor').length>0);
    const [check4, setCheck4] = React.useState(contact.roles.filter(e =>  e?.name == 'Expert').length>0);
    const [check5, setCheck5] = React.useState(contact.roles.filter(e =>  e?.name == 'Fact Checker').length>0);
    const [check6, setCheck6] = React.useState(contact.roles.filter(e =>  e?.name == 'Printer').length>0);

    const changeRoleStatus = (checked,id) => {
        console.log(checked);
        // if true add to array
        if(checked){
            setRolesArray([...rolesArray, ...availableRoles.filter(x => x.id === id)])
            console.log(rolesArray);
            // setRolesArray(...rolesArray, availableRoles.filter(x => x.id === id))
        } else {
            setRolesArray(rolesArray.filter(x => x?.id !== id));
        }
        console.log('role array',rolesArray);
    }

    // create contact modal pages
    const [createContactPage, setCreateContactPage] = React.useState(1);

    // submit new contact
    const submitContact = () => {
        let newContact = {
            id: contact.id,
            name: name,
            pronouns: pronouns,
            expertise: expertise,
            email: email,
            phone: phone,
            billing_address: billingAddress,
            mailing_address: mailingAddress,
            bio: bio,
            note: notes,
            linkedIn: linkedIn,
            twitter: twitter,
            instagram: instagram,
            facebook: facebook,
            tags: tagsArray,
            roles: rolesArray,
        }
        console.log('Send new contact: ', newContact);
        dispatch({type: 'EDIT_CONTACT', payload: newContact});
        handleClose()
    }

    if (!contact.roles.includes(null)){
        console.log(contact.name, ' ', contact?.roles.filter(e =>  e.name == availableRoles[0].name));
    };

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
                        <TextField sx={{ width: 1}} id="outlined-basic" label="Phone" variant="outlined" value={phone} onChange={(event)=> setPhone(event.target.value)}/>
                        <TextField sx={{ width: 1 }} id="outlined-basic" label="Expertise" variant="outlined" value={expertise} onChange={(event)=> setExpertise(event.target.value)}/>
                        <Box sx={{display: 'flex', width: 1}}>
                            <Typography id="modal-modal-title" variant="p" component="p">
                                {availableRoles[0].name}
                                <Switch 
                                    checked={check1} 
                                    onClick={() => setCheck1(!check1)}
                                    onChange={() => changeRoleStatus(!check1, availableRoles[0].id)}
                                />
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" component="p">
                                {availableRoles[1].name}
                                <Switch 
                                    checked={check2} 
                                    onClick={() => setCheck2(!check2)}
                                    onChange={() => changeRoleStatus(!check2, availableRoles[1].id)}
                                />
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" component="p">
                                {availableRoles[2].name}
                                <Switch 
                                    checked={check3} 
                                    onClick={() => setCheck3(!check3)}
                                    onChange={() => changeRoleStatus(!check3, availableRoles[2].id)}
                                />
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" component="p">
                                {availableRoles[3].name}
                                <Switch 
                                    checked={check4} 
                                    onClick={() => setCheck4(!check4)}
                                    onChange={() => changeRoleStatus(!check4, availableRoles[3].id)}
                                />
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" component="p">
                                {availableRoles[4].name}
                                <Switch 
                                    checked={check5} 
                                    onClick={() => setCheck5(!check5)}
                                    onChange={() => changeRoleStatus(check5, availableRoles[4].id)}
                                />
                            </Typography>
                            <Typography id="modal-modal-title" variant="p" component="p">
                                {availableRoles[5].name}
                                <Switch 
                                    checked={check6} 
                                    onClick={() => setCheck6(!check6)}
                                    onChange={() => changeRoleStatus(check6, availableRoles[5].id)}
                                />
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: .75}}>
                                <TextField sx={{ width: .75}}  autoComplete='off' id="outlined-basic" label="Search For Tag" variant="outlined" value={searchTag} onChange={(event) => setSearchTagValue(event.target.value)} />
                                <Button onClick={handleOpenCreateTag}>
                                    <AddCircleOutlineIcon/>
                                </Button>
                                <Modal
                                    open={openCreateTag}
                                    onClose={handleCloseCreateTag}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={smallStyle}>
                                        <Typography sx={{ width: 1}} id="modal-modal-title" variant="h6" component="h2">
                                            Create Tag of {searchTag}
                                        </Typography>
                                        <TextField sx={{ width: 1}}  autoComplete='off' id="outlined-basic" label="Tag Description" variant="outlined" value={newTagDescription} onChange={(event)=> setNewTagDescription(event.target.value)} />
                                        <Box sx={{ width: 1}}>
                                            <Button onClick={() => handleCloseCreateTag()}>
                                                Cancel
                                            </Button>
                                            <Button onClick={() => createNewTag(searchTag ,newTagDescription)}>
                                                Create A New Tag
                                            </Button>
                                        </Box>
                                    </Box>
                                </Modal>

                                <Box sx={{ padding: 1, display: 'flex'}}>
                                    {foundTag?.map(tag => {
                                        return (
                                            <ContactTagSearchCard key={tag.id} tag={tag} addTag={addExistingTag} />
                                        )
                                    })}
                                </Box>
                            </Box>                         
                        </Box>
                        <ListTags tags={tagsArray} numOfDisplay={tagsArray.length} removeTag={removeTag}/>
                        {/* <TextField sx={{ width: 1}} id="outlined-basic" label="City, St." variant="outlined" value={location} onChange={(event)=> setLocation(event.target.value)}/> */}
                        <TextField sx={{ width: 1 }} id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(event)=> setNotes(event.target.value)}/>
                        <Box>
                            <Button onClick={() => handleClose()}>
                                Cancel
                            </Button>
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
                            <Button onClick={() => handleClose()}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )
        }
    }

    return (
        <div id='create-contact-module'>
            <IconButton size='small' onClick={() =>  handleOpen()}>
                <EditIcon />
            </IconButton>
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