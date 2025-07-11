import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Image.css';

const Image = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);

    axios
      .post('http://localhost:5000/', formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(!updateUI);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/')
      .then((res) => {
        console.log(res.data, 'res.data ');
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err.message, 'error in frontend');
      });
  }, [updateUI]);

  return (
    <div className="container">
      <h1 className="title">📸 Image Uploader</h1>
      <div className="upload-box">
        <label htmlFor="file_picker" className="upload-label">
          Select an image to upload
        </label>
{/*         
                <input
          type="file"
          name="file_picker"
          id="file_picker"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => handleChange(e)}
        /> */}

      </div>

      <div className="gallery">
        {photos.map(({ photo, _id }) => (
          <div key={_id} className="image-card">
            <img
              src={`http://localhost:5000/uploads/${photo}`}
              alt="uploaded"
              className="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;
