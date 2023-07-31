import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendPost, getRequest, doPost } from "../../server";

const initialState = {
    userData: {},
    userToken: '',
    loggedIn: false,
    loading: false,
    error: null,
}

export const LoginUser = createAsyncThunk(
    'user/loginUser',
    async (payload) => {
        const response = await doPost("auth/login", payload)
        return response
    }
)

export const LogoutUser = createAsyncThunk(
    'user/logoutUser',
    async () => {
        return
    }
)

export const getMe = createAsyncThunk(
    'user/me',
    async () => {
        const response = await getRequest("users/me")
        return response
    }
)


export const getPrevMe = createAsyncThunk(
    'user/prevme',
    async () => {
        const load = await localStorage.getItem("USER_DATA")
        .then(async value => {
            if(value != null){
                const user_data = JSON.parse(value)
                const payload = user_data
                return payload
            }
        })
        if(load){
            return load
        }
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // LOGIN USER
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = true
            // state.userData = action.payload
            state.userToken = action.payload?.access_token
            if(action.payload?.access_token){
                localStorage.setItem("USER_TOKEN", action.payload?.access_token)
            }
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            localStorage.setItem("USER_TOKEN", '')
            state.loggedIn = false
            state.loading = false
            // state.error = action.error.message
        })


        // LOGOUT USER
        builder.addCase(LogoutUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = false
            state.userData = {}
            state.userToken = ''
        })
        builder.addCase(LogoutUser.rejected, (state, action) => {
            state.loggedIn = false
            state.loading = false
            // state.error = action.error.message
        })

        // GET ME
        builder.addCase(getMe.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = true
            state.userData = action.payload
            localStorage.setItem("USER_DATA", JSON.stringify(action.payload))
        })
        builder.addCase(getMe.rejected, (state, action) => {
            // localStorage.setItem("USER_DATA", '')
            // state.loggedIn = false
            state.loading = false
            // state.error = action.error.message
        })

        // GET PREV ME
        builder.addCase(getPrevMe.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getPrevMe.fulfilled, (state, action) => {
            state.loading = false
            if(action.payload){
                state.loggedIn = true
            }
            state.userData = action.payload
        })
        builder.addCase(getPrevMe.rejected, (state, action) => {
            localStorage.setItem("USER_DATA", '')
            state.loggedIn = false
            state.loading = false
            // state.error = action.error.message
        })
    }
})

export const userState = (state) => state.user

export default UserSlice.reducer;