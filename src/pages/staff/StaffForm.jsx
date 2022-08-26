import { Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Controls from '../../components/controlls/Controls';
import { useForm, Form } from '../../components/useForm';
import * as employeeService from '../../service/staffService';


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]
const workStatus = [
    { id: 'Full Time', title: 'Full time' },
    { id: 'Partime', title: 'Partime' },
]

const initialFValues = {
    id: 0,
    staffID: '',
    firstName: '',
    fullName: '',
    lastName: '',
    qualification: '',
    academicRankID: '',
    posision: '',
    email: '',
    phone: '',
    status: '',
    hireDate: new Date(),
    isFullTime: false,
}

const StaffForm = (props) => {
    const { addOredit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('academicRankID' in fieldValues)
            temp.academicRankID = fieldValues.academicRankID.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

   

    const handleSubmit = e => {
        e.preventDefault()

        // if (validate()) {
        console.log(' kkkkk');
        addOredit(values, resetForm)
        // }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (

        <Form onSubmit={handleSubmit}>
            <Grid container >

                <Grid item xs={6} >
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                        size="small"
                        fullWidth
                        style={{ margin: 10 }}
                    />
                    <Controls.Input
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                        size="small"
                        fullWidth
                        style={{ margin: 10 }}
                    />
                    <Controls.Input
                        name="staffID"
                        label="ID"
                        value={values.staffID}
                        onChange={handleInputChange}
                        error={errors.staffID}
                        size="small"
                        fullWidth
                        style={{ margin: 10 }}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        size="small"
                        style={{ margin: 10, mb: 10 }}
                    />
                </Grid>
                <Grid item xs={6} >
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                        size="small"
                        style={{ margin: 10 }}
                    />
                    <Controls.Input
                        name="qualification"
                        label="Qualification"
                        value={values.qualification}
                        onChange={handleInputChange}
                        error={errors.qualification}
                        size="small"
                        fullWidth
                        style={{ margin: 10 }}
                    />
                    <Controls.Select
                        name="academicRankID"
                        label="Academic Rank"
                        options={employeeService.getAcademicRankCollection()}
                        value={values.academicRankID}
                        onChange={handleInputChange}
                        error={errors.academicRank}
                        size="small"
                        style={{ margin: 10 }}
                    />
                    <Controls.RadioGroup
                        name="status"
                        label="Type"
                        value={values.status}
                        onChange={handleInputChange}
                        items={workStatus}
                        style={{ margin: 10 }}
                    />
                </Grid>
                <Grid container>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6} justify="flex-end" alignItems="flex-end" width={"100%"} >
                    <div style={{ bottom: 2, right: 2, paddingTop: 15, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Controls.Button
                            text="Reset"
                            onClick={resetForm}
                            style={{ bottom: 3, right: 3 }}
                            size='500'
                            variant="outlined"
                            color="secondary"
                            sx={{ width: 100, padding: 0.5, margin: 2 }}
                        />
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            color="secondary"
                            sx={{ width: 100, padding: 0.5, margin: 2 }}
                        />
                    </div>
                </Grid>
                </Grid>
            </Grid>
        </Form>
    )
}
export default StaffForm;