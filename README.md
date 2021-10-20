<h1 align="center">Welcome to Binance Announcements webscraper 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/AntoineNayuru" target="_blank">
    <img alt="Twitter: AntoineNayuru" src="https://img.shields.io/twitter/follow/AntoineNayuru.svg?style=social" />
  </a>
</p>

> A simple node project for notifying last announcements made by Binance on listing of new cryptos

## Install

```sh
npm install
```

## Usage

```sh
node index.js 
```
gets the latest news and upload it to your MongoDB Database ; node sendNotifications.js sends email notification to subscribers

```sh
node sendNotifications.js
```
Sends Email notifications to subscribers

Update the .env.exemple in the repo, with your MongoDB Database, and setup a sender email

For using locally, set the dotenv.config() as your .env path

## Author

👤 **Antoine ANTHIME**

* Twitter: [@AntoineNayuru](https://twitter.com/AntoineNayuru)
* Github: [@antoine-anthime](https://github.com/antoine-anthime)
* LinkedIn: [@Antoine ANTHIME](https://linkedin.com/in/antoine-anthime-80b8a71b9)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
