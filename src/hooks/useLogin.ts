import { useState } from 'react';
import { useNavigate } from  'react-router-dom';
import { userLoginService } from '../services/loginservice';
import { useDispatch } from "react-redux";
import { setAdminData } from '../store/adminSlice';


export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');
        try{
            const {res, err} = await userLoginService({username, password});
            if (res) {
                console.log(username)
                localStorage.setItem('authToken', res.data.token);
                dispatch(
                    setAdminData({
                        _id: res.data._id,
                        username: username,
                        email: res.data.email,
                        name: res.data.name,
                        token: res.data.token,
                    })
                );
                
                navigate('/users') ;   
            }else{
                setError(err?.error ||'תהליך הכניסה נכשל'); 
            }
        }catch(error) {
            setError("ⓘ שגיאה במהלך הכניסה. נסה שוב.");
            console.error('Error during login', error);
        }finally{
            setIsLoading(false);
        }
    };

    return{
        username,
        password,
        error,
        setUsername,
        setPassword,
        isLoading,
        handleLogin,
    }
};
