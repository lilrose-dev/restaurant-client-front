import { Route, Routes, useParams } from 'react-router-dom'
import Home from './home'
import Restaurants from './pages/restaurants'
import Branches from './pages/branches'
import Food from './pages/food'
import './App.css'



function App() {

  return (
    <>
    <div className="containers">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:catID' element={<Restaurants/>}/>
        <Route path='/restaurant/:resID' element={<Branches/>}/>
        <Route path='/branches/:branchID' element={<Food/>}/>
        <Route path="*/" element={<h1>Page not found 404 :(</h1>}/>
      </Routes>
    </div>
    </>
  )
 
}

export default App
