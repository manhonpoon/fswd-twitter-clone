import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getTweets, postTweet, deleteTweet } from '../packs/request';
import { getCurrentUser, countUsersTweets } from '../packs/utils';
import ReactDOM from 'react-dom'
import './style.scss';

const Tweets = () => {
  
    //    states
  
    const [tweets, setTweets] = useState([]);
    const [newTweet, setNewTweet] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [characters, setCharacters] = useState(140);
    const [tweetCount, setTweetCount] = useState(0);
  
    //    map tweets to state
  
    const listOfTweets = function (response) {
      setTweets(response.tweets.map(tweet => tweet));
    };
  
    //    handlers 
  
    const postTweetHandler = function (event) {
      event.preventDefault();
      var fileUpload = document.getElementById('imageUpload');
      var photo = fileUpload.files[0];
      postTweet(newTweet, photo, function (response) {
        if (response.success == false) {
          setErrorMessage("Sorry, there was an error posting your tweet. Please try again");
        }
        else {
          setErrorMessage("");
          setImagePreview("");
          getTweets(listOfTweets);
          setNewTweet("");
          setCharacters(140);
          countUsersTweets(response.tweet.username, setTweetCount);
        }
      });
    };
  
    const tweetInputHandler = function (event) {
      setNewTweet(event.target.value);
      setCharacters(140 - event.target.value.length);
    };
  
    const deleteTweetHandler = function (event) {
      var id = event.target.dataset.id;
      deleteTweet(id, function () {
        getTweets(listOfTweets);
        countUsersTweets(currentUser, setTweetCount);
      });
    };
  
    //   get tweets on page load
  
    useEffect(() => {
      getCurrentUser(function (response) {
        setCurrentUser(response.username);
        countUsersTweets(response.username, setTweetCount);
      });
      getTweets(listOfTweets);
    }, []);
  
    return(
      <div className="container mb-5">
        <Navbar />
        <div id="tweets" className="container row mt-1">
  
          <div className="col-12 col-xl-3">
  
            <div className="row justify-content-around">
  
              <div className="col-5 col-xl-12 username-box">
                <ul className="p-0 py-2 py-xxl-3 ps-xxl-2 m-0">
                  <li className="title fw-bold">{currentUser}</li>
                  <a href={"/" + currentUser}>@{currentUser}</a>
                  <ul className="px-0 mt-1 user-stats">
                    <li>TWEETS
                      <a href={"/" + currentUser} className="d-md-flex ps-4 ps-md-0 user-stats-tweets">{tweetCount}</a>
                    </li>
                    <li>FOLLOWING 
                      <span className="d-md-flex">0</span>
                    </li>
                    <li>FOLLOWERS 
                      <span className="d-md-flex">0</span>
                    </li>
                  </ul>
                </ul>
              </div>
  
            </div>
  
          </div>
  
          <div className="col-12 col-xl-6 twitter-feed px-md-4 my-4 my-xl-0">
  
            <div className="new-tweet-area p-3 pb-1">
              <form className="m-1" onSubmit={postTweetHandler}>
                <textarea 
                  className="form-control tweet-box" 
                  id="tweetInput" 
                  value={newTweet} 
                  onChange={tweetInputHandler}
                  placeholder="What's happening?"
                  maxLength="140">
                </textarea>
                <div className="text-end">
                  <p className="m-0 py-1 char-count">{characters}</p>
                  <button 
                    type="submit" 
                    className="btn btn-sm fw-bold px-3 tweet-btn" 
                    onSubmit={postTweetHandler}
                    disabled={characters == 140 || characters < 0}>
                    Tweet
                  </button>
                </div>
              </form>
              <p>
                {errorMessage}
              </p>
            </div>
  
            <div className="tweet-list">
  
              {tweets.map(tweet => {
                if (tweet.username === currentUser) {
                  return (
                    <div className="tweet p-3 pb-0" key={tweet.id}>
                      <p className="fw-bold d-inline">{tweet.username}</p>
                      <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                      <p className="d-inline date ps-1">{tweet.created_at}</p>
                      <p className="pt-3 fw-light">{tweet.message}</p>
                      <div className="img-wrapper px-md-4">
                        <img className="pb-1 tweet-image" src={tweet.image}></img>
                      </div>
                      <button className="btn btn-sm d-flex ms-auto delete-btn" data-id={tweet.id} onClick={deleteTweetHandler}>Delete</button>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="tweet pb-4 p-3" key={tweet.id}>
                      <p className="fw-bold d-inline">{tweet.username}</p>
                      <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                      <p className="d-inline date ps-1">{tweet.created_at}</p>
                      <p className="pt-3 fw-light">{tweet.message}</p>
                      <div className="img-wrapper px-md-4">
                        <img className="pb-1 tweet-image" src={tweet.image}></img>
                      </div>
                    </div>
                  )
                }
              })}
              
            </div>
          </div>
  
          <div className="col-3 d-none d-xl-block p-0">
            <form>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input className="form-control search" type="search" placeholder="Search" aria-label="Search"/>
              </div>
            </form>
          </div>
          </div>
          </div>

    ) 
  };

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tweets />,
    document.body.appendChild(document.createElement('div')),
  )
});