import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, MouseEvent } from "react";

import { Box, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";
import { useAuth } from "@/contexts/AuthContext";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import officeBoy from "@/images/cartoon-office-boy.png";
import officeGirl from "@/images/cartoon-office-girl.png";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import DropMenu from "./DropMenu";

interface UserMenuItemProps {
  onLogout: () => void;
}

const colors = {
  silver: getColor("silver"),
  lightGray: getColor("lightGray"),
};

const UserMenuItem: React.FC<UserMenuItemProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".9rem",
        cursor: "pointer",
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          overflow: "hidden",
          borderRadius: "50%",
          backgroundColor: colors.silver,
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          alt="user avatar"
          src={
            user?.image
              ? user.image
              : user?.Gender === "Female"
              ? officeGirl
              : officeBoy
          }
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: ".9rem" }}>
          {user?.name}
        </Typography>
        <Typography
          sx={{
            color: colors.lightGray,
            fontSize: ".8rem",
          }}
        >
          {user?.email}
        </Typography>
      </Box>

      <DropMenu
        isAdmin={user?.role === "super-admin"}
        onClose={handleClose}
        open={open}
        data={[
          {
            title: "Users",
            icon: PeopleAltIcon,
            fn: () => router.push("/users"),
            admin: true,
          },
          {
            title: "Prompts",
            icon: FormatColorTextIcon,
            fn: () => router.push("/prompts"),
            admin: true,
          },
          {
            title: "Profile",
            icon: ManageAccountsIcon,
            fn: () => router.push("/profile"),
          },
          { title: "Logout", icon: LogoutIcon, fn: onLogout },
        ]}
        anchorEl={anchorEl}
      />
    </Box>
  );
};

export default UserMenuItem;
