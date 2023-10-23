import React, {useEffect } from 'react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Task from '../components/Task';
import TasksFilters from '../components/TasksFilters';
import { deleteTask, listTasks,updateTask} from '../actions/taskAction';
import Loader from '../components/Loader';
import { logout } from '../actions/userAction';
import ErrorMessage from '../components/ErrorMessage';

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #3a5683;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #312509;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;
  
  .signOutIcon {
    fill: gray;
  }
`;


const Tasks=({ location, history,match })=> {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const taskList = useSelector((state) => state.taskList)
    const { loading, error, tasks } = taskList


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const taskDelete = useSelector((state) => state.taskDelete)
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = taskDelete

    const taskUpdate = useSelector((state) => state.taskUpdate)
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = taskUpdate
  
  

    const redirect = location.search ? location.search.split('=')[1] : '/'

   

    useEffect(() => {
        if (userInfo) {
         dispatch(listTasks())
        } else {
          history.push('/signin')
        }
      }, [dispatch, history, userInfo,successDelete,successUpdate])
  

  const logoutHandler = () => {
    dispatch(logout())
  }

  const deleteTaskHandler = (id) => {
    console.log(id)
    if (window.confirm('Are you sure')) {
        dispatch(deleteTask(id))
      }
}

const updateTaskStatusHandler = (id,status) => {
    dispatch(
      updateTask({
       _id:id,status
      })
    )
  }

  const taskSearchHandler = (keyword) => {
    dispatch(listTasks(keyword))
   console.log(keyword)
  }

  const taskFilterByStatusHandler = (status) => {
    dispatch(listTasks("",status))
   }
 


  
 const renderTasks = () => {

    if (!tasks?.length) {
      return <EmptyTasksPlaceholder>No tasks available. Create one?</EmptyTasksPlaceholder>
    }

    return tasks?.map(task => (
      <Task
      key={task._id}
        task={task}
        onDeleteTask={()=>deleteTaskHandler(task._id)}
        onUpdateTaskStatus={updateTaskStatusHandler}
        
      />
    ));
  };

    return (
      <TasksWrapper>
        <TasksHeader>
          <Title>Task Management System</Title>

          <CreateButtonContainer>
          <Link to={redirect ? `/tasks/create?redirect=${redirect}` : '/tasks/create'}>
          <Fab
              variant="extended"
            >
              <AddIcon />
              Create Task
            </Fab>
          </Link>

            <SignOutIconContainer>
              <IconButton onClick={logoutHandler}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </TasksHeader>

    
    
        {error && <ErrorMessage message={error}/>}
        {loading && <Loader />}
        {loadingDelete && <Loader />}
        {errorDelete && <ErrorMessage message={errorDelete}/>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <ErrorMessage message={errorUpdate}/>}


        <TasksFilters onFilterByStatus={taskFilterByStatusHandler} onSearch={taskSearchHandler} />

        <TasksContainer>
          {renderTasks()}
        </TasksContainer>
      </TasksWrapper>
    );
  }


export default Tasks;