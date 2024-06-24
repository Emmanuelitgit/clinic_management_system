import React, { useEffect, useState } from 'react';
import "./style.css";
import { 
       Menu,
       Notifications, 
       Message, 
       ArrowDropDown } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Panelbar from '../Panelbar/Panelbar';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebarToggle } from '../../store/modalState';
import { Link, useLocation } from 'react-router-dom';



const Navbar = () => {

  //  const user = useSelector((state)=>state.auth?.currentUser) || []
  //  const role = useSelector((state)=>state.auth?.role) || []
   const visible = useSelector((state)=>state.modal?.sidebar_toggle) || []
   const roleValue = localStorage.getItem('role')
   const role = roleValue?.charAt(0).toUpperCase() + roleValue.slice(1);
   const user = localStorage.getItem('user')
   const location = useLocation()
   const route = location.pathname.split("/")[1]
  //  const [visible, setVisible] = useState(false)

   const dispatch = useDispatch()


   const handleToggle = () =>{
    dispatch(handleSidebarToggle())
   }

  return (
    <div className='navbar-container'>
      <div className='menu-title-container'>
           <span className='menu-icon-container'>
             <Menu 
              onClick={handleToggle} 
               className='menu-icon'
               />
           </span>
            <span className='navbar-title'>CLINIC SERVICE MANAGEMENT SYSTEM 
            <span className='dash'>-</span> 
            </span> <span className='zangu'> ZANGU-VUGA</span>
      </div>
      <div className='panel-type-container'>
         <h4 className='panel-type-text'>{role} Panel</h4>
      </div>
      <div className='nav-profile-container'>
          <Link to={`/${route}/chat`}>
          <Badge badgeContent={4} color="primary" className='icons'>
              <MailIcon color="action" className='profile-icon' style={{color:'white'}} />
         </Badge>
          </Link>
         <Badge badgeContent={4} color="primary" className='icons'>
              <NotificationsIcon color="action" className='profile-icon' style={{color:'white'}} />
         </Badge>
         <div className='user-profile-container'>
            <img 
            className='nav-profile-img'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU" alt="" />
            <span className='user-name'>{user}</span>
            <ArrowDropDown 
             className='dropdown-icon'
             style={{
               fontWeight:'600',
               fontSize:'25px'
             }}
             />
         </div>
      </div>
      {/* <Panelbar/> */}
    </div>
  )
}

export default Navbar