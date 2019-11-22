
import React, { Component, Fragment } from 'react'
import {Button, Container} from 'semantic-ui-react'
import { Route } from 'react-router'
import ToolsDashboard from '../../features/tools/ToolsDashboard/ToolsDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import TestComponent from '../../features/testarea/TestComponent';
import DealershipDashboard from '../../features/dealerships/DealershipDashboard/DealershipDashboard';
 class App extends Component {
  render() {
    return (
      <Fragment>
         <Route exact path='/' component={
           HomePage
         }/>
         <Route path='/(.+)' render={()=>(
     <Fragment>
     <NavBar></NavBar>
     <Container className='main'>

       <Route path='/tools' component={ToolsDashboard}></Route>
       <Route path='/dealerships' component={DealershipDashboard}></Route>
       <Route path='/test' component={TestComponent}></Route>
     </Container>
   </Fragment>
         )}/>
      </Fragment>

    );
  }
}



export default App;
