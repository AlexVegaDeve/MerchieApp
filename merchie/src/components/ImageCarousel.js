import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => {
    return (
        <div className="mb-5 pt-5">
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100 carouselImage"
                    src="https://i.kym-cdn.com/photos/images/original/001/331/630/66b"
                    alt="First slide"
                    />
                    {/* <Carousel.Caption>
                    <h3 className='carouselHeader'>View our merch!</h3>
                    <p className='carouselText'>We have some new items in stock for you</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100 carouselImage"
                    src="http://www.rhodesonthepawtuxet.com/wp-content/themes/options/images/skins/headers/full_width/header-purpleHaze.jpg"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3 className='carouselHeader'>Thanks for supporting us!</h3>
                    <p className='carouselText'>Make sure you're subscribed to the channel for frequent updates on our videos, and new merch</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> 
        </div>

    )
}

export default ImageCarousel;