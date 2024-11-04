import {
  Box,
  Button,
  Step,
  StepIcon,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import useSWR from "swr";

import { styled } from "@mui/material/styles";
import { getRecordById } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import personaData from "@/constants/prompts/personData";

import Loader from "../common/Loader";

// Define the types for the props
interface StepsProps {
  steps: string[];
  handleBack: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateHandler: (mutate: () => Promise<any>) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (mutate: () => Promise<any>) => void;
  activeStep: number;
  userId: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setActiveStep: (step: number) => void;
}

const colors = {
  white: getColor("white"),
  black: getColor("black"),
  mainGreen: getColor("mainGreen"),
  mainGreen80: getColor("mainGreen80"),
  mainGreen50: getColor("mainGreen50"),
};

const Steps: React.FC<StepsProps> = ({
  steps,
  handleBack,
  generateHandler,
  handleNext,
  activeStep,
  userId,
  loading,
  setLoading,
  setActiveStep,
}) => {
  const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
    "& .MuiStepIcon-root": {},
    "& .MuiStepLabel-label": {
      fontSize: "0.7rem",
      color: `${colors.white} !important`,
    },
    "& .MuiStepIcon-text": {
      fill: colors.white,
      fontWeight: "bold",
    },
    "&.Mui-active": {
      color: colors.mainGreen80,
      "& .MuiStepLabel-label": {
        color: `${colors.white} !important`,
        fontWeight: "bold",
      },
    },
  }));

  const CustomStepIcon = styled(StepIcon)(({ theme }) => ({
    "&.Mui-active": {
      color: colors.mainGreen50,
      fontSize: "2rem",
    },
    "&.Mui-completed": {
      color: colors.mainGreen,
    },
  }));

  const {
    data = {},
    isLoading,
    mutate,
  } = useSWR(`/persons/${userId}`, () => getRecordById(userId));

  async function createHandler() {
    await generateHandler(mutate);
    setLoading(false);
  }

  const navigate = useRouter();

  const navHandler = () => {
    navigate.push("/persons");
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const renderStepContent = (step: number) => {
    const currentSection = steps[step];
    const sectionData = personaData[currentSection];
    if (!sectionData) return null;

    if (isLoading || loading) {
      return <Loader />;
    }

    return (
      <Box>
        <Typography
          variant="h6"
          sx={{ color: colors.white, fontSize: "2.2rem", mb: 3 }}
        >
          {currentSection}
        </Typography>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {sectionData.keys.map((field: any) => (
          <Box key={field}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: colors.white,
                fontSize: "1.5rem",
                marginTop: "1.1rem",
              }}
            >
              {field}:
            </Typography>
            <Box sx={{ color: colors.white, fontSize: "1.3rem" }}>
              <Markdown>
                {data?.fields[field] || data?.fields[field] === 0
                  ? data?.fields[field].toString()
                  : "Not filled yet"}
              </Markdown>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel nonLinear>
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => handleStepClick(index)}
            style={{ cursor: "pointer" }}
          >
            <CustomStepLabel StepIconComponent={CustomStepIcon}>
              {label}
            </CustomStepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={2} flexGrow={1} sx={{ position: "relative" }}>
        {activeStep === steps.length ? (
          <Typography
            variant={"h3"}
            sx={{
              fontWeight: "bold",
              color: colors.white,
              textAlign: "center",
              marginTop: "3rem",
            }}
          >
            All passed!
          </Typography>
        ) : (
          <>{renderStepContent(activeStep)}</>
        )}
      </Box>
      <Box
        mt={2}
        pb={5}
        alignSelf={"center"}
        sx={{ display: "flex", gap: "50px" }}
      >
        {activeStep !== steps.length && (
          <Button
            disabled={activeStep <= 0 || loading}
            onClick={handleBack}
            sx={{
              borderRadius: ".5rem",
              color: colors.black,
              border: `1px solid ${colors.mainGreen}`,
              minWidth: "5rem",
              backgroundColor: colors.mainGreen,
              "&:hover": {
                backgroundColor: colors.mainGreen,
                color: colors.black,
                boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
              },
            }}
          >
            Back
          </Button>
        )}
        <Button
          disabled={loading}
          variant="outlined"
          onClick={activeStep === steps.length ? navHandler : createHandler}
          sx={{
            borderRadius: ".5rem",
            color: colors.mainGreen,
            border: `1px solid ${colors.mainGreen}`,
            minWidth: "10rem",
            fontWeight: "bold",
            "&:hover": {
              color: colors.black,
              boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
              backgroundColor: colors.mainGreen,
            },
          }}
        >
          {activeStep === steps.length ? "To Persons" : "Generate new"}
        </Button>
        {activeStep !== steps.length && (
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={
              activeStep < steps.length - 1
                ? () => handleNext(mutate)
                : () => setActiveStep((old: any) => old + 1)
            }
            sx={{
              borderRadius: ".5rem",
              color: colors.black,
              border: `1px solid ${colors.mainGreen}`,
              minWidth: "5rem",
              backgroundColor: colors.mainGreen,
              "&:hover": {
                backgroundColor: colors.mainGreen,
                color: colors.black,
                boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
              },
            }}
          >
            {activeStep < steps.length - 1 ? "Next" : "Finish"}
          </Button>
        )}
      </Box>
    </>
  );
};

export default Steps;
