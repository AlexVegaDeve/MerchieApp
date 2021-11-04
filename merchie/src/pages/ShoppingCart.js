import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Button, Card, ListGroupItem, FormControl, Breadcrumb } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';


const ShoppingCart = ( { match, location, history} ) => {
    const productId = match.params.id;
    const qty = location.search ? location.search.split('=')[1] : 1; // splits query string which looks like ?qty=('INT')

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    function handleClick() {
        history.push('/');
      }
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    function checkoutHandler() {
        let userSession = JSON.parse(sessionStorage.getItem('userInfo'))

        if (userSession){
            history.push('/shipping');
        } else {
            history.push('/login');
        }
    }

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    return(
        <Container className="mt-5">
            <Row>
            <Breadcrumb>
                <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Shipping</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Payment</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Confirmation</Breadcrumb.Item>
            </Breadcrumb>
                <Col>
                    <h1>Your Cart</h1>
                    {cartItems.length === 0 
                    ?   <div>
                            <h4 className="mt-5">Your shopping cart is empty.<br /> Check out our merch here!</h4>
                            <div>  
                            <Button variant="primary" size="sm" onClick={() => handleClick()}>Back to merch</Button>
                            </div>       
                        </div>
                    : (<ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        <p>Price per item: ${item.price}</p>
                                        <p>Total price: ${item.price * item.qty}</p>
                                    </Col>
                                    <Col md={2}>
                                        <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={ x + 1} value={ x + 1 }>
                                                    { x + 1}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="primary" size="sm" onClick={() => removeFromCartHandler(item.product)}><i className="fas fa-times" /></Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                        </ListGroup>)}
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mt-5">
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h4> {cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)} Items in cart</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h4> Subtotal: ${cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty) * parseInt(item.price), 0).toFixed(2)}</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" onClick={checkoutHandler}> Checkout</Button>  
                                </div>
                                
                            </ListGroupItem>
                        </ListGroup> 
                    </Card>                
                </Col>            
            </Row>
        </Container>
    )
}

export default ShoppingCart;