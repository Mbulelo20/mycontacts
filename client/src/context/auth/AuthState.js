import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import {
    REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} 
    from '../types'

const AuthState = props => {
  const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      error: null,
        
      current: null,
      filtered: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);


    // Load User
    const loadUser = async () => {

        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type:USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({type: AUTH_ERROR})
        }
    }
    // Register User
    const register = async formData => {
        const config = {
            headres: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({ 
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    // Login users
    const login = async formData => {
        const config = {
            headres: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({ 
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    // Logout user
    const logout = () => dispatch({type: LOGOUT})

    // Clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS})
    
    return (
        <AuthContext.Provider
        value={{ 
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}
        >
      {props.children}
    </AuthContext.Provider>
      );

}

export default AuthState;