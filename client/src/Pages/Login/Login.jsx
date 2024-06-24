import React from 'react';
import "./style.css"
import { Mail, Lock, Visibility, Key, Password, VisibilityOff } from '@mui/icons-material';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { friendOptions } from '../../utils/Data';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { login } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { depCountActions } from '../../store/depCount';
import { toast, Toaster } from 'react-hot-toast';



const Login = () => {

  const navigate = useNavigate()

  const [credential, setCrdential] = useState({
    email:'',
    password:'',
    role:''
  });

  const [err, setErr] = useState();
  const [successMessage, setSuccessMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);

  
  const showSuccessToast = () => toast.success("Successfully logged in");
  const showErrorToast = () => toast.error('Error! cannot find account');


  const handleChange = (e, data) => {
    const { name, value } = data || e.target; 
  
    setCrdential(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", credential);
  
      if (response?.status === 200) {
        const { role } = response.data.data[0]; 
        const { name } = response.data.data[0];
        const { token } = response.data;
        const { staff_id } = response.data.data[0];

        setSuccessMessage(true);
  
        localStorage.setItem("role", role)
        localStorage.setItem("user", name);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", staff_id)
  
        showSuccessToast();
  
        // Delay navigation by 2 seconds
        setTimeout(() => {
          if (role === 'Admin' || role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === 'Doctor' || role === "doctor") {
            navigate("/doctor/dashboard");
          } else if (role === 'Nurse' || role === "nurse") {
            navigate("/nurse/dashboard");
          } else if (role === 'Pharmacist' || role === "pharmacist") {
            navigate("/pharmacist/dashboard");
          } else if (role === 'Accountant' || role === "accountant") {
            navigate("/accountant/dashboard");
          } else if (role === 'Laboratorist' || role === "laboratorist") {
            navigate("/laboratorist/dashboard");
          }else if (role === 'Radiographer' || role === "radiographer") {
            navigate("/radiographer/dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("user not found");
        showErrorToast()
      }
    }
  };
  
const handleShowPassword = () => {
  setShowPassword(!showPassword)
}

  return (
    <div className='login-container'>
      <Toaster/>
      <div className="login-input-container">
      <div className="header-container">
        <span className='welcome-text'>Welcome, Zangu-Vuga Community Clinic</span>
        <h3 className='login-title'>LOGIN PANEL</h3>
      </div>
       <div className="input-field">
       <select name="role" onChange={handleChange} className='login-input'>
          <option value="">--select role--</option>
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Pharmacist">Pharmacist</option>
          <option value="Accountant">Accountant</option>
          <option value="Laboratorist">Laboratorist</option>
          <option value="Radiographer">Radiographer</option>
        </select>
       </div>
        <div className="input-field">
          <input type="email" 
          className='login-input' 
          placeholder='Email Address' 
          name="email"
          onChange={handleChange}
          autoComplete="true"
          style={{marginRight:"35px"}}
          />
        </div>
        <div className="input-field">
          <input type={showPassword? "text" : "password"} 
          className='login-input' 
          placeholder='Password'
          name="password"
          onChange={handleChange}
          autoComplete="true"
          />
          {!showPassword &&
           <Visibility 
           onClick={handleShowPassword}
            style={{
             marginRight:"6px",
             fontSize:'20px',
             cursor:'pointer'
           }}
         /> 
          }
          {showPassword &&
            <VisibilityOff 
            onClick={handleShowPassword}
             style={{
              marginRight:"6px",
              fontSize:'20px',
              cursor:'pointer'
            }}
          /> 
          }
        </div>
        <div className="button-container">
          <input type="submit" 
          title='Sigin' 
          className='button' 
          onClick={handleLogin} 
          />
        </div>
        <p className='copyright'>@2024 Clinic Management System. Developed by Emmanuel Yidana</p>
      </div>
    </div>
  )
}

export default Login;