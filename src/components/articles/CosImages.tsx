import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { getImages } from "@/api/services/airtableService";
import { Box, Button, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Loader from "../common/Loader";
import OutputsTextField from "../common/OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";
import { getColor } from "@/utils/getColor";

interface CosImagesProps {
  selectedImageId: { id: string; url: string } | null; 
  setSelectedImageId: React.Dispatch<
    React.SetStateAction<{ id: string; url: string } | null>
  >;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  steps: number | null;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  thumbnailStream: () => Promise<void>; 
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const colors = {
  white: getColor("white"),
  mainGreen: getColor("mainGreen"),
  black20: getColor("black20"),
};

const CosImages: React.FC<CosImagesProps> = ({
  selectedImageId,
  setSelectedImageId,
  setSteps,
  steps,
  prompt,
  setPrompt,
  thumbnailStream,
  loading,
  setLoading,
}) => {
  const resultBoxRef = useRef<HTMLDivElement | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const {
    data: images = [],
    error: imgError,
    isLoading: imgIsLoading,
  } = useSWR("/cos/images", getImages);

  const nextStepHandler = async () => {
    setLoading(true);
    setSteps(null);
    setSteps((prevSteps) => (prevSteps !== null ? prevSteps + 1 : null));
    await thumbnailStream();
    setLoading(false);
  };

  const previousStepHandler = () => {
    setSteps(null);
    setSteps((prevSteps) => (prevSteps !== null ? prevSteps - 1 : null));
  };

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [prompt]);

  return (
    <Container sx={{ position: "relative" }}>
      <Box>
        <OutputsTextField
          ref={resultBoxRef}
          editable={edit}
          title={"Thumbnail Prompt"}
          loading={loading}
          onChange={(event) => setPrompt(event.target.value)}
          value={prompt}
        />
        <Typography
          variant={"h4"}
          sx={{ color: colors.white, margin: "5rem 0 1rem" }}
        >
          Choose image style
        </Typography>

        {imgError && (
          <Typography variant="body1" sx={{ color: 'red' }}>
            Failed to load images. Please try again.
          </Typography>
        )}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {imgIsLoading ? (
            <Loader />
          ) : (
            images?.result?.map((image) => (
              <SwiperSlide key={image?.url}>
                <Box
                  onClick={() => setSelectedImageId(image)}
                  sx={{
                    position: "relative",
                    transition: ".3s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Box
                    component={"img"}
                    alt={image?.url} // Improved alt text
                    src={image?.url}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {selectedImageId?.id === image?.id && (
                    <CheckCircleOutlineIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        color: colors.mainGreen,
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                      }}
                      aria-label="Selected image"
                    />
                  )}
                </Box>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </Box>

      <Button
        onClick={nextStepHandler}
        variant={"contained"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "3rem" }}
        disabled={loading || !prompt}
        aria-label="Next step"
      >
        Next step
      </Button>
      <Button
        onClick={previousStepHandler}
        variant={"outlined"}
        color={"primary"}
        sx={{ width: "100%", marginTop: "1rem" }}
        disabled={loading}
        aria-label="Previous step"
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

      <ToggleEdit
        isEdit={edit}
        onClick={() => setEdit((old) => !old)}
        loading={loading}
      />
    </Container>
  );
};

export default CosImages;