import React, {useState, useEffect} from 'react'
import {Button, FormControl, Form, Modal, Alert} from "react-bootstrap";
import axios from 'axios';
import im1 from '../../Layout/img/g4.jpeg'


const Create = ({guitar}) => {
  const [openModal,  setOpenModal] = useState(false);
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
 const [errMsg, setErrMsg] = useState(''); 
  // ====== Form ======
  const[desc, setDesc] = useState("");
  const[pr, setPr] = useState("");
  const[cat, setCat] = useState("");
  const[brand, setBrand] = useState("");
  const[rat, setRat] = useState("");
  const[model, setModel] = useState("");
  const[img, setImg] = useState(null);

  // console.log(url.fileURLToPath(im1))

//  Modal
  function open() {
    setOpenModal(true);
  };
  function close() {
    setOpenModal(false);
  };
 


async function handleImg(e){
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


const handleSubmit = async (e) => {
  e.preventDefault();
    try {
        const response = await axios('http://localhost:8000/guitars-create', {
            method: 'POST',
            data: { 
              brand_name : `${brand}`,
              model_name : `${model}`,
              rating : `${rat}`,
              category : `${cat}`,
              description : `${desc}`,
              price : `${pr}`,
              image_url : `${img}` 
            }
            
        });
        
       if(response.data === 200){
     console.log('Got the data' + response.data.image_url)
        }else{
          console.log('Operation failed!!!')
        }
      
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
};
useEffect(() => {
  if(img){
        console.log("img has been set.")
  }
},[img]);




  return (
    <div>
        {/* <Alert msg={errMsg} type="danger" />
        <Alert msg={successMsg} type="success" /> */}
      <Button onClick={open}
      enctype="multipart/form-data"
       variant="primary">
        Add a new guitar
      </Button>

      {openModal
        ? <Modal 
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
        show={open} onHide={close} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                Add a guitar
              </Modal.Title>

            </Modal.Header>
            <Modal.Body>
              {/* input */}
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Brand name:</Form.Label>
                <Form.Control 
                value={brand}
                onChange={(e)=> setBrand(e.target.value)}
                placeholder="Brand name..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control type="number"
                value={pr}
                onChange={(e)=> setPr(e.target.value)}
                 placeholder="Price..."/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                value={rat}
                onChange={(e)=> setRat(e.target.value)}
                 placeholder="Rating..." type="number"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category:</Form.Label>
                <Form.Control 
                value={cat}
                onChange={(e)=> setCat(e.target.value)}
                placeholder="Category..." type="text"/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="address"
                  value={desc}
                  onChange={(e)=> setDesc(e.target.value)}
                  placeholder="Description..."/>

              </Form.Group>
              <Form.Group controlId="formFileLg" className="mb-3">

                {/* Image Upload */}
                <Form.Label>Image :</Form.Label>
                <Form.Control
                 type="file" 
                 onChange={handleImg}
            
                 size="md"/>
              </Form.Group>
              <p>Upload and Display Image Here</p>
      {img && (
        <div>
        <img alt="not fount" width={"250px"} src={img} />
        </div>
      )}
             <Form.Group className="mb-3">
             <Form.Label>Check this box :</Form.Label>
                <Form.Check type="checkbox" label="Check"/>
              </Form.Group>
             {/* Button submit */}
             <Button variant="success" type="submit">
                  Save changes
                </Button>
             
       </Form>

            </Modal.Body>

          </Modal>
        : null}
    </div>
  )
}

export default Create;
