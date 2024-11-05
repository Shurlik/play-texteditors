"use client"
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { Container, FormControl, MenuItem, Select } from "@mui/material";
import { getBenefitsStream, getResultStream } from "@/api/services/adsService";
import { getAllRecords } from "@/api/services/airtableService";
import AdsBenefits from "@/components/ads/AdsBenefits";
import AdsForm from "@/components/ads/AdsForm";
import AdsResult from "@/components/ads/AdsResult";
import CustomSlide from "@/components/common/CustomSlide";
import FullPageLoader from "@/components/common/FullPageLoader";
import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import UserFormSelect from "@/components/common/UserFormSelect";

// Define types for the person and data structure
interface Person {
  id: string;
  fields: {
    Name: string;
  };
}

const CreateAdsPage: React.FC = () => {
  const [benefits, setBenefits] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<any>(null); 

  const [person, setPerson] = useState<Person | null>(null);
  const [selectedValues, setSelectedValues] = useState<any[]>([]); 
  const {
    data = [],
    isLoading,
  } = useSWR<Person[]>("/persons", getAllRecords);
  const [steps, setSteps] = useState<number>(0);

  const createBenefits = async (data: any) => {
    // Adjust the type based on your input data structure
    setLoading(true);
    try {
      await getBenefitsStream(data, (chunk: string) => {
        setBenefits((prev) => prev + chunk);
      });
    } catch (e) {
      toast.error("Something goes wrong");
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const createResult = async (data: any) => {
    // Adjust the type based on your input data structure
    setLoading(true);
    try {
      await getResultStream(data, (chunk: string) => {
        setResult((prev) => prev + chunk);
      });
    } catch (e) {
      toast.error("Something goes wrong");
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPerson(event.target.value as Person);
  };

  const persons = !isLoading ? (
    data.map((p) => (
      <MenuItem key={p.id} value={p}>
        {p.fields.Name}
      </MenuItem>
    ))
  ) : (
    <MenuItem value={null}>
      <Loader />
    </MenuItem>
  );

  return (
    <Container>
      <CustomSlide condition={steps === 0}>
        <PageHeader header={"Select person to continue"} sx={{ flexGrow: 1 }} />
        <FormControl
          sx={{
            marginBottom: "1rem",
            marginTop: "3rem",
            width: "100%",
          }}
          variant="standard"
        >
          <Select
            fullWidth
            variant={"outlined"}
            labelId="demo-simple-select-standard-label"
            value={person || ""}
            onChange={handleChange}
            label="Person"
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {persons}
          </Select>
        </FormControl>
        {!!person && (
          <UserFormSelect
            person={person}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            setSteps={setSteps}
            steps={steps}
            formData={formData}
          />
        )}
      </CustomSlide>
      <CustomSlide condition={steps === 1}>
        <AdsForm {...{ createBenefits, setFormData, setSteps, steps }} />
      </CustomSlide>
      <CustomSlide condition={steps === 2}>
        <AdsBenefits
          {...{
            benefits,
            setBenefits,
            loading,
            createResult,
            formData,
            setSteps,
            steps,
            person,
            selectedValues,
          }}
        />
      </CustomSlide>
      <CustomSlide condition={steps === 3}>
        <AdsResult
          {...{
            result,
            setResult,
            loading,
            formData,
            setLoading,
            setSteps,
            steps,
          }}
        />
      </CustomSlide>
      {loading && <FullPageLoader position={"absolute"} />}
    </Container>
  );
};

export default CreateAdsPage;
