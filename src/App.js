import React from "react";
import {Routes,Route} from 'react-router-dom'
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
function App() {
  return (
        <AuthProvider>
           <Routes>

             <Route path="/login" exact element={<Login/>}></Route>
             <Route path="/feed" exact element={<PrivateRoute/>}></Route>
             <Route path="/" exact element={<PrivateRoute/>}></Route>
             <Route path="/signup" exact element={<Signup/>}></Route>
           </Routes>
       </AuthProvider>
    
  );
}

export default App;
