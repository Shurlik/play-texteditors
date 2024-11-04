import React from "react";

import { Box, Modal } from "@mui/material";
import { getColor } from "@/utils/getColor";

import CreateUser from "./CreateUser";

interface AddUserModalProps {
  onClose: () => void;
  isOpen: boolean;
  callback: () => Promise<void>;
}

const colors = {
  background: getColor("background"),
  darkGrey42: getColor("darkGrey42"),
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  onClose,
  isOpen,
  callback,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: colors.background,
          border: `1px solid ${colors.darkGrey42}`,
          width: "500px",
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        <CreateUser onClose={onClose} callback={callback} />
      </Box>
    </Modal>
  );
};

export default AddUserModal;