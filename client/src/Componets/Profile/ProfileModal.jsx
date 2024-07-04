import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  ArrowDropDown } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import LogoutBtn from "../Buttons/LogoutBtn"


function ProfileModal() {

  const user = localStorage.getItem('user');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const route = location.pathname.split("/")[1]
  
  return (
    <>
         <img 
            className='nav-profile-img'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU" alt=""
            onClick={handleShow} 
            />
            <span className='user-name' style={{color:"white"}}>{user}</span>
            <ArrowDropDown 
             className='dropdown-icon'
             style={{
               fontWeight:'600',
               fontSize:'25px'
             }}
             />
      <Modal show={show} onHide={handleClose} 
        animation={false} style={{
            marginLeft:"64%",
            width:'10%',
            marginTop:'1.5%',
        }}
        >
        <Modal.Header closeButton style={{color:'red'}}>
        </Modal.Header>
        <Modal.Body style={{display:'flex', flexDirection:"column", gap:"10px"}}>
            <Link to={`/${route}/profile`} 
             onClick={handleClose}
             style={{textDecoration:'none', color:'black'}}
             >
               <span>View Profile</span>
            </Link>
            <span>Update Profile</span>
            <span>Logout</span>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;