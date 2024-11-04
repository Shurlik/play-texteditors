import Link from "next/link";
import React, { useState } from "react";

import { Box, List, ListItem, Typography, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getColor } from "@/utils/getColor";

import { StrategyIcon } from "../common/Icons";
import { strategyItems } from "../navigation/NavigationList";

interface StrategySectionProps {
  toggleSidebar: () => void;
  isPinned: boolean;
}

const colors = {
  white: getColor("white"),
  greybg: getColor("greyBg"),
  greyhover: getColor("greyHover"),
  black: getColor("black"),
  mainGreen: getColor("mainGreen"),
  orange: getColor("orange"),


}

const StrategySection: React.FC<StrategySectionProps> = ({
  toggleSidebar,
  isPinned,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <List sx={{ padding: 0, width: "100%", mt: "10px" }}>
      <Box
        onClick={handleToggle}
        sx={{
          borderRadius: "4px",
          padding: "8px 12px",
          width: "calc(100% - 24px)",
          color: colors.black,
          cursor: "pointer",
          backgroundColor: colors.mainGreen,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: "inherit" }}>
          <StrategyIcon />
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: "8px",
              fontSize: "14px",
              color: "inherit",
            }}
          >
            Strategy
          </Typography>
        </Box>
        {isOpen ? (
          <ExpandLess sx={{ color: "inherit" }} />
        ) : (
          <ExpandMore sx={{ color: "inherit" }} />
        )}
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          sx={{
            padding: "8px 12px",
            backgroundColor: colors.greybg,
            borderRadius: "4px",
          }}
        >
          {strategyItems.map((item) => {
            const isActive =
              typeof window !== "undefined" &&
              window.location.pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link || ""}
                onClick={!isPinned ? toggleSidebar : undefined}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItem
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: isActive
                      ? colors.greyhover
                      : "transparent",
                    color: isActive ? colors.orange : colors.white,
                    "&:hover": {
                      backgroundColor: colors.greyhover,
                      color: colors.orange,
                    },
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "8px",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ fontSize: "14px", color: "inherit" }}>
                    {item.name}
                  </Typography>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default StrategySection;
