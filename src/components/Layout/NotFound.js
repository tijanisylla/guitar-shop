import React from 'react'
import {Link} from 'react-router-dom'
import './Style/NotFound.css'
const NotFound = () => {
  return (
    <div className="container-notfound">
    <div className="content">
      <div className="inner-wrapper">

        <div className="main-title">
          <h2>404</h2>
        </div>
      </div>

      <h2>Page Not Found</h2>
      <p class="blurb">Page you were looking for does not exist.</p>
      <span>
        <Link to="/" className="lego-btn">Back To Home</Link>
      </span>
    </div>
  </div>
  )
}

export default NotFound