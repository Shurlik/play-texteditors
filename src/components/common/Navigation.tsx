"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Box } from "@mui/material";
import authService from "@/api/services/authService";

import ThemeSwitcher from "../services/ThemeSwitcher";
import DialogLogout from "./DialogLogout";
import { LogoIcon } from "./Icons";
import NavigationLinks from "./NavigationLinks";
import UserMenuItem from "./UserMenuItem";

const Navigation: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Make this an async function to match DialogLogout's expectations
  const logoutHandler = async (): Promise<void> => {
    await authService.logout();
    router.replace("/login");
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: "1rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        onClick={() => router.push("/")}
        sx={{
          cursor: "pointer",
        }}
      >
        <LogoIcon />
      </Box>
      <NavigationLinks />
      <Box sx={{ display: "flex" }}>
        <ThemeSwitcher />
        <Box>
          <UserMenuItem onLogout={() => setModalOpen(true)} />
          <DialogLogout
            onSubmit={logoutHandler}
            onClose={() => setModalOpen(false)}
            isOpen={modalOpen}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
