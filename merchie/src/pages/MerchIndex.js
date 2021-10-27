import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap';
import Product from '../components/Product';
import ImageCarousel from '../components/ImageCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import SearchBar from '../components/SearchBar';
import Paginate from '../components/Paginate';

const MerchIndex = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1 ;

    const dispatch = useDispatch();

    const productList = useSelector( (state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
}, [dispatch, keyword, pageNumber]);

    return(
        <>  
            <ImageCarousel/>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Container>
                <ButtonGroup aria-label="Category-filter" className="d-flex mb-1">
                    <Button variant="secondary" className="category">Clothing</Button>
                    <Button variant="secondary" className="category">Gear</Button>
                    <Button variant="secondary" className="category">Accessories</Button>
                </ButtonGroup>
                <Route render={({ history }) => <SearchBar history={history} />} />
                {keyword && <h4 className="mb-2">Searching for : {keyword}</h4>}
                <Row>
                    {localStorage.message && <Message>{localStorage.message}</Message>}

                    {products.map( (product) => (
                        <Col sm={1} md={4} lg={4} key={product._id}>
                            <Product product={product} />
                        </Col>  
                        )  
                    )}
                </Row>  
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </Container>

            )}
        </>
    )
}

export default MerchIndex;