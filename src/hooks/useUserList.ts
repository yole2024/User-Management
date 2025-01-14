import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as service from '../services/userListService';
import { RootState } from '../store/store';
import { setUsers, removeUser, resetUsers } from '../store/usersSlice';
import { setAdminData } from '../store/adminSlice';
import { IUser } from '../interfaces/userInterface';

export const useUserList = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isInitialized, setIsInitialized] = useState(false);
  const [loadingState, setLoadingState] = useState({
    users: false,
    delete: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [popupState, setPopupState] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | undefined>();

  const handleError = useCallback((message: string, actionType: string) => {
    console.error(`${actionType} Error: ${message}`);
    setError(message);
  }, []);

  const fetchUsers = useCallback(async () => {
    if (isInitialized) return;
    try {
      setLoadingState((prev) => ({ ...prev, users: true }));
      setError(null);

      const response = await service.getAllUsers();
      if (response.err) {
        handleError('Failed to fetch users.', 'Fetch');
      } else {
        dispatch(setUsers(response.res?.data || []));
        setIsInitialized(true);
      }
    } catch (err) {
      handleError('Failed to fetch users.', 'Fetch');
    } finally {
      setLoadingState((prev) => ({ ...prev, users: false }));
    }
  }, [dispatch, isInitialized, handleError]);

  const deleteUser = async (id: string) => {
    const confirmed = window.confirm('Do you really want to delete this user?');
    if (!confirmed) return;

    try {
      setLoadingState((prev) => ({ ...prev, delete: true }));
      const response = await service.deleteUser(id);
      if (response.err) {
        handleError('Failed to delete user.', 'Delete');
      } else {
        dispatch(removeUser(id));
      }
    } catch (err) {
      handleError('Failed to delete user.', 'Delete');
    } finally {
      setLoadingState((prev) => ({ ...prev, delete: false }));
    }
  };

  const toggleAddPopup = () => {
    setEditingUser(undefined);
    setPopupState(true);
  };

  const toggleUpdatePopup = (user: IUser) => {
    setEditingUser(user);
    setPopupState(true);
  };

  const handleClose = () => {
    setEditingUser(undefined);
    setPopupState(false);
    setError(null);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    dispatch(resetUsers());
    dispatch(setAdminData({ _id: '', username: '', email: '', name: '', token: null }));
    navigate('/login');
  }, [dispatch, navigate]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken && !isInitialized) {
      fetchUsers();
    }
  }, [isInitialized, fetchUsers]);

  const userList = useMemo(() => users || [], [users]);

  return {
    userList,
    loadingState,
    error,
    popupState,
    editingUser,
    deleteUser,
    toggleAddPopup,
    toggleUpdatePopup,
    handleClose,
    handleLogout,
  };
};

export default useUserList;
