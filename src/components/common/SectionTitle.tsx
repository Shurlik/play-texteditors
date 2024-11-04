import React from "react";

import { Typography, SxProps } from "@mui/material";
import { getColor } from "@/utils/getColor";

interface SectionTitleProps {
  title: string;
  sx?: SxProps;
}

const colors = {
  white: getColor("white"),
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title, sx }) => {
  return (
    <Typography
      variant="h6"
      fontWeight="bold"
      fontSize="1.4rem"
      mt={1}
      mb={0.5}
      color={colors.white}
      sx={sx}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
