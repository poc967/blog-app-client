import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// redux
import { Provider } from 'react-redux'
import store from './store'
import { getUser } from './actions/authActions'
import { clearErrors } from './actions/errorActions'

//Components
import NavBar from './components/NavBar'
import Blog from './components/Blog'
import Home from './components/Home'
import LogIn from './components/LogIn'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

class App extends Component {

  componentDidMount() {
    store.dispatch(getUser())
  }

  state = {
    isOpen: false
  }

  toggleOpen = (e) => {
    store.dispatch(clearErrors())
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default App
