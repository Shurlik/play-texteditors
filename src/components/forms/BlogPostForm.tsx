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
import Grid from "@mui/material/Grid";

import Loader from "../common/Loader";
import PageHeader from "../common/PageHeader";
import AssistantSelector from "../services/AssistantSelector";

interface Person {
  id: string;
  fields: {
    Name: string;
    Age: number;
    Gender: string;
    "Place of residence": string;
    "Job title": string;
    [key: string]: any;
  };
}

interface BlogPostFormProps {
  person: Person | null;
  selectedValues: string[];
  setResearch: (data: any) => void;
  setSteps: (step: number | null) => void;
  setAirId: (id: string) => void;
  steps: number;
  provider: string;
  setProvider: (provider: string) => void;
  researchStream: (id: string) => Promise<void>; // Assuming it's a function returning a promise
}

interface FormData {
  title: string;
  postType: string[];
  primaryKeyword: string;
  secondaryKeyword: string;
  extraContext: string;
}

const colors = {
  black20: getColor("black20"),
};

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  person,
  selectedValues,
  setSteps,
  setAirId,
  steps,
  provider,
  setProvider,
  researchStream,
}) => {
  const { handleSubmit, control } = useForm<FormData>();
  const { data = {}, isLoading } = useSWR("/lists", getLists);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProvider(event.target.value as string);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    const starterString = person
      ? `Name: ${person.fields.Name};\nAge: ${person.fields.Age};\nGender: ${person.fields.Gender};\nPlace of residence: ${person.fields["Place of residence"]};\nJob title: ${person.fields["Job title"]};\n`
      : "";
    const aboutUser = selectedValues.reduce(
      (acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`,
      starterString
    );

    const newForm = {
      "Blog Title": data.title,
      "Brand Asset": ["reciAkXMfTGHYfAXR"],
      Assignee: [{ id: "usrVAFHfpENuQIP6z" }],
      "Blogpost Template Prompts": data.postType,
      "Extra Context Instruction": `${data.extraContext}`,
      "Secondary Keyword": data.secondaryKeyword,
      "Primary Keyword": data.primaryKeyword,
      "Writing Brand Voice": "Friendly",
      "Persona data": aboutUser,
      personId: person?.id,
    };

    if (!newForm["Blogpost Template Prompts"].length) {
      setLoading(false);
      toast.warning("Please select type of post");
      return;
    }

    for (const key in newForm) {
      if (!newForm[key]) {
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
      toast.error("Something goes wrong!");
      console.error("Form adding error: ", e);
      setLoading(false);
    }
  };

  const previousStepHandler = () => {
    setSteps(null);
    setTimeout(() => setSteps(steps - 1), 400);
  };

  // const menuBrandAssets = !isLoading ? data.BrandAssets.map((item: any) => (
  //     <MenuItem key={item.fieldName} value={item.id}>{item.fieldName}</MenuItem>
  // )) : <MenuItem value={null}><Loader /></MenuItem>;

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

  // const menuReelsHookPrompts = !isLoading ? data.reelsVideoHookPrompt.map((item: any) => (
  //     <MenuItem key={item.fieldName} value={item.id}>{item.fieldName}</MenuItem>
  // )) : <MenuItem value={null}><Loader /></MenuItem>;

  const nextHandler = () => {
    // Implement next step functionality if needed
  };

  return (
    <Container sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageHeader header={"New Blog Post Production"} sx={{ flexGrow: 1 }} />
        <AssistantSelector value={provider} onChange={handleChange} />
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Blog Post Title */}
            <Grid item xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                What is the title of this blog post?
              </Typography>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    required
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            {/* Type of Post - MultiSelect */}
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Choose what type of post this will be
              </Typography>
              <Controller
                name="postType"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      disabled={loading}
                      {...field}
                      sx={{ marginTop: "3px" }}
                      variant="outlined"
                      multiple
                    >
                      {menuTemplatePrompts}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Primary Keyword */}
            <Grid item xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                Primary Keyword
              </Typography>
              <Controller
                name="primaryKeyword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={loading}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Secondary Keyword */}
            <Grid item xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                Secondary Keyword
              </Typography>
              <Controller
                name="secondaryKeyword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={loading}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Extra Context */}
            <Grid item xs={9}>
              <Typography variant="subtitle1" gutterBottom>
                Provide extra context for your blog post
              </Typography>
              <Controller
                name="extraContext"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={6}
                    required
                    disabled={loading}
                  />
                )}
              />
            </Grid>

            {/* Submit and Clear buttons */}
            <Grid item xs={12} mt={5} justifyContent="space-between">
              <Button
                onClick={nextHandler}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                type="submit"
              >
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
