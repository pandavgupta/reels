import React,{useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
function Feed() {
  const {logout} = useContext(AuthContext);
  return (
    <>
    <div> <h1>Hello ji welcome to the Feed section...</h1> </div>
    <button onClick={logout}>log out</button>
    </>
  )
}

export default Feed