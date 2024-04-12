import React, { useContext, useEffect } from 'react'
import ImageUpload from './ImageUpload'
import FetchAllDresses from './FetchAllDresses'
import Alert from './Alert'



const Home = () => {

  
  return (
    <div className="container">
        <FetchAllDresses/>
    </div>
  )
}

export default Home
