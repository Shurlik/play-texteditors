import { useRouter } from "next/navigation";
import React from "react";

import { Box } from "@mui/material";

import defaultListLinks from "../navigation/NavigationList";
import LinkCustom from "./LinkCustom";

const NavigationLinks: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "5rem",
      }}
    >
      {defaultListLinks.map((link) => {
        return (
          <LinkCustom
            key={link.name}
            name={link.name}
            active={router.pathname === link.href}
            to={link.href}
          />
        );
      })}
    </Box>
  );
};

export default NavigationLinks;
