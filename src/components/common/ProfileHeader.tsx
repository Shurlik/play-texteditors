import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Box, Button, TextField, Typography } from "@mui/material";
import { loginInputStyles } from "@/constants/theme/inputStyles";
import { useAuth } from "@/contexts/AuthContext";
import { getColor } from "@/utils/getColor";
import { uploadProfileFile } from "@/api/services/airtableService";
import authService from "@/api/services/authService";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SaveIcon from "@mui/icons-material/Save";

interface ProfileHeaderProps {
  image?: string;
  title: string;
  details: string;
  additional?: string;
  circleColor?: string;
  filter?: boolean;
  isEditing: boolean;
  user: { id: string };
}

const colors = {
  gray2: getColor("gray2"),
  orange: getColor("orange"),
  black20: getColor("black20"),
  mainGreen50: getColor("mainGreen50"),
  mainGreen: getColor("mainGreen"),
  white: getColor("white"),
  darkGrey42: getColor("darkGrey42"),
  black: getColor("black"),
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  image,
  title,
  details,
  additional,
  circleColor,
  filter,
  isEditing,
  user,
}) => {
  const { updateUserData } = useAuth();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      setValue("name", title);
      setValue("email", details);
    }
    if (!isEditing) {
      setFile(null);
      setPreviewUrl(null);
    }
  }, [isEditing, setValue, title, details]);

  const handleImageClick = () => {
    if (loading || !fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmit = async (data: { name: string; email: string }) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await uploadProfileFile(formData, user.id);
      }
      await authService.updateProfile(data, user.id);
      await updateUserData();
      toast.success("Updated");
    } catch (e) {
      console.error("submit: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={isEditing ? "form" : "div"} 
      onSubmit={isEditing ? handleSubmit(onSubmit) : undefined} 
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        transition: ".5s",
      }}
    >
      <Typography
        variant={"h6"}
        sx={{
          color: colors.gray2,
        }}
      >
        {additional}
      </Typography>
      {!!image && (
        <Box
          sx={{
            border: `4px solid ${circleColor || colors.orange}`,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Box
            component={"img"}
            alt={"user image"}
            src={previewUrl || image}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: filter ? "grayscale(100%)" : "none",
            }}
          />
          {isEditing && (
            <Box
              onClick={handleImageClick}
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: colors.black20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: ".3s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: colors.mainGreen50,
                },
              }}
            >
              <ImageSearchIcon
                sx={{
                  color: colors.orange,
                  fontSize: "2rem",
                }}
              />
            </Box>
          )}
        </Box>
      )}
      {isEditing ? (
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              disabled={loading}
              inputProps={{
                style: { textAlign: "center" },
              }}
              sx={{ ...loginInputStyles, width: "25rem", textAlign: "center" }}
              {...field}
              variant="standard"
            />
          )}
        />
      ) : (
        <Typography variant={"h5"} sx={{ color: colors.white }}>
          {title}
        </Typography>
      )}
      {isEditing ? (
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              disabled={loading}
              sx={{ ...loginInputStyles, width: "25rem" }}
              {...field}
              variant="standard"
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
          )}
        />
      ) : (
        <Typography variant={"h6"} sx={{ color: colors.white }}>
          {details}
        </Typography>
      )}
      <Box
        sx={{ borderTop: `1px solid ${colors.darkGrey42}`, width: "100%" }}
      />
      <Box sx={{ marginTop: "3rem" }} />
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {isEditing && (
        <Button
          type={"submit"}
          sx={{
            cursor: "pointer",
            color: colors.orange,
            "&:hover": {
              color: colors.black,
              backgroundColor: colors.mainGreen,
            },
            padding: ".2rem .5rem",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "inherit",
              fontSize: "1.4rem",
              fontWeight: "600",
            }}
          >
            Save
          </Typography>
          <SaveIcon
            sx={{ fontSize: "1.4rem", color: "inherit", marginLeft: "0.3rem" }}
          />
        </Button>
      )}
    </Box>
  );
};

export default ProfileHeader;