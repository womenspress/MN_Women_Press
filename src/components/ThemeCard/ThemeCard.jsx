import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard(props) {
    let id = props.id || -1;
    let title = props.title || "undefined";
    let description = props.description || "undefined description";
    let month = props.month || "month undefined"
    let year =props.year || -1

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
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => openThemeModule(id)}>View More</Button>
            </CardActions>
        </Card>
    );
}