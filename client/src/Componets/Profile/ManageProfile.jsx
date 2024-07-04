import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { useDispatch} from 'react-redux';
import { useLocation } from "react-router-dom";
import { depCountActions } from '../../store/depCount';
import axios from "axios";
import {exhaustiveUniqueRandom} from 'unique-random';
import 'react-toastify/dist/ReactToastify.css';
import { handleToastError, handleToastSuccess } from '../../store/modalState';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageProfile({name}) {
  
  const location = useLocation();
  const role = location.pathname.split("/")[2].replace("-list", "");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name:"",
    phone:"",
    address:"",
    email:"",
    password:"",
  })


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const dispatch = useDispatch()

  const handleChange = (e) =>{
    const {name, value} = e.target
    setData((prev)=>{
      return{
        ...prev, [name]:value
      }
    })
  }

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }


  const handleSubmit = async() => {
    const userId = localStorage.getItem("userId")
    try {
      const response = await axios.post(`http://localhost:5000/update_staff/${userId}`, data);
      if(response.status === 201){
        handleDepCount()
        handleClose()
        dispatch(handleToastSuccess("Successfully Added"))
      }
    } catch (error) {
      dispatch(handleToastError("Error! cannot perform operation"))
    }
  };


  return (
    <React.Fragment>
      <button className='add-btn'
      onClick={handleClickOpen}
      style={{
        backgroundColor:"green",
        padding:'15%',
        width:'150%',
        color:'white'
      }}
      >
        Update
      </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update Profile
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
            <label htmlFor="">{name} Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana' 
              name='name'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmial.com'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Password</label>
            <input type="password"
               className='input'
               placeholder='enter a strong password'
               name='password'
               onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="text"
               className='input'
               placeholder='eg 0597893082'
               value={"0597893082"}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Address</label>
            <input type="text"
               className='input'
               placeholder='University of Ghana'
               name='address'
               onChange={handleChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor="" className='label'>Profile Image</label>
            <input type="file"
             name='file'
             onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button autoFocus 
            onClick={handleSubmit}
            className='modal-btn'
            >
            Save changes
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}