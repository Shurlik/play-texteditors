import React from "react";

import { Box } from "@mui/material";
import { getColor } from "@/utils/getColor";
import { FullPageLoaderProps } from "@/interfaces/components/common/FullPageLoader.interface";

import Loader from "./Loader";

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ position }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: position ? position : "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: getColor("black"),
        opacity: 0.5,
        flexDirection: "column",
        zIndex: 99999,
      }}
    >
      <Loader />
    </Box>
  );
};

export default FullPageLoader;
