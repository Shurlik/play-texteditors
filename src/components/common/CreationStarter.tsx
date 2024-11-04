import {
  createUser,
  updateRecord,
  uploadFile,
} from "@/api/services/airtableService";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Box, Button, TextField, Typography } from "@mui/material";
import { fullPersonData, personaKeys } from "@/constants/prompts/fullPersData";
import { getColor } from "@/utils/getColor";
import { loginInputStyles } from "@/constants/theme/inputStyles";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import imageAdd from "@/images/imageAdd.png";

import VisuallyHiddenInput from "../services/VisuallyHiddenInput";
import GenderButton from "./GenderButton";
import Loader from "./Loader";

interface CreationStarterProps {
  onFinish: (id: string) => void;
  setShowStart: (show: boolean) => void;
}

const colors = {
  white: getColor("white"),
  black: getColor("black"),
  darkGreen: getColor("darkGreen"),
  green227: getColor("green227"),
  mainGreen: getColor("mainGreen"),
  background: getColor("background"),
};

const CreationStarter: React.FC<CreationStarterProps> = ({
  onFinish,
  setShowStart,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [offer, setOffer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleOfferChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOffer(event.target.value);
  };

  const clear = () => {
    if (loading) return;
    setPreviewUrl(null);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async (id: string) => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await uploadFile(id, formData);
        clear();
      } catch (e) {
        console.error("Upload error:", e);
        toast.error("Upload error");
      }
    }
    setLoading(false);
  };

  const startHandler = async ({ isFull }: { isFull: boolean }) => {
    if (!country || !gender) {
      toast.error("Please set the Country and Gender");
      return;
    }
    setLoading(true);
    try {
      const data = await createUser({ country, gender, offer });
      if (file) {
        await handleFileUpload(String(data.id));
      }
      await fullPersonCreate(String(data.id));
      if (isFull) {
        navigate.push("/persons", { replace: true });
      } else {
        onFinish(String(data.id));
      }
    } catch (e) {
      console.error("User creation error:", e);
      toast.error("User creation error");
    }
    setLoading(false);
  };

  const fullPersonCreate = async (userId: string) => {
    setLoading(true);
    try {
      await updateRecord(userId, personaKeys, fullPersonData);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Box
      sx={{
        margin: "0 auto",
        paddingY: "5rem",
        maxWidth: "100rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "5rem",
          gap: "5rem",
          borderRadius: "1.5rem",
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: colors.darkGreen,
              padding: "1.5rem",
              border: `1px solid ${colors.green227}`,
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              position: "relative",
            }}
          >
            <Box
              sx={{
                border: `1px dashed ${colors.green227}`,
                borderRadius: "1rem",
                width: "300px",
                height: "250px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.black,
                }}
              >
                {previewUrl ? (
                  <Box
                    component={"img"}
                    alt={"user image"}
                    src={previewUrl}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    component={"img"}
                    alt={"user image"}
                    src={imageAdd}
                    sx={{
                      width: "64px",
                      height: "64px",
                      objectFit: "cover",
                      opacity: 0.5,
                    }}
                  />
                )}
              </Box>
              {file && (
                <Box
                  onClick={clear}
                  sx={{
                    cursor: "pointer",
                    zIndex: 77777,
                    position: "absolute",
                    top: ".8rem",
                    right: ".9rem",
                    fontSize: "1.5rem",
                  }}
                >
                  ❌
                </Box>
              )}
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: colors.mainGreen }}>
                Choose a file or drag & drop it here
              </Typography>
              <Typography sx={{ fontSize: ".7rem", marginTop: ".5rem" }}>
                JPEG, PNG formats, up to 5MB
              </Typography>
            </Box>
            <Button
              onChange={handleFileChange}
              sx={{ width: "100%", paddingY: ".7rem", fontWeight: "bold" }}
              component="label"
              role={undefined}
              variant="outlined"
              color={"secondary"}
              disabled={loading}
            >
              Browse File
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
              />
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box>
            <Typography sx={{ color: colors.white, fontWeight: "500" }}>
              Enter the Country for your persona
            </Typography>
            <TextField
              sx={loginInputStyles}
              margin="dense"
              id="country"
              name="country"
              fullWidth
              autoFocus
              variant="standard"
              disabled={loading}
              required
              value={country}
              onChange={handleCountryChange}
            />
          </Box>
          <Box sx={{ marginTop: "2rem" }}>
            <Typography sx={{ color: colors.white, fontWeight: "500" }}>
              Select the gender of your persona
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem", marginTop: "10px" }}>
              <GenderButton
                disabled={loading}
                gender={"Male"}
                selected={gender === "Male"}
                onClick={setGender}
              />
              <GenderButton
                disabled={loading}
                gender={"Female"}
                selected={gender === "Female"}
                onClick={setGender}
              />
              <GenderButton
                disabled={loading}
                gender={"Non-Binary"}
                selected={gender === "Non-Binary"}
                onClick={setGender}
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: "3rem" }}>
            <Typography sx={{ color: colors.white, fontWeight: "500" }}>
              Enter Your Offer
            </Typography>
            <TextField
              sx={loginInputStyles}
              margin="dense"
              id="offer"
              name="offer"
              fullWidth
              variant="standard"
              disabled={loading}
              multiline
              rows={4}
              value={offer}
              onChange={handleOfferChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <Button
              sx={{
                width: "100%",
                paddingY: ".7rem",
                fontWeight: "bold",
                maxWidth: "15rem",
                border: `1px solid ${colors.background}`,
              }}
              disabled={loading}
              variant="outlined"
              color={"secondary"}
              startIcon={<AutoFixHighIcon />}
              onClick={() => startHandler({ isFull: true })}
            >
              Create Full Persona
            </Button>
            <Button
              sx={{
                width: "100%",
                paddingY: ".7rem",
                fontWeight: "bold",
                maxWidth: "15rem",
                border: `1px solid ${colors.background}`,
              }}
              disabled={loading}
              variant="outlined"
              color={"secondary"}
              startIcon={<AccountTreeIcon />}
              onClick={() => startHandler({ isFull: false })}
            >
              Use Persona Template
            </Button>
          </Box>
        </Box>
      </Box>
      {loading && <Loader />}
    </Box>
  );
};

export default CreationStarter;
