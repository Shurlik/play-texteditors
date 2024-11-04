import {
  Box,
  Button,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router"; // Import useRouter from next/router
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { getRecordById, updateRecord } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import personaData from "@/constants/prompts/personData";

import CustomStepIcon from "../steps/CustomStepIcon";
import Fields from "./Fields";
import Loader from "./Loader";

const colors = {
  mainGreen: getColor("mainGreen"),
  white: getColor("white"),
  background: getColor("background"),
  backgroundMain: getColor("backgroundMain"),
};

const CustomConnector = (
  <StepConnector
    sx={{
      transition: ".3s",
      top: 25,
      left: "-25%",
      width: "50%",
      alignSelf: "center",
      "& .MuiStepConnector-line": {
        borderStyle: "dotted",
        border: "none",
        borderBottom: `1px dotted ${colors.mainGreen}`,
        opacity: 0.5,
      },
      "&.Mui-active .MuiStepConnector-line": {
        opacity: 1,
      },
      "&.Mui-completed .MuiStepConnector-line": {
        opacity: 1,
      },
    }}
  />
);

interface FormLayoutProps {
  generateHandler: () => void;
  steps: string[];
  handleBack: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (mutate: () => Promise<any>) => Promise<void>;
  activeStep: number;
  userId: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setActiveStep: (step: number) => void;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  steps,
  handleBack,
  handleNext,
  activeStep,
  userId,
  loading,
  setLoading,
  setActiveStep,
}) => {
  const { data = {}, mutate } = useSWR(`/persons/${userId}`, () =>
    getRecordById(userId)
  );
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (field: string, value: any) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (data?.fields) {
      setEditedFields(data.fields);
    }
  }, [data?.fields]);

  const nextStepHandler = async () => {
    setLoading(true);
    try {
      await updateRecord(userId, editedFields);
      if (activeStep >= steps.length - 1) {
        await mutate();
        router.push("/persons");
      }
      await handleNext(mutate);
    } catch (e) {
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    const currentSection = steps[step];
    const sectionData = personaData[currentSection];
    if (!sectionData) return null;

    if (loading) {
      return <Loader />;
    }

    return (
      <Box>
        <Typography variant="h3" mb={3}>
          {currentSection}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {sectionData.keys.map((field: string) => (
            <Box key={field}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: colors.white,
                  fontSize: "1.3rem",
                  marginBottom: ".5rem",
                }}
              >
                {field}:{" "}
              </Typography>
              <Fields
                handleFieldChange={handleFieldChange}
                field={field}
                loading={loading}
                value={editedFields[field] || ""}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: "100rem",
        color: "white",
        backgroundColor: colors.backgroundMain,
        padding: "2rem",
        margin: "0 auto",
      }}
    >
      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: "2rem" }}
        connector={CustomConnector}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => setActiveStep(index)}
            sx={{ cursor: "pointer" }}
          >
            <StepLabel
              sx={{
                flexShrink: 1,
                textWrap: "wrap",
                color: colors.mainGreen,
                opacity: activeStep === index ? 1 : 0.5,
                "& .MuiStepLabel-label": {
                  color: colors.mainGreen,
                  "&.Mui-active": {
                    color: colors.mainGreen,
                  },
                },
                "& .MuiStepLabel-active": {
                  color: colors.mainGreen,
                },
                "& .MuiStepIcon-root": {
                  color: colors.mainGreen,
                },
              }}
              StepIconComponent={CustomStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box
        sx={{
          padding: "3rem",
          backgroundColor: colors.background,
          borderRadius: "1.5rem",
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        {renderStepContent(activeStep)}
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <Button
          sx={{
            width: "100%",
            paddingY: ".7rem",
            fontWeight: "bold",
            maxWidth: "7rem",
            border: `1px solid ${colors.backgroundMain}`,
          }}
          component="label"
          role={undefined}
          variant="outlined"
          color={"secondary"}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          disabled={activeStep <= 0 || loading}
        >
          Previous
        </Button>
        <Button
          sx={{
            width: "100%",
            paddingY: ".7rem",
            fontWeight: "bold",
            maxWidth: "7rem",
            border: `1px solid ${colors.backgroundMain}`,
            "&:disabled": {
              border: "none",
              backgroundColor: "none",
            },
          }}
          component="label"
          role={undefined}
          variant="outlined"
          color={"secondary"}
          endIcon={activeStep < steps.length - 1 && <ArrowForwardIcon />}
          onClick={nextStepHandler}
          disabled={loading}
        >
          {activeStep < steps.length - 1 ? "Next" : "Finish"}
        </Button>
      </Box>
    </Box>
  );
};

export default FormLayout;
