import React, { useEffect, useState } from 'react';
import { deleteData, getData } from './api';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EmployeeForm from './EmployeeForm';

export const EmployeesDetails = () => {
  const [apiData, setApiData] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState([]);
  
  const handleApi = async () => {
    try {
      const val = await getData();
      setApiData(val);
    } catch (error) {
      // Handle the error appropriately, e.g., show an error message to the user
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);
  

  const handleEdit = async(id) => {
    // Implement edit functionality as needed
    setShow(true)
    const filteredData=apiData.filter(val=>val._id===id)
    setEditData(filteredData)
    
  };

  const handleDelete = async(id) => {
    // Implement delete functionality as needed
    await deleteData(id)
    const result= await getData()
    setApiData(result)
  };

  const handleCreateEmployee = () => {
    // Implement create employee functionality as needed
    console.log('Create new employee',editData);
    setShow(!show)
    setEditData([])
  };

  return (
    <>
      {show?<EmployeeForm {...{data:editData,setApiData:setApiData,setShow}}/>:null}
      <br/>
    <Button
        variant="contained"
        color="success" // You may need to adjust the color based on your MUI theme
        startIcon={show?<RemoveIcon/>:<AddIcon />}
        onClick={handleCreateEmployee}
      >
        Add Employee
      </Button>   
      <Typography variant="h4" align="center" gutterBottom>
        Employees Details Table
      </Typography>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Date Of Joining</TableCell>
              <TableCell>Releaving Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map(({ name, dob, salary, joining_date, relieving_date, status, _id }) => (
              <TableRow key={_id}>
                <TableCell>{name}</TableCell>
                <TableCell>{dob}</TableCell>
                <TableCell>{salary}</TableCell>
                <TableCell>{joining_date}</TableCell>
                <TableCell>{relieving_date}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(_id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
