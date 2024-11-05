"use client";
import {
  deleteRecord,
  getAllRecords,
  uploadFile,
} from "@/api/services/airtableService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { Box, Button, Container, Typography } from "@mui/material";
import FullPageLoader from "@/components/common/FullPageLoader";
import PageHeader from "@/components/common/PageHeader";
import PersonsList from "@/components/common/PersonsList";

const fetcher = async (url: string) => await getAllRecords();

const ManagementPage = () => {
  const { data = [], error, isLoading, mutate } = useSWR("/persons", fetcher);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [listPersonsToDelete, setListPersonsToDelete] = useState<string[]>([]);

  const router = useRouter();

  const handleSelectPerson = (person: any) => {
    setSelectedPerson(person);
  };

  const handleEditPerson = (id: string) => {
    router.push({
      pathname: "/generate",
      query: { userId: id },
    });
  };

  const handleFileUpload = async (id: string) => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await uploadFile(id, formData);
        await mutate();
        setSelectedPerson(res);
        toast.success("Uploaded");
      } catch (e) {
        console.log("error: ", e);
        toast.error("Upload error");
      } finally {
        setLoading(false);
      }
    }
  };

  const groupDeleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete these persons?")) {
      setLoading(true);
      try {
        for (const p of listPersonsToDelete) {
          await deleteRecord(p);
        }
        await mutate();
        toast.success("Deleted successfully!");
        setListPersonsToDelete([]);
      } catch (e) {
        toast.error("Something went wrong");
        console.log("Person delete error: ", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeletePerson = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      setLoading(true);
      try {
        await deleteRecord(id);
        await mutate();
        setSelectedPerson(null);
      } catch (error) {
        console.error("Error deleting record:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => setFile(null), [selectedPerson]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageHeader header={"Manage Personas"} />
        {listPersonsToDelete.length > 0 && (
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={groupDeleteHandler}
          >
            Delete selected
          </Button>
        )}
      </Box>
      <Box display="flex" justifyContent={"start"} alignItems={"start"}>
        <PersonsList
          disabled={loading}
          persons={data}
          handleSelectPerson={handleSelectPerson}
          handleEditPerson={handleEditPerson}
          handleFileUpload={handleFileUpload}
          handleDeletePerson={handleDeletePerson}
          listPersonsToDelete={listPersonsToDelete}
          setListPersonsToDelete={setListPersonsToDelete}
        />
      </Box>
      {loading && <FullPageLoader />}
    </Container>
  );
};

export default ManagementPage;
