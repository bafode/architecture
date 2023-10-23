import React, { Component,useState,useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../actions/taskAction';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

const Task=({task,onDeleteTask,onUpdateTaskStatus})=>{

    return (
      <CardContainer>
        <Card>
          <CardContent>
            <CardTitle>{task.title}</CardTitle>
            {task.description}
          </CardContent>
          <CardActions style={{ padding: '14px' }} disableSpacing>
            <Grid
              justify="space-between" // Add it here :)
              container 
            >
              <Grid item>
                <FormControl style={{ width: '140px' }}>
                  <Select
                    value={task.status}
                    onChange={ (e) => {
                        onUpdateTaskStatus(task._id,e.target.value)
                    }}
                    displayEmpty
                  >
                    <MenuItem value={'OPEN'}>Open</MenuItem>
                    <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                    <MenuItem value={'DONE'}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <IconButton onClick={()=>onDeleteTask(task._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
  }


export default Task;