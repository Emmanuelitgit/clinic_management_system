import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Buttons/Button';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { depCountActions } from '../../store/depCount';
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

export default function ManagePatient({name,id,patient,age,sex,email,blood_group,phone,birth,address}) {

  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname.split('/')[1]

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name:patient,
    email:email, 
    phone:phone, 
    address:address, 
    age:age, 
    sex:sex, 
    birth_date:birth, 
    blood_group:blood_group,
  })

  const showUpdateToast = () => toast.success("Updated Successfully");
  const showDeleteToast = () => toast.success("Deleted Successfully");
  const showErrorToast = () => toast.error('Error! cannot perform operation');

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const hadnleChange =(e)=>{
    const{name, value} = e.target
    setData((prev)=>{
      return{
        ...prev,[name]:value
      }
    })
  }

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:5000/update_patient/${id}`, data);
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
      const response = await axios.delete(`http://localhost:5000/remove_patient/${id}`);
      if(response.status === 200){
        handleDepCount()
        showDeleteToast()
      }
    } catch (error) {
        showErrorToast()
    }
  };

  const handleNavigate = () =>{
    navigate(`/${route}/view-patient/${id}`)
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
            <label htmlFor="">Patient Name</label>
            <input type="text"
              className='input'
              placeholder='eg Emmanuel Yidana'
              value={data.name}
              name='name'
              onChange={hadnleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <input type="text"
              className='input'
              placeholder='eg eyidana001@gmail.com'
              value={data.email}
              name='email'
              onChange={hadnleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone</label>
            <input type="number"
              className='input'
              placeholder='eg 0597893082'
              value={data.phone}
              name='phone'
              onChange={hadnleChange} 
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Patient Address</label>
            <input type="text"
              className='input'
              placeholder='eg University of Ghana'
              value={data.address}
              name='address'
              onChange={hadnleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Age</label>
            <input type="number"
              className='input'
              placeholder='eg 25'
              value={data.age}
              name='age'
              onChange={hadnleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Sex</label>
            <input type="text"
               className='input'
               placeholder='eg Male'
               value={data.sex}
               name='sex'
               onChange={hadnleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Blood Group</label>
            <input type="text"
               className='input'
               placeholder='eg AB+'
               value={data.lood_group}
               name='blood_group'
               onChange={hadnleChange}  
            />
          </div>
          <div className='input-container'>
            <label htmlFor="">Birth Date</label>
            <input type="text"
               className='input'
               placeholder='eg 24/03/2000'
               value={data.birth}
               name='birth_date'
               onChange={hadnleChange}  
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