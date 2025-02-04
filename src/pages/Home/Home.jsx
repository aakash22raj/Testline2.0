import React from 'react'
import Header from '../../components/Header/Header'
import Cards from '../../components/Cards/Cards'

const Home = () => {

  // const [category,setCategory] = useState("All");

  return (
    <div className='app'>
      <Header/>
      <Cards/>
    </div>
  )
}

export default Home