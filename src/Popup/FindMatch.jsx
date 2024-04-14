import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Create a dark theme instance
const theme = createTheme({
  palette: {
    mode: 'dark', // Set theme to dark
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#1976d2',
          }
        },
      },
    },
  },
});

const AnimatedBox = animated(Box);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function FindMatch({ matches, open, handleClose }) {
  const navigate = useNavigate(); // Initialize navigate hook
  const springStyle = useSpring({
    to: { opacity: 1, transform: 'translateY(0)' },
    from: { opacity: 0, transform: 'translateY(-100px)' },
    config: { duration: 300 },
  });

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AnimatedBox style={springStyle} sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Match Results
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {matches?.map((match) => (
              <ListItem key={match.id} divider sx={{ display: 'flex', justifyContent: 'center', '&:hover': { bgcolor: '#f5f5f5' } }}>
                <ListItemText
                  primary={match.name}
                  secondary={`${match.username} - ${match.steamId}`}
                  sx={{ textAlign: 'center', my: 'auto' }}
                  onClick={() => navigate(`/matchcraft/profile/${match.id}`)}
                />
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClose} color="primary" variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        </AnimatedBox>
      </Modal>
    </ThemeProvider>
  );
}
