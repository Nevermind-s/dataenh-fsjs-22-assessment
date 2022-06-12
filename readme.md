# Mail sender with analytics project

## Description:

It consists of an application with 2 views, one to send e-mails and one to show analytics about sent e-mails


## Project Architecture:
It uses Angular as front-end JS framework using the following components:
* the `app` component containing the whole application which have inside:

    * the `nav-bar` component so we can navigate frome view to view

    * the result of the routing between two in `router-outlet`

* the `nav-bar` component contains the title og the application and two `span`s with `routerLinkActive` property two indicate which route we take when it's clicked (show the `mail` component or the `analytics` component)

* the `mail` component contains the `form` component
* the `form` component uses groups to get user data, we also injected a `mails` service that we created to send get and post requests
* the `analytics` component is injected with a `analytics` service that we created to fetch data and send it down to it's child, the `chart` component
* the `chart` component gets the data from its parent and display it

## Requirements:

1. [NodeJS](https://nodejs.org/en/)
2. [Redis](https://redis.io/)
3. [MongoDB](https://www.mongodb.com/)

## Commands to get it working:

Do not forget to start MongoDB and Redis server with `sudo service redis-server start`
### Back-end :

Start by opening a new terminal in the project folder and tap `cd ./back-main/`

Install Node dependencies `npm i` 

When it's done the back dependencies will be installed

add a `.env` file in the `./back-main/` folder containing the environement variables

#### Mail Microservice:

tap `node ./back-main/mailService/db.js` so we can add templates data to our DB
start the Mail microservice with `node ./back-main/mailService/mail.js`, it should say

`Listening on ${PORT}`

#### Analytics Microservice:

Open a new terminal and get to the `back-main` folder 

tap `node ./back-main/analyticsService/db.js` so we can add example data to our DB

start the Mail microservice with `node ./back-main/mailService/mail.js`, it should say

```
Listening on ${ANOTHER_PORT}
waiting for data
```

### Front-end :

open a new terminal and get to the front folder with `cd ./front-main/`

start the Angular application with `ng serve -o` it should open the application on your default browser


