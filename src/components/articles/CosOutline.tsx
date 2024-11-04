import React, { useEffect, useRef, useState } from "react";

import { Button, Container } from "@mui/material";
import { updateBlogPostData } from "@/api/services/airtableService";

import OutputsTextField from "../common/OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

interface CosOutlineProps {
  airId: string;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  steps: number | null;
  setOutline: React.Dispatch<React.SetStateAction<string>>;
  outline: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  articleStream: () => Promise<void>;
}

const CosOutline: React.FC<CosOutlineProps> = ({
  airId,
  setSteps,
  setOutline,
  outline,
  loading,
  setLoading,
  articleStream,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const resultBoxRef = useRef<HTMLDivElement | null>(null);

  const nextStepHandler = async () => {
    setLoading(true);
    await updateBlogPostData(airId, { "AI Outline (Blogpost)": outline });
    setSteps(null);
    setTimeout(
      () =>
        setSteps((prevSteps) => (prevSteps !== null ? prevSteps + 1 : null)),
      400
    );
    await articleStream();
  };

  const previousStepHandler = () => {
    setSteps(null);
    setTimeout(
      () =>
        setSteps((prevSteps) => (prevSteps !== null ? prevSteps - 1 : null)),
      400
    );
  };

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [outline]);

  return (
    <Container sx={{ position: "relative" }}>
      <OutputsTextField
        ref={resultBoxRef}
        editable={edit}
        value={outline}
        title={"Outline"}
        loading={loading}
        onChange={(event) => setOutline(event.target.value)}
      />
      <Button
        onClick={nextStepHandler}
        variant={"contained"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "3rem" }}
        disabled={loading || !outline}
      >
        Next step
      </Button>

      <Button
        onClick={previousStepHandler}
        variant={"outlined"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "1rem" }}
        disabled={loading}
      >
        Previous step
      </Button>
      <ToggleEdit
        isEdit={edit}
        onClick={() => setEdit((old) => !old)}
        loading={loading}
      />
    </Container>
  );
};

export default CosOutline;
