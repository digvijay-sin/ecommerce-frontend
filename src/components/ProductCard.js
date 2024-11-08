import { Fragment } from 'react';
import banner1 from '../assets/banners/mobile-phone-banner.jpg';
import banner2 from '../assets/banners/travel-banner.jpg';
import banner3 from '../assets/banners/watch-banner.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductCard.css";
import itemImage from "../assets/items/testing image.png"

import { FaArrowCircleRight } from 'react-icons/fa'

const ProductCard = () => {
    // const [iterate, setIterate] = useState([1, 2, 3, 4]);
    const iterate = [1,2,3,4,5,6];
    
    return (
        <Fragment>
            <div className='parent'>
                <div className='carousel'>
                    <Carousel controls={false} touch={true} >
                        <Carousel.Item>
                            <img src={banner1} className='banner' />
                        </Carousel.Item>
                        <Carousel.Item >
                            <img src={banner2} className='banner' />
                        </Carousel.Item>
                        <Carousel.Item  >
                            <img src={banner3} className='banner' />
                        </Carousel.Item>
                    </Carousel>
                </div>
                {iterate.map((item, index) => {
                    return (
                        <div key={index} className='products'>
                            <div className='category-title-icon'>
                                <div className='category-title'>
                                    <h3>Categories</h3>
                                </div>
                                <div>
                                    <FaArrowCircleRight />
                                </div>
                            </div>
                            <div className='items'>
                                {iterate.map((item, index) => {
                                    return (
                                        <div key={index} className='card'>
                                            <Card style={{ width: '100%' }}>
                                                <Card.Img variant="top" src={itemImage} />
                                                <Card.Body>
                                                    <Card.Title>product.name</Card.Title>
                                                    <Card.Text>
                                                        product.details
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default ProductCard;