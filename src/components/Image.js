import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Image = () => {

    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState("");
  

    const handleChange = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("photo", e.target.files[0]);
    
        axios
          .post("http://localhost:5000/", formData)
          .then((res) => {
            console.log(res.data);
            setUpdateUI(res.data._id);
          })
          .catch((err) => console.log(err));
      };

      
    useEffect(() => {
        axios
          .get("http://localhost:5000/")
          .then((res) => {
            console.log(res.data);
            setPhotos(res.data);
          })
          .catch((err) => console.log(err));
      }, [updateUI]);
  return (
    <div>
        {/* upload image button */}
        <div>
      <input
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
        </div>
      <div className="grid">
        {photos.map(({ photo, _id }) => (
          <div key={_id} className="grid__item">
            <img
              src={`http://localhost:5000/${photo}`}
              alt="grid_image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Image