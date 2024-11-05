// app/components/Ads/AdsBenefits.tsx

import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, Container } from '@mui/material';

import OutputsTextField from '../common/OutputsTextField';
import ToggleEdit from '../services/ToggleEdit';

interface Person {
  id: string;
  fields: {
    Name?: string;
    Age?: string;
    Gender?: string;
    'Place of residence'?: string;
    'Job title'?: string;
    [key: string]: string | undefined;
  };
}

interface FormData {
  ad: string;
  model: string;
}

interface AdsBenefitsProps {
  benefits: string;
  setBenefits: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createResult: (data: any) => Promise<void>;
  formData: FormData;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  steps: number;
  person: Person;
  selectedValues: string[];
}

const AdsBenefits: React.FC<AdsBenefitsProps> = ({
  benefits,
  setBenefits,
  loading,
  createResult,
  formData,
  setSteps,
  steps,
  person,
  selectedValues,
}) => {
  const resultBoxRef = useRef<HTMLDivElement>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [benefits]);

  const getResultHandler = async () => {
    setSteps(null);
    setTimeout(() => setSteps(steps + 1), 350);

    const starterString = person ? 
      `Name: ${person.fields.Name}; Age: ${person.fields.Age}; Gender: ${person.fields.Gender}; Place of residence: ${person.fields['Place of residence']}; Job title: ${person.fields['Job title']};\n`
      : '';
      
    const personData = selectedValues.reduce(
      (acc, curr) => acc + `${curr}: ${person.fields[curr]};\n`,
      starterString
    );

    const data = {
      benefits,
      personId: person.id,
      ad: formData.ad,
      model: formData.model,
      personData,
    };
    
    await createResult(data);
  };

  const previousStepHandler = () => {
    setBenefits('');
    setSteps(null);
    setTimeout(() => setSteps(steps - 1), 400);
  };

  return (
    <Container sx={{ position: 'relative' }}>
      <OutputsTextField
        ref={resultBoxRef}
        editable={edit}
        value={benefits}
        title="Benefits"
        loading={loading}
        onChange={(event) => setBenefits(event.target.value)}
      />
      <Box
        sx={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <Button
          disabled={loading}
          onClick={getResultHandler}
          variant="contained"
          color="primary"
          fullWidth
        >
          Create final result
        </Button>
        <Button
          disabled={loading}
          onClick={previousStepHandler}
          variant="outlined"
          color="primary"
          fullWidth
        >
          Return
        </Button>
      </Box>
      <ToggleEdit
        isEdit={edit}
        onClick={() => setEdit((old) => !old)}
        loading={loading}
      />
    </Container>
  );
};

export default AdsBenefits;