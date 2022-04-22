import {useState, useEffect} from 'react';
import axios from 'axios';
import Guitars from './Guitars';
import NavigationBar from '../Layout/NavigationBar'

const FetchData = () => {

  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,  setError] = useState('');
  const [page,setPage] = useState(1);
  const [perPage] = useState(15); // 15 guitars per page
  const [totalPages,setTotalPages] = useState(25);
  const [search, setSearch] = useState("");
   

  useEffect(() => {
    async function getGuitarsData() {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:8000/guitars?page=${page}&perPage=${perPage}&search`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            mode: "cors"
          }
        });
  
        if (response.status === 200 || response.ok) {
          setData(response.data);
        }
      } catch (e) {
        setError(e);
        setLoading(false);
      }
      setLoading(false)
    }
    getGuitarsData()
  }, [page])
 
  const handlePlage = ({selected}) => {
    setPage(selected + 1);
  };

  const handleSearch = async (e) => {
      e.preventDefault();
      const filteredGuitar = await axios.get(`http://localhost:8000/guitars?page=${page}&perPage=${perPage}&search=${search}`,{
      headers: {'Content-Type': 'application/json'}
      })
      if(filteredGuitar.data){
        setData(filteredGuitar.data)
        sessionStorage.setItem('Guitar',JSON.stringify(filteredGuitar.data));
        console.log(data)
      }
       
    };

  return (
    <>
  
    {
        <Guitars
          data={data}
          setData={setData}
          error={error}
          loading={loading}
          page={page}
          perPage={perPage}
          totalPages={totalPages}
          search={search}
          setSearch={setSearch}
          handlePlage={handlePlage}
          handleSearch={handleSearch}
          
         />
         
         }
      </>
  )
}

export default FetchData