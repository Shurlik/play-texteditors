import React from "react";

import { Box, Typography } from "@mui/material";

import packageJson from "../../../package.json";
import { getColor } from "../../utils/getColor";

// Get the API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const serverType = apiUrl === "http://localhost:8080" ? "Local" : "Remote";

const Version: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
      }}
    >
      <Typography sx={{ color: getColor("lightGray") }}>
        {`v.${packageJson.version}\n\n${serverType}`}
      </Typography>
    </Box>
  );
};

export default Version;
