import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './ReviewForm.css';
import { TextField, Button, Typography } from '@mui/material';

function ReviewForm({ shopId }) {
  const [formData, setFormData] = useState({
    shopName: '',
    review: '',
    image: null, // Updated to use null instead of empty string
  });

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, shopId }));
  }, [shopId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file }); // Update formData with the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('shopId', shopId);
    formDataToSend.append('shopName', formData.shopName);
    formDataToSend.append('review', formData.review);
    formDataToSend.append('image', formData.image); // Append the selected image file to formDataToSend

    try {
      const response = await Axios.post('http://localhost:5000/insert', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Data inserted successfully:", response.data);
      alert("Data inserted successfully!");
    } catch (error) {
      console.error("Error inserting data:", error);
      alert("Failed to insert data. Please try again.");
    }
  };

  return (
    <div className="review-form-container">
      <Typography variant="h5">Submit a Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="shopName"
          label="Shop Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.shopName}
          onChange={handleChange}
        />
        <TextField
          name="review"
          label="Review"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.review}
          onChange={handleChange}
        />
        <Typography variant="subtitle1">Upload Image (Optional)</Typography>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default ReviewForm;
