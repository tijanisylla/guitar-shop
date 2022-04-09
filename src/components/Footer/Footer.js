import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';



const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <Link to="/" className='me-4 text-reset'>
          <i className="fa-brands fa-facebook-f"></i>
          </Link>

           <Link to="/" className='me-4 text-reset'>
          <i className="fa-brands fa-instagram"></i>
           </Link>
          
           <Link to="/" className='me-4 text-reset'>
        
          <i className="fa-brands fa-github"></i>
          </Link>
          
          <Link to="/" className='me-4 text-reset'>
          <i className="fa-brands fa-linkedin"></i>
          </Link>
  
          <Link to="/" className='me-4 text-reset'>
          <i className="fa-brands fa-twitter"></i>
          </Link>
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
              <i className="fa fa-guitar me-1"></i>Guitar-shop
              </h6>

              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <Link to="/" className='text-reset'>
                  Angular
                </Link>
              </p>
              <p>
                <Link to="/" className='text-reset'>
                  React
                </Link>
              </p>
              <p>
                <Link to="/" className='text-reset'>
                  Vue
                </Link>
              </p>
              <p>
                <Link to="/" className='text-reset'>
                  Laravel
                </Link>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <Link to="/" className='text-reset'>
                  Pricing
                </Link>
              </p>
              <p>
                <Link to='/#' className='text-reset'>
                  Settings
                </Link>
              </p>
              <p>
                <Link to='/#' className='text-reset'>
                  Orders
                </Link>
              </p>
              <p>
                <Link to='/#' className='text-reset'>
                  Help
                </Link>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fa fa-home me-3'></i> Chicago, IL 10012, US
              </p>
              <p>
                <i className='fa fa-envelope me-3'></i>
                Tijani.sylla1@gmail.com
              </p>
              <p>
                <i className='fa fa-phone me-3'></i> + 01 (312)-690-0771
              </p>
              <p>
                <i className='fa fa-print me-3'></i> + 01 (312)-690-0771
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Copyright:
        <Link className='text-reset fw-bold' to='https://tijanisylla.herokuapp.com'>
         Tijanisylla.com
        </Link>
      </div>
    </MDBFooter>
  );
}

export default Footer