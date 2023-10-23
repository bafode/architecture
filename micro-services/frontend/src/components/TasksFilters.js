import React, { Component,useState,useEffect } from 'react';
import { Grid, FormControl, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;


const TasksFilters=({onFilterByStatus,onSearch})=>{
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('')


 const handleStatusFilterChange = e => {
      onFilterByStatus(e.target.value)
   
  };

 const handleSearchTermChange = e => {
    onSearch(e.target.value)
  }

    return (
      <FiltersContainer>
        <Grid
          justify="space-between" // Add it here :)
          container
        >
          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: '220px' }}>
                <TextField
                  placeholder="Search..."
                 onChange={handleSearchTermChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </ControlContainer>
          </Grid>

          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: '220px' }}>
                <Select
                  value={status}
                  onChange={handleStatusFilterChange}
                  displayEmpty
                >
                  <MenuItem value="">No status filter</MenuItem>
                  <MenuItem value={'OPEN'}>Open</MenuItem>
                  <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                  <MenuItem value={'DONE'}>Done</MenuItem>
                </Select>
              </FormControl>
            </ControlContainer>
          </Grid>
        </Grid>
      </FiltersContainer>
    );
  }


export default TasksFilters;