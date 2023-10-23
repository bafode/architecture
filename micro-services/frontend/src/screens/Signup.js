import React, { Component,useState,useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userAction';
import Loader from '../components/Loader';

import './Signup.css';
import ErrorMessage from '../components/ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const Signup=({ location, history })=> {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMesssage,setErrorMessage]=useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])


      const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match')
        } else {
        console.log(firstName,lastName,login, password)
          dispatch(register(firstName,lastName,login, password))
        }
      }

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us!</Heading>
          <p>Start managing tasks easily.</p>

        
          {errorMesssage && <ErrorMessage message={errorMesssage} />}
          {error && <ErrorMessage message={error}/>}
          {loading && <Loader />}
          <div>
            <FormField
              id="outlined-name"
              label="fistname"
              margin="dense"
              variant="outlined"
              onChange={e => setFirstName(e.target.value )}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="lastname"
              margin="dense"
              variant="outlined"
              onChange={e => setLastName(e.target.value )}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="login"
              margin="dense"
              variant="outlined"
              onChange={e => setLogin(e.target.value )}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => setPassword(e.target.value )}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Confirm Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => setConfirmPassword(e.target.value )}
            />
          </div>
          <hr/>
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitHandler}
            >
              SIGN UP
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }


export default Signup;