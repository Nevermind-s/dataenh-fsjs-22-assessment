const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const MONGO_URL = process.env.MONGO;

//describing the data schema
const schema = Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    emailSent: Object
});



//generate exemple data
async function createExampleData(data) {
    await mongoose.connect(MONGO_URL);
    const Analy = mongoose.model('analytic', schema);
    let temp1 = await new Analy(data);
    await temp1.save();
};


(async() => {

    //examples
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '1' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '1' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '1' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '2' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '1' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '2' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '2' } });
    await createExampleData({ timestamp: new Date('2022-05-09'), emailSent: { template: '1' } });

    await createExampleData({ timestamp: new Date('2022-05-10'), emailSent: { template: '1' } });
    await createExampleData({ timestamp: new Date('2022-05-10'), emailSent: { template: '1' } });
    await createExampleData({ timestamp: new Date('2022-05-10'), emailSent: { template: '2' } });
    await createExampleData({ timestamp: new Date('2022-05-10'), emailSent: { template: '1' } });
    await mongoose.disconnect();
})();