//This microservice receives a POST request when the form is sent
// it uses exepresJS for the server part
// it uses nodemailer to connect to the SMTP server and send the email
// it uses pug as an HTML templates for the content of the mail

const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const pug = require('pug');
const redis = require('redis');
const path = require('path')

//We use dotenv to work with env variables, we access them using process.enc.NAME_VARIABLE
require('dotenv').config();

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MONGO_URL = process.env.MONGO;

//creating a Redis Client
const publisher = redis.createClient();


//bodyParser lets Express know that the data we're usinf is in JSON format
app.use(bodyParser.json());

//we use cors to prevent erros of type cross orign access
app.use(cors())

//when a user sends a get request to this endpoint, he retrievs the email templates info
app.get('/api/mails/templates', (req, res) => {
    //get templates info from db
    getTemplates().then(data => {
        res.json(data);
        console.log('templates sent');
    }).catch(err => console.log(err));

})

//the user sends a post request with the email infos to send it
app.post('/api/mails', (req, res) => {

    //we send a mail using
    sendMail(req.body).then(() => {
        res.json({ message: 'mail sent' });

        //connecting to redis and pub
        pubData(req.body)

    }).catch((err) => {
        console.log(err)
        res.json({ message: 'mail not sent' });
    });


});
//Listenning to requests 
const PORT = process.env.MAINPORT;
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});

async function sendMail(mailInfo) {
    const templateFile = path.join(__dirname, `/templates/template-${mailInfo.template}.pug`);
    const generated = pug.compileFile(templateFile);
    let messageToSend = generated({
            name: mailInfo.name,
            message: mailInfo.message
        })
        // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTPHOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PSW,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: mailInfo.address, // reciever
        subject: `${mailInfo.subject}  ${mailInfo.name}`, // Subject line
        html: messageToSend, // html body
    });

    console.log("Message sent: %s", info.messageId);


}



//create a schema for templates
const schema = Schema({
    id: Number,
    name: String,
    src: String
});


//fetching data from db
async function getTemplates() {

    await mongoose.connect(MONGO_URL);
    const Template = mongoose.model('template', schema);
    //we only need id and name of template
    const content = await Template.find({}, { id: 1, name: 1, _id: 0 });

    await mongoose.disconnect();

    return content;

}

//connection and pub data

async function pubData(data) {
    await publisher.connect();
    await publisher.publish('mail', JSON.stringify(data));
    await publisher.disconnect();
}