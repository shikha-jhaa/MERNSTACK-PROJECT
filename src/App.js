import React, { createContext, useReducer } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from 'react-router';
import "./App.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { initialState, reducer } from '../src/reducer/UseReducer';

  // context API
export const UserContext = createContext();
const Routing = () => {
  return (
    <Switch>
   <Route exact path="/">  
    <Home />
   </Route>

   <Route path="/about">  
    <About />
   </Route>

   <Route path="/contact">  
    <Contact />
   </Route>

   <Route path="/login">  
    <Login />
   </Route>

   <Route path="/signup">  
    <Signup />
   </Route>

   <Route path="/logout">  
    <Logout />
   </Route>

   <Route>
    <Errorpage />
   </Route>
  </Switch> 
  )
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    
    </>
  )
}
export default App;