import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} className="mb-5">
                <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5' />
            </Form>
        </div>
    )
}

export default SearchBar;