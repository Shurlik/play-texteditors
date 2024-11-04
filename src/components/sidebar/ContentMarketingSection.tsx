import Link from "next/link";
import React, { useState } from "react";

import { Box, List, ListItem, Typography, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getColor } from "@/utils/getColor";

import { ArticlesIcon } from "../common/Icons";
import { contentItems } from "../navigation/NavigationList";

interface ContentItem {
  name: string;
  link: string;
  disabled?: boolean;
  icon: React.ReactNode;
}

interface ContentMarketingSectionProps {
  toggleSidebar: () => void;
  isPinned: boolean;
}

const colors = {
  black: getColor("black"),
  mainGreen: getColor("mainGreen"),
  grey: getColor("grey"),
  orange: getColor("orange"),
  greyhover: getColor("greyHover"),
  greybg: getColor("greyBg"),
};

export const ContentMarketingSection: React.FC<
  ContentMarketingSectionProps
> = ({ toggleSidebar, isPinned }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
          <ArticlesIcon style={{ fontSize: "20px" }} />
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: "8px",
              fontSize: "14px",
              color: "inherit",
            }}
          >
            Content Marketing
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
          {contentItems.map((item: ContentItem) => {
            const isDisabled = item.disabled;

            return (
              <Link
                key={item.name}
                href={item.link}
                passHref // Use passHref to ensure the child component receives the link correctly
              >
                <ListItem
                  onClick={!isPinned ? toggleSidebar : undefined}
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: "transparent", 
                    color: "inherit", 
                    "&:hover": {
                      backgroundColor: isDisabled
                        ? "transparent"
                        : colors.greyhover,
                      color: isDisabled ? colors.grey : colors.orange,
                    },
                    opacity: isDisabled ? 0.5 : 1,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: isDisabled ? "none" : "auto",
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
