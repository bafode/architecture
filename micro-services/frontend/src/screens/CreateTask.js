import React, { Component,useState,useEffect } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage';
import { createTask } from '../actions/taskAction';
import Loader from '../components/Loader';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;


const CreateTask=({ location, history })=> {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage,setErrorMessage]=useState(null)

    const dispatch = useDispatch()

    const taskCreate = useSelector((state) => state.taskCreate)
    const { loading,success, error, task } = taskCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
      if (!userInfo) {
        history.push('/signin')
      }
    }, [history, userInfo,dispatch, redirect,success])
 
 const handleSubmitTask =(e) => {
    e.preventDefault()
    e.preventDefault()
    if(title===""||description===""){
        setErrorMessage("Fill the form first")
    }else{
        dispatch(createTask(title,description))
        setTitle("")
        setDescription("")
        history.push('/')
    }
  };

    return (
      <FormWrapper>
        <FormContainer>
          <h1>Create a new task</h1>
          <p>Provide information about the task you wish to complete.</p>

          {errorMessage && <ErrorMessage message={errorMessage} />}

          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              onChange={e => setTitle(e.target.value )}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Description"
              placeholder="Description"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={e =>setDescription(e.target.value)}
            />
          </FormControl>

          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmitTask}
          >
            CREATE TASK
          </Button>
        </FormContainer>
      </FormWrapper>
    );
  }


export default CreateTask;