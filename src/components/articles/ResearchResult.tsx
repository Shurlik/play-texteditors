import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Button, Container } from "@mui/material";
import { updateBlogPostData } from "@/api/services/airtableService";

import OutputsTextField from "../common/OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

// Define the types for props
interface ResearchResultProps {
  research: string;
  setResearch: React.Dispatch<React.SetStateAction<string>>;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  airId: string;
  steps: number | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  outlineStream: () => Promise<void>;
}

const ResearchResult: React.FC<ResearchResultProps> = ({
  research,
  setResearch,
  setSteps,
  airId,
  loading,
  setLoading,
  outlineStream,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const resultBoxRef = useRef<HTMLDivElement | null>(null);

  const researchHandler = async () => {
    setLoading(true);
    const data = { "AI Output (Research)": research };

    try {
      await updateBlogPostData(airId, data);
      toast.success("Success!");
      setSteps(null);
      setTimeout(
        () => setSteps((prevSteps) => (prevSteps ? prevSteps + 1 : null)),
        350
      );
      await outlineStream();
    } catch (e) {
      console.error("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const previousStepHandler = () => {
    setSteps(null);
    setTimeout(
      () => setSteps((prevSteps) => (prevSteps ? prevSteps - 1 : null)),
      400
    );
  };

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [research]);

  return (
    <Container sx={{ width: "100%", position: "relative", transition: "1s" }}>
      <OutputsTextField
        ref={resultBoxRef}
        editable={edit}
        title={"Research results"}
        loading={loading}
        onChange={(event) => setResearch(event.target.value)}
        value={research}
      />
      <Button
        onClick={researchHandler}
        variant={"contained"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "3rem" }}
        disabled={loading || !research}
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
        loading={loading}
        isEdit={edit}
        onClick={() => setEdit((old) => !old)}
      />
    </Container>
  );
};

export default ResearchResult;
