import TextField from '@mui/material/TextField';
import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Container, Grid, Typography } from '@mui/material';
import { getData, postData, updateData } from './api';

function EmployeeForm({ data, setApiData,setShow }) {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        salary: '',
        joining_date: '',
        relieving_date: '',
        contact_number: '',
        status: 'active',
    });
    const [errors, setErrors] = useState({
        name: '',
        dob: '',
        salary: '',
        joining_date: '',
        contact_number: '',
    });

    useEffect(() => {
        let val = data[0]
        setFormData(val)
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        let error = '';
        if (name === "name" || name === "dob" || name === "joining_date" || name === "contact_number") {
            if (!value.trim()) {
                error = `${name} is required.`;
            }
        }
        if (name === "salary" || name === "contact_number") {
            if (isNaN(value)) {
                error = `${name} must be a valid number.`;
            }
        }

        // Update state
        setErrors({ ...errors, [name]: error });
        setFormData({ ...formData, [name]: value });
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleStatusChange = (event) => {
        setFormData({
            ...formData,
            status: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            // Assuming you have an API function to handle the submission
            // You can replace the following line with your actual API call
            if (data.length > 0) {
                // formData.id=data[0]?._id
                const res = await updateData(formData)
                if (res) {
                    setFormData({ formData })
                    setShow(false)
                }
                const result = await getData()
                setApiData(result)
                // console.log('Edit employee with ID:', res);
            } else {
                const requiredFields = ["name", "dob", "salary", "joining_date", "contact_number"];
                const newErrors = {};
                requiredFields.forEach((field) => {
                    if (!formData?.[field]?.trim()) {
                        newErrors[field] = `${field} is required.`;
                    }
                });
                if (isNaN(formData?.salary) || isNaN(formData?.contact_number)) {
                    newErrors.salary = "Salary must be a valid number.";
                    newErrors.contact_number = "Contact Number must be a valid number.";
                }

                // Update errors state
                setErrors(newErrors);

                // If there are validation errors, don't proceed with the API call
                if (Object.keys(newErrors).length > 0) {
                    return;
                }


                const response = await postData(formData)
                if (response) {
                    setFormData({ formData })
                    setShow(false)
                }
                const result = await getData()
                setApiData(result)
                if (!response) {
                    throw new Error('API request failed');
                }

                return response.json();

            }

            // Handle the API response as needed
        } catch (error) {
            // Handle API error
            console.error('API Error:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" align="center" gutterBottom>
                    Employee Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Name"
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={formData?.dob}
                                onChange={handleChange}
                                error={!!errors.dob}
                                helperText={errors.dob}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                variant="standard"
                                label="Salary"
                                name="salary"
                                value={formData?.salary}
                                onChange={handleChange}
                                error={!!errors.salary}
                                helperText={errors.salary}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Joining Date"
                                name="joining_date"
                                type="date"
                                value={formData?.joining_date}
                                onChange={handleChange}
                                error={!!errors.joining_date}
                                helperText={errors.joining_date}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Relieving Date"
                                name="relieving_date"
                                type="date"
                                value={formData?.relieving_date}
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Contact Number"
                                name="contact_number"
                                type="number"
                                value={formData?.contact_number}
                                onChange={handleChange}
                                error={!!errors.contact_number}
                                helperText={errors.contact_number}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                aria-label="status"
                                name="status"
                                value={formData?.status}
                                onChange={handleStatusChange}
                            >
                                <FormControlLabel
                                    value="active"
                                    control={<Radio color="primary" />}
                                    label="Active"
                                />
                                <FormControlLabel
                                    value="inactive"
                                    control={<Radio color="primary" />}
                                    label="Inactive"
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            {data.length > 0 ? "Update" : "Submit"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default EmployeeForm;
