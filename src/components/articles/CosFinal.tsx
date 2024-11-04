import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { getContent, updateBlogPostData } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Loader from "../common/Loader";
import OutputsTextField from "../common/OutputsTextField";
import PageHeader from "../common/PageHeader";
import ToggleEdit from "../services/ToggleEdit";

interface Image {
  url: string;
  id: string;
}

interface CosFinalProps {
  airId: string;
  selectedImageId: string | null;
  steps: number | null;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
}

const colors = {
  mainGreen: getColor("mainGreen"),
  black20: getColor("black20"),
};

const CosFinal: React.FC<CosFinalProps> = ({
  airId,
  selectedImageId,
  steps,
  setSteps,
}) => {
  const {
    data = {},
    error,
    isLoading,
    mutate,
  } = useSWR(`/cos/content/${airId}`, () => getContent(airId));

  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useRouter();

  const [article, setArticle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const previousStepHandler = () => {
    setSteps(null);
    setTimeout(
      () =>
        setSteps((prevSteps) => (prevSteps !== null ? prevSteps - 1 : null)),
      400
    );
  };

  const saveHandler = async () => {
    setLoading(true);
    const data = {
      "AI Final Output (Blogpost)": article,
      "Article Image": selectedImage?.url ? [{ url: selectedImage.url }] : null,
    };
    try {
      await updateBlogPostData(airId, data);
      toast.success("Success!");
      navigate.push("/articles");
    } catch (e) {
      console.log("error: ", e);
      toast.error("Error saving article"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setArticle(data?.content?.fields["AI Final Output (Blogpost)"] || "");
      setImages(data?.content?.fields["mj result"] || []);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (data?.content?.fields["mj status"] === "finished") {
      setImages(data.content.fields["mj result"] || []);
    }

    if (data?.content?.fields["mj status"] === "error") {
      toast.error("Images error");
      setImages([]);
    }
  }, [data?.content?.fields["mj status"]]);

  return (
    <Container sx={{ position: "relative" }}>
      {!!selectedImageId && (
        <>
          <PageHeader header={"Select the Final Image"} sx={{ flexGrow: 1 }} />
          {!images.length && <Loader />}
          <ImageList cols={2}>
            {images.map((image) => (
              <ImageListItem
                key={image.url}
                onClick={() => setSelectedImage(image)}
                sx={{
                  cursor: "pointer",
                  transition: ".3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    zIndex: 9999,
                  },
                }}
              >
                <Box
                  component={"img"}
                  alt={"img"}
                  src={image.url}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {selectedImage?.id === image.id && (
                  <CheckCircleOutlineIcon
                    sx={{
                      width: "30px",
                      height: "30px",
                      color: colors.mainGreen,
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                    }}
                  />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}

      <OutputsTextField
        editable={edit}
        title={"Article"}
        loading={loading}
        onChange={(event) => setArticle(event.target.value)}
        value={article}
      />

      <Button
        onClick={saveHandler}
        variant={"contained"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "3rem" }}
        disabled={loading}
      >
        Save Article
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
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.black20,
            flexDirection: "column",
          }}
        >
          <Loader />
        </Box>
      )}
      <ToggleEdit isEdit={edit} onClick={() => setEdit((old) => !old)} loading={loading} />
    </Container>
  );
};

export default CosFinal;