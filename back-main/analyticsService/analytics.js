const app = require('express')();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const redis = require('redis');



const MONGO_URL = process.env.MONGO;

//bodyParser lets Express know that the data we're usinf is in JSON format
app.use(bodyParser.json());

//we use cors to prevent erros of type cross orign access
app.use(cors())


//creating the endpoint and waiting for requests
app.get('/api/analytics', async(req, res) => {

    res.json(formatDataSets(await getAnalytics()));
});

const PORT = process.env.SECONDARYPORT;

app.listen(PORT, () => {
    //sub to the redis channel
    subData();
    console.log('Listening on port ' + PORT);
})



//sub to redis channel
async function subData() {

    const client = redis.createClient();

    await client.connect();

    console.log('Waiting for data...')
    await client.subscribe('mail', (message) => {

        console.log(message); // 'message'

        //connecting to db ans inserting data
        createData(message);

    });

};

//describing the data schema
const schema = Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    emailSent: Object
});


//adding data to db
async function createData(data) {
    await mongoose.connect(MONGO_URL);
    const Analy = mongoose.model('analytic', schema);
    let temp1 = await new Analy({ emailSent: JSON.parse(data) });
    await temp1.save();;

};


async function getAnalytics() {
    await mongoose.connect(MONGO_URL);
    const Analy = mongoose.model('analytic', schema);
    const data = await Analy.aggregate([{

            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$timestamp"
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }

    ]);
    console.log(data);
    return data;
}
//format data for chart
function formatDataSets(data) {
    const dataToSend = {
        label: 'mails sent per day',
        labels: [],
        dataSet: [],
        backgroundColor: [],
        borderColor: []


    }
    data.forEach(item => {
        dataToSend.labels.push(item._id);
        dataToSend.dataSet.push(item.count);
        dataToSend.backgroundColor.push(randomColor(0.2));
        dataToSend.borderColor.push(randomColor(1));
    });

    return dataToSend;
}

//generate random Number between 0 and interval
function randomNumber(interval) {
    return Math.floor(Math.random() * interval);
}
//generate random color
function randomColor(alpha) {
    return `rgba(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)}, ${alpha})`
}