
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


const Spiner: string = require('../static/icons/Spiner.svg').default



const HomePage = () => {

  const [cards, setCards] = React.useState<[] | any[]>([])
  const [page, setPage] = React.useState<number>(1)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<boolean>(false)
  const [showMore, setShowMore] = React.useState<boolean>(true)
  const [images, setImages] = React.useState<[] | any[]>([])
  const [cardsType, setCardsType] = React.useState<string>('default')
  const [LikesId, setLikesId] = React.useState<null | any[] | string[]>(null)

  const getCards = async () => {
    try {
      const { data } = await axios.get(`https://testguru.ru/frontend-test/api/v1/items?page=${page}`)
      setCards([...cards, ...data.items])
    } catch (err) {
      setError(true)
    }
  }

  const getImages = async () => {
    try {
      const { data } = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=40`)
      setImages([...images, ...data])
    } catch (err) {
      setError(true)
    }
  }
  React.useEffect(() => {
    try {
      (async function () {
        await getImages()
        await getCards()
      }()).then(() => [
        setShowMore(false)
      ])
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

  const sliceIntoChunks = (arr: any[], chunkSize: any, i?: any) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res[i];
  }

  const showMoreFoo = () => {
    setShowMore(true)
    setPage(page + 1)
  }


  const addLike = (id: string) => {
    if (LikesId) {
      if (LikesId.includes(id)) {
        setLikesId(LikesId.filter((elementId) => elementId != id))
      } else {
        setLikesId([...new Set([...LikesId, id])])
      }
      localStorage.setItem("LikesId", JSON.stringify(LikesId))
    }
  }

  const upper = () => document.documentElement.scrollTop = 0;

  const checkCardType = (type: string) => {
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
            cards.length && images.length && !loading
              ? cardsType == 'default'
                ? cards.map((card, i) => <CardItem
                  card={card}
                  images={sliceIntoChunks(images, 4, i)}
                  addLike={addLike}
                  LikesId={LikesId}

                />)

                : cards.map((card, i) => <WideCardItem
                  card={card}
                  images={sliceIntoChunks(images, 4, i)}
                  addLike={addLike}
                  LikesId={LikesId}

                />)
              : error
                ? <ErrorBlock />
                : cardsType == 'default'
                  ? [...new Array(20)].map(() => <MyLoader />)
                  : [...new Array(20)].map(() => <MyWideLoader />)
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
          // document.body.scrollTop > 99 || document.documentElement.scrollTop > 99
          (document.body.scrollTop > 99 && document.body.scrollTop != 0) || (document.documentElement.scrollTop > 99 && (document.documentElement.scrollTop != 0))
            ? <button className='up' onClick={() => upper()}>Вверх</button>
            : null
        }
      </div>

    </div>
  );
}

export default HomePage;