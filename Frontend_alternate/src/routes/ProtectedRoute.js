import React, { useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { setUserData } from '../actions/User';

const getUserSessionCookie = (props, setUserData) => {
  let userData = Cookies.get('user_session') || null;
  if (!userData)
    return false;

  setUserData();
}

const ProtectedRoute = ({ component: Component, user = {}, location, setUserData, ...rest }) => {
  useEffect(() => {
    // eslint-disable-next-line 
  }, [user.loggedIn]);

  return (
    <Route {...rest} render={
      props => {
        if ((user.loggedIn) || getUserSessionCookie(props, setUserData)) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}


const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

export default connect(mapStateToProps, {
  setUserData
})(ProtectedRoute);
