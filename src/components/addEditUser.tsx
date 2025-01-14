import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, CircularProgress} from '@mui/material';
import { IUser } from '../interfaces/userInterface';
import { useAddEditUser } from '../hooks/useAddEditUser';

interface AddEditUserProps {
  open: boolean;
  onClose: () => void;
  user?: IUser
}

const AddEditUser: React.FC<AddEditUserProps> = ({ open, onClose, user }) => {
  const { fields,  saveLoading, handleSubmit } = useAddEditUser(onClose, user);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Edit user' : 'Add a new user'}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate>
          <TextField fullWidth margin="normal" label="Username" {...fields.username} />
          <TextField fullWidth margin="normal" label="Full Name" {...fields.fullName} />
          <TextField fullWidth margin="normal" label="Email" {...fields.email} />
          {fields.password && (
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              {...fields.password}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saveLoading} sx={{ outline: 'none', '&:focus': { outline: 'none' }}}>
        cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={saveLoading} sx={{ outline: 'none', '&:focus': { outline: 'none' }}}>
          {saveLoading ? <CircularProgress size={20} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default AddEditUser