import * as React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Logo: string = require('../static/icons/IconLike.svg').default

interface props {
  card: any,
  images: any
}


const CardItem: React.FC<props> = ({ card, images }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,


    appendDots: (dots: any) => (
      <div
        style={{
          position: 'absolute', bottom: '0px', left: '0px',
        }}
      >
        <ul style={{ padding: '0px' }}>{dots}</ul>
      </div>
    ),

  };

  // console.log(card)
  return (<>
    <div className='card-item'>
      <div className='card-top'>
        <div className='images'>
          {
            card.seen
              ? <div className='checked'>Просмотренно</div>
              : null
          }
          <Slider {...settings}>
            {
              images
                ? images.map((img: any) => (
                  <div className='contain-img'>
                    <img className='img' src={img.download_url} alt="" />
                  </div>
                ))
                : null
            }
          </Slider>
        </div>
      </div>
      <div className='card-bottom'>
        <div className='price-block'>
          <div className='price'>{Math.floor(card.price / 60)}</div>
          {/* <div className='like'><img src={Logo} alt="img like" /></div> */}
          <div className='like'></div>
        </div>
        <div className='card-title'>{card.title}</div>
        <div className='city-block'>
          <div className='city-title'>{card.address.split(' ')[0]}</div>
          <div className='city'>{card.address.split(' ')[1]}</div>
        </div>
      </div>
    </div>

  </>)
}


export default CardItem