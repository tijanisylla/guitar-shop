import {useState, useEffect} from 'react';
import DisplayGuitars from  './DisplayGuitars'
import ReactPaginate from "react-paginate";

const Guitars = () => {

//===================USE STATE===================
 
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [error,  setError] = useState('')
    const [page, setPage] = useState(1);
    const [perPage] = useState(15)// 10 guitars per page
    const [totalPages, setTotalPages] = useState(25)
// =================== FETCH ALL GUITARS ===================

  useEffect(() => {
    async function getGuitarsData(){
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/guitars?page=${page}&perPage=${perPage}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
             mode: "cors"
          }
        });

        const  data = await response.json();
        if (response.ok || response.status === 200) {
          setData(data);
        }
    } catch (e) {
      setError(e);
      setLoading(false);
      // console.error(e);
    }
   setLoading(false)
    } 
    getGuitarsData()
  }, [page]) 



  const handlePlage = ({selected}) => {
  setPage(selected + 1);
  }

 
  return(
<div>

<DisplayGuitars 
data={data}
error={error}
loading={loading}

/>
<h1>Page number : {page} </h1>
<ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePlage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
  </div>
  )


}

export default Guitars;
