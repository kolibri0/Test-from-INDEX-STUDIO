import * as React from 'react';
const ErrorBlock = () => {


  return (
    <div className='error-block'>
      <div className='error-message'>Ошибка при загрузке</div>
      <button className='error-btn'>Повторить попытку</button>
    </div>
  )
}

export default ErrorBlock