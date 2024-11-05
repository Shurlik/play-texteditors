"use client"
import React, { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { Box, Button } from "@mui/material";
import { getColor } from "@/utils/getColor";
import ProfileHeader from "@/components/common/ProfileHeader";

import noLogo from "../../assets/images/no-logo.png";

const colors = {
  background: getColor("background"),
  mainGreen: getColor("mainGreen"),
};

const ProfilePage: React.FC = () => {
  const { user, updateUserData } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      updateUserData();
    };
  }, [updateUserData]);

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "70rem",
        margin: "3rem auto 0",
        backgroundColor: colors.background,
        borderRadius: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        gap: "1rem",
      }}
    >
      <ProfileHeader
        title={user?.name}
        image={user?.image ? user.image : noLogo}
        details={user?.email}
        additional={user?.username}
        circleColor={colors.mainGreen}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <Button
        color={"primary"}
        variant={"contained"}
        onClick={() => setIsEditing((old) => !old)}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>
    </Box>
  );
};

export default ProfilePage;
