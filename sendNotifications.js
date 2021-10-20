import mongoose from 'mongoose'
const {Schema} = mongoose
import nodemailer from 'nodemailer'

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

  console.log("Sending notifications...")
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'binance.alerting.news@gmail.com',
      pass: 'Anthime2012!'
    }
  });

  var mailOptions = {
    from: 'binance.alerting.news@gmail.com',
    to: mailingList,
    subject: `[Binance news] ${content.title.substring(0,25)}...`,
    text: `${content.title} : Learn more at ${content.link}`
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

  console.log("Fetching new announcements...")
  mongoose.connect('mongodb+srv://binance-scrap:cbE87FiXRJBPsCoA@home-cluster.odj0l.mongodb.net/binance-news-scrapper?retryWrites=true&w=majority')

  let newsSchema = new Schema({
    title: String,
    pushed: Boolean,
    link: String,
  },
  {timestamps:  { createdAt: 'created_at' }})
  const News = mongoose.model('News', newsSchema)

  let news = await News.find()
  console.log(news[0])
  if (news[0].pushed === false)
  {
    console.log("New announcement not pushed to subscribers -> ", news[0])
    sendNotifs(news[0])
    //let updated = await News.findOneAndUpdate({title: news[0].title}, {pushed: true})
    //console.log(updated)
  }
  else
  {
    console.log("Latest announcement is already pushed.")
  }


}

const main = async () => {
  let res = await getNews()
}

main()
