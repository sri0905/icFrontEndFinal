import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert';

const ImageUpload = () => {
  const clothingColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Cream', hex: '#FFFDD0' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Mustard', hex: '#FFDB58' },
    { name: 'Mauve', hex: '#E0B0FF' },
    { name: 'Taupe', hex: '#483C32' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Lavender', hex: '#E6E6FA' },
    { name: 'Sage', hex: '#9DC183' },
    { name: 'Turquoise', hex: '#40E0D0' },
    { name: 'Denim', hex: '#1560BD' },
    { name: 'Khaki', hex: '#C3B091' },
    { name: 'Tan', hex: '#D2B48C' },
    { name: 'Ivory', hex: '#FFFFF0' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Crimson', hex: '#DC143C' },
    { name: 'Lime', hex: '#00FF00' },
    { name: 'Aqua', hex: '#00FFFF' },
    { name: 'Indigo', hex: '#4B0082' },
    { name: 'Salmon', hex: '#FA8072' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Violet', hex: '#EE82EE' },
    { name: 'Magenta', hex: '#FF00FF' },
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Olive Drab', hex: '#6B8E23' },
    { name: 'Tomato', hex: '#FF6347' },
    { name: 'Orchid', hex: '#DA70D6' },
    { name: 'Deep Pink', hex: '#FF1493' },
    { name: 'Sienna', hex: '#A0522D' },
    { name: 'Dark Slate Gray', hex: '#2F4F4F' },
    { name: 'Cornflower Blue', hex: '#6495ED' },
    { name: 'Slate Blue', hex: '#6A5ACD' },
    { name: 'Steel Blue', hex: '#4682B4' },
    { name: 'Rosy Brown', hex: '#BC8F8F' },
    { name: 'Spring Green', hex: '#00FF7F' },
    { name: 'Sandy Brown', hex: '#F4A460' },
    { name: 'Pale Violet Red', hex: '#DB7093' }
  ];

  const clothingTypes = [
    "T-shirt", "Shirt", "Polo shirt", "Tank top", "Sweater", "Hoodie", "Cardigan", "Jacket",
    "Coat", "Parka", "Windbreaker", "Vest", "Dress", "Skirt", "Jeans", "Pants", "Shorts", "Leggings",
    "Jumpsuit", "Romper", "Suit", "Tuxedo", "Blazer", "Chinos", "Sweatpants", "Tracksuit", "Swimwear", "Boxers", "Briefs", "Nightwear", "Pajamas", "Nightgown", "Robe", "Sleepwear"
  ];
  const [selectedColorHex, setSelectedColorHex] = useState('')
  const [dressType, setDressType] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [image, setImage] = useState("");
  const [color, setColor] = useState({});
  const handleColorChange = (event) => {
    const selectedColorName = event.target.value;
    const selectedColor = clothingColors.find(colordetails => colordetails.name === selectedColorName);
    setColor(selectedColor);
    setSelectedColorHex(selectedColor.hex);
  }
  


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('dressType', dressType);
        formData.append('brand', brand);
        formData.append('size', size);
        formData.append('color', JSON.stringify(color)); 
        console.log("the color of thr dress is:", color)
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File uploaded successfully:', response.data);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className='container'>
      <h3>Add a dress:</h3>
      {showAlert && <Alert message="Your dress has been added to inventory" type="info" />}
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Picture of the dress:</label>
          <input type="file" className="form-control" id="image" accept="image/*" onChange={handleFileChange} required />
          <div id="imageHelp" className="form-text">Please upload a picture with minimal background area</div>
        </div>
        <div>
          {image && <img src={image} style={{ maxWidth: "10rem" }} alt="Dress preview" />}
          {color && <div> <input type="color" value={selectedColorHex} style={{pointerEvents:"none"}} onChange={(event) => setSelectedColorHex(event.target.value)} /></div>}
        </div>
        <div className="mb-3">
          <input type="text" className="form-control mt-3" id="brand" placeholder='Brand:' value={brand} onChange={(event) => setBrand(event.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Select the color of clothing:</label>
          <select name="color" className="form-select mb-3" value={color.name} onChange={handleColorChange}>
            <option value="">Select a color</option>
            {clothingColors.map((mappedColor, index) => (
              <option key={index} value={mappedColor.name} style={{ backgroundColor: mappedColor.hex }}>
                {mappedColor.name}
              </option>
            ))}
          </select>

        </div>
        <div className="mb-3">
          <label htmlFor="dressType" className="form-label">Select the type of clothing:</label>
          <select name="dressType" className="form-select mb-3" value={dressType} onChange={(event) => setDressType(event.target.value)}>
            <option value="">Select a clothing type</option>
            {clothingTypes.map((clothingType, index) => (
              <option key={index} value={clothingType}>{clothingType}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size:</label>
          <input type="number" className="form-control" id="size" value={size} min={10} max={60} onChange={(event) => setSize(event.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Dress</button>
      </form>
    </div>
  );
};

export default ImageUpload;
