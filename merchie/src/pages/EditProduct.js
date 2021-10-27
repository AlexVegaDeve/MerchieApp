import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Loader from '../components/Loader';

const EditProduct = (props) => {
    const [product, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const id = props.match.params.id;


    const fetchProduct = async () => {
        const res = await axios.get(`/api/v1/products/${id}`);
        const json = await res.data;
        setProducts(json);
    } 
    fetchProduct()
    
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState('');

    useEffect(() => {
        setName(product.name);
        setBrand(product.brand);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);
        setImage(product.image);
        setCountInStock(product.countInStock);

        setIsLoading(false);
        // eslint-disable-next-line
    }, [product.name, product.brand, product.price, product.category, product.description, product.image, product.countInStock]);

    const onSubmit = (data) => {
        axios.put(`/api/v1/products/${id}`, {
            name: data.name,
            brand: data.brand,
            price: data.price,
            category: data.category,
            description: data.description,
            image: data.image,
            countInStock : data.countInStock
        }).catch((error) => {
            console.log(error)
        })
        history.push(`/merch/${id}`);
    }
    
        return(
            <Container  className="py-5">
                <Card sm={12} md={6} lg={4}>
                {isLoading && <Loader />}
                <Card.Header>Edit product (Admins Only)</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" {...register('name', { required: true })} value={name}
                            onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" {...register('brand', { required: true })} value={brand}
                            onChange={e => setBrand(e.target.value )}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" {...register('price', { required: true })} value={price}
                            onChange={e => setPrice(e.target.value )}/>
                        </Form.Group>                        
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" {...register('category', { required: true })} value={category}
                            onChange={e => setCategory( e.target.value )}/>                
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register('description', { required: true })} value={description}
                            onChange={e => setDescription(e.target.value )}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" {...register('image', { required: true })} value={image}
                            onChange={e => setImage(e.target.value )}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="text" {...register('countInStock', { required: true })} value={countInStock}
                            onChange={e => setCountInStock(e.target.value )}/>
                        </Form.Group>
                        <Button type="submit">Submit</Button>                
                    </Form>  
                </Card.Body>
            </Card>
            </Container>
            
        )
    }

export default EditProduct;