import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBase, sumSelection, sortPrice, sortName } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)

  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = sumSelection(selection, rates, base, list)
  const { pathname } = window.location

  const symbols = {
    'USD': '$',
    'EUR': 'E',
    'CAD': 'C'
  }

  const changeSortProducts = (e) => {
    e.preventDefault()
    const { id } = e.target
    if (id === 'sort-price') {
      dispatch(sortPrice())
    }
    if (id === 'sort-name') {
      dispatch(sortName())
    }
  }
  return (
    <div className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-lg lg:flex-grow">
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 focus:underline" id="brand-name" to="/">
            Home
        </Link>
          <Link to="/basket" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 focus:underline" >basket</Link>
          <Link to="/logs" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white focus:underline">logs</Link>
        </div>
      </div>
      <div>
        {['CAD', 'USD', 'EUR'].map((it) => {
          return (
            <button
              key={it}
              type="button"
              className={`mx-4 ${base === it ? 'underline' : ''} inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0`}
              onClick={() => {
                dispatch(setBase(it))
              }}
            >
              {it}
            </button>
          )
        })}
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-16">
        <div className="text-lg lg:flex-grow">
          {['sort price', 'sort name'].map(sort => {
            return (
              <button key={sort} type="button" id={sort === 'sort price' ? 'sort-price' : 'sort-name'} className=" block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" onClick={changeSortProducts}>
                {sort}
              </button>
            )
          })}
        </div>
      </div>
      <div>
        <p className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4" >{sum !== 0 && `total price: ${sum.toFixed(2)} ${symbols[base]}`}</p>
        {pathname !== '/basket' && <p className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4" >{numberOfItems !== 0 && `total amount: ${numberOfItems}`}</p>}
      </div>
    </div>
  )
}

export default Header
