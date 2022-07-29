import React, { useState, useEffect } from 'react'
import getReq from './services/httpService'
import './App.css'
import Footer from './components/footer'
import RefreshBtn from './components/refreshBtn'
import Quotes from './components/quotes'

function App () {
  const [quote, setQuote] = useState([])
  const [quotesList, setQuotesList] = useState([])
  const [list, setList] = useState(false)
  const [loaded, setLoaded] = useState(true)

  async function getQuotesByAuthor () {
    let url = `https://api.quotable.io/quotes?author=${quote.author}`
    try {
      const { data } = await getReq(url)
      setQuotesList(data.results)
      setLoaded(true)
      setList(true)
    } catch (error) {
      console.log(error)
    }
  }

  function handleClick () {
    setLoaded(false)
    getQuotesByAuthor()
  }

  async function handleRefresh () {
    setLoaded(false)
    setList(false)
    const url = 'https://api.quotable.io/random'
    try {
      const { data } = await getReq(url)
      console.log(data)
      setQuote(data)
      setLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <div className='App'>
      <RefreshBtn handleRefresh={handleRefresh} />
      <Quotes
        list={list}
        loaded={loaded}
        quote={quote}
        quotesList={quotesList}
        handleClick={handleClick}
      />
      <Footer />
    </div>
  )
}

export default App
