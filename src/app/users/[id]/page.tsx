"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { Box, Button, Typography } from "@mui/material";
import { getUser } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import authService from "@/api/services/authService";
import Loader from "@/components/common/Loader";
import ProfileHeader from "@/components/common/ProfileHeader";

import noLogo from "../../../assets/images/no-logo.png";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  image?: string;
  active: boolean;
}

const colors = {
  background: getColor("background"),
  red: getColor("red"),
};

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const {
    data = {},
    isLoading,
    mutate,
  } = useSWR<{ response: User }>(`/user/${id}`, () => getUser(id));

  const blockToggleHandler = async () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          user?.active ? "Disable" : "Enable"
        } this user?`
      )
    ) {
      setLoading(true);
      try {
        await authService.updateProfile({ active: !user?.active }, id);
        await mutate();
      } catch (error) {
        console.error("Error updating record:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && !data?.response?.id) {
      router.replace("/persons");
    }

    if (data?.response?.id) {
      setUser(data.response);
    }
  }, [data, isLoading, router]);

  if (isLoading) {
    return <Loader />;
  }

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
      {!isEditing && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={loading}
            color="warning"
            onClick={() => router.push("/users")}
          >
            Back to list
          </Button>
          {loading ? (
            <Typography>Waiting...</Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{ color: user?.active ? colors.mainGreen : colors.red }}
            >
              Status: {user?.active ? "Active" : "Disabled"}
            </Typography>
          )}
          <Button disabled={loading} color="error" onClick={blockToggleHandler}>
            {user?.active ? "Disable user" : "Enable user"}
          </Button>
        </Box>
      )}
      <ProfileHeader
        title={user?.name || ""}
        image={user?.image || noLogo.src}
        details={user?.email || ""}
        additional={user?.username}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        user={user}
      />
      <Button
        disabled={loading}
        color="primary"
        variant="contained"
        onClick={() => setIsEditing((old) => !old)}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>
    </Box>
  );
};

export default UserProfilePage;
