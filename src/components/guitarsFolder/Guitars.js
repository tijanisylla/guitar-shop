import React from 'react';
import Pagination from '@mui/material/Pagination';
import {Card,Button, Form, FormControl} from 'react-bootstrap';
import Loading from '../Loading';
import StarsRating from './StarsRating';
import {formatterFunc, getLimitFunc, calculatePercentage} from './Helper';
import {Link} from 'react-router-dom'
import './Style/Guitars.css';
import {makeStyles} from '@material-ui/core'


// .... rest of code


const Guitars = ({
  data,
  error,
  page,
  setPage,
  perPage,
  loading,
  totalPages,
  search,
  setSearch,
  handlePlage,
  handleSearch,
  guitarLength
}) => {
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
  const classes = useStyles();
  return (
    <div>
      {loading
        ? <Loading/>
        : null}
      {/*  Search */}

      {/* <div className="search-box-container">
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="me-2"
            aria-label="Search"/>
          <Button type="submit" variant="outline-dark">
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </Form>
      </div> */}

      <div className="card-container">
        {data.map((guitar, idx) => {
          const {
            brand_name,
            description,
            price,
            rating,
            image_url,
            id
          } = guitar;

          return (
            <div key={idx} style={{
              maxWidth: '20rem'
            }}>
     <Card className="card-guitars">
                <Card.Img variant="top" src={image_url} alt="guitar"/>
                <Card.Body>
                  <Card.Title>{brand_name}</Card.Title>
                  <Card.Text>
                    <StarsRating numberOfStars={rating}/>
                  </Card.Text>
                  <Card.Text>
                    <span className="original">
                      <s>{formatterFunc(price)}</s>
                    </span>
                    <br/>
                    <span className="price">{calculatePercentage(price)}</span>
                  </Card.Text>
                  <Link to={`/guitars/${id}`}>
                    <Button variant="primary">
                      More details...
                    </Button>
                  </Link>

                </Card.Body>
              </Card>  
          

            </div>
          );
        })}

{/* ===== Pagination ===== */}
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
    </div>
  )

}

export default Guitars;
