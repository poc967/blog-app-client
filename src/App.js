// misc
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// redux
import { getUser } from './actions/authActions'
import { clearErrors } from './actions/errorActions'
import { connect } from 'react-redux'
import { configureStore } from './store'

// components
import NavBar from './components/NavBar'
import Blog from './components/Blog'
import Home from './components/Home'
import LogIn from './components/LogIn'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

const { store } = configureStore()

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
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/' render={() => <Home toggleOpen={this.toggleOpen} isOpen={this.state.isOpen} />} />
            <PrivateRoute isLoggedIn={this.props.isAuthenticated} path='/blog' component={Blog} />
            <Route path='/users/login' render={() => <LogIn toggleOpen={this.toggleOpen} isOpen={this.state.isOpen} />} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(App)