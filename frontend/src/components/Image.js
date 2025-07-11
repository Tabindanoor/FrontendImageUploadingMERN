import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Image.css';

const Image = () => {
  const [photos, setPhotos] = useState([]);
  
  const [updateUI, setUpdateUI] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 🔸 new state

  const handleChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);

    axios
      .post('http://localhost:5000/', formData)
      .then((res) => {
        setUpdateUI(!updateUI);
      })
      .catch((err) => console.log(err));
  };


  const handleDelete = (id) => {
  axios
    .delete(`http://localhost:5000/${id}`)
    .then(() => setUpdateUI(!updateUI))
    .catch((err) => console.log(err));
};


  useEffect(() => {
    axios
      .get('http://localhost:5000/')
      .then((res) => setPhotos(res.data))
      .catch((err) => console.log(err.message));
  }, [updateUI]);

  return (
    <div className="container">
      <h1 className="title">📸 Image Uploader</h1>

      <label htmlFor="file_picker" className="upload-label">
        📤 Select Image to Upload
      </label>
      <input
        type="file"
        id="file_picker"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleChange}
      />

      <div className="gallery">
        {photos.map(({ photo, _id }) => (
          <div>
          <div key={_id} className="image-card" onClick={() => setSelectedImage(`http://localhost:5000/uploads/${photo}`)}>
            <img
              src={`http://localhost:5000/uploads/${photo}`}
              alt="uploaded"
              className="image"
            />
            </div>
              <button className="delete-btn"
                // className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow-md transition duration-300"
              onClick={() => handleDelete(_id)}>
           🗑 Delete
           </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <span className="close">&times;</span>
          <img src={selectedImage} className="modal-content" alt="enlarged" />
        </div>
      )}
    </div>
  );
};

export default Image;
