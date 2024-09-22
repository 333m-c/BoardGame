import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'

export default function Layout({children,status}) {
  return (
    <>
      <Navbar login={status}/>
        {children}
      <Footer/>
    </>
  )
}
