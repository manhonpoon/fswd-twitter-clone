import { authenticateUser, getUsersTweets } from "./request";

//  check logged in user

export var getCurrentUser = function (callback) {
  authenticateUser(function (response) {
    if (response.authenticated == true) {
      callback(response);
    }
    else if (response.authenticated == false) {
      window.location.replace('/');
    }
  });
};

//  count tweets for user stats

export var countUsersTweets = (username, callback) => {
  getUsersTweets(username, function (response) {
    callback(response.tweets.length);
  })
};