import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendPost, getRequest, doPost } from "../../server";

const initialState = {
    userData: {},
    userToken: '',
    current_tab: 'home',
    settings_tab: 'account',
    active_warehouse: null,
    counter: process.env.REACT_APP_COUNTER,
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

export const changeTab = createAsyncThunk(
    'user/changeTab',
    async (payload) => {
        return payload
    }
)


export const changeSettingsTab = createAsyncThunk(
    'user/changeSettingsTab',
    async (payload) => {
        return payload
    }
)

export const updateCounter = createAsyncThunk(
    'user/updateCounter',
    async (payload) => {
        return payload
    }
)

export const changeWarehouse = createAsyncThunk(
    'user/changeWarehouse',
    async (payload) => {
        return payload
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

        // CHANGE TAB
        builder.addCase(changeTab.pending, (state) => {
        })
        builder.addCase(changeTab.fulfilled, (state, action) => {
            state.current_tab = action.payload
        })
        builder.addCase(changeTab.rejected, (state, action) => {
        })

        // CHANGE SETTINGS TAB
        builder.addCase(changeSettingsTab.pending, (state) => {
        })
        builder.addCase(changeSettingsTab.fulfilled, (state, action) => {
            state.settings_tab = action.payload
        })
        builder.addCase(changeSettingsTab.rejected, (state, action) => {
        })


        // UPDATE COUNTER
        builder.addCase(updateCounter.pending, (state) => {
        })
        builder.addCase(updateCounter.fulfilled, (state, action) => {
            localStorage.setItem("COUNTER", action.payload.toString())
            state.counter = Number(action.payload)
        })
        builder.addCase(updateCounter.rejected, (state, action) => {
        })

        // CHANGE WAREHOUSE
        builder.addCase(changeWarehouse.pending, (state) => {
        })
        builder.addCase(changeWarehouse.fulfilled, (state, action) => {
            state.active_warehouse = action.payload
        })
        builder.addCase(changeWarehouse.rejected, (state, action) => {
        })
    }
})

export const userState = (state) => state.user

export default UserSlice.reducer;