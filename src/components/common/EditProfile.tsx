import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { TextField, Button, Box } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  name: string;
  email: string;
}

interface EditProfileProps {
  onClose: () => void; 
}

const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
  const { user, updateUserData } = useAuth();
  const [image, setImage] = useState<string | undefined>(user?.image[0]?.url);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateUserData(data);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    // Here should be the logic to upload the image to the server
    // and update the user profile
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Name" variant="outlined" />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Email" variant="outlined" />
        )}
      />
      <Box>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Choose Image
          </Button>
        </label>
        {image && (
          <Box
            component="img"
            src={image}
            alt="Profile"
            sx={{ width: 100, height: 100, marginTop: 2 }}
          />
        )}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
      <Button onClick={handleImageUpload} variant="contained" color="secondary">
        Upload Image
      </Button>
    </Box>
  );
};

export default EditProfile;
