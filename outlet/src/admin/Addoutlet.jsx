import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkToken } from '../hooks/checkToken';
import './snackbar.css'
import Resizer from "../hooks/Resizer"

function Addoutlet() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [youtubeLink, setyoutubeLink] = useState('');
    const [opentiming, setOpentiming] = useState('');
    const [closetiming, setClosetiming] = useState('');
    const [image, setImage] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
  
  
    useEffect(() => {
      checkToken();
    }, []);
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
      };

      const handleaddressChange = (event) => {
        setAddress(event.target.value);
      };

      const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };

      const handleYoutubeLinkChange = (event) => {
        setyoutubeLink(event.target.value);
      };
      const handleopenTimingChange = (event) => {
        setOpentiming(event.target.value);
      };

      const handlecloseTimingChange = (event) => {
        setClosetiming(event.target.value);
      };
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (image) {
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('location', location);
      formData.append('address', address);
      formData.append('opentiming', opentiming);
      formData.append('closetiming', closetiming);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('youtubeLink', youtubeLink);

      const token = localStorage.getItem('token');
      console.log(token)
      formData.append('token', token);

      formData.append('bannerimage', image);
      
  
    console.log(formData)
  
    try {
        await axios.post(`${baseUrl}/outlet/upload`, formData);


      } catch (error) {
        console.error(error);
      }
    }
    };
  

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const extension = file.type.split('/').pop().toUpperCase();
          Resizer.imageFileResizer(
            file, // the file to be resized
            1200, // the maximum width in pixels
            1600, // the maximum height in pixels
            extension, // the output format
            80, // the quality of the output image, from 0 to 100
            0, // the degree of rotation to apply to the image
            (uri) => {
              setImage(uri);
            },
            'file', // the output type, either 'base64', 'blob' or 'file'
            400 // the maximum size in kilobytes of the output file
    
          );
        }
        
      };


  return (
<>
<h1 className='text-center mt-4'>Add New outlet </h1>
<div className="container mb-3">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Outlet Name:</label>
        <input type="text" id="title" className="form-control" value={title} onChange={handleTitleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <input type="text" id="category" className="form-control" value={category} onChange={handleCategoryChange} />
      </div>


      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location Co-ordinates:</label>
        <input type="text" id="location" className="form-control" value={location} onChange={handleLocationChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" id="address" className="form-control" value={address} onChange={handleaddressChange} />
      </div>


      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <div className="form-control" contentEditable  value={description} onChange={handleDescriptionChange}></div>
      </div>

      <div className="mb-3">
        <label htmlFor="openTiming" className="form-label">Open Timing:</label>
        <input type="time" id="openTiming" className="form-control" value={opentiming} onChange={handleopenTimingChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="close timing" className="form-label">Close Timing:</label>
        <input type="time" id="close timing" className="form-control" value={closetiming} onChange={handlecloseTimingChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="youtubeLink" className="form-label">YouTube Link:</label>
        <input type="url" placeholder="https://example.com" pattern="https://.*" id="youtubeLink" className="form-control" value={youtubeLink} onChange={handleYoutubeLinkChange} />
      </div>

      <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Banner Images</label>
          <input type="file" className="form-control text-danger" id="fileInput" onChange={handleFileChange} />
        </div>

      <div className='text-center'>
      <button type="submit" className="btn fw-bold" style={{backgroundColor: '#393646', color:'white'}}>Upload</button>
      </div>
    </form>
    
  </div>
</>
  )
}

export default Addoutlet