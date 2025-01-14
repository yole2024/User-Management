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
import { Add, Delete, Edit, Logout, Person } from '@mui/icons-material';
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

  const adminData = useSelector((state: RootState) => state.adminData);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      minWidth='100vw' 

      overflow="hidden"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="primary.main"
        padding={2}
        color="white"
      >
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              marginRight: 1,
            }}
          >
            <Person />
          </Avatar>
          <Typography variant="h6" noWrap>
            {adminData.username}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1.2,
          }}
        >
          User Management
        </Typography>

        <IconButton
          onClick={handleLogout}
          color="inherit"
          sx={{ outline: 'none', '&:focus': { outline: 'none' } }}
        >
          <Logout />
        </IconButton>
      </Box>

      <Box
        flex="1"
        padding={2}
        overflow="auto"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)', 
        }}
      >
        {loadingState.users ? (
          <Box display="flex" justifyContent="center" alignItems="center" flex="1">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <List>
            {userList.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  marginBottom: 2,
                  paddingBottom: 2,
                  borderBottom: '1px solid #ccc',
                }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteUser(user._id)}
                      disabled={loadingState.delete}
                      sx={{
                        outline: 'none',
                        '&:focus': { outline: 'none' },
                        marginRight: 1,
                      }}
                    >
                      {loadingState.delete ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Delete />
                      )}
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => toggleUpdatePopup(user)}
                      sx={{ outline: 'none', '&:focus': { outline: 'none' } }}
                    >
                      <Edit />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>{user.username?.[0] || '?'}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body1" color="textPrimary">
                        <strong>Name:</strong> {user.fullName}
                      </Typography>
                      <Typography variant="body1" color="textPrimary">
                        <strong>Username:</strong> {user.username}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box position="fixed" bottom={16} right={16}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleAddPopup}
          sx={{ outline: 'none', '&:focus': { outline: 'none' } }}
          startIcon={<Add />}
        >
          Add User
        </Button>
      </Box>

      <AddEditUser
        open={popupState}
        onClose={handleClose}
        user={editingUser || undefined}
      />
    </Box>
  );
};

export default UserList;
