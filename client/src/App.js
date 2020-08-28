import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


// pages
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat'

export default () => (
    <Router>
        <Route 
            path="/"
            exact
            component={Login}
        />
        <Route 
            path="/chat"
            exact
            component={Chat}
        />
    </Router>
)