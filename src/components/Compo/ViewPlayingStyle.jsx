import React, { useState, useEffect } from 'react';
import axios from 'axios';
import heroesData from '../../ref/HeroesData.json'; // Adjust import path as needed
import { Box, Card, CardActionArea, CardContent, Typography, CircularProgress, Grid, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

export default function ViewPlayingStyle({ userId }) {
  const [playingStyle, setPlayingStyle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchPlayingStyle = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/api/playingStyles/user/search/${userId}`, { withCredentials: true });
          setPlayingStyle(response.data);
        } catch (error) {
          console.error("Error fetching playing style:", error);
        } finally {
          setLoading(false);
        }
    };

    fetchPlayingStyle();
  }, [userId]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;

  if (!playingStyle) return <Typography variant="h5" textAlign="center">No Playing Style Found</Typography>;

  const preferredHeroesImages = playingStyle.preferredHeroes.split(',').map(heroName =>
    heroesData.find(hero => hero.localized_name === heroName)
  );

  return (
    <Box sx={{ marginTop: '20px', padding: '20px' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Playing Style & Preferred Heroes
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mb: 4 }}>
        <Chip label={`Strategy Preference: ${playingStyle.strategyPreference}`} sx={{ bgcolor: 'red', color: 'white' }} />
        <Chip label={`Role: ${playingStyle.role}`} sx={{ bgcolor: 'purple', color: 'white' }} />
        <Chip label={`Communication: ${playingStyle.communicationStyle}`} sx={{ bgcolor: 'gold', color: 'black' }} />
        <Chip label={`Skill Level: ${playingStyle.skillLevel}`} color="secondary" />
        <Chip label={`Playtime: ${playingStyle.playtimeAvailability}`} color="error" />
        <Chip label={`Goals: ${playingStyle.gamingGoals}`} color="info"/>
        <Chip label={`Languages: ${playingStyle.languagePreferences}`} color="success"/>
        <Chip label={`Game Modes: ${playingStyle.preferredGameModes}`} color="warning"/>
      </Stack>
      <Grid container spacing={4} justifyContent="center">
        {preferredHeroesImages.map((hero, index) => hero && (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CustomCard>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" textAlign="center">
                    {hero.localized_name}
                  </Typography>
                  <Box
                    component="img"
                    sx={{
                      height: 150,
                      display: 'block',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      width: '100%',
                      margin: 'auto'
                    }}
                    src={`https://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.replace('npc_dota_hero_', '')}_full.png`}
                    alt={hero.localized_name}
                  />
                </CardContent>
              </CardActionArea>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
