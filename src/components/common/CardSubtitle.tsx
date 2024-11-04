import React from "react";

import { Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";

interface CardSubtitleProps {
  header: string;
  text: string;
}

const colors = {
  white: getColor("white"),
  gray2: getColor("gray2"),
};

const CardSubtitle: React.FC<CardSubtitleProps> = ({ header, text }) => {
  return (
    <Typography
      sx={{
        fontWeight: "700",
        fontSize: ".9rem",
        marginTop: ".8rem",
        textAlign: "left",
        color: colors.white,
      }}
    >
      <Typography variant="inherit" component="span">
        {header}:&nbsp;&nbsp;&nbsp;
      </Typography>
      <Typography
        sx={{
          color: colors.gray2,
          fontWeight: "normal",
        }}
        variant="inherit"
        component="span"
      >
        {text}
      </Typography>
    </Typography>
  );
};

export default CardSubtitle;
