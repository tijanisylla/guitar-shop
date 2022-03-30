
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import Loading from './Loading';
import StarsRating from './StarsRating';
import {formatterFunc, getLimitFunc} from './Helper';

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
            category
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
                  <Button variant="primary">More Details...</Button>

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
