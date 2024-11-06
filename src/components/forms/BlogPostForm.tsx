import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

import { getLists, uploadBlogPostData } from "@/api/services/airtableService";
import { getColor } from "@/utils/getColor";
import Grid from "@mui/material/Grid2";

import Loader from "../common/Loader";
import PageHeader from "../common/PageHeader";
import AssistantSelector from "../services/AssistantSelector";

interface BlogPostFormProps {
  person: any; // Define a more specific type if available
  selectedValues: string[];
  setResearch: React.Dispatch<React.SetStateAction<string>>;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  setAirId: React.Dispatch<React.SetStateAction<string>>;
  steps: number;
  provider: string;
  setProvider: React.Dispatch<React.SetStateAction<string>>;
  researchStream: (id: string) => Promise<void>;
}

interface FormInputs {
  title: string;
  postType: string[];
  primaryKeyword: string;
  secondaryKeyword: string;
  extraContext: string;
}

const colors = { 
  black20: getColor("black20")
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  person,
  selectedValues,
  setResearch,
  setSteps,
  setAirId,
  steps,
  provider,
  setProvider,
  researchStream,
}) => {
  const { handleSubmit, control, reset } = useForm<FormInputs>();
  const { data = [], error, isLoading, mutate } = useSWR("/lists", getLists);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProvider(event.target.value as string);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    setLoading(true);

    const starterString = person
      ? `Name: ${person?.fields?.Name || "N/A"};\n` +
        `Age: ${person?.fields?.Age || "N/A"};\n` +
        `Gender: ${person?.fields?.Gender || "N/A"};\n` +
        `Place of residence: ${person?.fields?.["Place of residence"] || "N/A"};\n` +
        `Job title: ${person?.fields?.["Job title"] || "N/A"};\n`
      : "";
    const aboutUser = selectedValues.reduce(
      (acc, curr) => acc + `${curr}: ${person?.fields[curr] || "N/A"};\n`,
      starterString
    );

    const newForm = {
      "Blog Title": formData.title,
      "Brand Asset": ["reciAkXMfTGHYfAXR"],
      Assignee: [{ id: "usrVAFHfpENuQIP6z" }],
      "Blogpost Template Prompts": formData.postType,
      "Extra Context Instruction": `${formData.extraContext}`,
      "Secondary Keyword": formData.secondaryKeyword,
      "Primary Keyword": formData.primaryKeyword,
      "Writing Brand Voice": "Friendly",
      "Persona data": aboutUser,
      personId: person.id,
    };

    if (!newForm["Blogpost Template Prompts"].length) {
      setLoading(false);
      toast.warning("Please select type of post");
      return;
    }

    for (const key in newForm) {
      if (!newForm[key as keyof typeof newForm]) {
        setLoading(false);
        toast.warning("Please fill all fields");
        return;
      }
    }

    try {
      const res = await uploadBlogPostData({ data: newForm });
      setAirId(res.postData.id);
      setSteps(null);
      setTimeout(() => setSteps(steps + 1), 350);
      await researchStream(res.postData.id);
      setLoading(false);
    } catch (e) {
      toast.error("Something went wrong!");
      console.error("Form submission error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const previousStepHandler = () => {
    setSteps(steps - 1);
  };

  const menuTemplatePrompts = !isLoading ? (
    data.BlogpostTemplatePrompts.map((item: any) => (
      <MenuItem key={item.fieldName} value={item.id}>
        {item.fieldName}
      </MenuItem>
    ))
  ) : (
    <MenuItem value={null}>
      <Loader />
    </MenuItem>
  );

  return (
    <Container sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageHeader header="New Blog Post Production" sx={{ flexGrow: 1 }} />
        <AssistantSelector value={provider} onChange={handleChange} />
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                What is the title of this blog post?
              </Typography>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} fullWidth variant="outlined" required disabled={loading} />
                )}
              />
            </Grid>

            <Grid xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Choose what type of post this will be
              </Typography>
              <Controller
                name="postType"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select {...field} variant="outlined" multiple disabled={loading}>
                      {menuTemplatePrompts}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                Primary Keyword
              </Typography>
              <Controller
                name="primaryKeyword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} fullWidth variant="outlined" disabled={loading} />
                )}
              />
            </Grid>

            <Grid xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                Secondary Keyword
              </Typography>
              <Controller
                name="secondaryKeyword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} fullWidth variant="outlined" disabled={loading} />
                )}
              />
            </Grid>

            <Grid xs={9}>
              <Typography variant="subtitle1" gutterBottom>
                Provide extra context for your blog post
              </Typography>
              <Controller
                name="extraContext"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} fullWidth variant="outlined" multiline rows={6} required disabled={loading} />
                )}
              />
            </Grid>

            <Grid mt={5} xs={12} container justifyContent="space-between">
              <Button variant="contained" color="primary" sx={{ width: "100%" }} type="submit" disabled={loading}>
                Next step
              </Button>
              <Button
                onClick={previousStepHandler}
                variant="outlined"
                color="primary"
                sx={{ width: "100%", marginTop: "1rem" }}
                disabled={loading}
              >
                Previous step
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
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
          }}
        >
          <Loader />
        </Box>
      )}
    </Container>
  );
};

export default BlogPostForm;