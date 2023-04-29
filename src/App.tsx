import React from 'react';
import './App.css';
import axios from 'axios';
import CardItem from './Components/CardItem';
import MyLoader from './Components/Loader';
import EmptyBlock from './Components/EmptyBlock';
import ErrorBlock from './Components/ErrorBlock';
// import Logo from '../src/static/icons/IconLike.svg'

const Eclipse: string = require('../src/static/icons/EllipseOne.svg').default
const EclipseTwo: string = require('../src/static/icons/EllipseTwo.svg').default
const Spiner: string = require('../src/static/icons/Spiner.svg').default


const App = () => {

  const [cards, setCards] = React.useState<[] | any[]>([])
  const [page, setPage] = React.useState<number>(1)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<boolean>(false)
  const [showMore, setShowMore] = React.useState<boolean>(true)
  const [images, setImages] = React.useState<[] | any[]>([])

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

  return (
    <div className="App">
      <div className='conatiner'>
        <div className='cards-grid'>
          {
            cards.length && images.length && !loading
              ? cards.map((card, i) => <CardItem card={card} images={sliceIntoChunks(images, 4, i)} />)
              : error
                ? <ErrorBlock />
                : [...new Array(20)].map(() => <MyLoader />)
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
      </div>
    </div>
  );
}

export default App;
