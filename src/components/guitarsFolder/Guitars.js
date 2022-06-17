import React from 'react';
import ReactPaginate from "react-paginate";
import {Card,Button, Form, FormControl} from 'react-bootstrap';
import Loading from '../Loading';
import StarsRating from './StarsRating';
import {formatterFunc, getLimitFunc, calculatePercentage} from './Helper';
import {Link} from 'react-router-dom'
import './Style/Guitars.css';
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

        <div className="paginate">
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
            activeClassName={"active"}/>
        </div>
      </div>
    </div>
  )

}

export default Guitars;
