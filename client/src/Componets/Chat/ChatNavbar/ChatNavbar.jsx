// import React from 'react'
// import "./ChatNavbar.css"
// import image from "../../images/staff/doctor 1.png"
// import { Logout } from '@mui/icons-material';
// import { Link } from 'react-router-dom'
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const ChatNavbar = ({receiverId}) => {

//     const[user, setUser] = useState('')

//     useEffect(()=>{
//         const getUsers = async() =>{
//             try {
//                 const response = await axios.get(`http://localhost:5000/single_staff/${receiverId}`)
//                 if(!response){
//                   throw new Error("faild to fetch")
//                 }

//                 setUser(response.data)

//             } catch (error) {
//                 console.log("an error occured")
//             }
//         }
//         getUsers()
//     },[receiverId])

//     const userName = user !==""? user.map(user=>user.name):"No user Selected"

//     return (
//     <div className='chat-navbar-container'>
//         <div className="user-container-nav">
//             <div className="user-info-container-nav">
//                {userName[0] !== undefined?
//                <img src={image} alt="" className='user-img-nav'/> : 
//                <span className='user-name'>No user selected</span> }
//                <span className='user-name'>{userName[0]}</span>
//             </div>
//             <div className="chat-logout-btn-container">
//                 <Link to={'/admin/dashboard'}>
//                    <Logout style={{color:'white', fontSize:'23px', cursor:'pointer'}}/>
//                 </Link>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ChatNavbar

import React from 'react';
import "./ChatNavbar.css";
import image from "../../images/staff/doctor 1.png";
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ChatNavbar = ({ receiverId }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/single_staff/${receiverId}`);
                if (!response) {
                    throw new Error("failed to fetch");
                }
                setUser(response.data);
            } catch (error) {
                console.log("an error occurred");
            }
        };
        getUsers();
    }, [receiverId]);

    const userName = user !== "" ? user.map(user => user.name) : "No user Selected";

    return (
        <div className='chat-navbar-container'>
            <div className="user-container-nav">
                <div className="user-info-container-nav">
                    {userName[0] !== undefined ?
                        <img src={image} alt="" className='user-img-nav' /> :
                        <span className='user-name'>No user selected</span>}
                    <span className='user-name'>{userName[0]}</span>
                </div>
                <div className="chat-logout-btn-container">
                    <Link to={'/admin/dashboard'}>
                        <Logout style={{ color: 'black', fontSize: '23px', cursor: 'pointer' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChatNavbar;
