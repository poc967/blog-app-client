// misc
import React, { Component } from "react";
import { BrowserRouter, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// redux
import { getUser } from "./actions/authActions";
import { clearErrors } from "./actions/errorActions";
import { connect } from "react-redux";
import { configureStore } from "./store";
// import store from "./store";

// components
import NavBar from "./components/NavBar";
import Blog from "./components/Blog";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";

const { store } = configureStore();

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser());
  }

  state = {
    isOpen: false,
  };

  toggleOpen = (e) => {
    store.dispatch(clearErrors());
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Link exact path="/" component={Home} />
            <PrivateRoute
              isLoggedIn={this.props.isAuthenticated}
              path="/blog"
              component={Blog}
            />
            <PrivateRoute
              isLoggedIn={this.props.isAuthenticated}
              path="/users/profile"
              component={Profile}
            />
            <Link path="/users/login" component={LogIn} />
            <Link component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, null)(App);
