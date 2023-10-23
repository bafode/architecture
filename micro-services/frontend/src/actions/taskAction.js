import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_DETAILS_SUCCESS,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_REQUEST,
  TASK_DELETE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL
} from '../constants/taskConstants'
import { logout } from './userAction'

export const listTasks = (keyword = '',status="", pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const response = await fetch(
      `http://localhost:5001/task?keyword=${keyword}&status=${status}&pageNumber=${pageNumber}`,
      config
      );
    const data= await response.json();
    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

   await fetch(`http://localhost:5001/task/${id}`, config);
 
    dispatch({
      type: TASK_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createTask = (title,description) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

  
    const config = {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        'title':title,
        'description':description
      })
    }

    const response = await fetch(`http://localhost:5001/task`, config)

    const data=await response.json()
    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      method: 'PUT',
      headers: {
         Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        'status':task.status
      })
    }

    const response = await fetch(
      `http://localhost:5001/task/${task._id}`,
      config
    )

    const data=await response.json()

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: message,
    })
  }
}
