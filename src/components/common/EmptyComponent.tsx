import React from 'react';

import { Container, Typography } from "@mui/material";
import { getColor } from '@/utils/getColor';

const colors = {
  gray40: getColor("gray40")
}

const EmptyComponent: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant={'h2'}
        sx={{
          color: colors.gray40,
        }}
      >
        No data found
      </Typography>
    </Container>
  );
};

export default EmptyComponent;