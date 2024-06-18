import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const modalSlice = createSlice({
    name:"modal",
    initialState:{
        resultModal:false,
        lab_report_id:null,
        sidebar_toggle:false
    },
    reducers:{
        handleResultModal:(state)=>{
            state.resultModal = !state.resultModal
        },
        handleLabReport:(state, action)=>{
            state.lab_report_id = action.payload
        },
        handleSidebarToggle:(state)=>{
            state.sidebar_toggle = !state.sidebar_toggle
            console.log(state.sidebar_toggle)
        }
    }
})

export const {handleResultModal, handleLabReport, handleSidebarToggle} = modalSlice.actions;