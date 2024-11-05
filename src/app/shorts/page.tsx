"use client"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { paginationModel } from "@/utils/helpers";
import { deleteShorts, getShorts } from "@/api/services/shortService";
import { getColor } from "@/utils/getColor";
import DrawerContentDisplay from "@/components/common/DrawerContentDisplay";
import FullPageLoader from "@/components/common/FullPageLoader";
import PageHeader from "@/components/common/PageHeader";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface Short {
  id: string;
  articleTitle: string[];
  created: string;
}

const colors = {
  orange: getColor("orange"),
};

const ShortsPage: React.FC = () => {
  const {
    data = [],
    isLoading,
    mutate,
  } = useSWR<Short[]>(`/shorts`, getShorts);
  const [selected, setSelected] = useState<Short | null>(null);
  const [listToDelete, setListToDelete] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const columns = [
    { field: "article", headerName: "Shorts for Article", flex: 5 },
    {
      flex: 1,
      field: "view",
      type: "actions",
      headerName: "View",
      getActions: (params) => [
        <GridActionsCellItem
        key={params.id}
          icon={<RemoveRedEyeIcon sx={{ color: colors.orange }} />}
          label="Action"
          onClick={(event) => {
            event.stopPropagation(); 
            const record = data?.find((d) => d.id === params.id);
            setSelected(record || null);
          }}
        />,
      ],
    },
    {
      field: "created",
      headerName: "Created at",
      flex: 1,
    },
    {
      field: "updated",
      headerName: "Updated at",
      flex: 1,
    },
  ];

  const rows =
    data?.map((a) => ({
      id: a.id,
      article: `${a.articleTitle[0]}`,
      updated: moment(a.created).format("YYYY-MM-DD"),
      created: moment(a.created).format("YYYY-MM-DD"),
    })) || [];

  const handleSelectionChange = (data: string[]) => {
    setListToDelete([...data]);
  };

  const groupDeleteHandler = async () => {
    if (!listToDelete.length) {
      return;
    }
    if (window.confirm("Are you sure you want to delete these Articles?")) {
      setLoading(true);
      try {
        for (const id of listToDelete) {
          await deleteShorts(id);
        }
        await mutate();
        toast.success("Deleted successfully!");
        setListToDelete([]);
      } catch (e) {
        toast.error("Something went wrong");
        console.log("Article delete error: ", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const createHandler = () => router.push("/shorts/create");

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageHeader header={`Short-form Posts`} />
        {listToDelete.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={groupDeleteHandler}
          >
            Delete selected
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={createHandler}>
          {`Create Short posts`}
        </Button>
      </Box>
      <DataGrid
        disableColumnFilter
        rowSelectionModel={listToDelete}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        rowHeight={75}
        disableColumnSelector
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
      />
      <DrawerContentDisplay {...{ selected, setSelected }} />
      {(loading || isLoading) && <FullPageLoader />}
    </Container>
  );
};

export default ShortsPage;
