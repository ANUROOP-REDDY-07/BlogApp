import React from 'react'
import { SignUp } from '@clerk/clerk-react'

function Signup() {
  return (
    <div className='d-flex text-align-center justify-content-center align-items-center signup-page'>
      <SignUp />
    </div>
  )
}

export default Signup