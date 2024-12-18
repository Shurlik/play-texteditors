import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Box, Button, Container } from "@mui/material";
import { addShorts } from "@/api/services/shortService";

import OutputsTextField from "../common/OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

interface ShortsResultProps {
  result: string;
  setResult: (value: string) => void;
  loading: boolean;
  formData: { article: string };
  setLoading: (value: boolean) => void;
  steps: number;
  setSteps: (value: number | null) => void;
}

const ShortsResult: React.FC<ShortsResultProps> = ({
  result,
  setResult,
  loading,
  formData,
  setLoading,
  steps,
  setSteps,
}) => {
  const resultBoxRef = useRef<HTMLDivElement>(null);
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const saveHandler = async () => {
    setLoading(true);
    const data = { content: result, article: [formData.article] };
    try {
      await addShorts(data);
      toast.success("Added");
      router.replace("/shorts");
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [result]);

  const previousStepHandler = () => {
    setResult("");
    setSteps(null);
    setTimeout(() => setSteps(steps - 1), 400);
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
    </Container>
  );
};

export default ShortsResult;
