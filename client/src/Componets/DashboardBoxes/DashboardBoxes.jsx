import React from 'react'
import "./style.css";
import Calender from '../Calender/Calender';
import { Person } from '@mui/icons-material'
import { accountantBoxes, adminBoxes, laboratoristBoxes } from '../../utils/Data';
import { doctorBoxes } from '../../utils/Data';
import { nurseBoxes } from '../../utils/Data';
import { pharmacistBoxes } from '../../utils/Data';
import { LaboratoristBoxes } from '../../utils/Data';
import { radiographerBoxes } from '../../utils/Data';
import { Link } from 'react-router-dom';
import { NoticeBoard } from '../../Pages/Admin/Notice/NoticeBoard';
import { useDispatch, useSelector } from 'react-redux';


const DashboardBoxes = () => {

    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const role = localStorage.getItem('role').toLowerCase()

  return (
    <div className=''>

        {role === "admin" &&
        <div class="row">
            {adminBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }
                        
        {role === "doctor" &&
        <div class="row">
            {doctorBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }

       {role === "nurse" &&
        <div class="row">
            {nurseBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }

       {role === "pharmacist" &&
        <div class="row">
            {pharmacistBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href="#">View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }

        {role === "laboratorist" &&
        <div class="row">
            {laboratoristBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }  

        {role === "accountant" &&
        <div class="row">
            {accountantBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }

        {role === "radiographer" &&
        <div class="row">
            {radiographerBoxes.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }

        { (role === "doctor" || role === "nurse") && <div className="doctor-nurse-horizontal-line"></div> } 
        { (role !== "admin" && role !== "doctor" && role !== "nurse") && <div className="other-horizontal-line"></div> } 

        <div className="footer-text-container">
        </div>
       {role !== "admin" &&
          <Calender/>
       }

    </div>
  )
}

export default DashboardBoxes