import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Avatar, Grid, createTheme, ThemeProvider } from '@mui/material';
import heroesData from '../../ref/HeroesData.json';
import PlayerStatsChart from '../charts/KDAChart'; // Ensure the path is correct for your project structure
import '../../RecentMatches.css'; // Adjust the path as needed for your CSS

// Configuration for Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define a custom dark theme for MUI components
    const dotaTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        main: '#c23616',
        },
    },
    typography: {
        fontFamily: '"Radiance", "Roboto", "Helvetica", "Arial", sans-serif',
        allVariants: {
        color: 'rgba(255, 255, 255, 0.87)',
        },
    },
});

const RecentMatches = ({ steamId }) => {
    const [recentMatches, setRecentMatches] = useState([]);

    useEffect(() => {
        const fetchRecentMatches = async () => {
            const response = await axios.get(`https://api.opendota.com/api/players/${steamId}/recentMatches`);
            setRecentMatches(response.data);
        };

        fetchRecentMatches();
    }, [steamId]);

    const getHeroData = (heroId) => heroesData.find((hero) => hero.id === heroId);

    return (
        <ThemeProvider theme={dotaTheme}>
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="h4" gutterBottom className="fadeIn">
                    Recent Matches
                </Typography>
                <Box sx={{ overflowX: 'auto' }}>
                    <Grid container spacing={2} wrap="nowrap" className="fadeIn">
                        {recentMatches.map((match, index) => {
                            const heroData = getHeroData(match.hero_id);
                            return (
                                <Grid item key={index} sx={{ minWidth: 240 }} className="grow">
                                    <Paper elevation={6} sx={{ padding: 2, margin: 'auto', maxWidth: 345, animation: 'fadeIn 0.5s ease-in-out', animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">Hero</TableCell>
                                                        <TableCell align="right">
                                                            <Avatar src={`https://cdn.dota2.com/apps/dota2/images/heroes/${heroData?.name?.replace('npc_dota_hero_', '')}_lg.png`} alt={heroData?.localized_name} />
                                                            {heroData?.localized_name}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>K/D/A</TableCell>
                                                        <TableCell align="right">{match.kills}/{match.deaths}/{match.assists}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Hero Damage</TableCell>
                                                        <TableCell align="right">{match.hero_damage}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Tower Damage</TableCell>
                                                        <TableCell align="right">{match.tower_damage}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Last Hits</TableCell>
                                                        <TableCell align="right">{match.last_hits}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Win</TableCell>
                                                        <TableCell align="right">{match.radiant_win ? 'Yes' : 'No'}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                {/* Integrate PlayerStatsChart here */}
                <PlayerStatsChart data={recentMatches} />
            </Box>
        </ThemeProvider>
    );
};

export default RecentMatches;
