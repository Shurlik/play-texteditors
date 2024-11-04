import React from "react";

import { Box, Slide } from "@mui/material";
import { getColor } from "@/utils/getColor";

interface CustomSlideProps {
  children: React.ReactNode;
  condition: boolean;
}

const colors = {
  background: getColor("background"),
};

const CustomSlide: React.FC<CustomSlideProps> = ({ children, condition }) => {
  return (
    <Box
      sx={{
        backgroundColor: colors.background,
        padding: "1rem 2rem",
        margin: "3rem auto 0",
        borderRadius: "1rem",
        width: "50rem",
      }}
    >
      <Slide
        direction="down"
        in={condition}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Slide>
    </Box>
  );
};

export default CustomSlide;
