import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import Button from '../../../Componets/Buttons/Button';
import AddStaff from '../Add Staff/AddStaff';
import ManageStaff from '../Add Staff/ManageStaff';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';



const DoctorList = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const role = location.pathname.split("/")[2].replace("-list", "");
  
  const [data, setData] = useState({ columns: [], rows: [] });
  const staffData = useSelector(state => state.staff?.staff) || [];
  const dep = useSelector(state => state.count?.depValue) || [2];



  useEffect(() => {
    const fetchData = async()=>{
      try {

        const response = await fetch(`http://localhost:5000/staff/${role}`)
        if(!response.ok){
          throw new Error("faild to fetch")
        }
        const fetchedData = await response.json()

        const transformedData = {
          columns: [
            { label: 'ID', field: 'id', sort: 'asc' },
            { label: 'DOCTOR NAME', field: 'name', sort: 'asc' },
            { label: 'DEPARTMENT NAME', field: 'department', sort: 'asc' },
            { label: 'EMAIL', field: 'email', sort: 'asc' },
            { label: 'ACTIONS', field: 'actions', sort: 'disabled' },
          ],
          rows: fetchedData.map(item => ({
            id: item?.staff_id,
            name: item?.name,
            department: item?.department,
            email: item?.email,
            actions: (
              <ManageStaff
                name={"Doctor"}
                id={item?.staff_id}
              />
            ),
          })),
        };
    
        setData(transformedData);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[dep]);

  return (
    <div className='main-border'>
      <div className='add-btn-container'>
        <AddStaff
          name={"Doctor"}
        />
      </div>
      <MDBDataTable
        striped
        bordered
        searchLabel='Search a name'
        className='table-component'
        data={data}
        theadColor='black'
        theadTextWhite
        noBottomColumns
        searching
        displayEntries
        info
      />
    </div>
  );
}

export default DoctorList;
