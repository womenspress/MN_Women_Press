import React from 'react';
import { story } from '../../sampleStoryData';
import { Box, Grid, Typography, Paper } from '@mui/material';
import ListTags from '../../components/ListTags/ListTags';

export default function StoriesPage() {
    return (
        <Box>
            <Grid container space={1}>
                {/* This grid row contains story header and tags */}
                <Grid item xs={9}>
                    <Typography variant='h4'>{story.title}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <ListTags numOfDisplay={4} tags={story.tags} />
                    </Box>
                </Grid>
                {/* This grid row contains 2 sections, 1 for general info and 1 that holds to-do + comments */}
                <Grid item xs={6} sx={{ backgroundColor: 'lightgrey' }}>
                    <Grid container space={1}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>General Info</Typography>
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
                        {story.phot_required ?
                            <>
                                <Grid item xs={3}>
                                    <Typography variant='body1' sx={{ textAlign: 'right', mt: 1, p: 1 }}>
                                        Author
                                    </Typography>
                                </Grid>
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