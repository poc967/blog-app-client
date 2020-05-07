import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

//Components
import NavBar from './components/NavBar'
import Blog from './components/Blog'
import Home from './components/Home'
import LogIn from './components/LogIn'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/blog' component={Blog} />
            <Route path='/users/login' component={LogIn} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
