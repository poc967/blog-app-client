// misc
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// redux
import { getUser } from "./actions/authActions";
import { connect } from "react-redux";
import { configureStore } from "./store";

// components
import NavBar from "./components/NavBar";
import Blog from "./components/Blog";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import SearchResultsPage from "./components/SearchResultsPage";
import { PrivateRoute } from "./components/PrivateRoute";

const { store } = configureStore();

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser());
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
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
            <Route path="/users/login" component={LogIn} />
            <Route component={NotFound} />
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
