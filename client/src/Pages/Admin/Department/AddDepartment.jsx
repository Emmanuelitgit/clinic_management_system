import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
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


export default function AddDepartment() {

  const [open, setOpen] = useState(false);
  const[success, setSuccess] = useState()
  const[description, setDescription] = useState()
  const [data, setData] = useState({
    name:"",
    description:description
  })

  const showSuccessToast = () => toast.success("Created Successfully");
  const showErrorToast = () => toast.error('Error! cannot perform operation');


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData((prevData) => ({ ...prevData, description }));
  }, [description]);


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


  const handleSubmit = async() =>{
    try {
      const response = await axios.post(`http://localhost:5000/add_department`, data);
      if(response.status === 201){
        setSuccess("Success")
        handleClose()
        handleDepCount()
        showSuccessToast()
      }
    } catch (err) {
      showErrorToast()
    }
  }
  

  return (
    <React.Fragment>
      <button variant="outlined" 
        onClick={handleClickOpen}
        className='add-btn'
      >
        <Add style={{fontSize:'40px'}}/>
    </button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Add New Department
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
            <label htmlFor="">Department Name</label>
            <input type="text" 
             className='input'
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