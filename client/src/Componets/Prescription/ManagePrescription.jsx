import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Buttons/Button';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import { getStaff, getPatients } from '../../store/data';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManagePrescription({name, id, patient_id}) {

  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname.split("/")[1]

  const [open, setOpen] = React.useState(false);
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    patient_id:null,
    doctor_id:null,
    medication:'',
    description:description,
    date:''
  });

  const showUpdateToast = () => toast.success("Updated Successfully");
  const showDeleteToast = () => toast.success("Deleted Successfully");
  const showErrorToast = () => toast.error('Error! cannot perform operation');

  const dispatch = useDispatch()
  const doctors = useSelector((state)=>state.data?.staff) || []
  const patients = useSelector((state)=>state.data?.patients) || []

  useEffect(()=>{
    dispatch(getStaff('Doctor'))
  }, [dispatch])

  useEffect(()=>{
    dispatch(getPatients())
  }, [dispatch])

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-prescription/${patient_id}`)
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  if (id === undefined) {
    return null; 
  }

  if (name === undefined) {
    return null; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target; 
  
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:5000/update_prescription/${id}`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        showUpdateToast()
      }
    } catch (error) {
        showErrorToast()
    }
  };

  const handleDelete = async() => {
    try {
      const response = await axios.delete(`http://localhost:5000/remove_prescription/${id}`);
      if(response.status === 200){
        handleDepCount()
        showDeleteToast()
      }
    } catch (error) {
        showErrorToast()
    }
  };


  return (
    <React.Fragment>
      <Toaster/>
      <Button
       handleClickOpen={handleClickOpen}
       handleDelete={ handleDelete}
       handleNavigate={handleNavigate} 
      />
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update {name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div className='input-container'>
          <label htmlFor="">Patient</label>
            <select name="patient_id" onChange={handleChange} value={data.patient} className='dropdown'>
              <option value="">--Select Patient--</option>
              {patients?.map((item)=>(
                <option value={item.patient_id} key={item.patient_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
        <div className='input-container'>
          <label htmlFor="">Doctor</label>
            <select name="doctor_id" onChange={handleChange} value={data.doctor}  className='dropdown'>
              <option value="">--Select Doctor--</option>
              {doctors?.map((item)=>(
                <option value={item.staff_id} key={item.staff_id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>
        <div className='input-container'>
            <label htmlFor="">Medication</label>
            <input type="text"
              className='input'
              placeholder='eg Mohammed Yidana'
              name='medication'
              onChange={handleChange} 
            />
        </div>
        <div className='input-container'>
            <label htmlFor="">Date</label>
            <input type="date"
              className='input'
              name='date'
              onChange={handleChange}  
            />
        </div>
        <div className="editor-container">
          <label htmlFor="" className='edtor-label'>Description</label>
           <ReactQuill 
            className="editor-input" 
            theme="snow" value={description} 
            onChange={setDescription}
            placeholder='Write prescription description here..' 
            />
        </div>
        </DialogContent>
        <DialogActions>
          <button autoFocus 
            onClick={handleUpdate}
            className='modal-btn'
            >
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}