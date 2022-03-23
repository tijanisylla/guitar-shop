import {useState, useEffect} from 'react';


  function FetchingData(url) {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const [error,  setError] = useState('')
  useEffect(async () => {
   
    try {

        setLoading(true)
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok || response.status === 200) {
          setData(data);
        
        }
    } catch (e) {
      setError(e);
      setLoading(setLoading(false));
      // console.error(e);
    }
   setLoading(false)
  
  }, [url])

  return {data, loading, error}
}

export default FetchingData;