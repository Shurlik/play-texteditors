import React, { useEffect, useRef, useState } from "react";

import { Button, Container } from "@mui/material";
import { updateBlogPostData } from "@/api/services/airtableService";

import OutputsTextField from "../common/OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

interface CosOutputsProps {
  airId: string;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  steps: number | null;
  final: string;
  setFinal: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  thumbnailStream: () => Promise<void>;
}

const CosOutputs: React.FC<CosOutputsProps> = ({
  airId,
  setSteps,
  final,
  setFinal,
  loading,
  setLoading,
  thumbnailStream,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const resultBoxRef = useRef<HTMLDivElement | null>(null);

  const nextStepHandler = async () => {
    setLoading(true);
    await updateBlogPostData(airId, { "AI Final Output (Blogpost)": final });
    setSteps(null);
    setTimeout(
      () =>
        setSteps((prevSteps) => (prevSteps !== null ? prevSteps + 1 : null)),
      350
    );
    await thumbnailStream();
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
  }, [final]);

  return (
    <Container sx={{ position: "relative" }}>
      <OutputsTextField
        ref={resultBoxRef}
        editable={edit}
        value={final}
        title={"AI Final Output"}
        loading={loading}
        onChange={(event) => setFinal(event.target.value)}
      />
      <Button
        onClick={nextStepHandler}
        variant={"contained"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "3rem" }}
        disabled={loading || !final}
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

export default CosOutputs;
