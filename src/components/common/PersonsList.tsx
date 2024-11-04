import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { paginationModel } from "@/utils/helpers";
import { getColor } from "@/utils/getColor";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import officeBoy from "@/images/cartoon-office-boy.png";
import officeGirl from "@/images/cartoon-office-girl.png";

import DropMenu from "./DropMenu";

interface Person {
  id: string;
  fields: {
    Name: string;
    Age: number;
    Country: string;
    "User Image"?: { url: string }[];
    Gender: string;
  };
  user: {
    name: string;
  };
}

interface PersonsListProps {
  persons: Person[];
  handleDeletePerson: (id: string) => void;
  handleEditPerson: (id: string) => void;
  listPersonsToDelete: string[];
  setListPersonsToDelete: (ids: string[]) => void;
  disabled: boolean;
}

const simulateDownloadClick = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const LINK = process.env.NEXT_PUBLIC_API_URL;

const colors = {
  red: getColor("red"),
  silver: getColor("silver"),
  orange: getColor("orange"),
};

const PersonsList: React.FC<PersonsListProps> = ({
  persons,
  handleDeletePerson,
  listPersonsToDelete,
  setListPersonsToDelete,
  disabled,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [id, setId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  // const handleItemClick = (item: { title: string }) => {
  //   const downloadUrl = `${LINK}/files/download/${id}`;
  //   simulateDownloadClick(downloadUrl);
  //   handleClose();
  // };

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setId(null);
  };

  const editHandler = () => {
    if (id) {
      router.push(`/persons/${id}`);
    }
  };

  const downloadHandler = () => {
    if (id) {
      const downloadUrl = `${LINK}/files/download/${id}`;
      simulateDownloadClick(downloadUrl);
      handleClose();
    }
  };

  const deleteHandler = () => {
    if (id) {
      handleDeletePerson(id);
      handleClose();
    }
  };

  const detailHandler = (id: string) => {
    router.push(`/persons/${id}`);
  };

  const MENU_DATA = [
    { title: "Edit", icon: DriveFileRenameOutlineIcon, fn: editHandler },
    { title: "Download", icon: DownloadIcon, fn: downloadHandler },
    {
      title: "Delete",
      icon: DeleteOutlinedIcon,
      fn: deleteHandler,
      color: colors.red,
    },
  ];

  const data = persons.map((p) => ({
    id: p.id,
    name: p.fields["Name"],
    age: p.fields["Age"],
    location: p.fields["Country"],
    owner: p.user.name,
    image:
      p.fields["User Image"]?.length > 0
        ? p.fields["User Image"][0]?.url
        : p.fields["Gender"] === "Female"
        ? officeGirl
        : officeBoy,
  }));

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 2,
      headerAlign: "center",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "50%",
                backgroundColor: colors.silver,
                width: "3.5rem",
                height: "3.5rem",
              }}
            >
              <Box
                component="img"
                alt="logo"
                src={params.value}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
            </Box>
          </Box>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "age", headerName: "Age", flex: 1, type: "number" },
    { field: "location", headerName: "Location", flex: 3 },
    { field: "owner", headerName: "Owner", flex: 2 },
    {
      field: "action",
      headerName: "Actions",
      flex: 2,
      type: "actions",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: any) => (
        <Button
          disabled={disabled}
          onClick={() => detailHandler(params.id)}
          variant="outlined"
          color="secondary"
        >
          View details
        </Button>
      ),
    },
    {
      field: "button",
      headerName: "",
      flex: 1,
      type: "actions",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<MoreVertIcon sx={{ color: colors.orange }} />}
          label="Action"
          key={params.id}
          onClick={(event) => handleClick(event, params.id)}
        />,
      ],
    },
  ];

  const rows = data?.map((u) => ({
    id: u.id,
    name: u.name,
    age: u.age,
    location: u.location,
    owner: u.owner,
    image: u.image,
  }));

  const handleSelectionChange = (data: string[]) => {
    setListPersonsToDelete([...data]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        disableColumnFilter
        rowSelectionModel={listPersonsToDelete}
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
      <DropMenu
        disabled={disabled}
        onClose={handleClose}
        open={open}
        data={MENU_DATA}
        anchorEl={anchorEl}
      />
    </Box>
  );
};

export default PersonsList;
