import React, { useEffect } from 'react'
import axios from 'axios'
import './App.scss'

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
//cntxt
import ContextProvider from '../store/context/contextProvider'

//cmps
//protected
import ProtectedRoutes from '../components/protected'
//partials
import Navbar from './pages/partials/Navbar'
import Footer from './pages/partials/Footer'
//auth
import AuthorisedRoutes from './pages/authorised';
//unauth
import Login from './pages/unauthorised/login'
import SignUp from './pages/unauthorised/signUp'

import Forgot from './pages/unauthorised/forgot'
import Reset from './pages/unauthorised/reset'
//auth
import { fakeAuth } from '../components/protected'

export default function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Navbar />
          <div style={{ marginTop: '100px'}}></div>
          <Switch>
                <Route path="/forgot" component={ Forgot } />
                <Route path="/reset/:id" component={ Reset } />

                <Route path="/login" component={ Login } />
                <Route path="/signup" component={ SignUp } />
                <ProtectedRoutes path="/" component={ AuthorisedRoutes } />
            </Switch>
          <Footer/>
        </Router>
      </ContextProvider>
    </>
  )
}
