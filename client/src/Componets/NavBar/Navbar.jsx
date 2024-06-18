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



const Navbar = () => {

  //  const user = useSelector((state)=>state.auth?.currentUser) || []
  //  const role = useSelector((state)=>state.auth?.role) || []
   const visible = useSelector((state)=>state.modal?.sidebar_toggle) || []
   const roleValue = localStorage.getItem('role')
   const role = roleValue.charAt(0).toUpperCase() + roleValue.slice(1);
   const user = localStorage.getItem('user')
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
          <Badge badgeContent={4} color="primary" className='icons'>
              <MailIcon color="action" className='profile-icon' style={{color:'white'}} />
         </Badge>
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

// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function NavScrollExample() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary"
//     style={{
//       position:'fixed',
//       zIndex:1,
//       width:'100%',
//       right:'0%',
//       height:"10%"
//     }}>
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavScrollExample;