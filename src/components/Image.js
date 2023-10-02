import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Image = () => {

    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
  

    const handleChange = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("photo", e.target.files[0]);
    
        axios
          .post("http://localhost:5000/", formData)
          .then((res) => {
            console.log(res.data);
            // setUpdateUI(res.data._id);
            setUpdateUI(!updateUI)
          })
          .catch((err) => console.log(err));
      };

      
    // useEffect(() => {
    //     axios
    //       .get("http://localhost:5000/")
    //       .then((res) => {
    //         console.log(res.data, "res.data ");
    //         setPhotos(res.data,"photos data");
    //       })
    //       .catch((err) => console.log(err.message,"error in frontend"));
    //   }, [updateUI]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/")
        .then((res) => {
          console.log(res.data, "res.data ");
          setPhotos(res.data); // Update state here
        })
        .catch((err) => {
          console.log(err.message, "error in frontend");
          // Handle the error here if needed
        });
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
              src={`http://localhost:5000/uploads/${photo}`}
              alt="grid_image"
            />
             
          </div>
        ))}
      </div>
    </div>
  )
}

export default Image