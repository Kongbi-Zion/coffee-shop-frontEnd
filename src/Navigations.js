import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/services'
import Contact from './pages/contact'
import CoffeeOrders from './pages/coffeeOrders'
import NotFound from './pages/notFound'

function Navigations() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/about' exact element={<About/>} />
                <Route path='/services' exact element={<Services/>} />
                <Route path='/contact' exact element={<Contact/>} />
                <Route path='/orders' exact element={<CoffeeOrders/>} />
                <Route path='/*' exact element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}


export default Navigations;