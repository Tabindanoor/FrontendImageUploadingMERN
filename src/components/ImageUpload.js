import axios from "axios"
import React,{ useEffect, useState } from "react"

const ImageUpload = () => {

  const [photos,setPhotos] = useState([])
  const [updateUi, setUpdateUi] = useState(false)
  const handleChange=async(e)=>{
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append("photo",e.target.files[0]);
    // await axios.post('http://localhost:5000/',formData).then((res)=>{
    //   console.log(res.data);
    //   setUpdateUi(true);
    // }).catch((err)=>{
    //   console.log(err.message);
    // }
    // )

    e.preventDefault();
  const formData = new FormData();
  formData.append("photo", e.target.files[0]); // Make sure "photo" matches your server's expected field name

  try {
    const response = await axios.post('http://localhost:5000/', formData);
    console.log(response.data);
    setUpdateUi(true); // Trigger a re-fetch of images
  } catch (error) {
    console.error('Error while uploading image:', error);
  }
  }

useEffect(() => {
  axios.get("http://localhost:5000/").then((res)=>{
    console.log(res.data)
    setPhotos(res.data)
  })
}, [updateUi])


  

  return (
    <div>
      <label htmlFor="" >
      <input type="file" onChange={(e)=>{handleChange(e)}} />

      </label>
{/* grid to represent the data  */}
      <div>
        {photos.map((data)=>{
          return(
            <div>
          {/* <img src={`http://localhost:5000/${data.photo}`} alt="img" /> */}
          <p>my data </p>
            </div>
          )
        })}


      </div>
    </div>
  )
}

export default ImageUpload