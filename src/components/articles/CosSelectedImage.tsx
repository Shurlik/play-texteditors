import axios from "axios";
import React, { useEffect, useState } from "react";

import { Box, Button, Container } from "@mui/material";
import { updateBlogPostData } from "@/api/services/airtableService";

import FullPageLoader from "../common/FullPageLoader";
import Loader from "../common/Loader";
import OutputsTextField from "../common/OutputsTextField";
import PageHeader from "../common/PageHeader";
import ToggleEdit from "../services/ToggleEdit";

interface SelectedImage {
  id: string;
  description: string;
  url: string;
}

interface CosSelectedImageProps {
  airId: string;
  selectedImageId: SelectedImage | null;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  steps: number | null;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const CosSelectedImage: React.FC<CosSelectedImageProps> = ({
  airId,
  selectedImageId,
  setSteps,
  prompt,
  setPrompt,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const nextStepHandler = async () => {
    setLoading(true);
    await updateBlogPostData(airId, { "Thumbnail Prompt": prompt });
    await axios(
      `https://hook.eu2.make.com/sohfl6556adrsi6eu721e4s68w8cgole?recordId=${airId}`
    );

    setSteps(null);
    setTimeout(
      () =>
        setSteps((prevSteps) => (prevSteps !== null ? prevSteps + 1 : null)),
      350
    );
    setLoading(false);
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
    if (prompt && selectedImageId?.description) {
      setPrompt(prompt + "\n\n" + selectedImageId.description);
    }
  }, [prompt, selectedImageId, setPrompt]);

  useEffect(() => {
    if (!selectedImageId?.id) {
      setSteps(null);
      setTimeout(
        () =>
          setSteps((prevSteps) => (prevSteps !== null ? prevSteps + 1 : null)),
        350
      );
    }
  }, [selectedImageId, setSteps]);

  if (!selectedImageId?.id) {
    return <Loader />;
  }

  return (
    <Container sx={{ position: "relative" }}>
      <PageHeader header={"Selected Image Style"} sx={{ flexGrow: 1 }} />
      {!!selectedImageId?.id && (
        <Box
          sx={{
            width: "20rem",
            marginBottom: "2rem",
            marginTop: "1rem",
          }}
        >
          <Box
            component={"img"}
            alt={"img"}
            src={selectedImageId.url}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}
      <OutputsTextField
        editable={edit}
        title={"Final Image Prompt"}
        loading={loading}
        onChange={(event) => setPrompt(event.target.value)}
        value={prompt}
      />

      <Button
        onClick={nextStepHandler}
        variant={"contained"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "3rem" }}
        disabled={loading}
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
      {loading && <FullPageLoader />}
    </Container>
  );
};

export default CosSelectedImage;
