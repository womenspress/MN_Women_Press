import React, { useState } from "react";
import ThemeCard from '../../components/ThemeCard/ThemeCard';
import { Grid } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box } from "@mui/system";

export default function ThemeCalendar(props){
    const [year, setYear] = useState(props.year || new Date().getFullYear());
    const themeArray = props.themeArray || [ {name: "Theme Array Not Found", description: "Not Found", month: "January", year: year}];

    const displayPreviousYear = () => {
        setYear(year - 1);
    }

    const displayNextYear = () => {
        setYear(year + 1);
    }

    const byYear = (theme) => {
        return theme.year === year;
    }

    return (
        <Box sx={{ display: 'flex' }} id="theme-calender-body">
                <div className="theme-arrows" id="left-arrow"
                    onClick={()=> displayPreviousYear()}
                    >
                    <ArrowLeftIcon/>
                </div>
                <Box id="theme-calendar-interior-body">
                    <center>
                        <h2>
                            {year}
                        </h2>
                    
                    {/* theme calender will be a grid display 4 across 3 down (12 cards total) */}
                    <Grid sx={{ justifyContent: 'center' }} container id="theme-calendar-cards">
                        {
                            // filters by current year displayed and maps remaining theme cards
                            themeArray.filter(byYear).map((theme, index) => {
                                return (
                                    // <div>{theme.name}: Card #{index}</div>
                                    <ThemeCard 
                                        name={theme.name} 
                                        description={theme.description} 
                                        month={theme.month} 
                                        year={theme.year} 
                                        stories={theme.stories}
                                        contacts={theme.contacts}
                                        key={index}/>
                                )
                            })
                        }
                    </Grid>
                    </center>
                </Box>
                <div className="theme-arrows" id="right-arrow"
                    onClick={()=>displayNextYear()}>
                    <ArrowRightIcon/>
                </div>
        </Box>
    )
}