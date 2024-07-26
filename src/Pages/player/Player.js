import React from 'react'
import './Player.css'
import Sidebar from '../components/sidebar/Sidebar.js'
import Body from '../components/body/Body.js'
import Footer from '../components/footer/Footer.js'

function Player({spotify}) {
  return (
    <div className='player'>
      <div className='player-body'>
        <Sidebar />
        <Body spotify={spotify}/>
      </div>
      <Footer spotify={spotify}/>
    </div>
  )
}

export default Player