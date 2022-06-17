import axios from 'axios'

 export async function getGuitarDetails(id){
    const response  = await axios.get(`http://localhost:8000/guitars/${id}`)
    if(response.status === 200){
      console.log('got id ' + response)
    }else{
      console.log('Operation failed!')
    };
  };

  
    
