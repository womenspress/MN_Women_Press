import React, { useState } from 'react';

// libraries
import { useDispatch, useSelector } from 'react-redux';

// components
import { Box, Typography, Grid, Button, TextField, Menu, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContactDropdownItem from '../../assets/ContactDropdownItem/ContactDropdownItem';
import TagDropdownItem from '../../assets/TagDropdownItem/TagDropdownItem';
import ThemeDropdownItem from '../../assets/ThemeDropdownItem/ThemeDropdownItem';
import ContactSearchCard from '../../assets/ContactSearchCard/ContactSearchCard';
import TagSearchCard from '../../assets/TagSearchCard/TagSearchCard';
import ThemeSearchCard from '../../assets/ThemeSearchCard/ThemeSearchCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';

const smallStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 2,
};

export default function StoryModalGeneral(props) {

  const { setModalOpen, setStep, createMode, setCreateMode } = props;

  const dispatch = useDispatch();

  const currentStory = useSelector((store) => store.stories.tempStory);
  const contacts = useSelector((store) => store.contacts.allContacts);
  const tags = useSelector((store) => store.tags.allTags);
  const themes = useSelector((store) => store.themes.allThemes);

  const [inputValues, setInputValues] = useState(currentStory);

  console.log('current story:', currentStory);


  //* -------- CONTACT search variables and functions ---------

  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [contactAnchor, setContactAnchor] = useState(null);
  const contactOpen = Boolean(contactAnchor);

  const handleSearchContacts = (event) => {
    setContactAnchor(event.currentTarget);
  };

  const handleContactsClose = () => {
    setContactAnchor(null);
  };

  const contactIds = inputValues.contacts?.map((contact) => contact?.id);

  // these will populate upon search
  const contactSearchResults = contacts
    ?.filter((contact) => !contactIds.includes(contact.id))
    .filter((contact) =>
      contact.name.toLowerCase().includes(contactSearchTerm.toLowerCase())
    );

  //* -------- TAG search variables and functions ---------

  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [tagAnchor, setTagAnchor] = useState(null);
  const tagOpen = Boolean(tagAnchor);

  //create new tag modal
  const [openCreateTag, setOpenCreateTag] = React.useState(false);
  const handleOpenCreateTag = () => setOpenCreateTag(true);
  const handleCloseCreateTag = () => setOpenCreateTag(false);
  const [newTagDescription, setNewTagDescription] = React.useState('');

  const handleSearchTags = (event) => {
    setTagAnchor(event.currentTarget);
  };

  const handleTagsClose = () => {
    setTagAnchor(null);
  };

  const createNewTag = (tagName, tagDescription) => {
    console.log(
      'Create new tag{ name:',
      tagName,
      'description: ',
      tagDescription,
      '}'
    );
    dispatch({
      type: 'CREATE_NEW_TAG',
      payload: { name: tagName, description: tagDescription },
    });
    handleCloseCreateTag();
  };

  const tagIds = inputValues.tags?.map((tag) => tag?.id);

  const tagSearchResults = tags
    ?.filter((tag) => !tagIds.includes(tag.id))
    .filter((tag) =>
      tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );

  //* -------- THEME search variables and functions ---------

  const [themeSearchTerm, setThemeSearchTerm] = useState('');
  const [themeAnchor, setThemeAnchor] = useState(null);
  const themeOpen = Boolean(themeAnchor);

  const handleSearchThemes = (event) => {
    setThemeAnchor(event.currentTarget);
  };

  const handleThemesClose = () => {
    setThemeAnchor(null);
  };

  const themeIds = inputValues.theme?.map((theme) => theme.id);

  // these will populate upon search
  const themeSearchResults = themes
    ?.filter((theme) => !themeIds.includes(theme.id))
    .filter((theme) =>
      theme.name.toLowerCase().includes(themeSearchTerm.toLowerCase())
    );


  // on submit: close modal. create mode true => POST data, clear temp story. create mode false => PUT data.
  const handleSubmit = () => {
    console.log('saved and submitted');
    dispatch({ type: 'CLEAR_TEMP_STORY' });
    if (createMode)
      dispatch({
        type: 'CREATE_NEW_STORY',
        payload: { ...currentStory, ...inputValues },
      });
    else {
      dispatch({
        type: 'EDIT_STORY',
        payload: { ...currentStory, ...inputValues },
      });
    }
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCreateMode(true);
    dispatch({ type: 'CLEAR_TEMP_STORY' });
  };

  // navigation: update temp story with input values, move to next step
  const navigateAdditional = () => {
    console.log('navigating to next page');
    dispatch({
      type: 'SET_TEMP_STORY',
      payload: { ...currentStory, ...inputValues },
    });
    setStep('additional');
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }} >
          <Box></Box>
          <Typography
            variant="h4">
            {createMode ? 'New Story - general' : 'Edit Story - general'}
          </Typography>
          <CloseIcon
            onClick={handleClose}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'lightgrey',
              },
            }}
          />
        </Box>
        <Grid container spacing={1} sx={{ paddingX: '5%', maxHeight: 480, overflow: 'hidden', overflowY: 'scroll' }}>
          {/* title */}
          <Grid item xs={4}>

            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              title *
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              sx={{ width: '90%' }}
              size="small"
              value={inputValues.title}
              onChange={(e) =>
                setInputValues({ ...inputValues, title: e.target.value })
              }
            />
          </Grid>


          {/* contact(s) */}
          <Grid item xs={4}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              contacts
            </Typography>
          </Grid>
          <Grid item xs={7}>

            <TextField
              size="small"
              value={contactSearchTerm}
              onChange={(e) => setContactSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearchContacts}>search</Button>
            <Menu
              anchorEl={contactAnchor}
              open={contactOpen}
              onClose={handleContactsClose}
            >
              {contactSearchResults?.map((contact) => {
                return (
                  <ContactDropdownItem
                    key={contact.id}
                    handleClose={handleContactsClose}
                    contact={contact}
                    setInputValues={setInputValues}
                    inputValues={inputValues}
                  />
                );
              })}
            </Menu>
            {inputValues.contacts.length ?
              <Box
                sx={{
                  bgcolor: 'grey.100',
                  padding: 0.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {inputValues.contacts
                  ?.sort((a, b) => a.id - b.id)
                  .map((contact) => {
                    return (
                      <ContactSearchCard
                        key={contact.id}
                        contact={contact}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                      />
                    );
                  })}
              </Box>
              :
              <></>
            }
          </Grid>

          {/* tags */}
          <Grid item xs={4}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              tags
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              size="small"
              value={tagSearchTerm}
              onChange={(e) => setTagSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearchTags}>search</Button>
            <IconButton color='primary' onClick={handleOpenCreateTag}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Modal
              open={openCreateTag}
              onClose={handleCloseCreateTag}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={smallStyle}>
                <Typography
                  sx={{ width: 1 }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Create Tag of {tagSearchTerm}
                </Typography>
                <TextField
                  sx={{ width: 1 }}
                  autoComplete="off"
                  id="outlined-basic"
                  label="Tag Description"
                  variant="outlined"
                  value={newTagDescription}
                  onChange={(event) => setNewTagDescription(event.target.value)}
                />
                <Box sx={{ width: 1 }}>
                  <Button onClick={() => handleCloseCreateTag()}>Cancel</Button>
                  <Button
                    onClick={() => createNewTag(tagSearchTerm, newTagDescription)}
                  >
                    Create A New Tag
                  </Button>
                </Box>
              </Box>
            </Modal>
            <Menu anchorEl={tagAnchor} open={tagOpen} onClose={handleTagsClose}>
              {tagSearchResults?.map((tag) => {
                return (
                  <TagDropdownItem
                    key={tag.id}
                    handleClose={handleTagsClose}
                    tag={tag}
                    setInputValues={setInputValues}
                    inputValues={inputValues}
                  />
                );
              })}
            </Menu>
            {inputValues.tags.length ?
              <Box sx={{ bgcolor: 'grey.100', padding: 0.5, display: 'flex', flexWrap: 'wrap' }}>
                {inputValues.tags?.map((tag) => {
                  if (tag) {
                    return <TagSearchCard
                      key={tag?.id}
                      tag={tag}
                      inputValues={inputValues}
                      setInputValues={setInputValues} />;
                  }
                })}
              </Box>
              :
              <></>
            }
          </Grid>

          {/* theme */}
          <Grid item xs={4}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              theme
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              size="small"
              value={themeSearchTerm}
              onChange={(e) => setThemeSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearchThemes}>search</Button>
            <Menu
              anchorEl={themeAnchor}
              open={themeOpen}
              onClose={handleThemesClose}
            >
              {themeSearchResults?.map((theme) => {
                return (
                  <ThemeDropdownItem
                    key={theme.id}
                    handleClose={handleThemesClose}
                    theme={theme}
                    setInputValues={setInputValues}
                    inputValues={inputValues}
                  />
                );
              })}
            </Menu>
            {inputValues.theme.length ? <Box sx={{ bgcolor: 'grey.100', padding: 0.5 }}>
              {inputValues.theme.map((theme) => {
                return <ThemeSearchCard
                  key={theme.id}
                  theme={theme}
                  inputValues={inputValues}
                  setInputValues={setInputValues} />;

              })}
            </Box>
              :
              <></>
            }
          </Grid>
          {/* notes */}
          <Grid item xs={4}>
            <Typography sx={{ textAlign: 'right', marginRight: 3 }}>
              notes
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              sx={{ width: '90%' }}
              multiline
              rows={3}
              size="small"
              value={inputValues.notes}
              onChange={(e) =>
                setInputValues({ ...inputValues, notes: e.target.value })
              }
            />
          </Grid>
        </Grid>

      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={handleSubmit}>save and submit</Button>
        <Button
          onClick={navigateAdditional}
          endIcon={<ArrowForwardIcon />}
        >additional info</Button>
      </Box>
    </Box>
  );
}
