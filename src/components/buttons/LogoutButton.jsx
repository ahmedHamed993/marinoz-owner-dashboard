import React from 'react'
import { useNavigate } from 'react-router';
import {useDispatch} from 'react-redux'
import {MenuItem, Button} from '@mui/material'
import { removeUserData, removeUserToken } from '../../redux/features/user/userSlice';
const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = ()=>{
        dispatch(removeUserData);
        dispatch(removeUserToken);
        navigate("/login")
    }
  return (
    <MenuItem component={Button} color="error" onClick={logout} sx={{
        width:'100%',
        color:"tomato"
    }}>
      Logout Button
    </MenuItem>
  )
}

export default LogoutButton
