"use client"
import React, { useState } from "react";

import { updateRecord } from "@/api/services/airtableService";
import CreationStarter from "@/components/common/CreationStarter";
import FormLayout from "@/components/common/FormLayout";
// import { fullPersonData, personaKeys } from "@/constants/prompts/fullPersData";
import personaData from "@/constants/prompts/personData";

// import { updateRecord } from "../services/airtable";
// import { fullPersData, personaKeys } from "../utils/fullPersData";
//import personData from "../utils/personData";

const CreatePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = Object.keys(personaData);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async (callback: () => Promise<void>) => {
    setActiveStep((prev) => prev + 1);
    await callback();
    setLoading(false);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // const fullPersonStart = async () => {
  // 	setLoading(true);
  // 	try {
  // 		if (userId) {
  // 			await updateRecord(userId, personaKeys, fullPersonData);
  // 			router.replace('/persons');
  // 		}
  // 	} catch (e) {
  // 		console.error('Error:', e);
  // 	} finally {
  // 		setLoading(false);
  // 	}
  // };

  const generateHandler = async (
    callback?: () => Promise<void>,
    step?: number
  ) => {
    const st = step ?? activeStep;
    setLoading(true);

    try {
      const currentSection = steps[st];
      if (userId) {
        await updateRecord(
          userId,
          personaData[currentSection].keys,
          personaData[currentSection].prompt
        );
        if (callback) {
          await callback();
        }
      }
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return !userId ? (
    <CreationStarter onFinish={setUserId} />
  ) : (
    <FormLayout
      steps={steps}
      handleBack={handleBack}
      handleNext={handleNext}
      activeStep={activeStep}
      userId={userId}
      loading={loading}
      setLoading={setLoading}
      setActiveStep={setActiveStep}
      generateHandler={generateHandler}
    />
  );
};

export default CreatePage;
