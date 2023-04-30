import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/CardPage.module.css'

const CardPage = () => {
  let { id } = useParams()

  const [card, setCard] = React.useState<null | any>(null)

  const fetchItem = async () => {
    const { data } = await axios.get(`https://testguru.ru/frontend-test/api/v1/items/${id}`)
    setCard(data)
  }
  fetchItem()
  return (<>
    <div className={styles.conatiner}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div>
            <img className={styles.img} src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200" width={260} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          {
            card
              ? <>
                <h3 className={styles.title}>Title: {card.title}</h3>
                <div className={styles.price}>Price: {Math.floor(card.price / 60)}</div>
                <div className={styles.address}>Address: {card.address}</div>
                <div className={styles.about}>About: {card.about}</div>
              </>
              : null
          }
        </div>
      </div>
    </div>
  </>)

}

export default CardPage