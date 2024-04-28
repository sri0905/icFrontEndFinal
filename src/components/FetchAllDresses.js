import React, { useContext, useEffect, useState } from 'react';
import dressContext from '../context/dressContext';
import Alert from './Alert';
import { Link } from 'react-router-dom';

const FetchAllDresses = () => {
  const context = useContext(dressContext);
  const { onDelete, fetchData, dresses, showAlert } = context;
  const filters = [{ name: "Dress Type", prop: "dressType" }, { name: "Size", prop: "size" }, { name: "Brand", prop: "brand" }]
  const [selectedDresses, setSelectedDresses] = useState([]); // Initialize with all dresses
  
  useEffect(() => {
    fetchData(); // Call the fetchData function
  }, []);

  useEffect(() => {
    setSelectedDresses(dresses);
    
    
  }, [dresses]);

  // Function to handle filtering based on selected property
  const clickOnHandle = (filterProp, filterValue) => {
    const filtered = dresses.filter(dress => dress[filterProp] === filterValue);
    setSelectedDresses(filtered); // Update selectedDresses with filtered +S
  }
  const colorOnClick = (filteredColor) => {
    const filtered = dresses.filter(dress => dress.color.name === filteredColor);
    setSelectedDresses(filtered); // Update selectedDresses with filtered data
  }

  const resetFilters = () => {
    setSelectedDresses(dresses);
  }

  return (
    <div>


      {showAlert && (<Alert message="Your dress has been removed from your wardrobe" type="info" />)}
      <div className='row mb-3'>
        <h2 className='text-dark mb-3 col'>Your Wardrobe:</h2>
      {dresses.length==0 && ( <h3>Your wardrobe has no dress, please add a dress</h3>  )}
        {!dresses.length==0 && <button className="btn btn-primary col-1 mx-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Filter</button>}

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Select filters:</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            {filters.map((filter, index) => (
              <div className="dropdown mb-3" key={index}>
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {filter.name}
                </button>
                <ul className="dropdown-menu">
                  {[...new Set(dresses.map(dress => dress[filter.prop]))].map((value, index) => (
                    <li key={index}>
                      <button className="dropdown-item" onClick={() => clickOnHandle(filter.prop, value)}>{value}</button>
                    </li>
                  ))}

                </ul>
              </div>
            ))}
            <div className="dropdown mb-3">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Color
              </button>
              <ul className="dropdown-menu">
          {dresses.map((dress, index) => (
            <li key={index} className="row">
              <button className="col-10 mb-1 btn p-0" onClick={()=>colorOnClick(dress.color.name)}>
                {dress.color.name}
              </button>
              <div className="col-2" style={{ backgroundColor: `${dress.color.hex}` }}></div>
            </li>
          ))}
        </ul>
            </div>
          </div>
        </div>
        {/* Button to reset filters */}
        {!dresses.length==0 && <button className="btn btn-secondary col-2" onClick={resetFilters}>Reset Filters</button>}
      </div>

      <div className="row">
        {/* Render filtered dresses */}
        { selectedDresses && selectedDresses.map((dress, index) => (
          <div key={index} className="card col-4 mx-3 my-3" style={{ width: "18rem" }}>
            <img src={dress.image} className="card-img-top mt-2" alt={dress.color} style={{ maxWidth: "15rem", maxHeight: "30rem" }} />
            <Link to={`dressDetails/${dress._id}`} className='btn btn-info' style={{ textDecoration: "none", backgroundColor: "inherit", border: "none", textAlign: "inherit" }}>
              <div className="card-body">
                <h5 className="card-text">{dress.dressType}</h5>
                
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
