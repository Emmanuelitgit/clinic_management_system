import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddAllotment from './AddAllotment';
import ManageAllotment from './ManageAllotment';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


const BedAllotmentList = () => {

  const role = localStorage.getItem("role");
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/bed_allotments');
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Bed Type', field: 'bed_type', sort: 'asc' },
                { label: 'Bed Number', field: 'bed_number', sort: 'asc' },
                { label: 'Patient', field: 'patient', sort: 'asc' },
                { label: 'Allotment Date', field: 'allotment', sort: 'asc' },
                { label: 'Discharge Date', field: 'discharge', sort: 'asc' },
              ];
              if (role === "Doctor") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }else if(role === "Nurse"){
                 columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.allotment_id,
                      bed_type: item.bed_type,
                      bed_number: item.bed_number,
                      patient: item.patient_name,
                      allotment:item.allotment_date,
                      discharge:item.discharge_date,
                      actions: (
                          <ManageAllotment
                          name={"Bed Allotment"}
                          id={item.allotment_id}
                          patient_id={item.patient_id}
                          />
                      )
                  })),
              };

              setData(transformedData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, [dep]);

  return (
      <div className='main-border'>
          {role === "Doctor"  &&
              <div className='add-btn-container'>
                  <AddAllotment/>
              </div>
          }
          {role === "Nurse"  &&
            <div className='add-btn-container'>
               <AddAllotment/>
            </div>
          }
          <MDBDataTable
              striped
              bordered
              searchLabel='Search name...'
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

export default BedAllotmentList;