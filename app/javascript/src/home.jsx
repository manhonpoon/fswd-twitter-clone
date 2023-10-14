import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';

import './home.scss';

import { safeCredentialsFormData, handleErrors } from './utils/fetchHelper';

let formData = new FormData();

formData.set('tweet[image]', fileInputElement.files[0]);
// Set other params in the form data.
formData.set('tweet[message]', 'a tweet');

fetch('/api/tweets', safeCredentialsFormData({
  method: 'POST',
  body: formData,
}))
.then(handleErrors)
.then(res => {   console.log(res); })

const Home = () => (
    <Layout>
    </Layout>
  )

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
