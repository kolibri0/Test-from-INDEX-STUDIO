import React from 'react';
import '../App.css';
import axios from 'axios';
import CardItem from '../Components/CardItem';
import MyLoader from '../Components/Loader';
import EmptyBlock from '../Components/EmptyBlock';
import ErrorBlock from '../Components/ErrorBlock';
import '../module.d.ts'
import WideCardItem from '../Components/WideCardItem';
import MyWideLoader from './WideLoader';
import { ICard } from '../types/ICard';

const Spiner: string = require('../static/icons/Spiner.svg').default

const HomePage: React.FC = () => {

  const [cards, setCards] = React.useState<[] | ICard[]>([])
  const [page, setPage] = React.useState<number>(1)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<boolean>(false)
  const [showMore, setShowMore] = React.useState<boolean>(true)
  const [cardsType, setCardsType] = React.useState<string>('default')
  const [LikesId, setLikesId] = React.useState<string[] | null>(null)

  const getCards = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`https://testguru.ru/frontend-test/api/v1/items?page=${page}`)
      setCards([...cards, ...data.items])
    } catch (err) {
      setError(true)
    }
  }
  React.useEffect(() => {
    try {
      getCards().then(() => setShowMore(false))
      setLoading(false)
    } catch (err) {
      setError(true)
    }
  }, [page])

  React.useEffect(() => {
    const data = localStorage.getItem('LikesId')
    if (typeof data === 'string') {
      setLikesId(JSON.parse(data));
    }
    const type = localStorage.getItem('CardType')
    if (typeof type === 'string') {
      setCardsType(JSON.parse(type));
    }
  }, [])

  const showMoreFoo = (): void => {
    setShowMore(true)
    setPage(page + 1)
  }

  const addLike = (id: string): void => {
    if (LikesId) {
      if (LikesId.includes(id)) {
        setLikesId(LikesId.filter((elementId) => elementId != id))
      } else {
        setLikesId([...new Set([...LikesId, id])])
      }
      localStorage.setItem("LikesId", JSON.stringify(LikesId))
    }
  }

  const upper = (): number => document.documentElement.scrollTop = 0;

  const checkCardType = (type: string): void => {
    setCardsType(type)
    localStorage.setItem("CardType", JSON.stringify(type))
  }

  return (
    <div className="App">
      <div className='contain-some'>
        <div className={cardsType == 'default' ? 'block-one-active' : 'block-one'} onClick={() => checkCardType('default')}></div>
        <div className={cardsType == 'default' ? 'block-two' : 'block-two-active'} onClick={() => checkCardType('wide')}></div>
      </div>
      <div className='conatiner'>
        <div className={cardsType == 'default' ? 'cards-grid' : 'cards-grid-wide'}>
          {
            cards.length && !loading
              ? cardsType == 'default'
                //--------------------CARDS TYPE BLOCK------------------------------//
                ? cards.map((card, i) => <CardItem
                  card={card}
                  addLike={addLike}
                  LikesId={LikesId}
                />)
                : cards.map((card, i) => <WideCardItem
                  card={card}
                  addLike={addLike}
                  LikesId={LikesId}
                />)
              //--------------------END CARDS TYPE BLOCK-------------------------//
              : error
                ? <ErrorBlock />
                : cardsType == 'default'
                  //***--------------------LOADER TYPE BLOCK----------------------------***//
                  ? [...new Array(20)].map(() => <MyLoader />)
                  : [...new Array(20)].map(() => <MyWideLoader />)
            //***--------------------END LOADER TYPE BLOCK------------------------***//
          }
          {
            !cards.length && !error && !loading
              ? <EmptyBlock />
              : null
          }
        </div>
        {
          showMore
            ? <div className='new-container'>
              <div className='spiner-block'>
                <img className='spiner' src={Spiner} alt="" />
              </div>
            </div>
            : page < 10 && cards.length
              ? <button className='more' onClick={() => showMoreFoo()}>Показать еще</button>
              : null
        }

        {
          document.body.scrollTop > 99 || document.documentElement.scrollTop > 99
            ? <button className='up' onClick={() => upper()}>Вверх</button>
            : null
        }
      </div>

    </div>
  );
}

export default HomePage;