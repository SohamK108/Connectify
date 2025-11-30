import React from 'react'
import AuthImagePattern from './AuthImagePattern.jsx'

const NoChatPage = () => {
  return (
    <div className='flex items-center justify-center h-full w-full '>
          <AuthImagePattern title="Welcome to Connectify!"
      subtitle="Select a conversation from chat sidebar to start chatting."/>
    </div>
  )
}

export default NoChatPage
