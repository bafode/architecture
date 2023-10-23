import React, { Component,useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Signin.css';
import ErrorMessage from '../components/ErrorMessage';
import { signin } from '../actions/userAction';
import Loader from '../components/Loader';

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


const Signin= ({ location, history }) =>  {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMesssage,setErrorMessage]=useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
  
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])
    
      const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(login, password))
      }


    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Hello!</Heading>
          <p>Fill in your username and password to sign in.</p>
          
          {errorMesssage && <ErrorMessage message={errorMesssage} />}
          {error && <ErrorMessage message={error} />}
          {loading && <Loader />}

          <div>
            <FormField
              id="outlined-name"
              label="Login"
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
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <hr/>
          <div>
            <Button
              style={{ marginBottom: '10px' }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitHandler}
            >
              SIGN IN
            </Button>

           
            <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                <Button fullWidth >
                      Don't have an account? Sign up now!
                </Button>
            </Link>
          </div>
        </FormContainer>
      </div>
    );
  }


export default Signin;