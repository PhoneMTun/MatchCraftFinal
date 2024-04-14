import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button, Grow, Paper, Typography} from '@mui/material';
import UserContext from '../../context/UserContext';
import heroes from '../../ref/HeroesData.json'; // Adjust the import path according to your file structure
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'; // This is correct and should be the only Slider import if using react-slick

import axios from 'axios';

const PreferencesPage = () => {
    const { user } = useContext(UserContext);
    const [selectedRole, setSelectedRole] = useState('');
    const [strategyPreference, setStrategyPreference] = useState('');
    const [preferredHeroes, setPreferredHeroes] = useState([]);
    const [communicationStyle, setCommunicationStyle] = useState('');
    const [preferredGameModes, setPreferredGameModes] = useState([]);
    const [skillLevel, setSkillLevel] = useState('');
    const [playtimeAvailability, setPlaytimeAvailability] = useState('');
    const [gamingGoals, setGamingGoals] = useState('');
    const [languagePreferences, setLanguagePreferences] = useState([]);
    const [checked, setChecked] = useState(true);
    const handleChangeHeroes = (heroName) => {
        const heroIndex = preferredHeroes.indexOf(heroName);
        let newPreferredHeroes = [...preferredHeroes];
        
        if (heroIndex > -1) {
            // Hero is already selected, remove it
            newPreferredHeroes.splice(heroIndex, 1);
        } else {
            // Hero is not selected, add it
            newPreferredHeroes.push(heroName);
        }
        
        setPreferredHeroes(newPreferredHeroes);
    };
    
    

    const heroStyle = {
        position: 'relative',
        textAlign: 'center',
        '&:hover': { transform: 'scale(1.05)', transition: 'transform 300ms ease-in-out' }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const roles = ['Carry', 'Support', 'Offlane', 'Mid', 'Roamer'];
    const strategies = ['Aggression', 'Defense', 'Push', 'Farm'];
    const communicationStyles = ['Text Only', 'Voice Preferred', 'Any'];
    const gameModes = ['Competitive', 'Casual', 'Coop Missions'];
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const playtimes = ['Morning', 'Afternoon', 'Evening', 'Night'];
    const goals = ['Fun', 'Competition', 'Learning'];
    const languages = ['English', 'Spanish', 'French', 'German'];

    const savePreferences = async () => {
        const playingStyle = {
            role: selectedRole,
            strategyPreference: strategyPreference,
            preferredHeroes: preferredHeroes.join(','),
            communicationStyle: communicationStyle,
            preferredGameModes: preferredGameModes.join(','),
            skillLevel: skillLevel,
            playtimeAvailability: playtimeAvailability,
            gamingGoals: gamingGoals,
            languagePreferences: languagePreferences.join(',')
        };
        try {
            await axios.post(`http://localhost:8080/api/playingStyles/user/${user.id}`, playingStyle, { withCredentials: true });
            console.log('Playing style updated successfully');
        } catch (error) {
            console.error('Failed to save playing style:', error);
        }
    };

    return (
        <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})}>
            <Paper sx={{ m: 3, p: 2, bgcolor: 'darkgray', boxShadow: 3}}>
                <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Preferences</Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Role</InputLabel>
                    <Select value={selectedRole} label="Role" onChange={(e) => setSelectedRole(e.target.value)}>
                        {roles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Strategy Preference</InputLabel>
                    <Select value={strategyPreference} label="Strategy Preference" onChange={(e) => setStrategyPreference(e.target.value)}>
                        {strategies.map(strategy => <MenuItem key={strategy} value={strategy}>{strategy}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Communication Style</InputLabel>
                    <Select value={communicationStyle} label="Communication Style" onChange={(e) => setCommunicationStyle(e.target.value)}>
                        {communicationStyles.map(style => <MenuItem key={style} value={style}>{style}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Preferred Game Modes</InputLabel>
                    <Select
                        multiple
                        value={preferredGameModes}
                        label="Preferred Game Modes"
                        onChange={(e) => setPreferredGameModes(e.target.value)}
                        renderValue={selected => selected.join(', ')}
                    >
                        {gameModes.map(mode => (
                            <MenuItem key={mode} value={mode}>
                                <Checkbox checked={preferredGameModes.includes(mode)} />
                                <ListItemText primary={mode} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Skill Level</InputLabel>
                    <Select value={skillLevel} label="Skill Level" onChange={(e) => setSkillLevel(e.target.value)}>
                        {skillLevels.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Playtime Availability</InputLabel>
                    <Select value={playtimeAvailability} label="Playtime Availability" onChange={(e) => setPlaytimeAvailability(e.target.value)}>
                        {playtimes.map(time => <MenuItem key={time} value={time}>{time}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Gaming Goals</InputLabel>
                    <Select value={gamingGoals} label="Gaming Goals" onChange={(e) => setGamingGoals(e.target.value)}>
                        {goals.map(goal => <MenuItem key={goal} value={goal}>{goal}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Language Preferences</InputLabel>
                    <Select
                        multiple
                        value={languagePreferences}
                        label="Language Preferences"
                        onChange={(e) => setLanguagePreferences(e.target.value)}  // Correctly handle the array of selections
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {languages.map((language) => (
                            <MenuItem key={language} value={language}>
                                <Checkbox checked={languagePreferences.includes(language)} />
                                <ListItemText primary={language} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Preferred Heroes</InputLabel>
                    <Slider {...settings}>
    {heroes.map(hero => (
        <div key={hero.id} style={{
            position: 'relative',
            textAlign: 'center',
            border: preferredHeroes.includes(hero.localized_name) ? '3px solid lime' : '1px solid gray',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: preferredHeroes.includes(hero.localized_name) ? '#f4f4f4' : '#fff',
            cursor: 'pointer',
            margin: '5px',
            boxSizing: 'border-box'
        }} onClick={() => handleChangeHeroes(hero.localized_name)}>
            <img
                src={`https://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.replace('npc_dota_hero_', '')}_full.png`}
                alt={hero.localized_name}
                style={{ width: '100%', borderRadius: '8px', opacity: preferredHeroes.includes(hero.localized_name) ? 0.7 : 1 }}
            />
            {preferredHeroes.includes(hero.localized_name) && (
                <div style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    color: 'lime',
                    fontSize: '24px'
                }}>✓</div>
            )}
            <Typography variant="subtitle2" style={{ marginTop: '8px' }}>{hero.localized_name}</Typography>
        </div>
    ))}
</Slider>


                </FormControl>
                <Button sx={{ mt: 3, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }} onClick={savePreferences}>
                    Save Preferences
                </Button>
            </Paper>
        </Grow>
    );
};

export default PreferencesPage;
