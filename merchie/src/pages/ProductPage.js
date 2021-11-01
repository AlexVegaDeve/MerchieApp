import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, ListGroupItem, Container, Modal, FormControl, FormGroup, FormLabel, Form  } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import {
    CreateProductReview
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductPage = (props) => {
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;

    const [ qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [show, setShow ] =useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = props.match.params.id
    const history = useHistory();

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { success: successProductReview, error: errorProductReview} = productReviewCreate;

    let userSession = JSON.parse(sessionStorage.getItem('userInfo'))

    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted!');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(id))
    }, [dispatch, successProductReview]);

    function handleEdit(){
        history.push(`${process.env.REACT_APP_API_ENDPOINT || ''}/editProduct/${id}`)
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1/products/${id}`);
        history.push('/');
        window.location.reload();
        localStorage.setItem('message', 'Item has been deleted');
    }

    const addToCartHandler = () => {
        history.push(`${process.env.REACT_APP_API_ENDPOINT || ''}/myCart/${id}?qty=${qty}`)
    }

    function submitHandler(e){
        e.preventDefault();
        dispatch(CreateProductReview(id, {
            rating,comment
        }))
    }

    return(
        
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button onClick={handleDelete} variant="danger">Delete item</Button>
                </Modal.Footer>

            </Modal>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Container className="pt-5">
            <Row>
                <Col md={4}>    
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroupItem><h4>{product.name}</h4></ListGroupItem>

                        <ListGroupItem><Rating value={product.rating} text={product.numReviews === 0 ?  'Be the first to review' :  product.numReviews === 1 ? `${product.numReviews} Review` : `${product.numReviews} Reviews`} /></ListGroupItem>

                        <ListGroupItem><h4>Price: ${product.price}</h4></ListGroupItem>

                        <ListGroupItem><h5>Description: {product.description}</h5></ListGroupItem>
                        <ListGroupItem><h5>Category: {product.category}</h5></ListGroupItem>
                        <ListGroupItem><h5>Brand: {product.brand}</h5></ListGroupItem>

                            <ListGroupItem>                                
                            <Row>
                                <Col> <h5>Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h5></Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col >
                                                <FormControl as='select' value={qty} onChange={(e) => {
                                                    setQty(e.target.value)  }}>
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <Button className='btn btn-block mt-2' disabled={product.countInStock === 0} onClick={addToCartHandler}>{product.countInStock === 0 ? 'Out of stock' : 'Add to cart'}</Button>
                                {product.countInStock === 0 && <Button className='btn btn-block my-3' > Notify me when in Stock </Button> }                                    
                            </ListGroupItem>

                    </ListGroup>
                </Col>
                <Col md={4}>
                        {userSession !== null && userSession.isAdmin && <Button  onClick={handleEdit} product={product} className="btn btn-danger">Edit Item (Admins Only)</Button>}
                        {userSession !== null && userSession.isAdmin && <Button  onClick={handleShow} className="btn btn-danger mt-3"><Link to="/edit"></Link> Delete Item (Admins Only)</Button> }                                                
                </Col>
            </Row>
            <Row>
                <Col md={3} className="py-5">
                    <Link to='/' className='btn btn-dark  my-3'>Go Back to Merch Page</Link>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2> Reviews </h2>
                    {product.reviews.length === 0 && <Message>Be the first to review this product!</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroupItem key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.comment}</p>
                            </ListGroupItem>
                        ))}
                        <ListGroupItem>
                            <h2>Write a review for this product</h2>
                            {errorProductReview && (
                                <Message variant='danger'>{errorProductReview}</Message>
                            )}
                            {userSession 
                            ?(
                            <Form onSubmit={submitHandler}>
                                <FormGroup controlId='rating'>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl as='select' value={rating} onChange={(e)=> setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - LTT ELITE</option>
                                    </FormControl>
                                </FormGroup>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as ='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>Submit</Button>
                            </Form>
                            ) 
                            : <Message> Please <Link to='/login'>sign in</Link> to write a review</Message>}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        )}
        </>
        
    )
}

export default ProductPage;