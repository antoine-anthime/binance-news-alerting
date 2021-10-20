import mongoose from 'mongoose'
const {Schema} = mongoose
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: '/home/bitnami/binance-web-scraper/binance-news-alerting/.env' })

const getNotified = async () => {
  let mailingList = []
  let userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    sendViaEmail: Boolean,
    sendViaPhone: Boolean,
  })
  const User = mongoose.model('User', userSchema)

  let users = await User.find({sendViaEmail: true})
  users.forEach(user => {
    mailingList.push(user.email)
  })
  console.log("Users found for sending : ", users)
  console.log("Mailing list : ", mailingList)
  return mailingList
}

const sendNotifs = async (content) => {
  const mailingList = await getNotified()
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: 'binance.alerting.news@gmail.com',
    to: mailingList,
    subject: `[Binance news] ${content.title.substring(0,25)}...`,
    text: `${content.title} : Learn more : ${content.link}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const getNews = async () => {

  mongoose.connect(process.env.DB_LINK)

  let newsSchema = new Schema({
    title: String,
    pushed: Boolean,
    link: String,
  },
  {timestamps:  { createdAt: 'created_at' }})
  const News = mongoose.model('News', newsSchema)

  let news = await News.find()
  if (news[0].pushed === false)
  {
    sendNotifs(news[0])
    let updated = await News.findOneAndUpdate({title: news[0].title}, {pushed: true})
  } else {
    console.log('No new notifications to send')
  }


}

const main = async () => {
  console.log("Launching sendNotifications")
  let res = await getNews()
  setTimeout(() => { process.exit() }, 20000);
}

main()
