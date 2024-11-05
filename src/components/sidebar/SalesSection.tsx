"use client"
import Link from "next/link";
import React, { useState } from "react";

import { Box, List, ListItem, Typography, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, TrendingUp } from "@mui/icons-material";
import { getColor } from "@/utils/getColor";

import { salesItems } from "../navigation/NavigationList";

interface SalesSectionProps {
  toggleSidebar: () => void;
  isPinned: boolean;
}

const colors = { 
  black: getColor("black"), 
  mainGreen: getColor("mainGreen"), 
  greybg: getColor("greyBg"),
  greyhover: getColor("greyHover"),
  grey: getColor("grey"),
  orange: getColor("orange")

}

const SalesSection: React.FC<SalesSectionProps> = ({
  toggleSidebar,
  isPinned,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <List sx={{ padding: 0, width: "100%" }}>
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
          marginTop: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: "inherit" }}>
          <TrendingUp style={{ fontSize: "16px" }} />
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: "8px",
              fontSize: "14px",
              color: "inherit",
            }}
          >
            Sales
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
            paddingX: "16px",
            backgroundColor: colors.greybg,
            borderRadius: "4px",
          }}
        >
          {salesItems.map((item) => {
            const isDisabled = item.disabled;

            return (
              <Link
                key={item.name}
                href={item.link || ""}
                onClick={!isPinned ? toggleSidebar : undefined}
                style={{
                  textDecoration: "none",
                  pointerEvents: isDisabled ? "none" : "auto",
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItem
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: isDisabled ? "transparent" : "inherit",
                    color: isDisabled ? colors.grey : "inherit",
                    opacity: isDisabled ? 0.5 : 1,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: isDisabled
                        ? "transparent"
                        : colors.greyhover,
                      color: isDisabled ? colors.grey : colors.orange,
                    },
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

export default SalesSection;
