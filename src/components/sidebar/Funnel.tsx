import Link from "next/link";
import React, { useState } from "react";

import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, ZoomOutMap } from "@mui/icons-material";
import { getColor } from "@/utils/getColor";

import { funnelItems } from "../navigation/NavigationList";

interface FunnelSectionProps {
  toggleSidebar: () => void;
  isPinned: boolean;
}

const colors = {
  mainGreen: getColor("mainGreen"),
  black: getColor("black"),
  white: getColor("white"),
  grey: getColor("grey"),
  greybg: getColor("greyBg"),
  greyhover: getColor("greyHover"),
  orange: getColor("orange"),
};

const FunnelSection: React.FC<FunnelSectionProps> = ({
  toggleSidebar,
  isPinned,
}) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    Funnel: true,
  });

  const handleToggle = (itemName: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [itemName]: !prevOpenItems[itemName],
    }));
  };

  return (
    <List sx={{ padding: 0, width: "100%", mt: "10px" }}>
      <Box
        onClick={() => handleToggle("Funnel")}
        sx={{
          borderRadius: "4px",
          padding: "8px 12px",
          width: "calc(100% - 24px)",
          cursor: "pointer",
          backgroundColor: colors.mainGreen,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ZoomOutMap sx={{ fontSize: "15px", color: colors.black }} />
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: "8px",
              fontSize: "14px",
              color: colors.black,
            }}
          >
            Funnel
          </Typography>
        </Box>
        {openItems["Funnel"] ? (
          <ExpandLess sx={{ color: colors.black }} />
        ) : (
          <ExpandMore sx={{ color: colors.black }} />
        )}
      </Box>

      <Collapse in={openItems["Funnel"]} timeout="auto" unmountOnExit>
        <List
          component="div"
          sx={{
            paddingX: "16px",
            backgroundColor: colors.greybg,
            borderRadius: "4px",
          }}
        >
          {funnelItems.map((item) =>
            item.subItems ? (
              <React.Fragment key={item.name}>
                <Box
                  onClick={() => handleToggle(item.name)}
                  sx={{
                    borderRadius: "4px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.white,
                    }}
                  >
                    {item.icon}
                    <Typography
                      sx={{
                        fontWeight: "700",
                        marginLeft: "8px",
                        fontSize: "14px",
                        color: colors.white,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  {openItems[item.name] ? (
                    <ExpandLess sx={{ color: colors.white }} />
                  ) : (
                    <ExpandMore sx={{ color: colors.white }} />
                  )}
                </Box>
                <Collapse
                  in={openItems[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      paddingLeft: "16px",
                      backgroundColor: colors.greybg,
                      borderRadius: "4px",
                    }}
                  >
                    {item.subItems.map((subItem) => {
                      const isDisabled = subItem.disabled;

                      return (
                        <Link
                          href={subItem.link || ""}
                          key={subItem.name}
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
                              backgroundColor: "transparent",
                              color: "inherit",
                              "&:hover": {
                                backgroundColor: isDisabled
                                  ? "transparent"
                                  : colors.greyhover,
                                color: isDisabled ? colors.grey : colors.orange,
                              },
                              opacity: isDisabled ? 0.5 : 1,
                              padding: "8px 24px",
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
                              {subItem.icon}
                            </Box>
                            <Typography
                              sx={{ fontSize: "12px", color: "inherit" }}
                            >
                              {subItem.name}
                            </Typography>
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <Link
                href={item.link || ""}
                key={item.name}
                style={{
                  textDecoration: "none",
                  pointerEvents: item.disabled ? "none" : "auto",
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItem
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    color: "inherit",
                    "&:hover": {
                      backgroundColor: item.disabled
                        ? "transparent"
                        : colors.greyhover,
                      color: item.disabled ? colors.grey : colors.orange,
                    },
                    opacity: item.disabled ? 0.5 : 1,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {item.icon}
                  <Typography
                    sx={{ color: "inherit", fontSize: "14px", ml: "8px" }}
                  >
                    {item.name}
                  </Typography>
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Collapse>
    </List>
  );
};

export default FunnelSection;
