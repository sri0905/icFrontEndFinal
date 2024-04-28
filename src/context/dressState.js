import React, {useState} from 'react'
import dressContext from './dressContext'
import axios from 'axios';
const DressState = (props) => {
  const [dresses, setDresses] = useState([]);
  const [showAlert, setShowAlert] = useState(false)
const fetchData = async () => {
  try {
    const response = await axios.post('http://localhost:5000/getAllUploads/', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setDresses(response.data);

  } catch (error) {
    console.error('Error fetching all dresses:', error);
  }
};

const onDelete = (dressId) => {
  return () => {
    axios.delete(`http://localhost:5000/deleteDress/${dressId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data === "Dress deleted successfully"){
          setShowAlert(true)
        setTimeout(()=>{
          setShowAlert(false)
        },3500)

        }
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting dress:', error);
      });
  };
};

  return (
    <div>
      <dressContext.Provider value={{fetchData, onDelete, dresses, setDresses, showAlert, setShowAlert}}>
           {props.children}
        </dressContext.Provider>


    </div>
  )
}

export default DressState
