import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import thunkMiddlerware from "redux-thunk";
import { applyMiddleware, createStore } from 'redux';
import Reducer from './reducers';
import { createLogger } from 'redux-logger'
import Search from './pages/Search';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from "./routes/ProtectedRoute";
import Employee from "./pages/Employee";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
const logger = createLogger({
  // ...options
});

const store = createStore(
  Reducer,
  applyMiddleware(logger, thunkMiddlerware)
);

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/logout" exact component={Logout}/>
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/search" component={Search} />
            <ProtectedRoute path="/employee" component={Employee} />
          </Switch>
        </Router>
    </Provider>
  );
}


export default App;
