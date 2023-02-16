import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ListTags from '../ListTags/ListTags';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Switch, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContactTagSearchCard from '../../assets/TagSearchCard/ContactTagSearchCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: "fit-content",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingY: 2,
  paddingX: 5
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

export default function EditContactModal({ contact }) {

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //     dispatch({type: "GET_ALL_TAGS"});
  // }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    resetState();
  };

  // contact info values
  // page 1
  const [name, setName] = React.useState(contact.name || '');
  const [pronouns, setPronouns] = React.useState(contact.pronouns || '')
  const [email, setEmail] = React.useState(contact.email || '');
  const [phone, setPhone] = React.useState(contact.phone || '');
  const [expertise, setExpertise] = React.useState(contact.expertise || '');
  const [tagsArray, setTagsArray] = React.useState(!contact.tags?.includes(null) ? contact.tags : []);
  // const [location, setLocation] = React.useState(contact.location);
  const [notes, setNotes] = React.useState(contact.note || '')
  const [rolesArray, setRolesArray] = React.useState(!contact.roles?.includes(null) ? contact.roles : []);

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

  // reset state on close 
  const resetState = () => {
    setName(contact.name);
    setPronouns(contact.pronouns);
    setEmail(contact.email);
    setPhone(contact.phone);
    setExpertise(contact.expertise);
    setTagsArray(!contact.tags.includes(null) ? contact.tags : []);
    setNotes("");
    setRolesArray(!contact.roles.includes(null) ? contact.roles : []);
    setBillingAddress(contact.billing_address || '');
    setMailingAddress(contact.mailing_address || '');
    setBio(contact.bio || '');
    setWebsite(contact.website || '');
    setTwitter(contact.twitter || '');
    setFacebook(contact.facebook || '');
    setInstagram(contact.instagram || '');
    setLinkedIn(contact.linkedIn || '');
    setSearchTag('');
  }

  const setSearchTagValue = (tagName) => {
    setSearchTag(tagName);
    // search of filter method

    // sets found tag to a tag containing searchTagValue && is the shorted in array.
    setFoundTag([...dbTagsArray.filter(function (dbTag) { if (dbTag.name.toLowerCase().includes(tagName.toLowerCase())) { return dbTag; } })])
    if (tagName === "") {
      setFoundTag([]);
    }
  }

  const createNewTag = (tagName, tagDescription) => {
    dispatch({ type: "CREATE_NEW_TAG", payload: { name: tagName, description: tagDescription } });
    handleCloseCreateTag();
  }

  const addExistingTag = (tag) => {
    setTagsArray([...tagsArray, tag]);
  }

  const removeTag = (tag) => {
    setTagsArray(tagsArray.filter(x => x.id !== tag.id));
  }

  // create new tag modal
  const [openCreateTag, setOpenCreateTag] = React.useState(false);
  const handleOpenCreateTag = () => setOpenCreateTag(true);
  const handleCloseCreateTag = () => setOpenCreateTag(false);

  // Roles
  let availableRoles = [
    { id: 1, name: 'Photographer', check: check1, setCheck: setCheck1 },
    { id: 2, name: 'Illustrator', check: check2, setCheck: setCheck2 },
    { id: 3, name: 'Editor', check: check3, setCheck: setCheck3 },
    { id: 4, name: 'Expert', check: check4, setCheck: setCheck4 },
    { id: 5, name: 'Fact checker', check: check5, setCheck: setCheck5 },
    { id: 6, name: "Printer", check: check6, setCheck: setCheck6 },
    { id: 7, name: 'Author', check: check7, setCheck: setCheck7 },
    { id: 8, name: 'Underwriter', check: check8, setCheck: setCheck8 },
    { id: 9, name: 'Source', check: check9, setCheck: setCheck9 },
    { id: 10, name: 'Subject', check: check10, setCheck: setCheck10 },
  ]

  const [check1, setCheck1] = useState(contact.roles?.filter(e => e?.name == 'Photographer').length > 0);
  const [check2, setCheck2] = useState(contact.roles?.filter(e => e?.name == 'Illustrator').length > 0);
  const [check3, setCheck3] = useState(contact.roles?.filter(e => e?.name == 'Editor').length > 0);
  const [check4, setCheck4] = useState(contact.roles?.filter(e => e?.name == 'Expert').length > 0);
  const [check5, setCheck5] = useState(contact.roles?.filter(e => e?.name == 'Fact Checker').length > 0);
  const [check6, setCheck6] = useState(contact.roles?.filter(e => e?.name == 'Printers').length > 0);
  const [check7, setCheck7] = useState(contact.roles?.filter(e => e?.name == 'Author').length > 0);
  const [check8, setCheck8] = useState(contact.roles?.filter(e => e?.name == 'Underwriter').length > 0);
  const [check9, setCheck9] = useState(contact.roles?.filter(e => e?.name == 'Source').length > 0);
  const [check10, setCheck10] = useState(contact.roles?.filter(e => e?.name == 'Subject').length > 0);

  const changeRoleStatus = (checked, id) => {
    // if true add to array
    if (checked) {
      setRolesArray([...rolesArray, ...availableRoles.filter(x => x.id === id)])
    } else {
      setRolesArray(rolesArray.filter(x => x?.id !== id));
    }
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
    dispatch({ type: 'EDIT_CONTACT', payload: newContact });
    handleClose()
  }

  const ModalPages = () => {
    switch (createContactPage) {
      case 1:
        return (
          <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* {JSON.stringify(rolesArray)} */}
            <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
              Edit Contact
            </Typography>
            <Box>
              <Box sx={{ width: 450, margin: 'auto' }}>
                <Box>
                  <TextField size='small' sx={{ margin: .5 }} id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
                  <TextField size='small' sx={{ margin: .5 }} id="outlined-basic" label="Pronouns" variant="outlined" value={pronouns} onChange={(event) => setPronouns(event.target.value)} />
                </Box>
                <TextField size='small' sx={{ width: 400, margin: .5 }} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} />
                <TextField size='small' sx={{ width: 400, margin: .5 }} id="outlined-basic" label="Phone" variant="outlined" value={phone} onChange={(event) => setPhone(event.target.value)} />
                <TextField size='small' sx={{ width: 400, margin: .5 }} id="outlined-basic" label="Expertise" variant="outlined" value={expertise} onChange={(event) => setExpertise(event.target.value)} />
              </Box>
              <Box sx={{ display: 'flex', width: 1, padding: 1, justifyContent: 'space-evenly' }}>

                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[0].name}
                  <Switch
                    sx={{ display: 'flex' }}
                    checked={check1}
                    onClick={() => setCheck1(!check1)}
                    onChange={() => changeRoleStatus(!check1, availableRoles[0].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[1].name}
                  <Switch
                    checked={check2}
                    onClick={() => setCheck2(!check2)}
                    onChange={() => changeRoleStatus(!check2, availableRoles[1].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[2].name}
                  <Switch
                    checked={check3}
                    onClick={() => setCheck3(!check3)}
                    onChange={() => changeRoleStatus(!check3, availableRoles[2].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[3].name}
                  <Switch
                    checked={check4}
                    onClick={() => setCheck4(!check4)}
                    onChange={() => changeRoleStatus(!check4, availableRoles[3].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[4].name}
                  <Switch
                    checked={check5}
                    onClick={() => setCheck5(!check5)}
                    onChange={() => changeRoleStatus(!check5, availableRoles[4].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[5].name}
                  <Switch
                    checked={check6}
                    onClick={() => setCheck6(!check6)}
                    onChange={() => changeRoleStatus(!check6, availableRoles[5].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[6].name}
                  <Switch
                    checked={check7}
                    onClick={() => setCheck7(!check7)}
                    onChange={() => changeRoleStatus(!check7, availableRoles[6].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[7].name}
                  <Switch
                    checked={check8}
                    onClick={() => setCheck8(!check8)}
                    onChange={() => changeRoleStatus(!check8, availableRoles[7].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[8].name}
                  <Switch
                    checked={check9}
                    onClick={() => setCheck9(!check9)}
                    onChange={() => changeRoleStatus(!check9, availableRoles[8].id)}
                  />
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ margin: 1 }} />
                <Typography sx={{ fontSize: 14 }}>
                  {availableRoles[9].name}
                  <Switch
                    checked={check10}
                    onClick={() => setCheck10(!check10)}
                    onChange={() => changeRoleStatus(!check10, availableRoles[9].id)}
                  />
                </Typography>
              </Box>
              <Box sx={{ width: 450, margin: 'auto' }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: .75 }}>
                    <TextField size='small' sx={{ width: .75 }} autoComplete='off' id="outlined-basic" label="Search For Tag" variant="outlined" value={searchTag} onChange={(event) => setSearchTagValue(event.target.value)} />
                    <Button onClick={handleOpenCreateTag}>
                      <AddCircleOutlineIcon />
                    </Button>
                    <Modal
                      open={openCreateTag}
                      onClose={handleCloseCreateTag}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={smallStyle}>
                        <Typography sx={{ width: 1 }} id="modal-modal-title" variant="h6" component="h2">
                          Create Tag of {searchTag}
                        </Typography>
                        <TextField sx={{ width: 1 }} autoComplete='off' id="outlined-basic" label="Tag Description" variant="outlined" value={newTagDescription} onChange={(event) => setNewTagDescription(event.target.value)} />
                        <Box sx={{ width: 1 }}>
                          <Button onClick={() => handleCloseCreateTag()}>
                            Cancel
                          </Button>
                          <Button onClick={() => createNewTag(searchTag, newTagDescription)}>
                            Create A New Tag
                          </Button>
                        </Box>
                      </Box>
                    </Modal>

                    <Box sx={{ padding: 1, display: 'flex' }}>
                      {foundTag?.map(tag => {
                        return (
                          <ContactTagSearchCard key={tag.id} tag={tag} addTag={addExistingTag} />
                        )
                      })}
                    </Box>
                  </Box>
                </Box>
                <ListTags tags={tagsArray} numOfDisplay={tagsArray?.length} removeTag={removeTag} />
                {/* <TextField sx={{ width: 1}} id="outlined-basic" label="City, St." variant="outlined" value={location} onChange={(event)=> setLocation(event.target.value)}/> */}
                <TextField size='small' sx={{ width: 400 }} multiline rows={3} id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(event) => setNotes(event.target.value)} />
              </Box>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Button onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button onClick={() => submitContact()}>
                save and submit
              </Button>
              <Button onClick={() => setCreateContactPage(2)}>
                additional info <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        )
      case 2:
        return (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
              Edit Contact - additional
            </Typography>
            <TextField size='small' sx={{ width: 1, margin: .5 }} label="Billing Address" variant="outlined" value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} />
            <TextField size='small' sx={{ width: 1, margin: .5 }} label="Mailing Address" variant="outlined" value={mailingAddress} onChange={(event) => setMailingAddress(event.target.value)} />
            <TextField size='small' sx={{ width: 1, margin: .5 }} label="Bio" variant="outlined" value={bio} onChange={(event) => setBio(event.target.value)} />
            <TextField size='small' sx={{ width: 1, margin: .5 }} label="Website" variant="outlined" value={website} onChange={(event) => setWebsite(event.target.value)} />
            <TextField size='small' sx={{ width: .45, margin: .5 }} label="Twitter" variant="outlined" value={twitter} onChange={(event) => setTwitter(event.target.value)} />
            <TextField size='small' sx={{ width: .45, margin: .5 }} label="Instagram" variant="outlined" value={instagram} onChange={(event) => setInstagram(event.target.value)} />
            <TextField size='small' sx={{ width: .45, margin: .5 }} label="Facebook" variant="outlined" value={facebook} onChange={(event) => setFacebook(event.target.value)} />
            <TextField size='small' sx={{ width: .45, margin: .5 }} label="LinkedIn" variant="outlined" value={linkedIn} onChange={(event) => setLinkedIn(event.target.value)} />
            <Box>
              <Button onClick={() => setCreateContactPage(1)}>
                <ArrowBackIcon /> general info
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
      <IconButton size='small' onClick={() => handleOpen()}>
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