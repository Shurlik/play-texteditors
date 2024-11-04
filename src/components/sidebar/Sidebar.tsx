import React, { useRef, useEffect } from "react";

import { Box, Button, Drawer, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { getColor } from "@/utils/getColor";
import MenuIcon from "@mui/icons-material/Menu";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

import BrandSection from "./BrandSection";
import { ContentMarketingSection } from "./ContentMarketingSection";
import FunnelSection from "./Funnel";
import SalesSection from "./SalesSection";
import StrategySection from "./Strategy";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleSidebarPin: () => void;
  isPinned: boolean;
}

const drawerWidth = 300;
const collapsedWidth = 60;

const colors = {
  backgroundMain: getColor("backgroundMain"),
  darkGrey42: getColor("darkGrey42"),
  greyhover: getColor("greyHover"),
  white: getColor("white"),
  orangeDark: getColor("orange50"),
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  toggleSidebarPin,
  isPinned,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen &&
        !isPinned
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isPinned, toggleSidebar]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Overlay */}
      {isOpen && !isPinned && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
      )}

      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: isOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          transition: "width 0.3s ease",
          zIndex: 2,
          "& .MuiDrawer-paper": {
            width: isOpen ? drawerWidth : collapsedWidth,
            top: "86px",
            backgroundColor: colors.backgroundMain,
            scrollbarWidth: "none",
            overflowX: "hidden",
            "&::-webkit-scrollbar": { display: "none" },
            borderRight: `1px solid ${colors.darkGrey42} !important`,
            transition: "width 0.3s ease",
            boxShadow: "7px 0px 31px 5px rgb(0 0 0 / 5%)",
          },
        }}
        ref={sidebarRef}
      >
        <Box
          sx={{
            backgroundColor: colors.backgroundMain,
            color: colors.white,
            minHeight: "100vh",
            height: "100%",
            padding: isOpen ? "8px 24px 24px 24px" : "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: isOpen ? "flex-start" : "center",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <Button
            onClick={toggleSidebar}
            sx={{
              backgroundColor: "transparent",
              color: colors.white,
              padding: "8px",
              borderRadius: "8px",
              maxHeight: "40px",
              mt: "8px",
              width: isOpen ? "160px" : "60px",
              mr: isOpen ? "10px" : "0px",
              display: isOpen ? "none" : "flex",
              alignItems: "center",
              transition:
                "background-color 0.3s, border-radius 0.3s, padding 0.3s",
              "&:hover": {
                backgroundColor: isOpen ? colors.orangeDark : colors.greyhover,
              },
            }}
          >
            {isOpen ? <ArrowBack sx={{ marginLeft: "auto" }} /> : <MenuIcon />}
          </Button>

          <IconButton
            onClick={toggleSidebarPin}
            sx={{
              backgroundColor: "transparent",
              color: colors.white,
              padding: "5px",
              borderRadius: "8px",
              display: isOpen ? "flex" : "none",
              alignItems: "center",
              marginTop: "8px",
              marginLeft: "auto",
              transition: "background-color 0.3s",
              "&:hover": { backgroundColor: colors.orangeDark },
            }}
          >
            {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
          </IconButton>

          <Box
            sx={{
              transition: "opacity 0.5s ease",
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              width: "250px",
            }}
          >
            {isOpen && (
              <>
                <StrategySection
                  toggleSidebar={toggleSidebar}
                  isPinned={isPinned}
                />
                <FunnelSection
                  toggleSidebar={toggleSidebar}
                  isPinned={isPinned}
                />
                <SalesSection
                  toggleSidebar={toggleSidebar}
                  isPinned={isPinned}
                />
                <ContentMarketingSection
                  toggleSidebar={toggleSidebar}
                  isPinned={isPinned}
                />
                <BrandSection
                  toggleSidebar={toggleSidebar}
                  isPinned={isPinned}
                />
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
