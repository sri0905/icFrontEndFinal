import React, { useContext, useEffect } from 'react';
import dressContext from '../context/dressContext';
import Alert from './Alert';
import { Link } from 'react-router-dom';

const FetchAllDresses = () => {
  const context = useContext(dressContext);
  const { onDelete, fetchData, dresses, showAlert } = context;

  useEffect(() => {
    fetchData(); // Call the fetchData function
  }, []);

  return (
    <div>
      {showAlert && (<Alert message="Your dress has been removed from your wardrobe" type="info" />)}
      <h2 className='text-dark mb-3'>Your Wardrobe:</h2>                                     
      <div className="row">
        {dresses.map((dress, index) => (
          <div key={index} className="card col-4 mx-3" style={{ width: "18rem" }}>
            <img src={dress.image} className="card-img-top mt-2" alt={dress.color} />
            <Link to={`dressDetails/${dress._id}`} className='btn btn-info' style={{ textDecoration: "none", backgroundColor: "inherit", border: "none", textAlign: "inherit" }}>
            <div className="card-body">
              <h5 className="card-text">{dress.dressType}</h5>
              <p className="card-text">{dress.colorName}</p>
              <input type="color" defaultValue={dress.colorHex} style={{ pointerEvents: "none" }} />
              <p className="card-text mt-2">{dress.size}</p>
            </div>
              
            </Link>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <i className="fa-sharp fa-solid fa-trash my-2" style={{ cursor: "pointer" }} onClick={onDelete(dress._id)} ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAllDresses;
