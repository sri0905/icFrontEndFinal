import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const DressDetails = (props) => {
  const [dress, setDress] = useState("")
  const { dressId } = useParams();
  const dressDetails = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/dressDetails/${dressId}/`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      setDress(response.data)
      console.log(dress)

    } catch (error) {
      console.error('Error fetching all dresses:', error);
    }
  }

  useEffect(() => {
    dressDetails()
  }, [])
  return (
    <div className="container text-white" >
      <div class="card mb-3 border border-2 border-info" style={{ maxWidth: "1200px" }}>
        <div class="row g-0">
          <div class="col-md-4">
            <img src={dress.image} class="img-fluid rounded-start m-2 border border-2 border-dark" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title mx-2 mb-3">{dress.dressType}</h2>
              <div style={{ display: "flex" }}>
                <h5 class="card-title mx-2">Brand:</h5>
                <p>{dress.brand}</p>
              </div>
              {dress.color && (
                <>
                 <div style={{ display: "flex" }}>
                 <h5 class="card-title mx-2">Color Name:</h5>
                 <p>{dress.color.name}</p>
               </div>
                 <div style={{ display: "flex" }}>
                 <h5 class="card-title mx-2">Color:</h5>
                 <input type="color" value={dress.color.hex} style={{pointerEvents:"none"}} />
               </div>
                </>
              )}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DressDetails
