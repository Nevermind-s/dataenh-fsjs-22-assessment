# DataEnhancrs full stack software engineer technical assessment


## Context

In the context of our recruitment process, we prepared this technical exercise for our candidates to assess their ability to think, design and realize solutions and components related to our products.

## Introduction

We want to create a solution to send emails to contacts and keep track of the total number of emails sent.

Moreover, we want to have 2 email templates and give the choice to the administrator to pick the suitable one through the same UI.

The UI will be composed of 2 views: 

1. View 1: Contains a form with all the necessary input to send emails to the users and select which email template that will be used for the email's content.
2. View 2: A Chart displaying the total emails sent per day.

The backend consists of a REST API with 2 microservices that would do the following tasks: 

* Emails service: 
  * Connect to the email SMTP server of the service provider.
  * Fetch the contact details, email type and content through a POST HTTP call.
  * Apply the right email template.
  * Send the email.


* Analytics service: 
  * Receive an event every time an email is sent.
  * Persist the event in a database.
  * Expose the analytics data through a GET HTTP call.


![Assessment intro image](./assessment_intro.png?raw=true "Title")

## Frontend requirements 

* The frontend must be an Angular app `version=>12.0`.
* The application must be divided into atomic and reusable components.
* The analytics page will be reused many times in the future; therefore, the component must be generic and dynamic enough.


## Backend requirements 
* Use of NodeJs as the programming language for your microservices no matter the framework used.
* Use Outlook as the email services provider for sending emails.
* REST API principles and guidelines must be demonstrated in the 2 API calls.
* The email templates must be created with the HTML template engine [Pug](https://github.com/pugjs/pug) 
* The database choice is yours, however you'll be asked to justify your choice.

## Delivery 

The code should be delivered in a mono-repo on a different branch named with the following syntax `assessment/{firstname}-{lastname}`.

Your repo must contain a `readme.md` file describing your project and the requirements/commands to run it locally and furthermore explaining the splitting of your Angular components.

## Points of attention 

Your work will be assessed based on the following criteria: 

* Frontend architecture, meaning the way you are creating your components.
* Clean, clear and commented code
* Not exposing secrets in code, instead share the secrets by email at staff@dataenhancers.io

## Deployment

You need to deploy the application; However, you need to think about how you can deploy and scale such solutions and you'll be asked during the review about it.





