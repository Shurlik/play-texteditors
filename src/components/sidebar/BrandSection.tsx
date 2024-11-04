// BrandSection.tsx
import React, { useState } from "react";

import { ExpandLess, ExpandMore, Highlight } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";

import { brandItems } from "../navigation/NavigationList";

interface BrandSectionProps {
  toggleSidebar: () => void;
  isPinned: boolean;
}

const colors = {
  mainGreen: getColor("mainGreen"),
  black: getColor("black"),
  white: getColor("white"),
  greybg: getColor("greyBg"),
  orange: getColor("orange"),
  grey: getColor("grey"),
  greyhover: getColor("greyHover"),
};

const BrandSection: React.FC<BrandSectionProps> = ({
  toggleSidebar,
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    Brand2: true,
  });

  const handleClick = (title: string) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  return (
    <List sx={{ pb: "120px", width: "100%", mt: "10px" }}>
      <Box
        onClick={() => handleClick("Brand2")}
        sx={{
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
          backgroundColor: colors.mainGreen,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Highlight sx={{ color: colors.black, fontSize: "15px" }} />
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: "8px",
              fontSize: "14px",
              color: colors.black,
            }}
          >
            Brand
          </Typography>
        </Box>
        {openItems["Brand2"] ? (
          <ExpandLess sx={{ color: colors.black }} />
        ) : (
          <ExpandMore sx={{ color: colors.black }} />
        )}
      </Box>

      <Collapse in={openItems["Brand2"]} timeout="auto" unmountOnExit>
        <List
          component="div"
          sx={{
            paddingX: "16px",
            backgroundColor: colors.greybg,
            borderRadius: "4px",
          }}
        >
          {brandItems.map((item) => (
            <React.Fragment key={item.name}>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={toggleSidebar}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: item.disabled ? colors.grey : colors.black,
                  }}
                >
                  {item.icon}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      marginLeft: "6px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </ListItem>
              {item.subItems && item.subItems.length > 0 && (
                <Collapse in={openItems[item.name]} timeout="auto" unmountOnExit>
                  <List component="div" sx={{ paddingLeft: "16px" }}>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: subItem.disabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {subItem.icon}
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            marginLeft: "6px",
                            color: subItem.disabled ? colors.grey : colors.black,
                          }}
                        >
                          {subItem.name}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default BrandSection;