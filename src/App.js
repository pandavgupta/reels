import React from "react";
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./components/Feed";
import {AuthProvider} from './context/AuthContext'
function App() {
  return (
        <AuthProvider>
           <Routes>
             <Route path="/login" exact element={<Login/>}></Route>
             <Route path="/feed" exact element={<Feed/>}></Route>
             <Route path="/signup" exact element={<Signup/>}></Route>
           </Routes>
       </AuthProvider>
    
  );
}

export default App;
