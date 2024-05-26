import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name : "root",
    initialState :{
     loading : false,
     showPassword: false,
     token: null,
     user: null,
     userRole: null,
    },
    reducers :{ 
        showLoading : (state, action) => {
            state.loading = true
        },
        setLoading : (state, action) =>{
            state.loading = action.payload
        },
        HideLoading: (state, action) =>{
            state.loading = false
        },
        setShowPassword: (state, action) => {
            state.showPassword = action.payload;
          },
          setAuthToken: (state, action) => {
            state.token = action.payload;
          },
          setUser: (state, action) => {
            state.user = action.payload;
          },
          setUserRole: (state, action) => {
            state.userRole = action.payload;
          },
          logout: (state) => {
            state.token = null;
            state.user = null;
            state.userRole = null;
          },
    }
})
export default rootSlice.reducer;
export const {
    showLoading,
    HideLoading,
    setLoading,
    setShowPassword,
    setAuthToken,
    setUser,
    setUserRole,
    logout,
} = rootSlice.actions