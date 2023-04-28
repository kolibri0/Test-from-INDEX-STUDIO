import React from 'react';
import './App.css';
import axios from 'axios';
import CardItem from './Components/CardItem';
// import Logo from '../src/static/icons/IconLike.svg'


const App = () => {

  const [cards, setCards] = React.useState<null | any[]>(null)

  const getCards = async () => {
    const { data } = await axios.get(`https://testguru.ru/frontend-test/api/v1/ads?page=1`)
    // console.log(data)
    setCards(data.items)
  }

  React.useEffect(() => {
    getCards()
  }, [])

  console.log(cards)

  return (
    <div className="App">
      <div className='conatiner'>
        <div className='cards-grid'>
          {
            cards
              ? cards.map((card) => <CardItem card={card} />)
              : null
          }

        </div>
      </div>
    </div>
  );
}

export default App;
