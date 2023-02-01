import React from 'react';
import { story } from '../../sampleStoryData';
import { Box, Grid, Typography } from '@mui/material';
import ListTags from '../../components/ListTags/ListTags';

export default function StoriesPage() {
    return (
        <Box>
            <Grid container space={1}>
                <Grid item xs={9}>
                    <Typography variant='h4'>{story.title}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <ListTags numOfDisplay={4} tags={story.tags}/>
                        {/* {story.tags.map((tag) => {
                            return (
                                <Typography variant='body1' component='button' sx={{ backgroundColor: '#951C2A', color: '#FFFFFF', border: 'none', m: .5, borderRadius: 1 }}>
                                    {tag.name}
                                </Typography>
                            )
                        })} */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}