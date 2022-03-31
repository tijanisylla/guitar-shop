
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import Loading from './Loading';
import StarsRating from './StarsRating';
import {formatterFunc, getLimitFunc} from './Helper';
import {Link} from 'react-router-dom'
import '../Style/Guitars.css';

const DisplayGuitars = ({data,loading}) => {

  return (
    <div className="home-component">
 
      { loading
        ? <Loading/>
        : null }


     <div className="card-container">

        {data.map((guitar, idx) => {
          const {
            brand_name,
            model_name,
            description,
            price,
            rating,
            image_url,
            category,
            id
          } = guitar;
          
          return (
            <div key={idx}>
              <Card className="card-guitars">
                <Card.Img variant="top" src={image_url} alt="guitar"/>
                <Card.Body>
                  <Card.Title>{brand_name}</Card.Title>
                  <Card.Text>
                    <StarsRating numberOfStars={rating}/>
                  </Card.Text>
                  <Card.Text></Card.Text>
                 <span className="price">{formatterFunc(price)}</span> 
                  <Card.Text>
                    <span className="description">
                      {getLimitFunc(description)}
                    </span>
                  </Card.Text>

                  <Link to={`/guitars/${id}`}>
                  <Button variant="primary" >
                    More Details...
                    </Button>
                    </Link>

                </Card.Body>
              </Card>
            </div>

            
          )
        })
}         
      </div>
    </div>
  )
}
export default DisplayGuitars
