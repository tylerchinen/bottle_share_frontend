import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Icon, Menu, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LoginForm from './login/LoginForm';
import SignupForm from './login/SignupForm';
import { logout, getCurrentUser } from '../actions/users';

const Navigation = props => (
  <Menu inverted color="blue" className="fixed top">
    <Menu.Item name="home" as={NavLink} exact to="/" >
      <img className="nav-logo" src="../img/logo.svg" alt="logo" />
    </Menu.Item>
    <Menu.Item name="beers" as={NavLink} exact to="/beers" >
      Beers
    </Menu.Item>
    <Menu.Item name="breweries" as={NavLink} exact to="/breweries" >
      Breweries
    </Menu.Item>
    <Menu.Item name="reviews" as={NavLink} exact to="/reviews" >
      Reviews
    </Menu.Item>
    {props.loggedIn ?
      <React.Fragment>
        <Menu.Item name="events" as={NavLink} exact to="/events" >
          Events
        </Menu.Item>
        <Menu.Item name="invitations" as={NavLink} exact to="/invitations" >
          Invitations
        </Menu.Item>
      </React.Fragment>
      :
      null
    }
    <div className="top right menu">
      {props.loggedIn ?
        <Popup
          on="click"
          horizontalOffset={3}
          trigger={<Icon className="avatar" name="user circle" size="big" />}
          content={
            <div className="user-popup">
              <h4>{props.currentUser.name}</h4>
              <Button
                basic
                fluid
                color="red"
                onClick={() => props.logout(props.history)}
              >
                Logout
              </Button>
            </div>
          }
        />
        :
        <React.Fragment>
          <LoginForm name="login" element="menuItem" as={NavLink} >
            Log In
          </LoginForm>
          <SignupForm name="signup" element="menuItem" as={NavLink} >
            Sign Up
          </SignupForm>
        </React.Fragment>
      }
    </div>
  </Menu>
);

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  userID: state.user.userID,
  currentUser: state.user.currentUser
});

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default withRouter(connect(mapStateToProps, { logout, getCurrentUser })(Navigation));
