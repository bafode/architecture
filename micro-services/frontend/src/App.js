import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import Signin from './screens/Signin';
import Signup from './screens/Signup';
import CreateTask from './screens/CreateTask';
import Tasks from './screens/Tasks';



const App=()=> {
  return (
    <Router> 
      <Route path='/' component={Tasks} exact />  
      <Route path="/signin/" component={Signin} />
      <Route path="/signup/" component={Signup} />
      <Route path='/search/:keyword' component={Tasks} exact />
      <Route path='/page/:pageNumber' component={Tasks} exact />
      <Route
            path='/search/:keyword/page/:pageNumber'
            component={Tasks}
            exact
     />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/tasks/create" component={CreateTask} />
    </Router>
  )
}

export default App;
