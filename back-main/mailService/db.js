const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const MONGO_URL = process.env.MONGO;
console.log(process.env);


//we add our templates to DB
(async() => {
    const Template = await connectToMongo(MONGO_URL);
    await createTemplate({ id: 1, name: 'template 1', src: "./templates/template-1" }, Template);
    await createTemplate({ id: 2, name: 'template 2', src: "./templates/template-2" }, Template);
    await mongoose.disconnect();
})();



//create a schema for templates
const schema = Schema({
    id: Number,
    name: String,
    src: String
});

//connect to DB
async function connectToMongo(URL) {
    await mongoose.connect(URL);
    return mongoose.model('template', schema);
}

//create templates and adding them to db
async function createTemplate(template, Template) {

    let templateCreated = await new Template(template);
    await templateCreated.save();
    const content = await Template.find();
    console.log(content);
}