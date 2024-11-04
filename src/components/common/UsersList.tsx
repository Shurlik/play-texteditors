import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { paginationModel } from "@/utils/helpers";
import { getColor } from "@/utils/getColor";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DropMenu from "./DropMenu";

const colors = {
  red: getColor("red"),
  orange: getColor("orange"),
};

// Define the User type
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  created: string;
}

// Define the props type for UsersList
interface UsersListProps {
  users: User[];
  handleDeleteUser: (id: string) => void;
  disabled: boolean;
  setUsersToDelete: (ids: string[]) => void;
  usersToDelete: string[];
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  handleDeleteUser,
  disabled,
  setUsersToDelete,
  usersToDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [id, setId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setId(null);
  };

  const deleteHandler = () => {
    if (id) {
      setAnchorEl(null);
      handleDeleteUser(id);
      setId(null);
    }
  };

  const detailHandler = () => {
    if (id) {
      router.push(`/users/${id}`);
    }
  };

  const MENU_DATA = [
    { title: "Details", icon: AccountBoxIcon, fn: detailHandler },
    {
      title: "Delete",
      icon: DeleteOutlinedIcon,
      fn: deleteHandler,
      color: colors.red,
    },
  ];

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 3 },
    { field: "role", headerName: "Role", flex: 2 },
    { field: "created", headerName: "Created At", flex: 2 },
    {
      field: "action",
      headerName: "",
      flex: 1,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<MoreVertIcon sx={{ color: colors.orange }} />}
          label="Action"
          onClick={(event) => handleClick(event, params.id as string)} // Cast ID to string
        />,
      ],
    },
  ];

  const rows = users.map((u) => ({
    id: String(u.id),  // Convert ID to string
    username: u.username,
    name: u.name,
    email: u.email,
    role: u.role,
    created: moment(u.created).format("YYYY-MM-DD"),
  }));

  const handleSelectionChange = (data: GridRowSelectionModel) => {
    setUsersToDelete([...data] as string[]); // Spread into a new array to remove readonly constraint
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        disableColumnFilter
        rowSelectionModel={usersToDelete}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        rowHeight={75}
        disableColumnSelector
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection) => {
          handleSelectionChange(newSelection);
        }}
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

export default UsersList;