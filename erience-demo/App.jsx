import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import City from './pages/City'
import Cities from './pages/Cities'
import User from './pages/User'
import Users from './pages/Users'

const App = () => {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand px-4">Erience Solution Task</Link>
          <div className="collapse navbar-collapse">
            <ul className='navbar-nav mr-auto'>
              <li className="nav-item">
                <Link to={ '/' } className="nav-link">Add City</Link>
              </li>
              <li className="nav-item">
                <Link to={ '/city-list' } className="nav-link">City List</Link>
              </li>
              <li className="nav-item">
                <Link to={ '/add-user' } className="nav-link">Add User</Link>
              </li>
              <li className="nav-item">
                <Link to={ '/user-list' } className="nav-link">User List</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path='/' element={ <City /> } />
            <Route path='/city-list' element={ <Cities /> } />
            <Route path='/add-user' element={ <User /> } />
            <Route path='/user-list' element={ <Users /> } />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App