import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, CircularProgress, Typography} from '@mui/material';
import { IUser } from '../interfaces/userInterface';
import { useAddEditUser } from '../hooks/useAddEditUser';

interface AddEditUserProps {
  open: boolean;
  onClose: () => void;
  user?: IUser
}

const AddEditUser: React.FC<AddEditUserProps> = ({ open, onClose, user }) => {
  const { fields, formErrors, saveLoading, handleSubmit } = useAddEditUser(onClose, user);

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
          {Object.entries(formErrors).map(([field, message]) => (
            <Typography key={field} color="error" variant="body2" sx={{ mt: 1 }}>
              {message}
            </Typography>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saveLoading}>
          ביטול
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={saveLoading}>
          {saveLoading ? <CircularProgress size={20} /> : 'שמירה'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default AddEditUser