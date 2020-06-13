import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './header'
import Cards from './cards'
import { getProducts, getRates, getLogs } from '../redux/reducers/products'
import Basket from './basket'
import Logs from './logs'

// import wave from '../assets/images/wave.jpg'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
    dispatch(getLogs())
  }, [])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Cards />} />
        <Route exact path="/basket" component={() => <Basket />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
