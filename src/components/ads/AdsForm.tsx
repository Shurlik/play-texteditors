"use client";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { getColor } from "@/utils/getColor";

import PageHeader from "../common/PageHeader";
import AdsLeadMagnetSelector from "./AdsLeadMagnetSelector";
import AdsOfferSelector from "./AdsOfferSelector";

type FormData = {
  ad: string;
  title: string;
  content: string;
  propose: string;
  format: string;
  keyword?: string;
  model: string;
  additionalInfo?: string;
};

type AdsFormProps = {
  createBenefits: (data: FormData) => Promise<void>;
  setFormData: (data: FormData | null) => void;
  loading: boolean;
  setSteps: (steps: number | null) => void;
  steps: number;
  formData?: FormData;
};

const schema1 = yup.object().shape({
  ad: yup.string().required("Ads is required"),
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  propose: yup.string().required("Core Value Proposition is required"),
  format: yup.string().required("Format is required"),
  keyword: yup.string(),
  model: yup.string().required("AI model is required"),
});

const schema2 = yup.object().shape({
  ad: yup.string().required("Ads is required"),
  title: yup.string().required("Title is required"),
  keyword: yup.string(),
  model: yup.string().required("AI model is required"),
});

const colors = {
  white: getColor("white"),
};

const AdsForm: React.FC<AdsFormProps> = ({
  createBenefits,
  setFormData,
  loading,
  setSteps,
  steps,
  formData,
}) => {
  const searchParams = useSearchParams();
  const ad = searchParams.get("ad");

  const [variant, setVariant] = useState<string>("");

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(!!variant ? schema2 : schema1),
    defaultValues: formData || {
      ad: ad || "",
      model: "gpt",
      title: "",
      content: "",
      propose: "",
      format: "",
      keyword: "",
      additionalInfo: "",
    },
  });

  const ads = [
    { name: "Facebook", value: "facebook" },
    { name: "Google", value: "google" },
    { name: "Instagram", value: "instagram" },
    { name: "LinkedIn", value: "linkedin" },
    { name: "X", value: "x" },
    { name: "Pinterest", value: "pinterest" },
  ].map((p) => (
    <MenuItem key={p.name} value={p.value}>
      {p.name}
    </MenuItem>
  ));

  const onSubmit = async (data: FormData) => {
    setFormData(data);
    setSteps(null);
    setTimeout(() => setSteps(steps + 1), 350);
    await createBenefits(data);
  };

  const previousStepHandler = () => {
    reset();
    setFormData(null);
    setSteps(null);
    setTimeout(() => setSteps(steps - 1), 400);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageHeader header={"Create Ads Benefits"} />
        <Box>
          <Typography variant={"body1"} sx={{ color: colors.white }}>
            {" "}
            {/* Changed variant to body1 */}
            Model:
          </Typography>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <Select
                className="select"
                disabled={loading}
                {...field}
                error={!!errors.model}
              >
                <MenuItem value={"gpt"}>Chat GPT</MenuItem>
                <MenuItem value={"claude"}>Claude</MenuItem>
              </Select>
            )}
          />
          {errors.model && (
            <Typography color="error">{errors.model.message}</Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          marginBottom: "1rem",
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", width: "100%" }}>
          <Box sx={{ flex: "1 1" }}>
            <Typography variant="subtitle1" gutterBottom>
              Select Ads*
            </Typography>
            <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
              <Controller
                name="ad"
                control={control}
                render={({ field }) => (
                  <Select
                    className="select"
                    disabled={loading || !!ad}
                    {...field}
                  >
                    <MenuItem value={``}>
                      <em>None</em>
                    </MenuItem>
                    {ads}
                  </Select>
                )}
              />
              {errors.ad && (
                <Typography color="error">{errors.ad.message}</Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ flex: "2 1" }}>
            <Typography variant="subtitle1" gutterBottom>
              Main keyword for SEO
            </Typography>
            <Controller
              name="keyword"
              control={control}
              render={({ field }) => (
                <TextField
                  disabled={loading}
                  {...field}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1 }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginBottom: "1rem",
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box sx={{ flex: "1 1" }}>
          <Typography variant="subtitle1" gutterBottom>
            Enter the Title*
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={loading}
                {...field}
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{ mb: 1 }}
              />
            )}
          />
        </Box>
        <Box>
          <Typography variant={"subtitle1"} sx={{ color: colors.white }}>
            Variant:
          </Typography>
          <Select
            sx={{ width: "25rem" }}
            value={variant}
            onChange={(event) => setVariant(event.target.value)}
            disabled={loading}
            displayEmpty
          >
            <MenuItem value={``}>Own Topic</MenuItem>
            <MenuItem value={"offer"}>Offer</MenuItem>
            <MenuItem value={"lm"}>Lead Magnet</MenuItem>
          </Select>
        </Box>
      </Box>
      {variant === "offer" && (
        <Box>
          <AdsOfferSelector
            control={control}
            errors={errors}
            loading={loading}
          />
        </Box>
      )}
      {variant === "lm" && (
        <Box>
          <AdsLeadMagnetSelector
            control={control}
            errors={errors}
            loading={loading}
          />
        </Box>
      )}
      {!!variant && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Additional information
          </Typography>
          <Controller
            name="additionalInfo"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={loading}
                {...field}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={!!errors.additionalInfo}
                helperText={errors.additionalInfo?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </>
      )}
      {!variant && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            What topic does the lead magnet cover?*
          </Typography>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={loading}
                {...field}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={!!errors.content}
                helperText={errors.content?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Typography variant="subtitle1" gutterBottom>
            Core Value Proposition*
          </Typography>
          <Controller
            name="propose"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={loading}
                {...field}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={!!errors.propose}
                helperText={errors.propose?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Typography variant="subtitle1" gutterBottom>
            Format*
          </Typography>
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={loading}
                {...field}
                variant="outlined"
                fullWidth
                error={!!errors.format}
                helperText={errors.format?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        </>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={previousStepHandler}
          disabled={loading}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loading}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AdsForm;
