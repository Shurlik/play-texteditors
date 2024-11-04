import React from 'react';

import { Box } from '@mui/material';
import { getColor } from '@/utils/getColor';

interface CustomStepIconProps {
  active: boolean;
  icon: React.ReactNode; 
}

const colors = { 
  black: getColor("black"), 
  mainGreen: getColor("mainGreen"), 
  
}

const CustomStepIcon: React.FC<CustomStepIconProps> = ({ active, icon }) => {
  const ownerState = { active };

  return (
    <Box
      sx={{
        transition: '.3s',
        border: `1px dashed ${colors.mainGreen}`,
        padding: '15px',
        borderRadius: '50%',
        opacity: ownerState.active ? 1 : 0.3,
        color: colors.black,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          transition: '.3s',
          backgroundColor: colors.mainGreen,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 0 10px 0px ${colors.mainGreen}`,
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

export default CustomStepIcon;