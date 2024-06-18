import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





export const getStaff = createAsyncThunk("doctors", async (role) => {
    try {
      const response = await axios.get(`http://localhost:5000/staff/${role}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getPatients = createAsyncThunk("patients", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/patients`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getBeds = createAsyncThunk("beds", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/beds`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getBloodGroup = createAsyncThunk("blood_group", async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blood_bank_list`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });


export const dataSlice = createSlice({
    name:"data",
    initialState:{
        staff:[],
        patients:[],
        beds:[],
        bloodBank:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder     
          .addCase(getStaff.fulfilled, (state,action)=>{
            state.staff = action.payload
          })
          .addCase(getPatients.fulfilled, (state,action)=>{
            state.patients = action.payload
          })
          .addCase(getBeds.fulfilled, (state,action)=>{
            state.beds = action.payload
          })
          .addCase(getBloodGroup.fulfilled, (state,action)=>{
            state.bloodBank = action.payload
          })                  
    }
})

