import axios from 'axios'
import cheerio from 'cheerio'
import mongoose from 'mongoose'
const {Schema} = mongoose
import dotenv from 'dotenv'

dotenv.config({ path: '/home/bitnami/binance-web-scraper/binance-news-alerting/.env' })

const addToDb = async (data) => {
  mongoose.connect(process.env.DB_LINK)

  let newsSchema = new Schema({
    title: String,
    pushed: Boolean,
    link: String,
  },
  {timestamps:  { createdAt: 'created_at' }})

  const News = mongoose.model('News', newsSchema)
  const query = News.where({title: data.title})

  query.findOne(function (err, gotnews){
    if (err) console.log(err)
    if (gotnews) {
      console.log("Already existing : ", gotnews)
      return 0
    }
    else {
      const news = new News({title: data.title, pushed: false, link: data.link})
      news.save().then(() => console.log('data added'))
      console.log('Created news')
    }
  })
}

const loadHtmlAndSearch = async (html) => {
  const $ = await cheerio.load(html)

  console.log('text got : ', $('#link-0-0-p1').text())
  console.log('link', $('#link-0-0-p1').attr("href"))
  return {
    title: $('#link-0-0-p1').text(),
    link : `https://www.binance.com${$('#link-0-0-p1').attr("href")}`
  }
}

const webscrap = async () => {
  let res = await axios.get('https://www.binance.com/en/support/announcement/c-48')
  return res.data
}

const main = async () => {
  let res = await webscrap()
  let data = await loadHtmlAndSearch(res)
  let loaded = await addToDb(data)
  setTimeout(() => {   process.exit()  }, 20000);
}

main()
