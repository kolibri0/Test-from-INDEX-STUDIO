import * as React from 'react';
const Logo: string = require('../static/icons/IconLike.svg').default




const CardItem: React.FC<any> = ({ card }) => {


  return (<>
    <div className='card-item'>
      <div className='card-top'>
        <div className='images'>

        </div>
      </div>
      <div className='card-bottom'>
        <div className='price-block'>
          <div className='price'>{Math.floor(card.price / 60)}</div>
          <div className='like'><img src={Logo} alt="img like" /></div>
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