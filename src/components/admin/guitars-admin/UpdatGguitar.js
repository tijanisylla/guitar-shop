import React,{useState, useEffect} from 'react';
import {Button,Row, FormControl, Form} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import '../Style/UpdateGuitar.css'
import axios from 'axios';
const UpdatGguitar = () => {
  const {id} = useParams();
  const [errMsg,setErrMsg] = useState('');
  const [priceGuitar, setPriceGuitar] = useState("");
  const [brand,setBrand] = useState("");
  const [model,setModel] = useState("");
  const [rat,setRat] = useState("");
  const [desc,setDesc] = useState("");
  const [img, setImg] = useState("");
  const [cat,setCat] = useState("");
    
  const getDataById = async() => {
    try {
    const response = await axios.get(`http://localhost:8000/guitarsAll/${id}`);
    const {
    brand_name,
    model_name,
    price,
    rating,
    description,
    category,
    image_url
  } = response.data;
    
  setBrand(brand_name);
  setPriceGuitar(price);
  setModel(model_name);
  setRat(rating);
  setImg(image_url);
  setDesc(description);
  setCat(category);
    } catch (err) {
      throw err;
    };
  };

  useEffect(() => {
    getDataById();
  }, []);
  

  async function handleImg(e) {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImg(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleUpdate = async(e,id) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8000/guitarsAll/${id}`, {
          brand_name: `${brand}`,
          model_name: `${model}`,
          rating: `${rat}`,
          category: `${cat}`,
          description: `${desc}`,
          price: `${priceGuitar}`,
          image_url: `${img}`
      });
      console.log(response);
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong!');
    };
  };
  return (
    <div className="update-guitar">
      <div className="form-update">
         <Form>
                <Form.Group 
                className="position-relative"
                controlId="formBasicEmail">
                  <Form.Label>Brand name:</Form.Label>
                  <Form.Control
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand name..."/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    value={priceGuitar}
                    onChange={(e) => setPriceGuitar(e.target.value)}
                    placeholder="Price..."/>
                </Form.Group>
             
                <Form.Group className="mb-3">
                  <Form.Label>Rating:</Form.Label>
                  <Form.Control
                    value={rat}
                    onChange={(e) => setRat(e.target.value)}
                    placeholder="Rating..."
                    type="number"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category:</Form.Label>
                  <Form.Control
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    placeholder="Category..."
                    type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>description:</Form.Label>
                  <Form.Control
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    as="textarea"
                    rows="3"
                    name="address"
                    placeholder="Description..."/>
                </Form.Group>

                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>Image :</Form.Label>
                  <Form.Control type="file" onChange={handleImg} size="md"/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Check"/>
                </Form.Group>

                {img && (
                  <div>
                    <img alt="not fount" width={"250px"} src={img}/>
                  </div>
                )}
                <Button variant="success" 
                  onClick={(e)=> handleUpdate(e,id)}>
                  Save Changes
                </Button>
              </Form>
              </div>
    </div>
  )
}

export default UpdatGguitar