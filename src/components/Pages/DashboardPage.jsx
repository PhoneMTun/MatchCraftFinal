import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import wall2 from '../../assets/wall2.png';
import matchCraft from '../../assets/matchCraft.gif';
import UserContext from '../../context/UserContext';
import Groups from '../Compo/Groups';
import { RotatingTriangles } from 'react-loader-spinner';
import '../../App.css';
import ChatComponent from '../Compo/ChatComponent';
import FindMatch from '../../Popup/FindMatch';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function DashboardPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showMatchFinding, setShowMatchFinding] = useState(false);
    const [matchData, setMatchData] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const fetchMatches = async () => {
        setShowMatchFinding(true);
        try {
            const response = await axios.get('http://localhost:8080/api/matchmaking/7', { withCredentials: true });
            setMatchData(response.data);
            // console.log(response.data);
            setOpenModal(true); // Open the modal to show the matches
        } catch (error) {
            console.error('Error fetching match data:', error);
        }
        setShowMatchFinding(false); // Hide the GIF after the data is fetched or in case of error
    };

    const handleFindMatchClick = () => {
        setShowMatchFinding(true); // Show the GIF
        setTimeout(() => {
            fetchMatches(); // Fetch the match data after 2.3 seconds
        }, 2500);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            {isLoading ? (
                <RotatingTriangles
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="rotating-triangles-loading"
                    wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />
            ) : (
                <div style={{
                    backgroundImage: `url(${wall2})`,
                    backgroundSize: 'cover',
                    height: 'calc(100vh - 100px)',
                    backgroundPosition: 'center',
                }}>
                    {showMatchFinding && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <img src={matchCraft} alt="Finding Match" style={{ width: '80%'}}/>
                        </div>
                    )}
                    <div style={{ textAlign: 'center', color: 'white', paddingTop: '20vh' }}>
                        <h1>Hello {user.name}! Welcome to MatchCraft</h1>
                    </div>
                    <ChatComponent />
                    <Groups />
                    <button onClick={handleFindMatchClick} className="view-profile-trigger">
                        Find Match
                    </button>
                    <FindMatch open={openModal} handleClose={handleCloseModal} matches={matchData} />
                </div>
            )}
        </>
    );
}
