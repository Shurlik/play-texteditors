"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import useSWR from "swr";

import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { getAllRecords } from "@/api/services/airtableService";
import { getArticleStream, getOutlineStream, getResearchStream, getThumbnailStream } from "@/api/services/cosService";
import authService from "@/api/services/authService";
import BlogPostForm from '@/components/forms/BlogPostForm';
import CosFinal from '@/components/articles/CosFinal';
import CosImages from '@/components/articles/CosImages';
import CosOutline from '@/components/articles/CosOutline';
import CosOutputs from '@/components/articles/CosOutputs';
import CosSelectedImage from '@/components/articles/CosSelectedImage';
import CustomSlide from '@/components/common/CustomSlide';
import FullPageLoader from '@/components/common/FullPageLoader';
import Loader from '@/components/common/Loader';
import PageHeader from '@/components/common/PageHeader';
import ResearchResult from '@/components/articles/ResearchResult';
import UserFormSelect from '@/components/common/UserFormSelect';

interface PersonData {
  id: string;
  fields: { Name: string };
}

const ArticleCreatePage: React.FC = () => {
  const router = useRouter();
  const [person, setPerson] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { data = [], isLoading } = useSWR<PersonData[]>('/persons', getAllRecords);
  const [steps, setSteps] = useState<number>(0);
  const [research, setResearch] = useState<string>('');
  const [outline, setOutline] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [final, setFinal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>('gpt');
  const [airId, setAirId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  console.log(steps)

  // Helper function to manage stream results
  const resultStream = async (
    airId: string | null,
    setter: React.Dispatch<React.SetStateAction<string>>,
    streamSource: 'research' | 'outline' | 'article' | 'thumbnail'
  ) => {
    if (!streamSource || !airId) {
      toast.error('Need to set Source or valid ID');
      return;
    }

    const streamMap: Record<typeof streamSource, (id: string, callback: (chunk: string) => void, provider: string) => Promise<void>> = {
      research: getResearchStream,
      outline: getOutlineStream,
      article: getArticleStream,
      thumbnail: getThumbnailStream,
    };

    const getter = streamMap[streamSource];

    setLoading(true);
    setter('');
    try {
      await getter(airId, (chunk) => setter((prev) => prev + chunk), provider);
    } catch (e) {
      console.error('Error fetching streams:', e);
      if (e instanceof Error && e.message === 'Unauthorized') {
        await authService.logout();
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Triggered stream functions for each stage
  const researchStream = async () => await resultStream(airId, setResearch, 'research');
  const outlineStream = async () => await resultStream(airId, setOutline, 'outline');
  const articleStream = async () => await resultStream(airId, setFinal, 'article');
  const thumbnailStream = async () => await resultStream(airId, setPrompt, 'thumbnail');

  // Handles selection of person
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPerson(event.target.value as string);
  };

  const persons = !isLoading
    ? data.map((p) => (
        <MenuItem key={p.id} value={p.fields.Name}>
          {p.fields.Name}
        </MenuItem>
      ))
    : <MenuItem value={null}><Loader/></MenuItem>;

  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <CustomSlide condition={steps === 0}>
        <PageHeader header="Select person to continue" sx={{ flexGrow: 1 }} />
        <FormControl sx={{ marginBottom: '1rem', marginTop: '3rem', width: '100%' }} variant="standard">
          <Select
            fullWidth
            variant="outlined"
            value={person || ''}
            onChange={handleChange}
            label="Person"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {persons}
          </Select>
        </FormControl>
        {person && (
          <UserFormSelect
            person={person}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            setSteps={setSteps}
            steps={steps}
          />
        )}
      </CustomSlide>
      <CustomSlide condition={steps === 1}>
        <BlogPostForm
          person={person}
          selectedValues={selectedValues}
          setResearch={setResearch}
          setSteps={setSteps}
          setAirId={setAirId}
          steps={steps}
          provider={provider}
          setProvider={setProvider}
          researchStream={researchStream}
        />
      </CustomSlide>
      <CustomSlide condition={steps === 2}>
        <ResearchResult {...{ research, setResearch, airId, setSteps, steps, outline, loading, setLoading, outlineStream }} />
      </CustomSlide>
      <CustomSlide condition={steps === 3}>
        <CosOutline {...{ airId, setSteps, steps, outline, setOutline, setFinal, provider, loading, articleStream, setLoading }} />
      </CustomSlide>
      <CustomSlide condition={steps === 4}>
        <CosOutputs {...{ airId, setSteps, steps, final, setFinal, provider, loading, setLoading, thumbnailStream }} />
      </CustomSlide>
      <CustomSlide condition={steps === 5}>
        <CosImages {...{ airId, setSteps, selectedImageId, setSelectedImageId, steps, prompt, setPrompt, provider, loading, setLoading }} />
      </CustomSlide>
      <CustomSlide condition={steps === 6}>
        <CosSelectedImage {...{ airId, setSteps, selectedImageId, steps, prompt, setPrompt, loading }} />
      </CustomSlide>
      <CustomSlide condition={steps === 7}>
        <CosFinal {...{ airId, selectedImageId, steps, setSteps, loading }} />
      </CustomSlide>
      {loading && <FullPageLoader position="absolute" />}
    </Box>
  );
};

export default ArticleCreatePage;