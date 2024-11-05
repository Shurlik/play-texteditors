"use client";
import {
  Box,
  Button,
  Container,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { getPrompts, updatePrompt } from "@/api/services/airtableService";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { paginationModel } from "@/utils/helpers";
import { getColor } from "@/utils/getColor";
import FullPageLoader from "@/components/common/FullPageLoader";
import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface Prompt {
  id: string;
  Name: string;
  Content: string;
  created: string;
}

interface SWRResponse {
  response: Prompt[];
}

const colors = {
  orange: getColor("orange"),
  orange20: getColor("orange20"),
  background: getColor("background"),
  blackPermanet: getColor("blackPermanent"),
  mainGreen: getColor("mainGreen"),
};

const PromptsPage: React.FC = () => {
  const { data = {} as SWRResponse, mutate } = useSWR<SWRResponse>(
    "/cos/prompts",
    getPrompts
  );
  const [selected, setSelected] = useState<Prompt | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (!data?.response) {
    return <Loader />;
  }

  const handleEdit = () => {
    if (selected) {
      setIsEditing(true);
      setEditedContent(selected.Content);
    }
  };

  const handleSave = async () => {
    if (!selected) return; // Guard clause if selected is null
    setLoading(true);
    try {
      await updatePrompt(selected.id, { data: { Content: editedContent } });
      setSelected({ ...selected, Content: editedContent });
      setIsEditing(false);
      mutate(); // Refresh SWR data
      toast.success("Updated!");
    } catch (error) {
      console.error("Error updating prompt:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent("");
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 3 },
    { field: "updated", headerName: "Last update", flex: 1 },
    {
      flex: 1,
      field: "view",
      type: "actions",
      headerName: "Click to View",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<RemoveRedEyeIcon sx={{ color: colors.orange }} />}
          label="Action"
          onClick={(event) => {
            event.stopPropagation(); // Prevent row selection
            const prompt = data.response?.find(
              (prompt) => prompt.id === params.id
            );
            setSelected(prompt || null);
          }}
        />,
      ],
    },
  ];

  const rows = data.response.map((a) => ({
    id: a.id,
    title: a?.Name,
    updated: moment(a.created).format("YYYY-MM-DD"),
  }));

  return (
    <Container
      sx={{
        position: "relative",
      }}
    >
      <PageHeader header={"System Prompts"} />
      <DataGrid
        disableColumnFilter
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        rowHeight={75}
        disableColumnSelector
        disableRowSelectionOnClick
        disableMultipleRowSelection
      />
      <Drawer
        anchor={"right"}
        open={!!selected}
        onClose={
          isEditing || loading
            ? undefined
            : () => {
                setSelected(null);
                setIsEditing(false);
              }
        }
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            width: "60rem",
            borderTop: `1px solid ${colors.orange}`,
            borderLeft: `1px solid ${colors.orange}`,
            borderBottom: `1px solid ${colors.orange}`,
            height: "100%",
            borderRadius: "1rem 0 0 1rem",
            backgroundColor: colors.background,
            padding: "4rem",
            overflow: "hidden",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              height: "100%",
              "&::-webkit-scrollbar": {
                width: "10px",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "4px",
                backgroundColor: colors.orange20,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colors.orange,
                borderRadius: "4px",
                width: "20px",
              },
            }}
          >
            <Typography
              variant={"h3"}
              sx={{
                color: colors.mainGreen,
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              {selected?.Name}
            </Typography>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={30}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  sx={{
                    marginTop: "2rem",
                    "& .MuiInputBase-input": {
                      color: colors.blackPermanet,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colors.orange,
                      },
                      "&:hover fieldset": {
                        borderColor: colors.mainGreen,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.mainGreen,
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    onClick={handleCancel}
                    sx={{ marginRight: "1rem" }}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant={"h6"}
                  sx={{
                    marginTop: "3rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selected?.Content}
                </Typography>
                <Button
                  onClick={handleEdit}
                  sx={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </>
            )}
          </Box>
          {loading && <FullPageLoader position={"absolute"} />}
        </Box>
      </Drawer>
    </Container>
  );
};

export default PromptsPage;
