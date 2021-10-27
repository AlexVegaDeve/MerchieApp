import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Loader from '../components/Loader';

const CreateProduct = () => {
        const { register, handleSubmit } = useForm();
        const history = useHistory();
        const [uploading, setUploading] = useState(false);
        const [image, setImage] = useState('');

        const uploadFileHandler = async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            setUploading(true);

            try{
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const { data } = await axios.post('/api/v1/upload', formData, config);
                setImage(data);
                setUploading(false);

            }catch(error){
                console.error(error);
                setUploading(false);
            }
        }

        const onSubmit = (data) => {
            axios.post('/api/v1/products', {
                name: data.name,
                brand: data.brand,
                price: data.price,
                category: data.category,
                description: data.description,
                image: image || data.image,
            }).catch((error) => {
                console.log(error)
            })
            history.push('/');
            window.location.reload() //reload session to see new state

    }
        return(
            <Container className="py-5">
                <Card sm={12} md={6} lg={4}>
                    <Card.Header>Submit a new product (Admins Only)</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" {...register('name', { required: true })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" {...register('brand', { required: true })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" {...register('price', { required: true })}/>
                            </Form.Group>                        
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" {...register('category', { required: true })}/>                
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} {...register('description', { required: true })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" {...register('image')}/>
                                <Form.Control type="file" id='image-file' name="image" onChange={uploadFileHandler} className="mt-1"/>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Button type="submit">Submit</Button>                
                        </Form>  
                    </Card.Body>
                </Card>
            </Container>
        
        )
    }

export default CreateProduct;