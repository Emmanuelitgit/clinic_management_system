import React from 'react';
import { Menu } from '@mui/icons-material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';


export const NoticeBoard = () => {
  return (
    <div className='notice-container'>
       <div className="notice-header-container">
        <span className='notice-header-text'><Menu/> NoticeBoard</span>
       </div>
       <div className="notice-items-container">
         <div className="notice-text-icon-container">
           <div className="notice-icon-container">
              <NoteAltIcon style={{color:'white'}}/>
           </div>
           <div className="notice-text-item">
             <span className='notice-text-title'>Medical Consultation</span>
             <p className='notice-p-text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
           </div>
         </div>
        {/* <span>date</span> */}
       </div>
    </div>
  )
}
