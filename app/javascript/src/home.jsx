import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import $ from 'jquery';
import { createUser, logInUser, authenticateUser } from '../packs/request';
import './style.scss';
import '../packs/application.scss'

const Home = () => {

  //   states

  const [signUpMessage, setSignUpMessage] = useState("");
  const [logInMessage, setLogInMessage] = useState("");
  
  //   handlers

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = $('#newUsernameInput').val();
    const email = $('#newEmailInput').val();
    const password = $('#newPasswordInput').val();
    createUser(username, email, password, function (response) {
      if (response.success == false) {
        setSignUpMessage(response.error);
      }
      else {
        setSignUpMessage("Success! Please log in");
        $('#newUsernameInput').val('');
        $('#newEmailInput').val('');
        $('#newPasswordInput').val('');
      }
    });
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    const username = $('#usernameInput').val();
    const password = $('#passwordInput').val();
    logInUser(username, password, function (response) {
      if (response.success == true) {
        window.location.assign('/tweets');
      }
      else {
        setLogInMessage("Error logging in. Please try again")
      }
    });
  }

  //  go to tweets if user is logged in

  useEffect(() => {
    authenticateUser(function(response) {
      if (response.authenticated == true) {
        window.location.assign('/tweets');
      }
    })
  }, [])

  return(
    <div id="homePage" className="container-fluid">
      <Navbar />
      <div className="row">

        <div id="homeLeft" className="col-6 d-none d-lg-flex px-0">
        </div>

        <div className="col-12 col-lg-6 fw-bold p-4 home-wrapper">

          <div className="twitter-icon text-center text-lg-start">
            <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="my-3 mb-5 mb-lg-3">
            <h1 className="my-3">Happening Now</h1>
            <h3>Join Twitter today.</h3>
          </div>

          <div className="row flex-column flex-sm-row text-center">

            <div className="col-12 col-md-6 d-flex">
              <form onSubmit={handleSignUp} className="home-page-forms d-flex flex-column justify-content-around w-100 p-4">
                <p className="heading">Create your account</p>
                <div>
                  <label htmlFor="newUsernameInput" className="form-label" hidden>Username</label>
                  <input type="text" className="form-control" id="newUsernameInput" placeholder="username" minLength="3" required></input>
                </div>
                <div>
                  <label htmlFor="newEmailInput" className="form-label" hidden>Email adress</label>
                  <input type="email" className="form-control" id="newEmailInput" placeholder="email" required></input>
                </div>
                <div>
                  <label htmlFor="newPasswordInput" className="form-label" hidden>Password</label>
                  <input type="password" className="form-control" id="newPasswordInput" placeholder="password" minLength="8" required></input>
                </div>
                <button type="submit" className="btn mt-4 mt-lg-4" onSubmit={handleSignUp}>Sign up</button>
                <p className="form-message my-2">
                  {signUpMessage}
                </p>
              </form>
            </div>

            <div className="col-12 col-md-6 d-flex my-4 my-md-0">
              <form onSubmit={handleLogIn} className="home-page-forms d-flex flex-column justify-content-around w-100 p-4">
                <p className="heading">Already have an account?</p>
                <div>
                  <label htmlFor="usernameInput" className="form-label" hidden>Username</label>
                  <input type="text" className="form-control" id="usernameInput" placeholder="username" required></input>
                </div>
                <div>
                  <label htmlFor="passwordInput" className="form-label" hidden>Password</label>
                  <input type="password" className="form-control mb-0 mb-md-3" id="passwordInput" placeholder="password" required></input>
                </div>
                <button type="submit" className="btn mt-4 mt-md-2 mt-lg-0" onSubmit={handleLogIn}>Log In</button>
                <p className="form-message m-0 p-0">
                  {logInMessage}
                </p>
              </form>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  )
})