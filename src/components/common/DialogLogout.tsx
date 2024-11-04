import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from 'react';

import { getColor } from '@/utils/getColor';

// Define the props interface
interface DialogLogoutProps {
  onSubmit: () => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const colors = { 
  orange50: getColor("orange50"),
  darkGrey: getColor("darkGrey"),
  mainGreen: getColor("mainGreen"),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<unknown>) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DialogLogout: React.FC<DialogLogoutProps> = ({ onSubmit, onClose, isOpen }) => {
  function closeHandler() {
    onClose();
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await onSubmit();
    } catch (e) {
      console.log('error: ', e);
    }
  }

  return (
    <Dialog
      TransitionComponent={Transition}
      open={isOpen}
      PaperProps={{
        sx: {
          border: `1px solid ${colors.orange50}`,
          backgroundColor: colors.darkGrey,
          color: colors.mainGreen,
          borderRadius: '20px',
          padding: '1rem 5rem',
        },
        component: 'form',
        onSubmit: submitHandler,
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', mb: 0 }}>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: colors.mainGreen }}>
          Are you sure you want to leave us?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'outlined'}
          color={'primary'}
          onClick={closeHandler}
        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
          color={'primary'}
          sx={{
            marginLeft: '1.5rem!important',
          }}
          type='submit'
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogLogout;