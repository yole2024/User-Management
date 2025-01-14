import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { Add, Delete, Edit, Logout } from '@mui/icons-material';
import { useUserList } from '../hooks/useUserList';
import AddEditUser from './addEditUser';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const UserList: React.FC = () => {
  const {
    userList,
    loadingState,
    error,
    deleteUser,
    toggleAddPopup,
    toggleUpdatePopup,
    popupState,
    handleClose,
    editingUser,
    handleLogout,
  } = useUserList();

  const adminData = useSelector((state: RootState) => state.adminData)
  

  return (
    <Box display="flex" flexDirection="column" minWidth="100vw" height="100vh">
      <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor="primary.main" padding={1} color="white">
        <Avatar sx={{ bgcolor: 'secondary.main', marginRight: 1 }}>
            {adminData.username[0].toUpperCase()}
        </Avatar>
        <Typography variant="h5">{adminData.username}</Typography>
        <IconButton onClick={handleLogout} color="inherit">
          <Logout />
        </IconButton>
      </Box>

      {/* User List */}
      <Box flex="1" padding={2} overflow="auto">
        {loadingState.users ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <List>
            {userList.map((user) => (
                
              <ListItem key={user._id} secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteUser(user._id)}
                    disabled={loadingState.delete}
                    sx={{ outline: 'none', '&:focus': { outline: 'none' }, marginRight: 1 }}
                  >
                    {loadingState.delete ? <CircularProgress size={20} /> : <Delete />}
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => toggleUpdatePopup(user)} sx={{outline: 'none', '&:focus': { outline: 'none' }}} >
                    <Edit />
                  </IconButton>
                </>
              }>
                <ListItemAvatar>
                  <Avatar>{user.username?.[0] || '?'}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.fullName} secondary={user.email} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Add User Button */}
      <Box position="absolute" bottom={16} right={16}>
        <Button variant="contained" color="primary" onClick={toggleAddPopup} startIcon={<Add />}>
          Add User
        </Button>
      </Box>

      {/* Add/Edit User Popup */}
      <AddEditUser open={popupState} onClose={handleClose} user={editingUser || undefined} />
    </Box>
  );
};

export default UserList;
