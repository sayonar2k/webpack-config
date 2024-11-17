import React from 'react'
import cls from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'
import about from '@/assets/bullets-1.png'
import Calendar from '@/assets/clue-svgrepo-com.svg'

export const App = () => {
  const [counter, setCounter] = React.useState(0)

  // Можем условно для дева делать какие-нибудь тулзы
  // и это условие будет выпелеоно вебпаком если platform будет desktop - tree shaking
  // и можно по разным урлам сборки раздавать будьто мобилки или десктоп
  // if (__PLATFORM__ === 'mobile') {
  //   return <div>Mobile</div>
  // }

  // const a: number = '2'

  // console.log(a)
  // если функция не юзается в проекте - вебпак ее убирает из итогого бандла - tree shaking

  const handleIncrement = () => {
    setCounter(counter + 1)
  }

  return (
    <div className={cls.app} data-testid="KEKEKEKE">
      <h1>{__PLATFORM__} 121122</h1>
      <img width={100} height={100} src={about} alt="" />
      <Calendar width={50} height={50} color="red" />
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <Outlet />
      <p>Counter: {counter}</p>
      <button onClick={handleIncrement}>
        Increment <span>1212</span>
      </button>
    </div>
  )
}
