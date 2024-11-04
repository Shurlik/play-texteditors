import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { loginInputStyles } from "@/constants/theme/inputStyles";
import { getColor } from "@/utils/getColor";

interface DialogLoginProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const colors = {
  white: getColor("white"),
  background: getColor("background"),
};

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogLogin: React.FC<DialogLoginProps> = ({
  onSubmit,
  onClose,
  isOpen,
}) => {
  const [loading, setLoading] = useState(false);

  function closeHandler() {
    onClose();
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const username = formJson.username as string;
      const password = formJson.password as string;

      if (!password || !username) {
        setLoading(false);
        toast.error("Please enter a valid login and password");
        return;
      }
      await onSubmit(username, password);
    } catch (e) {
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      onClose={closeHandler}
      TransitionComponent={Transition}
      open={isOpen}
      PaperProps={{
        sx: {
          backgroundColor: colors.background,
          color: colors.white,
          borderRadius: "20px",
          padding: "3rem 3rem",
          width: "490px",
        },
        component: "form",
        onSubmit: submitHandler,
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          mb: 0,
          fontFamily: "Bebas Neue",
          textAlign: "center",
          fontSize: "1.8rem",
          letterSpacing: 1.3,
        }}
      >
        Log in
      </DialogTitle>
      <DialogContent sx={{ marginTop: "1rem" }}>
        <Typography sx={{ color: colors.white }}>Username*</Typography>
        <TextField
          sx={loginInputStyles}
          autoFocus
          margin="dense"
          id="username"
          name="username"
          fullWidth
          variant="standard"
          disabled={loading}
          required
          placeholder={"Enter your username"}
        />
        <Typography sx={{ marginTop: "2rem", color: colors.white }}>
          Password*
        </Typography>
        <TextField
          sx={loginInputStyles}
          margin="dense"
          id="password"
          name="password"
          type="password"
          fullWidth
          variant="standard"
          disabled={loading}
          required
          placeholder={"Password"}
        />
      </DialogContent>
      <DialogActions sx={{ marginTop: "3rem" }}>
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "100%" }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogLogin;
