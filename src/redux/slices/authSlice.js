import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
   
import { axiosClient } from '../../api/axiosClient'
const initialState = {
    user: null,
    status: 'idle',

}



export const loginwithemailpassword = createAsyncThunk( "`auth/login",async (data,{rejectWithValue})=>{
    try {
        const resp = await axiosClient.post('/user/login/',data)
    return resp.data
    } catch (error) {
        console.log(error)
       return rejectWithValue(error.response?.data?.errors ?? "login failed")
    }
})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
     }, 
        loaduser: (state) => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                state.user = user
            } 
            state.status = "success"  
        }
    },
    extraReducers: (builder) => {builder 
        .addCase(loginwithemailpassword.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'succeeded'
            localStorage.setItem('user', JSON.stringify(action.payload))
 })
        .addCase(loginwithemailpassword.pending, (state, ) => {
            state.status = 'loading'
 })
        .addCase(loginwithemailpassword.rejected, (state, ) => {
            state.status = 'failed'
 })
    

    }

})
export const {logout,loaduser} = authSlice.actions
export default authSlice.reducer