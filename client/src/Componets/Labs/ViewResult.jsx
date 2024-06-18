import React, { useEffect, useState } from 'react'
import doctor from "../../Componets/images/staff/doctor 1.png";
import { useLocation } from 'react-router-dom';


const ViewBloodBank = () => {

    const[data, setData] = useState()
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    let patient_name = data?.map((d)=>d?.patient_name)
 

    useEffect(()=>{
        const getStaff = async()=>{
            try {
            const response = await fetch(`http://localhost:5000/lab_result/${id}`)
            if(!response.ok){
            console.log("faild to fetch data...")
            }
            console.log(response)
            const fetchedData = await response.json()
            setData(fetchedData)
            } catch (error) {
                console.log(error)
            }
        }
        getStaff()
    }, [])

    console.log(data)

  return (
    <div className='view-result-container'>
            <h3 className='result-title'>Lab Result ({patient_name})</h3>
            {data?.map((lab)=>(
                <div className="medical-history-container">
                <table className='medical-history-table'>
                  <thead className='table-head'>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <th className='view-patient-th '>Lab Result</th>
                         <th className='view-patient-th '>Test Name</th>
                         <th className='view-patient-th '>Laboratorist</th>
                         <th className='view-patient-th '>Date</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className='medical-history-td-tr view-patient-tr'>
                         <td className='medical-history-td-tr'>{lab.test_report}</td>
                         <td className='medical-history-td-tr'>{lab.test_name}</td>
                         <td className='medical-history-td-tr'>{lab.laboratorist_name}</td>
                         <td className='medical-history-td-tr'>{lab.laboratorist_name}</td>
                     </tr>
                   </tbody>
                </table>
             </div>  
            ))}
    </div>
  )
}

export default ViewBloodBank