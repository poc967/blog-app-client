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

  state = {
    isOpen: false
  }

  toggleOpen = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/' render={() => <Home toggleOpen={this.toggleOpen} isOpen={this.state.isOpen} />} />
            <Route path='/blog' component={Blog} />
            <Route path='/users/login' render={() => <LogIn toggleOpen={this.toggleOpen} isOpen={this.state.isOpen} />} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
