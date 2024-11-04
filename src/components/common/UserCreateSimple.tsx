import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import { createUser, uploadFile } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import VisuallyHiddenInput from "../services/VisuallyHiddenInput";

const colors = {
  white: getColor("white"),
  silver: getColor("silver"),
  grey: getColor("grey"),
  black: getColor("black"),
  mainGreen: getColor("mainGreen"),
  mainGreen50: getColor("mainGreen50"),
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: colors.white,
  color: colors.black,
  "& .MuiInputBase-root": {
    color: colors.black,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      // borderColor: colors.mainGreen,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.white,
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: colors.white,
  color: colors.black,
  "& .MuiSelect-icon": {
    color: colors.black,
  },
  "&:hover": {
    backgroundColor: colors.silver,
  },
  "&.Mui-focused": {
    backgroundColor: colors.white,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.mainGreen,
    },
  },
}));

const StyledMenuItem = styled(MenuItem)({
  backgroundColor: colors.silver,
  color: colors.black,
  "&:hover": {
    backgroundColor: colors.grey,
  },
  "&.Mui-selected": {
    backgroundColor: colors.white,
    "&:hover": {
      backgroundColor: colors.silver,
    },
  },
});

interface UserCreateSimpleProps {
  onFinish: (id: string) => void;
  setShowStart: (show: boolean) => void;
}

const UserCreateSimple: React.FC<UserCreateSimpleProps> = ({
  onFinish,
  setShowStart,
}) => {
  const [country, setCountry] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [offer, setOffer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(objectUrl);
    }
  };

  const clear = () => {
    setPreviewUrl(null);
    setFile(null);
  };

  const handleFileUpload = async (id: string) => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await uploadFile(id, formData);
      } catch (e) {
        console.log("error: ", e);
        toast.error("Upload error");
      }
    }
    setLoading(false);
  };

  const startHandler = async () => {
    if (!country || !gender) {
      toast.error("Please set the Country and Gender");
      return;
    }
    setLoading(true);
    try {
      const data = await createUser({ country, gender, offer });
      onFinish(data.id.toString()); // Ensure the ID is a string
      if (file) {
        await handleFileUpload(data.id.toString());
      }
      setShowStart(true);
    } catch (e) {
      console.log("User creation error: ", e);
      toast.error("User creation error");
    }
    setLoading(false);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const handleOfferChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffer(event.target.value);
  };

  return (
    <Box>
      <Typography
        sx={{ color: colors.white, fontWeight: "800" }}
        variant={"h2"}
      >
        Let{"'"}s create!
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Typography
            sx={{
              color: colors.white,
              marginTop: "3rem",
              fontSize: "1.3rem",
              fontWeight: "700",
            }}
          >
            Enter the target country for your persona:
          </Typography>
          <StyledTextField
            disabled={loading}
            variant={"outlined"}
            value={country}
            onChange={handleCountryChange}
            fullWidth
            sx={{
              borderRadius: "10px",
              marginBottom: "1rem",
              fontSize: "1.3rem",
            }}
            placeholder="Enter country"
          />

          <Typography
            sx={{
              color: colors.white,
              fontSize: "1.3rem",
              fontWeight: "700",
            }}
          >
            Select the Gender of your persona:
          </Typography>
          <StyledSelect
            disabled={loading}
            value={gender}
            onChange={handleGenderChange}
            fullWidth
            sx={{ borderRadius: "10px", marginBottom: "1rem" }}
          >
            <StyledMenuItem value="Male">Male</StyledMenuItem>
            <StyledMenuItem value="Female">Female</StyledMenuItem>
          </StyledSelect>

          <Typography
            sx={{
              color: colors.white,
              fontSize: "1.3rem",
              fontWeight: "700",
            }}
          >
            Enter your offer:
          </Typography>
          <StyledTextField
            disabled={loading}
            variant={"outlined"}
            value={offer}
            onChange={handleOfferChange}
            fullWidth
            sx={{ borderRadius: "10px", marginBottom: "1rem" }}
            multiline
            rows={4}
          />
        </Box>
        <Box sx={{ padding: "1rem", mt: 5, ml: 10 }}>
          <Box
            sx={{
              border: `2px solid ${colors.silver}`,
              height: "15rem",
              width: "15rem",
              borderRadius: "2rem",
              overflow: "hidden",
            }}
          >
            {previewUrl && (
              <Box
                component="img"
                alt="user image"
                src={previewUrl}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
          <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
            {!!file && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Typography
                  sx={{
                    color: colors.white,
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                  }}
                  component={"span"}
                >
                  {file.name}
                </Typography>
                <Box
                  onClick={loading ? () => {} : clear}
                  component={"span"}
                  sx={{
                    cursor: "pointer",
                    marginBottom: "5px",
                  }}
                >
                  ❌
                </Box>
              </Box>
            )}
            <Button
              sx={{ marginTop: "1rem" }}
              component="label"
              variant="contained"
              accept="image/*"
              startIcon={<CloudUploadIcon />}
            >
              Select file
              <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt={10} sx={{ margin: "5rem auto" }}>
        <Button
          disabled={loading}
          variant="contained"
          onClick={startHandler}
          sx={{
            borderRadius: ".5rem",
            color: colors.black,
            border: `1px solid ${colors.mainGreen}`,
            minWidth: "10rem",
            minHeight: "3rem",
            fontWeight: "bold",
            backgroundColor: colors.mainGreen,
            "&:hover": {
              color: colors.black,
              boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
              backgroundColor: colors.mainGreen,
            },
          }}
        >
          Generate
        </Button>
      </Box>
    </Box>
  );
};

export default UserCreateSimple;