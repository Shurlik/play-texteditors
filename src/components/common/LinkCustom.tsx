import Link from "next/link";
import React from "react";

import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getColor } from "@/utils/getColor";

const colors = {
  black: getColor("black"),
  white: getColor("white"),
};

interface LinkCustomProps {
  name: string;
  active?: boolean;
  to: string;
  onClick?: () => void;
  Icon?: React.ElementType; // Add Icon prop to the interface
}

const LinkCustom: React.FC<LinkCustomProps> = ({
  name,
  active,
  to,
  onClick,
  Icon,
}) => {
  return (
    <ListItem disablePadding>
      <Link href={to} passHref>
        <ListItemButton onClick={onClick} selected={active}>
          {Icon && <Icon />} 
          <ListItemText
            sx={{
              margin: 0,
            }}
            primary={name}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              lineHeight: 1,
              color: active ? colors.black : colors.white,
            }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default LinkCustom;