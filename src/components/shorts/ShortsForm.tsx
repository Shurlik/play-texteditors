import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { getArticles } from '@/api/services/airtableService';

import Loader from '../common/Loader';
import PageHeader from '../common/PageHeader';

interface ShortsFormProps {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormData: (data: any) => void;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createShorts: (data: any) => Promise<void>;
  steps: number;
  setSteps: (step: number | null) => void;
  selectedValues: string[];
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  person?: { fields: Record<string, any> };
}

const ShortsForm: React.FC<ShortsFormProps> = ({ loading, setFormData, createShorts, steps, setSteps, selectedValues, person }) => {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');
  const [showOptions, setShowOptions] = useState(false);

  const { data = [], isLoading } = useSWR(articleId ? null : '/cos/articles', () => getArticles());

  const articles = !articleId
    ? !isLoading
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? data.articles.map((p: any) => (
          <MenuItem key={p.id} value={p.id}>
            {p.fields['Blog Title']}
          </MenuItem>
        ))
      : (
        <MenuItem value={null}>
          <Loader />
        </MenuItem>
      )
    : null;

  const schema = yup.object({
    textStyle: yup.string().required('Required'),
    briefing: yup.string().required('Required'),
    briefingTextStyle: yup.string().required('Required'),
    designation: yup.string().required('Required'),
    designationTextStyle: yup.string().required('Required'),
    personAction: yup.string().required('Required'),
    model: yup.string().required('AI model is required'),
  });

  const actionsList = ['Comment', 'Like and subscribe', 'Get the Lead magnet', 'Learn about an offer'];

  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      textStyle: '',
      briefingTextStyle: '',
      designation: '',
      designationTextStyle: '',
      briefing: '',
      article: articleId || '',
      personAction: '',
      personActionDetails: '',
      model: 'gpt',
    },
  });

  const onSubmit = async (data: any) => {
    if (showOptions && !data.personActionDetails) {
      toast.warning('Please provide details about Action');
      return;
    }
    try {
      if (!showOptions) {
        data.personActionDetails = '';
      }
      const starterString = person
        ? `Name: ${person.fields.Name};\nAge: ${person.fields.Age};\nGender: ${person.fields.Gender};\nPlace of residence: ${person.fields['Place of residence']};\nJob title: ${person.fields['Job title']};\n`
        : '';
      data.personData = selectedValues.reduce(
        (acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`,
        starterString
      );
      setSteps(null);
      setTimeout(() => setSteps(steps + 1), 350);
      setFormData(data);
      await createShorts(data);
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const actions = actionsList.map((p) => (
    <MenuItem key={p} value={p}>
      {p}
    </MenuItem>
  ));

  const previousStepHandler = () => {
    reset();
    setSteps(null);
    setTimeout(() => setSteps(steps - 1), 400);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageHeader header="Create Short posts for Article" sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>Model*: </Typography>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <Select sx={{ width: '20rem' }} disabled={loading} {...field} error={!!errors.model}>
                <MenuItem value="gpt">Chat GPT</MenuItem>
                <MenuItem value="claude">Claude</MenuItem>
              </Select>
            )}
          />
          {errors.model && <Typography color="error">{errors.model.message}</Typography>}
        </Box>
        {!articleId && (
          <Box sx={{ flex: '1 1' }}>
            <Typography variant="subtitle1" gutterBottom>Select Article*</Typography>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <Controller
                name="article"
                control={control}
                render={({ field }) => (
                  <Select disabled={loading} {...field} error={!!errors.article}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {articles}
                  </Select>
                )}
              />
              {errors.article && <Typography color="error">{errors.article.message}</Typography>}
            </FormControl>
          </Box>
        )}
      </Box>
      {/* Rest of the form fields */}
      <Box sx={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>Submit</Button>
        <Button disabled={loading} onClick={previousStepHandler} variant="outlined" color="primary" fullWidth>Return</Button>
      </Box>
    </Box>
  );
};

export default ShortsForm;