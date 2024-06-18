import * as React from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Button from '../../../Componets/Buttons/Button';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { depCountActions } from '../../../store/depCount';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast, Toaster } from 'react-hot-toast';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ManageDepartment({name, id}) {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const[success, setSuccess] = useState()
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    name:'',
    description:description
  })

  const showUpdateToast = () => toast.success("Updated Successfully");
  const showDeleteToast = () => toast.success("Deleted Successfully");
  const showErrorToast = () => toast.error('Error! cannot perform operation');

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) =>{
    const {name, value} = e.target
    setData((prev)=>{
      return{
        ...prev, [name]:value
      }
    })
  }

  const dispatch = useDispatch()

  const handleDepCount =()=>{
    dispatch(depCountActions.handleCount())
  }

  const handleUpdate = async() =>{
    try {
      const response = await axios.put(`http://localhost:5000/update_department/${id}`, data);
      if(response.status === 201){
        handleClose()
        handleDepCount()
        showUpdateToast()
      }
    } catch (err) {
      showErrorToast()
    }
  }

  const handleDelete = async() => {
    try {
      const response = await axios.delete(`http://localhost:5000/remove_department/${id}`);
      if(response.status===200){
        setSuccess("Deleted successfully")
        handleDepCount()
        showDeleteToast()
      }
    } catch (error) {
        showErrorToast()
    }
  };

  const handleNavigate = () =>{
    navigate(`/admin/view-department/${id}`)
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
            <label htmlFor="">{name} Name</label>
            <input type="text"
             className='input'
             placeholder='eg Public Health'
             name='name'
             onChange={handleChange} 
          />
          </div>
          <div className="editor-container">
            <label htmlFor="" className='edtor-label'>Department Description</label>
            <ReactQuill className="editor-input" theme="snow" value={description} onChange={setDescription} />
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