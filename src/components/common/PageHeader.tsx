import React from "react";

import { Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";

interface PageHeaderProps {
  header: string;
  sx?: object;
}

const PageHeader: React.FC<PageHeaderProps> = ({ header, sx }) => {
  return (
    <Typography
      variant="h3"
      gutterBottom
      sx={{
        textAlign: "left",
        mt: 2,
        color: getColor("white"),
        ...sx,
      }}
    >
      {header}
    </Typography>
  );
};

export default PageHeader;
