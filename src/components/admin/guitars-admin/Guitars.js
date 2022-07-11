import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {FormControl, Form, Row, Col} from "react-bootstrap";
import StarsRating from '../../guitarsFolder/StarsRating'
import Edit from './Edit'
import View from '../guitars-admin/View'
import Create from '../guitars-admin/Create'
import '../Style/GuitarsAdmin.css';
import Delete from './Delete'
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import {MDBInputGroup} from 'mdb-react-ui-kit';
import {makeStyles} from '@material-ui/core'
const Guitars = () => {
  const [data,
    setData] = useState([]);
  const [search,
    setSearch] = useState("");
  const [page,
    setPage] = useState(1);
  const [guitarLength,
    setGuitarLength] = useState([]);

  const perPage = 7;

  // To get the total pages
  useEffect(() => {
    async function getGuitarLength() {
      try {
        const response = await axios.get(`http://localhost:8000/guitarsall`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            mode: "cors"
          }
        });

        if (response.status === 200 || response.ok) {
          setGuitarLength(response.data);
        }
      } catch (e) {
        throw e
      }

    }
    getGuitarLength()
  }, [])
  // total pages
  const totalPages = Math.ceil(guitarLength.length / perPage)
  useEffect(() => {
    async function getGuitarLength() {
      try {
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
        throw e

      }
    }
    getGuitarLength();
  }, [page]);

  const useStyles = makeStyles((theme) => ({
    root: {

      backgroundColor: 'transparent',
      bottom: '0',
      zIndex: 200,
      padding: '10px 80px',
      color: 'white'
    },
    containerPagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }
  }))

  // .... rest of code
  const classes = useStyles();
  return (
    <div className="guitars-admin">
      {/* <Form>
        <Row>
           <Col>
            <Create/>
          </Col>

            <FormControl
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="me-2"
              aria-label="Search"/>


        </Row>
      </Form> */}
      <MDBInputGroup 
     
      noWrap textBefore={<Create/>}>

      <input className='form-control'
       style={{height : '55px'}}
       type='text' 
       value={search}
       onChange={e => setSearch(e.target.value)}
       placeholder="Search..."
        />
     </MDBInputGroup>
      {/* ========== Table ========== */}

      <Table striped bordered hover className="table" variant="dark">

        <thead>

          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Update</th>
            <th>View</th>

          </tr>
        </thead>
        <tbody>
          {data.filter((guitar) => {
            const result = guitar
              .brand_name
              .toLowerCase()
              .includes(search.toLowerCase())
            if (search === "") {
              return guitar
            } else if (result) {
              return guitar
            }
          }).map((guitar, idx) => {
            const {id, brand_name, price, rating} = guitar;

            return <> 
            <tr>
              <td key={idx}>{id}</td>
              <td>{brand_name}</td>
              <td>
                <StarsRating numberOfStars={rating}/>
              </td>
              <td>${price}</td>
              <td>
                <Delete data={data} setData={setData} guitar={guitar}/>
              </td>
              <td>
                <Edit guitar={guitar}/>
              </td>
              <td>
                <View guitar={guitar}/>
              </td>
            </tr> 
            </>
      })}
        </tbody>
      </Table>
      {/*  Pagination*/}
      <div className={classes.containerPagination}>
        <div className={classes.root}>
          <Pagination
            style={{
            display: 'flex',
            justifyContent: 'center'
          }}
            count={totalPages}
            color="primary"
            variant="outlined"
            onChange={(e, value) => setPage(value)}/>
        </div>
      </div>
    </div>
  )
};

export default Guitars;