import React from 'react';
import { story } from '../../sampleStoryData';
import { Box, Grid, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ListTags from '../../components/ListTags/ListTags';

export default function StoriesPage() {
    return (
        <Box>
            <Grid container space={1}>
                {/* This grid row contains story header and tags */}
                <Grid item xs={8}>
                    <Typography variant='h4'>{story.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <ListTags numOfDisplay={4} tags={story.tags} />
                    </Box>
                </Grid>
                {/* This grid row contains 2 sections, 1 for general info and 1 that holds to-do + comments */}
                <Grid item xs={7} sx={{ backgroundColor: 'lightgrey' }}>
                    <Grid container space={1}>
                        <Grid item xs={11}>
                            <Typography variant='h6'>General Info</Typography>
                        </Grid>
                        {/* Need to link edit icon to story edit modal */}
                        <Grid item xs={1}>
                            <EditIcon/>
                        </Grid>
                        {/* Map of contacts, author first */}
                        <Grid item xs={3}>
                            <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                                Author
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            {story.contacts.filter(e => e.role === 'author').map((contact) => {
                                return (
                                    <Grid container spacing={1} key={contact.id}>

                                        {/* The below portion can be swapped out with a contact card component once created */}
                                        <Grid item xs={12}>
                                            <Box component={Paper} p={1} m={1}>
                                                <Typography fontWeight='bold'>{contact.name}</Typography>
                                                <Typography>{contact.email}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        {/* Maps other contacts conditionally if they are required when story is created */}
                        {story.photo_required ?
                            <>
                                <Grid item xs={3}>
                                    <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                                        Photographer
                                    </Typography>
                                </Grid>
                                {story.contacts.filter(e => e.role === 'photographer').length > 0 ?
                                    <Grid item xs={9}>
                                        {story.contacts.filter(e => e.role === 'photographer').map((contact) => {
                                            return (
                                                <Grid container spacing={1} key={contact.id}>

                                                    {/* The below portion can be swapped out with a contact card component once created */}
                                                    <Grid item xs={12}>
                                                        <Box component={Paper} p={1} m={1}>
                                                            <Typography fontWeight='bold'>{contact.name}</Typography>
                                                            <Typography>{contact.email}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                    :
                                    <Grid item xs={9}>
                                        <Typography variant='body1' fontStyle='italic' sx={{ mt: 1, ml: 1, p: 1 }}>none assigned</Typography>
                                    </Grid>}
                            </>
                            :
                            <></>
                        }
                        {story.fact_check_required ?
                            <>
                                <Grid item xs={3}>
                                    <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                                        Fact Checker
                                    </Typography>
                                </Grid>
                                {story.contacts.filter(e => e.role === 'fact checker').length > 0 ?
                                    <Grid item xs={9}>
                                        {story.contacts.filter(e => e.role === 'fact checker').map((contact) => {
                                            return (
                                                <Grid container spacing={1} key={contact.id}>

                                                    {/* The below portion can be swapped out with a contact card component once created */}
                                                    <Grid item xs={12}>
                                                        <Box component={Paper} p={1} m={1}>
                                                            <Typography fontWeight='bold'>{contact.name}</Typography>
                                                            <Typography>{contact.email}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                    : 
                                    <Grid item xs={9}>
                                        <Typography variant='body1' fontStyle='italic' sx={{ mt: 1, ml: 1, p: 1 }}>none assigned</Typography>
                                    </Grid>}
                            </>
                            :
                            <></>
                        }
                        {/* Other contacts that are not fact checker, author, photographer go here */}
                        {story.contacts.filter(e => e.role !== 'fact checker' && e.role !== 'author' && e.role !== 'photographer').length > 0 ?
                            <>
                                <Grid item xs={3}>
                                    <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                                        Other
                                    </Typography>
                                </Grid>
                                    <Grid item xs={9}>
                                        {story.contacts.filter(e => e.role !== 'fact checker' && e.role !== 'author' && e.role !== 'photographer').map((contact) => {
                                            return (
                                                <Grid container spacing={1} key={contact.id}>

                                                    {/* The below portion can be swapped out with a contact card component once created */}
                                                    <Grid item xs={12}>
                                                        <Box component={Paper} p={1} m={1}>
                                                            <Typography fontWeight='bold'>{contact.name}</Typography>
                                                            <Typography>{contact.email}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                    
                            </>
                            :
                            <></>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}