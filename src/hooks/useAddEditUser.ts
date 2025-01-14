import React, { useEffect, useState } from "react";
import { IUser, IUserAdding, IUserValidate } from "../interfaces/userInterface";
import * as service from '../services/userListService';
import { addUser, updateUser } from '../store/usersSlice';
import { useDispatch } from 'react-redux';

export const useAddEditUser = (
  onClose: () => void,
  user?: IUser
) => {
  const dispatch = useDispatch();

  // State for form fields
  const [formState, setFormState] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // State for loading and general error
  const [saveLoading, setSaveLoading] = useState(false);

  // Populate fields when editing a user or clearing them
  useEffect(() => {
    if (user) {
      setFormState({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        password: '', // Leave password empty for security reasons
      });
    } else {
      setFormState({
        username: '',
        fullName: '',
        email: '',
        password: '',
      });
    }
    setFormErrors({}); // Clear errors on user change
  }, [user]);

  // Validate fields and return a boolean
  const validateFields = (data: IUserValidate): boolean => {
    const errors: Record<string, string> = {};
    if (!data.username) errors.username = "Username is required.";
    if (!data.fullName) errors.fullName = "Full Name is required.";
    if (!data.email) errors.email = "Email is required.";
    if (!user && !data.password) errors.password = "Password is required."; // Only validate password when adding a user

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle save operation
  const onSave = async () => {
    const userData: IUserAdding = {
      username: formState.username,
      fullName: formState.fullName,
      email: formState.email,
      password: formState.password,
    };

    if (!validateFields(userData)) return;

    setSaveLoading(true);
    const { res, err } = user?._id
      ? await service.updateUser(userData, user._id)
      : await service.createUser(userData);

    if (err) {
      setFormErrors({ general: 'The operation failed. Please try again.' });
    } else if (res?.data) {user?._id
        ? dispatch(updateUser(res.data)) 
        : dispatch(addUser(res.data))       
      onClose();
    }

    setSaveLoading(false);
  };

  // Update form state dynamically
  const updateFormField = (key: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // Fields object to simplify rendering in the component
  const fields = {
    username: {
      value: formState.username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        updateFormField('username', e.target.value),
      error: !!formErrors.username,
      helperText: formErrors.username || '',
    },
    fullName: {
      value: formState.fullName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        updateFormField('fullName', e.target.value),
      error: !!formErrors.fullName,
      helperText: formErrors.fullName || '',
    },
    email: {
      value: formState.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        updateFormField('email', e.target.value),
      error: !!formErrors.email,
      helperText: formErrors.email || '',
    },
    password: !user
      ? {
          value: formState.password,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            updateFormField('password', e.target.value),
          error: !!formErrors.password,
          helperText: formErrors.password || '',
        }
      : undefined,
  };

  return {
    fields,
    formErrors,
    saveLoading,
    handleSubmit: onSave,
  };
};
