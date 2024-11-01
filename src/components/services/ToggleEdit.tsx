import React from 'react';

import { Box, Typography } from "@mui/material";
import { getColor } from '@/utils/getColor';
import BorderColorIcon from "@mui/icons-material/BorderColor";

// Define the props type
interface ToggleEditProps {
  onClick: () => void; // Function to handle the click event
  isEdit: boolean;     // Boolean indicating edit mode
  loading: boolean;    // Boolean indicating loading state
}

const ToggleEdit: React.FC<ToggleEditProps> = ({ onClick, isEdit, loading }) => {
  return (
    <Box
      onClick={loading ? undefined : onClick}
      sx={{
        position: 'absolute',
        top: '-10px',
        right: '10px',
        borderRadius: '10px',
        display: 'flex',
        gap: '.4rem',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: '.3s',
        padding: '.2rem .5rem',
        color: isEdit ? getColor("mainGreen") : getColor("orange"),
        '&:hover': {
          color: !isEdit ? getColor("mainGreen") : getColor("orange"),
        }
      }}
    >
      <Typography
        variant='body1'
        sx={{
          color: 'inherit',
          fontSize: '1.2rem',
          fontWeight: '600',
        }}
      >
        Edit
      </Typography>
      <BorderColorIcon sx={{ fontSize: '.9rem', color: 'inherit' }} />
    </Box>
  );
};

export default ToggleEdit;