import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import { act } from 'react-dom/test-utils' 

import authService  from './authService'
//Getting user from local storage

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//  Register user

export const register = createAsyncThunk('auth/register',async(
    user, thunkAPI
)=>{
    try{
        return await authService.register(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user

export const login = createAsyncThunk('auth/login',async(
    user, thunkAPI
)=>{
    try{
        return await authService.login(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async()=>{
    await authService.logout()
})

//  Reset password

export const resetPassword = createAsyncThunk('auth/mail',async(
    user, thunkAPI
)=>{
    try{
        return await authService.resetPassword(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//////////////////////////////////////////
export const getUsers = createAsyncThunk(
    
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUser(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

//
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess =false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{ 
        builder
            .addCase(register.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state,action)=>{
                state.isSuccess = true
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(register.rejected,(state, action)=>{
                state.isLoading= false
                state.isError = true
                state.message = "Could not register user. Try again!!!"
                state.user = null
            })


            .addCase(login.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state,action)=>{
                state.isSuccess = true
                state.isLoading = false
                state.isError = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state, action)=>{
                state.isLoading= false
                state.isError = true
                state.message = "incorrect username or password"
                state.user = null
            })

            

            .addCase(resetPassword.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state,action)=>{
                state.isSuccess = true
                state.isLoading = false
                state.isError = true
                state.user = action.payload
            })
            .addCase(resetPassword.rejected,(state,action)=>{
                state.isLoading= false
                state.isError = true
                state.message = "Email does not exist"
                state.user = null
            })


            .addCase(logout.fulfilled, (state) => {
                state.user = null
              })
    }
})

export const  {reset} = authSlice.actions
export default authSlice.reducer