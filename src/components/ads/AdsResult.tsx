import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Box, Button, Container } from "@mui/material";
import { addAds } from "@/api/services/adsService";

import OutputsTextField from "../common/OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

// Define types for the props
interface AdsResultProps {
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  formData: {
    ad: string;
    personId: string;
    name: string;
  };
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  steps: number | null;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
}

const AdsResult: React.FC<AdsResultProps> = ({
  result,
  setResult,
  loading,
  formData,
  setLoading,
  setSteps,
}) => {
  const resultBoxRef = useRef<HTMLDivElement | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const router = useRouter();

  const saveHandler = async () => {
    setLoading(true);
    const data = {
      content: result,
      ad: formData.ad,
      personId: formData.personId,
      name: formData.name,
    };

    try {
      await addAds(data);
      toast.success("Added");
      router.push(`/ads/${formData.ad}`); 
      setLoading(false);
    } catch (e) {
      console.error("Error: ", e);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [result]);

  const previousStepHandler = () => {
    setResult("");
    setSteps(null);
    setTimeout(
      () => setSteps((prev) => (prev !== null ? prev - 1 : null)),
      400
    );
  };

  return (
    <Container sx={{ position: "relative" }}>
      <OutputsTextField
        ref={resultBoxRef}
        editable={edit}
        value={result}
        title="Final result"
        loading={loading}
        onChange={(event) => setResult(event.target.value)}
      />
      <ToggleEdit
        isEdit={edit}
        onClick={() => setEdit((old) => !old)}
        loading={loading}
      />
      <Box
        sx={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Button
          onClick={saveHandler}
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
        <Button
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

export default AdsResult;
