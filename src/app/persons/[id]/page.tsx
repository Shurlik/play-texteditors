"use client";
import {
  getRecordById,
  updateRecord,
  uploadFile,
} from "@/api/services/airtableService";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { Box, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loader from "@/components/common/Loader";
import personaData from "@/constants/prompts/personData";
import PersonDetailTextSection from "@/components/common/PersonDetailTextSection";
import SaveIcon from "@mui/icons-material/Save";

import officeBoy from "../../../assets/images/cartoon-office-boy.png";
import officeGirl from "../../../assets/images/cartoon-office-girl.png";

const KEYS = Object.keys(personaData);
const colors = {
  black: getColor("black"),
  white: getColor("white"),
  darkGrey42: getColor("darkGrey42"),
  background: getColor("background"),
  backgroundMain: getColor("backgroundMain"),
  orange: getColor("orange"),
  orange20: getColor("orange20"),
  orange50: getColor("orange50"),
  mainGreen: getColor("mainGreen"),
};

const fetcher = (url: string) => getRecordById(url.split("/").pop()!);

const PersonDetail = () => {
  const { id } = useParams();
  const { data = {}, isLoading, mutate } = useSWR(`/persons/${id}`, fetcher);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.fields) {
      setFormData(data.fields);
    }
  }, [data.fields]);

  const handleChange = (key: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const saveData = async (updatedData: typeof formData) => {
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await uploadFile(id, formData);
      }

      const dataToSave = {
        ...updatedData,
        Age: Number(updatedData["Age"]),
        "Number of Kids": Number(updatedData["Number of Kids"]),
        "User Image": undefined,
      };
      await updateRecord(id, dataToSave);
      await mutate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    if (loading) return;
    fileInputRef.current?.click();
  };

  const cancelEditing = () => {
    setFormData(data.fields);
    setPreviewUrl(null);
    setFile(null);
    setIsEditing(false);
  };

  const content1 = KEYS.map((key) => (
    <PersonDetailTextSection
      key={key}
      title={key}
      subtitles={personaData[key].keys}
      content={formData}
      isEditing={isEditing}
      onChange={handleChange}
    />
  )).filter((_, index) => index % 2 === 0);

  const content2 = KEYS.map((key) => (
    <PersonDetailTextSection
      key={key}
      title={key}
      subtitles={personaData[key].keys}
      content={formData}
      isEditing={isEditing}
      onChange={handleChange}
    />
  )).filter((_, index) => index % 2 !== 0);

  content2.unshift(
    <PersonDetailTextSection
      key="Personal"
      title="Personal"
      subtitles={["Country", "Gender"]}
      content={formData}
      isEditing={isEditing}
      onChange={handleChange}
    />
  );

  if (isLoading || loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "5rem" }}>
      <Box
        sx={{
          position: "relative",
          maxWidth: "70rem",
          margin: "0 auto",
          backgroundColor: colors.background,
          borderRadius: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            border: `4px solid ${colors.orange}`,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Box
            component="img"
            alt="user image"
            src={
              previewUrl ||
              data?.fields?.["User Image"]?.[0]?.url ||
              (data?.fields?.Gender === "Female" ? officeGirl.src : officeBoy.src)
            }
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(100%)",
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
                backgroundColor: colors.orange20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": { backgroundColor: colors.orange50 },
              }}
            >
              <ImageSearchIcon
                sx={{ color: colors.orange, fontSize: "2rem" }}
              />
            </Box>
          )}
        </Box>
        <Typography variant="h5" sx={{ color: colors.white }}>
          {formData?.Name}
        </Typography>
        <Typography variant="h6" sx={{ color: colors.white }}>
          {formData["Job title"]}
        </Typography>
        <Box
          sx={{ borderTop: `1px solid ${colors.darkGrey42}`, width: "100%" }}
        />
        <Box
          sx={{
            backgroundColor: colors.backgroundMain,
            borderRadius: "1rem",
            padding: "1rem 8px 1rem 0",
            width: "100%",
            marginTop: "3rem",
          }}
        >
          <Box
            sx={{
              padding: "0 1rem 1rem 1rem",
              overflow: "auto",
              maxHeight: "35rem",
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-track": {
                backgroundColor: colors.orange20,
              },
              "&::-webkit-scrollbar-thumb": { backgroundColor: colors.orange },
            }}
          >
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Box sx={{ flexGrow: 1, width: "100%" }}>{content1}</Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>{content2}</Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "25px",
            top: "25px",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          {isEditing ? (
            <>
              <Box
                onClick={cancelEditing}
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
                  Cancel
                </Typography>
                <CancelIcon
                  sx={{
                    fontSize: "1.4rem",
                    color: "inherit",
                    marginLeft: "0.3rem",
                  }}
                />
              </Box>
              <Box
                onClick={() => saveData(formData)}
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
                  sx={{
                    fontSize: "1.4rem",
                    color: "inherit",
                    marginLeft: "0.3rem",
                  }}
                />
              </Box>
            </>
          ) : (
            <Box
              onClick={() => setIsEditing(true)}
              sx={{
                cursor: "pointer",
                color: colors.orange,
                "&:hover": {
                  color: colors.black,
                  backgroundColor: colors.orange,
                },
                padding: ".2rem .5rem",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "inherit", fontSize: "1.4rem", fontWeight: "600" }}
              >
                Edit
              </Typography>
              <BorderColorIcon
                sx={{
                  fontSize: "1.4rem",
                  color: "inherit",
                  marginLeft: "0.3rem",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default PersonDetail;
