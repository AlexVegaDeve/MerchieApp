import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const Product = (props) => {
    return (
        <Card className="d-flex my-3 p-3 rounded indexCard">
            <Link to={`/merch/${props.product._id}`}>
                <Card.Img src={props.product.image} className="img-fluid my-auto" />
            </Link>
            <Card.Body className="d-flex flex-column align-items-center justify-content-end">
                <Link to={`/merch/${props.product._id}`}>
                    <Card.Title as='div'>
                        <strong>{props.product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div ><h5 className="card-text">${props.product.price}</h5></div>
                </Card.Text>

                <Card.Text as='div'>
                    <div className='my-1'><h5 className="card-text">{props.product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h5></div>
                </Card.Text>
            </Card.Body>  
        </Card>
    )
}

export default Product;