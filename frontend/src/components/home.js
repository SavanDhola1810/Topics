import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Display from './display'

const home = () => {
  return (
    <>
    {/* <div className='w-1/5  h-screen shadow-2xl  text-center ' style={{backgroundColor:"rgb(18,18,62)"}}>
      <div className="text text-4xl p-10 font-semibold text-white"><Link to="/display">Topics</Link></div>
    </div> */}
    
    <Display/>
    </>
  )
}

export default home
