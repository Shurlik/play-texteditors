import React from "react";

import { Box, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";

interface DetailItemProps {
  label: string;
  value: string | number;
}

const colors = {
  white: getColor("white"),
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        fontSize="1.1rem"
        fontWeight="bold"
        component="span"
        color={colors.white}
      >
        {label}:
      </Typography>
      <Typography fontSize="1.1rem" component="span" color={colors.white}>
        {value}
      </Typography>
    </Box>
  );
};

export default DetailItem;
