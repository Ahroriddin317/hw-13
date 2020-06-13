import axios from "axios"

const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const SORT_PRICE = 'SORT_PRICE'
const SORT_NAME = 'SORT_NAME'
const GET_LOGS = '@@GET_LOGS'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  sortProducts: '',
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        }
      }

    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }

    case SET_BASE:
      return { ...state, base: action.base }

    case GET_RATES:
      return { ...state, ...action.rates }

    case GET_PRODUCTS:
      return { ...state, list: action.list }
    case SORT_PRICE:
      return { ...state, sortProducts: action.sortProducts }
    case SORT_NAME:
      return { ...state, sortProducts: action.sortProducts }
    case GET_LOGS:
      return { ...state, logs: action.logs }
    default:
      return state
  }
}


export function addSelection(id) {
  return { type: ADD_TO_SELECTION, id }
}

export function removeSelection(id) {
  return { type: REMOVE_FROM_SELECTION, id }
}
export function setBase(base) {
  return { type: SET_BASE, base }
}



export function getRates() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => {
        dispatch({ type: GET_RATES, rates })
      })
  }
}
export function getProducts() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then(res => res.json())
      .then(list => {
        dispatch({ type: GET_PRODUCTS, list })
      })
  }
}

export function getPrice(id, list) {
  return list.find((it) => it.id === id).price
}

export function sortPrice() {
  return { type: SORT_PRICE, sortProducts: 'sort-price' }
}

export function sortName() {
  return { type: SORT_NAME, sortProducts: 'sort-name' }
}

export function getLogs() {
  return function (dispatch) {
    axios('/api/v1/logs').then(({ data: logs }) => dispatch({ type: GET_LOGS, logs }))
  }
}

export function sumSelection(array, rates, base, list) {
  return Object.entries(array).reduce(
    (acc, [id, qty]) => acc + getPrice(id, list) * qty * (rates[base] || 1),
    0
  )
}

export function getBasketProducts(list, selection) {
  return list.map(card => {
    const selectionArray = Object.keys(selection)
    for (let i = 0; i < selectionArray.length; i += 1) {
      if (card.id === selectionArray[i]) {
        return card
      }
    }
    return null
  }).filter(card => card !== null)
}

export function willSort(array, sort) {
  let newArray = []
  switch (sort) {
    case 'sort-price':
      newArray = array.sort((a, b) => b.price - a.price)
      break
    case 'sort-name':
      newArray = array.sort((a, b) => a.title.localeCompare(b.title))
      break
    default:
      return array
  }
  return newArray
}

export function filterArray(array, type) {
  return array.filter(action => action.type === type)
}