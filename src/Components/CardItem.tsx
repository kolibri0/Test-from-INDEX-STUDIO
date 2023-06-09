import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../module.d.ts'
import styles from '../styles/CardItemDefault.module.css'
import { Link } from 'react-router-dom';
import { ICard } from '../types/ICard.js';

interface props {
  card: ICard,
  addLike: (id: string) => void,
  LikesId: string[] | null,
}

const CardItem: React.FC<props> = ({ card, addLike, LikesId }) => {

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
  const checkLike = (LikeId: any) => {
    return LikeId == card.id
  }
  return (<>
    <div className={styles.cardItem}>
      <div className={styles.cardTop}>
        <div className={styles.images}>
          {
            card.seen
              ? <div className={styles.checked}>Просмотренно</div>
              : null
          }
          <Slider {...settings}>
            {
              [...new Array(4)].map(() => (
                <div className={styles.containImg}>
                  <img className={styles.img} src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200" alt="" />

                </div>
              ))
            }
          </Slider>
        </div>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.priceBlock}>
          <div className={styles.price}>{Math.floor(card.price / 60)}</div>
          <div className={LikesId && LikesId.some((checkLike)) ? styles.likeActive : styles.like} onClick={() => addLike(card.id)}></div>
        </div>
        <Link className={styles.cardTitle} to={`/${card.id}`}>{card.title}</Link>
        <Link className={styles.cityBlock} to={`/${card.id}`}>
          <div className={styles.cityTitle}>{card.address.split(' ')[0]}</div>
          <div className={styles.city}>{card.address.split(' ')[1]}</div>
        </Link>
      </div>
    </div>

  </>)
}


export default CardItem