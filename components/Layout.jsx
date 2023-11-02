import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'


const Layout = ({children}) => { //the children prop is giving us access from the component section in the _app.js 
                                //which was wrapped in the layout component
  return (
    <div className='layout'>

      <Head>
        <title>UNDISPUTED STORES</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className='main-container'>
        {children}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout