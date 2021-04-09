# Employee-Management-System

## Introduction

Employee management system is a multi-user react app that is used to manage the organisational tasks on-campus invigilators for both admin and employee side.

## Packages used

1. **Employee**

   1. react-redux
   2. moment
   3. react-big-calendar
   4. react-icons
   5. react-tooltip

2. **Admin**
   1. bcrypt
   2. dotenv
   3. moment
   4. mongodb
   5. nodemailer

## Environment variables requirement

Environment variables are required in the backend directory to make sure that admin side part of the application run properly. Two main types of environment variables that are needed are given below. For the format of the variables, please see <code>handlers.js</code> in the backend folder.

1. **Mongo URI**- You need a mongodb URI to connect to your database to ensure the proper functioning of your application. For the format of the variable, please see <code>handlers.js</code> in the baclend folder.
2. **Email ID and password of your email account**-This is needed to make the email feature run properly.

## Running of the application

1. Do yarn install in both <code>frontend</code> and <code>backend</code> folders.
2. In the package.json file of <code>frontend</code> folder, add <code>"start": "react-scripts start"</code>.
3. In the package.json file of <code>backend</code> folder, add <code>"dev": "nodemon server.js"</code>.
4. Go to the <code>frontend</code> and <code>backend</code> directories in two separate terminals and run <code>yarn start</code> to run the frontend server, and <code>yarn dev</code> to run the backend server.

With these steps your application will run smoothly! Congratulations!

## Current features

1. **Employee**

   1. Ability to see shifts in a calendar format
   2. Ability to see shifts in tabular and sorted format with additional features of cancelling the shift.
   3. Ability to take cancelled shifts from the list of cancelled shifts.
   4. Ability to see your personal profile, and change contact details and password.
   5. Ability to register as a new user if your employee ID is already created by the admin.

2. **Admin**
   1. Ability to see all the employees sorted with their status.
   2. Ability to see an employee profile and their shifts.
   3. Ability to create a new employee from which that particular employee can register
