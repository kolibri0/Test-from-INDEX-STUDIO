import * as React from 'react';

const EmptyBlock = () => {


  return (<>
    <div className='empty-block'>
      <div className='empty-text'>ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</div>
      <div className="empty-message">Простите, по вашему запросу товаров сейчас нет. Задайте запрос по-другому или измените характеристики</div>
    </div>
  </>)
}

export default EmptyBlock