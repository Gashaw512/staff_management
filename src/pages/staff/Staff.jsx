import { FormControl, InputAdornment, styled, TableBody, TableCell, TableRow, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import useTable from '../../components/useTable'
import * as employeeService from '../../service/staffService'
import AddIcon from '@mui/icons-material/Add';
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Controls from '../../components/controlls/Controls';
import SearchIcon from '@mui/icons-material/Search';
import StaffForm from './StaffForm';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Popup } from '../../components/Popup';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';

const headCells = [

  { id: 'fullName', label: 'Full Name' },
  { id: 'staffID', label: 'ID' },
  { id: 'qualification', label: 'Qualification' },
  { id: 'type', label: 'Type' },
  { id: 'academicRankID', label: 'Academic Rank', disableSorting: true },
  { id: 'load', label: 'Load' },
  { id: 'actions', label: 'Actions', disableSorting: true }];

const Staff = () => {
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const { TblContainer, TblHead, TblPagenation, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn)
  const [recordForEdit, setRecordforEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [type, setType] = React.useState('All');
  const [load, setLoad] = React.useState('All');
  const [semester, setSemester] = React.useState('1');
  const [term, setTerm] = React.useState('2022');
  const [exports, setExports] = React.useState('Pdf');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value)
    setFilterFn({
      fn: items => {
        if (e.target.value == "All")
          return items;
        else
          return items.filter(x => x.status == e.target.value)
      }
    })

  };

  const handleLoadChange = (e) => {
    setLoad(e.target.value);
    console.log('you have done it')
    console.log(e.target.value)
  };
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };
  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };
  const handleExportChange = (e) => {
    setExports(e.target.value);
  };

  const isNoStaff = records === undefined;

  const handleSearch = e => {
    let target = e.target;
    console.log(target.value)
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          return items.filter(x => x.fullName.includes(target.value))
      }
    })
  }
  const StyledAddButton = styled(Controls.Button)({
    position: 'absolute',
    right: '10px',
    margin: '4'

  })
  const addOredit = (employee, resetForm) => {
   
    let firstName = employee.firstName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    let lastName = employee.lastName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');


    employee.fullName = firstName + ' ' + lastName;
    if (employee.id === 0)
      employeeService.insertEmployee(employee)
    else
      employeeService.updateEmployee(employee);
    resetForm()
    setRecordforEdit(null)
    setOpenPopup(false)
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Submitted Succesfully',
      type: 'success'
    })
  }
  const openInPopup = (item) => {
    setRecordforEdit(item)
    setOpenPopup(true)
    console.log(item)
  }
  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    employeeService.deleteEmployee(id)
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Deleted Succesfully',
      type: 'error'
    })



  }

  return (
    <>
      {/* Top part = filter and export */}
      <Stack direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center"
        justifyContent="right"
        m={3}>
        <InputLabel id="emester">Semester</InputLabel>
        <Select
          labelId="semester"
          id="semester"
          value={semester}
          label="Semester"
          onChange={handleSemesterChange}
          sx={{ m: 1, minWidth: 100 }}
          size="small"
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="All">All</MenuItem>
        </Select>

        <InputLabel id="term">Term</InputLabel>
        <Select
          labelId="term"
          id="term"
          value={term}
          label="Term"
          onChange={handleTermChange}
          sx={{ m: 1, minWidth: 110 }}
          size="small"
        >
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="Overload">2020</MenuItem>
          <MenuItem value="Underload">2019</MenuItem>
        </Select>
        <InputLabel id="exports">Export</InputLabel>
        <Select
          labelId="exports"
          id="exports"
          value={exports}
          label="Export"
          onChange={handleExportChange}
          sx={{ m: 1, minWidth: 100 }}
          size="small"
        >
          <MenuItem value="excel">EXCEL</MenuItem>
          <MenuItem value="Pdf">pdf</MenuItem>
        </Select>
      </Stack>
      {/* Add button and description */}
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
      >
        <PageHeader
          title="Staff"
          subTitle="Active Staff List"
          icon={<PeopleOutlineIcon fontSize="medium" />}
        />
        <StyledAddButton
          text='Add New'
          color="secondary"
          variabt="outlined"
          startIcon={<AddIcon />
          }
          onClick={() => { setOpenPopup(true); setRecordforEdit(null) }}
          sx={{ width: 100, padding: 0.5, margin: 2 }}
        />
      </Stack>
      <hr color='#a5790c'  border-top="1px"/>
      {/* Search and other filter form */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems="center"
        justifyContent="right"
        m={3}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.3, sm: 1, md: 3 }}
          alignItems="center"
          justifyContent="right"
          marginRight={4}
        >
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            label="Type"
            onChange={handleTypeChange}
            sx={{ m: 1, minWidth: 130 }}
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Partime">Partime</MenuItem>
          </Select>

          <InputLabel id="load">Load</InputLabel>
          <Select
            labelId="load"
            id="load"
            value={load}
            label="Load"
            onChange={handleLoadChange}
            sx={{ m: 1, minWidth: 130 }}
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Overload">Overload</MenuItem>
            <MenuItem value="Underload">Underload</MenuItem>
          </Select>
        </Stack>
        <Controls.Input
          label="Search Employees"
          sx={{ m: 1, minWidth: 130 }}
          size="small"
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>)
          }}
          onChange={handleSearch}
        />
      </Stack>
      <TblContainer>
        <TblHead />
        <TableBody >

          {!isNoStaff ? (recordsAfterPagingAndSorting().map(item => (
            <TableRow key={item.id}>
              <TableCell>
                {item.fullName}
              </TableCell>
              <TableCell>
                {item.staffID}
              </TableCell>
              <TableCell>
                {item.qualification}
              </TableCell>
              <TableCell>
                {item.status}
              </TableCell>
              <TableCell>
                {item.academicRank}
              </TableCell>
              <TableCell>
                {item.load}
              </TableCell>
              <TableCell>
                <Controls.ActionButton onClick={() => openInPopup(item)}>
                  <ModeEditOutlineIcon fontSize='small' color='primary' />
                </Controls.ActionButton>
                <Controls.ActionButton onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: 'Are you sure to delete this record?',
                    subTitle: "You can't undo this operation",
                    onConfirm: () => { onDelete(item.id) }
                  })
                }}>
                  <CloseIcon fontSize='small' color='danger' />
                </Controls.ActionButton>
              </TableCell>
            </TableRow>))

          ) : 'No Employee'}
        </TableBody>
      </TblContainer>
      {!isNoStaff ? <TblPagenation /> : ''}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title='New Staff Registration Form'

      >
        <StaffForm addOredit={addOredit}
          recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  )
}

export default Staff
