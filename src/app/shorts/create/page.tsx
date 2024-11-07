"use client"
import {
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { getShortsStream } from "@/api/services/shortService";
import { getAllRecords } from "@/api/services/airtableService";
import CustomSlide from "@/components/common/CustomSlide";
import FullPageLoader from "@/components/common/FullPageLoader";
import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import ShortsForm from "@/components/shorts/ShortsForm";
import ShortsResult from "@/components/shorts/ShortsResult";
import UserFormSelect from "@/components/common/UserFormSelect";

interface Person {
  id: string;
  fields: {
    Name: string;
  };
}

const CreateShortsPage: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<string>("");
  const [steps, setSteps] = useState<number>(0);
  const [person, setPerson] = useState<string | Person>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const {
    data = [],

    isLoading,
  } = useSWR<Person[]>("/persons", getAllRecords);

  const createShorts = async (data: any) => {
    setLoading(true);
    try {
      await getShortsStream(data, (chunk: string) => {
        setResult((prev) => prev + chunk);
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent<Person>) => {
    setPerson(event.target.value as Person);
  };

  const personsList = !isLoading ? (
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
        <PageHeader header="Select person to continue" sx={{ flexGrow: 1 }} />
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
            variant="outlined"
            labelId="select-person-label"
            value={person}
            onChange={handleChange}
            label="Person"
            className="select"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {personsList}
          </Select>
        </FormControl>
        {person && typeof person === "object" && (
          <UserFormSelect
            person={person}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            setSteps={setSteps}
            steps={steps}
          />
        )}
      </CustomSlide>
      <CustomSlide condition={steps === 1}>
        <ShortsForm
          loading={loading}
          setLoading={setLoading}
          setFormData={setFormData}
          createShorts={createShorts}
          steps={steps}
          setSteps={setSteps}
          selectedValues={selectedValues}
          person={person}
        />
      </CustomSlide>
      <CustomSlide condition={steps === 2}>
        <ShortsResult
          result={result}
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
          formData={formData}
          steps={steps}
          setSteps={setSteps}
        />
      </CustomSlide>
      {loading && <FullPageLoader position="absolute" />}
    </Container>
  );
};

export default CreateShortsPage;
