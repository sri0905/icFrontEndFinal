import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateADress = () => {
    const [dressTypes, setDressTypes] = useState([]);
    const [generatedDress, setGeneratedDress] = useState([]);

    // Function to fetch dress types from the server
    const fetchData = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/dressTypes',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const initializedDressTypes = response.data.dressTypes.map((type) => ({
                name: type,
                checked: false
            }));
            setDressTypes(initializedDressTypes);
        } catch (error) {
            console.error('Error fetching dress types:', error.message);
        }
    };

    // useEffect to fetch dress types once when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle checkbox change
    const handleOnChange = (index) => {
        setDressTypes((prevDressTypes) => {
            
            const updatedDressTypes = [...prevDressTypes];
            updatedDressTypes[index] = {
                ...updatedDressTypes[index],
                checked: !updatedDressTypes[index].checked
            };
            return updatedDressTypes;
        });
    };

    // Function to handle form submission
    const handleUpload = async (event) => {
        event.preventDefault();
        const types = dressTypes.filter((type) => type.checked).map((type) => type.name);
        const response = await axios.post('http://localhost:5000/generateARandomDress', types, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        setGeneratedDress(response.data.generatedDresses);
    };
    return (
        <div className="container">
            <h4 className="mb-3">Select the types of clothes that need to be generated </h4>
            {generatedDress.map((dress, index) => (
                <div key={index} className="card col-4 mx-3 my-3" style={{ width: "18rem" }}>
                <img src={dress.image} className="card-img-top mt-2" alt={dress.color} style={{ maxWidth: "15rem", maxHeight: "30rem" }} />
               
                  <div className="card-body">
                    <h5 className="card-text">{dress.dressType}</h5>
                    
                  </div>
                  </div>            
            ))}
            <form onSubmit={handleUpload}>
                <div>
                    {dressTypes.map((type, index) => (
                        <div className="form-check" key={index}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={type.checked}
                                onChange={() => handleOnChange(index)}
                                id={`dressType-${index}`}
                            />
                            <label className="form-check-label" htmlFor={`dressType-${index}`}>
                                {type.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" type="submit">
                    Generate
                </button>
            </form>
        </div>
    );
};

export default GenerateADress;
