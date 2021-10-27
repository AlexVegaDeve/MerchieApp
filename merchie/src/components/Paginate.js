import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = '' }) => {
    return pages > 1 && (
         <Pagination>
             {[...Array(pages).keys()].map((pages) => (
                 <LinkContainer key = { pages + 1} to = { keyword ? `/search/${keyword}/page/${pages+1}` : `/page/${pages+1}`}>
                     <Pagination.Item active={pages + 1 === page}>{pages + 1}</Pagination.Item>
                 </LinkContainer>   
             ))}
         </Pagination>
     )
}

export default Paginate;