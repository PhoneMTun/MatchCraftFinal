import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

// Custom styled Box component with hover and active effects
const InteractiveBox = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(1),
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['transform', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.grey[800], // Darker shade on hover
  },
  '@keyframes clickEffect': {
    '0%': {
      transform: 'scale(1.1)',
    },
    '50%': {
      transform: 'scale(0.9)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  '&:active': {
    animation: 'clickEffect 0.4s ease forwards',
  },
}));

export default function Groups() {
  const handleInvite = () => {
    console.log('Inviting user...');
    // Functionality to invite a user
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {[...Array(5)].map((_, index) => (
        <InteractiveBox key={index} onClick={handleInvite}>
          <IconButton color="primary" aria-label="invite">
            <FiPlus size="24" /> {/* Icon */}
          </IconButton>
        </InteractiveBox>
      ))}
    </Box>
  );
}
