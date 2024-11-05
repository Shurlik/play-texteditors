import React, { useRef, useState, ChangeEvent } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { uploadProfileFile } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import authService from "@/api/services/authService";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import noLogo from "../../assets/images/no-logo.png";
import Loader from "./Loader";

const colors = {
  orange: getColor("orange"),
  black20: getColor("black20"),
  mainGreen: getColor("mainGreen"),
  mainGreen50: getColor("mainGreen50"),
  gray2: getColor("gray2"),
};

// Schema validation
const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Minimum 3 characters"),
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

type FormValues = {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface CreateUserProps {
  onClose: () => void;
  callback: () => Promise<void>;
}

const CreateUser: React.FC<CreateUserProps> = ({ onClose, callback }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleImageClick = () => {
    if (!loading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const { username, password, email, name } = data;
      const user = await authService.register({
        username,
        password,
        email,
        name,
      });
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await uploadProfileFile(formData, user?.id);
      }
      await callback();
      reset();
      onClose();
      toast.success("User created");
    } catch (e) {
      console.error("User create error: ", e);
      toast.error("User create error");
    } finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    reset();
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        sx={{
          border: `4px solid ${colors.orange}`,
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
          component="img"
          alt="user image"
          src={previewUrl || noLogo}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
            "&:hover": { backgroundColor: colors.mainGreen50 },
          }}
        >
          <ImageSearchIcon sx={{ color: colors.orange, fontSize: "2rem" }} />
        </Box>
      </Box>
      <Typography
        variant="h6"
        sx={{ marginBottom: ".5rem", marginTop: "2rem" }}
      >
        Login
      </Typography>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={loading}
            fullWidth
            margin="normal"
            {...field}
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />
      <Box
        sx={{
          borderTop: `1px solid ${colors.gray2}`,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem 0",
        }}
      >
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Create
        </Button>
        <Button
          disabled={loading}
          onClick={cancelHandler}
          fullWidth
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
      </Box>
      {loading && <Loader />}
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default CreateUser;