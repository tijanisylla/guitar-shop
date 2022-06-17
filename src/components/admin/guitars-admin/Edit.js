import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

 const Edit = ({guitar}) => {
  const {
    id,
  } = guitar;

  // ====== Data ======
  // const [priceGuitar,
  //   setPriceGuitar] = useState(price);
  // const [brand,
  //   setBrand] = useState(brand_name);
  // const [model,
  //   setModel] = useState(model_name);
  // const [rat,
  //   setRat] = useState(rating);
  // const [desc,
  //   setDesc] = useState(description);
  // const [img,
  //   setImg] = useState(image_url);
  // const [cat,
  //   setCat] = useState(category);

  // const open = () => {
  //   setOpenModal(true);
  // }
  // const close = () => {
  //   setOpenModal(false);
  // }
  // const handleChange = (e) => {
  //   setPriceGuitar(e.target.value)
  // }

  // async function handleImg(e) {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setImg(base64);
  // }

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // const handleUpdate = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios(`http://localhost:8000/guitarsAll/${id}`, {
  //       method: 'PUT',
  //       data: {
  //         brand_name: `${brand}`,
  //         model_name: `${model}`,
  //         rating: `${rat}`,
  //         category: `${cat}`,
  //         description: `${desc}`,
  //         price: `${priceGuitar}`,
  //         image_url: `${img}`
  //       }

  //     });

  //     if (response.data === 200) {
  //       console.log('Got the data' + response.data)
  //     } else {
  //       console.log('Operation failed!!!')
  //     }

  //   } catch (err) {
  //     console.error(err);
  //     setErrMsg('Something went wrong!');
  //   }
  // };
const Navigate = useNavigate();
const getUpdates = (e,id) => {
  e.stopPropagation();
  Navigate(`/guitars/${id}/update`);
}
  return (
    <div>
      <Button 
       onClick={(e) => getUpdates(e,id)}
       variant="warning">
        Update
      </Button>
     
    </div>
  )
}

export default Edit

