"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { deleteUser, getUsers } from "@/api/services/airtableService";
import { Box, Button, Container } from "@mui/material";
import { getColor } from "@/utils/getColor";
import AddUserModal from "@/components/common/AddUserModal";
import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UsersList from "@/components/common/UsersList";

interface User {
  id: string;
}

const colors = {
  mainGreen: getColor("mainGreen"),
  orange: getColor("orange"),
  black20: getColor("black20"),
};

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    data = {},
    isLoading,
    mutate,
  } = useSWR<{ response: User[] }>("/users", getUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const [usersToDelete, setUsersToDelete] = useState<string[]>([]);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      setLoading(true);
      try {
        await deleteUser(id);
        toast.success("User was deleted successfully!");
        await mutate();
      } catch (error) {
        toast.error("Error deleting record!");
        console.error("Error deleting record:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const groupDeleteHandler = async () => {
    if (!usersToDelete.length) {
      return;
    }
    if (window.confirm("Are you sure you want to delete these users?")) {
      setLoading(true);
      try {
        for (const id of usersToDelete) {
          await deleteUser(id);
        }
        await mutate();
        toast.success("Deleted successfully!");
        setUsersToDelete([]);
      } catch (error) {
        toast.error("Something went wrong");
        console.error("User delete error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageHeader header={"Manage Users"} />
        {usersToDelete.length > 0 && (
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={groupDeleteHandler}
          >
            Delete selected
          </Button>
        )}
        <Box
          onClick={openModalHandler}
          sx={{
            cursor: "pointer",
            transition: ".3s",
            color: colors.mainGreen,
            "&:hover": {
              color: colors.orange,
            },
          }}
        >
          <PersonAddIcon
            sx={{ color: "inherit", width: "2rem", height: "2rem" }}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent={"start"} alignItems={"start"}>
        {isLoading ? (
          <Loader />
        ) : (
          <UsersList
            disabled={loading}
            users={data?.response}
            handleDeleteUser={handleDeleteUser}
            {...{ usersToDelete, setUsersToDelete }}
          />
        )}
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
      <AddUserModal
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        callback={mutate}
      />
    </Container>
  );
};

export default UsersPage;
