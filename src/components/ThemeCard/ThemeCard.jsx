import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ThemeModal from '../ThemeModal/ThemeModal';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard(props) {
    let theme = props.theme;
    let id = props.theme.id;
    let name = props.theme.name;
    let description = props.theme.description;
    let month = props.theme.month;
    let year =props.theme.year;
    let stories = props.theme.stories 
    let contacts = props.theme.contacts

    const openThemeModule = (id) => {
        console.log('Open module for theme id: ', id);
    }

    return (
        <Card sx={{ width: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {month}, {year}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <ThemeModal 
                    theme={theme}
                    id={id}
                    name={name} 
                    description={description} 
                    month={month} 
                    year={year} 
                    stories={stories}
                    contacts={contacts}
                    
                    />
            </CardActions>
        </Card>
    );
}