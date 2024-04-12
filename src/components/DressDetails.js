import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import  axios  from 'axios'
const DressDetails = (props) => {
  const [dress, setDress] = useState("")
const {dressId}  = useParams();
const dressDetails = async()=>{
  try {
    const response = await axios.post(`http://localhost:5000/dressDetails/${dressId}/`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
    console.log(response.data);
    setDress(response.data)
   
  } catch (error) {
    console.error('Error fetching all dresses:', error);
  }
}

useEffect(()=>{
    dressDetails()
},[])
  return (
    <div className="container text-white" >
      <center>
      <img src={dress.image} alt={dress.type} className="border border-danger  border-5 " style={{maxWidth:"20rem"}} />
      <h3>{dress.dressType}</h3>
      <p> Dress Colour :  <strong>{dress.colorName}</strong></p>
      <p> Dominant Colour in the image : <input type="color" defaultValue={dress.colorHex} style={{pointerEvents:"none"}} /> </p>


      </center>
    </div>
  )
}

export default DressDetails
